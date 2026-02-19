"""API routes for runtime interface (Phase 2 transport abstraction)."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import uuid

from app.core.database import get_db
from app.models.schemas import (
    TaskSubmissionRequest, TaskStateResponse, AgentInfoResponse,
    SkillInfoResponse, SessionInfo
)
from app.transport.local_runtime import get_local_runtime
from app.transport.interface import TaskSubmission, TaskState
from app.security.session import get_session_manager
from app.security.rbac import get_rbac_manager, Permission
from app.security.audit import get_audit_logger, AuditEventType

router = APIRouter(prefix="/runtime", tags=["runtime"])


@router.post("/sessions", response_model=SessionInfo)
async def create_session(
    user_id: Optional[str] = None,
    device_id: Optional[str] = None
):
    """
    Create a new session for remote orchestration.
    
    Phase 2: Multi-session isolation and per-session memory scope.
    """
    session_manager = get_session_manager()
    audit_logger = get_audit_logger()
    
    # Create user identity
    user_identity = {"user_id": user_id} if user_id else None
    
    # Create session
    session = session_manager.create_session(
        user_identity=user_identity,
        device_id=device_id,
        permissions={Permission.TASK_SUBMIT, Permission.TASK_VIEW, Permission.AGENT_EXECUTE}
    )
    
    # Log audit event
    audit_logger.log_event(
        event_type=AuditEventType.SESSION_CREATED,
        user_id=user_id,
        session_id=session.session_id,
        status="success"
    )
    
    return SessionInfo(
        session_id=session.session_id,
        user_id=user_id,
        created_at=session.created_at,
        last_activity=session.last_activity,
        permissions=[str(p) for p in session.permissions]
    )


@router.get("/sessions/{session_id}", response_model=SessionInfo)
async def get_session_info(session_id: str):
    """Get session information."""
    session_manager = get_session_manager()
    
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")
    
    return SessionInfo(
        session_id=session.session_id,
        user_id=session.user_identity.get("user_id") if session.user_identity else None,
        created_at=session.created_at,
        last_activity=session.last_activity,
        permissions=[str(p) for p in session.permissions]
    )


@router.post("/tasks/submit", response_model=TaskStateResponse)
async def submit_task(
    request: TaskSubmissionRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit a task for execution through transport abstraction.
    
    Phase 2: Secure remote command execution with session isolation.
    """
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    audit_logger = get_audit_logger()
    
    # Validate session if provided
    if request.session_id:
        session = session_manager.get_session(request.session_id)
        if not session:
            raise HTTPException(status_code=401, detail="Invalid or expired session")
        
        user_id = session.user_identity.get("user_id") if session.user_identity else None
        
        # Check permissions
        if user_id and not rbac_manager.has_permission(user_id, Permission.TASK_SUBMIT):
            audit_logger.log_event(
                event_type=AuditEventType.PERMISSION_DENIED,
                user_id=user_id,
                session_id=request.session_id,
                action="task_submit",
                status="denied"
            )
            raise HTTPException(status_code=403, detail="Permission denied: task:submit")
        
        # Check agent execution permission
        if user_id and not rbac_manager.can_execute_agent(user_id, request.agent_type):
            audit_logger.log_event(
                event_type=AuditEventType.PERMISSION_DENIED,
                user_id=user_id,
                session_id=request.session_id,
                action="execute_agent",
                resource_type="agent",
                resource_id=request.agent_type,
                status="denied"
            )
            raise HTTPException(status_code=403, detail=f"Permission denied: execute agent {request.agent_type}")
    
    # Generate task UUID
    task_uuid = str(uuid.uuid4())
    
    # Build submission
    submission = TaskSubmission(
        task_id=task_uuid,
        agent_type=request.agent_type,
        prompt=request.prompt,
        context=request.context,
        session_id=request.session_id
    )
    
    # Submit to runtime
    result = await runtime.submit_task(submission)
    
    # Log audit event
    user_id = None
    if request.session_id:
        session = session_manager.get_session(request.session_id)
        user_id = session.user_identity.get("user_id") if session and session.user_identity else None
    
    audit_logger.log_event(
        event_type=AuditEventType.TASK_SUBMITTED,
        user_id=user_id,
        session_id=request.session_id,
        resource_type="task",
        resource_id=task_uuid,
        details={"agent_type": request.agent_type},
        status="success"
    )
    
    return TaskStateResponse(
        task_id=result.task_id,
        execution_uuid=result.task_id,
        state=result.state,
        success=result.success,
        error=result.error,
        metadata=result.metadata
    )


@router.get("/tasks/{task_id}/state", response_model=TaskStateResponse)
async def query_task_state(task_id: str, session_id: Optional[str] = None):
    """
    Query the current state of a task.
    
    Phase 2: Distributed task lifecycle tracking.
    """
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    
    # Validate session if provided
    if session_id and not session_manager.validate_session(session_id):
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Query state
    result = await runtime.query_task_state(task_id)
    
    return TaskStateResponse(
        task_id=result.task_id,
        execution_uuid=result.task_id,
        state=result.state,
        success=result.success,
        result=result.result,
        error=result.error,
        execution_time=result.execution_time,
        metadata=result.metadata
    )


@router.post("/tasks/{task_id}/cancel")
async def cancel_task(task_id: str, session_id: Optional[str] = None):
    """
    Cancel a running task.
    
    Phase 2: Cancellation support for distributed execution.
    """
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    audit_logger = get_audit_logger()
    
    user_id = None
    
    # Validate session and permissions
    if session_id:
        session = session_manager.get_session(session_id)
        if not session:
            raise HTTPException(status_code=401, detail="Invalid or expired session")
        
        user_id = session.user_identity.get("user_id") if session.user_identity else None
        
        if user_id and not rbac_manager.has_permission(user_id, Permission.TASK_CANCEL):
            raise HTTPException(status_code=403, detail="Permission denied: task:cancel")
    
    # Cancel task
    success = await runtime.cancel_task(task_id)
    
    if not success:
        raise HTTPException(status_code=400, detail="Task cannot be cancelled (not found or already completed)")
    
    # Log audit event
    audit_logger.log_event(
        event_type=AuditEventType.TASK_CANCELLED,
        user_id=user_id,
        session_id=session_id,
        resource_type="task",
        resource_id=task_id,
        status="success"
    )
    
    return {"success": True, "task_id": task_id}


@router.get("/agents", response_model=List[AgentInfoResponse])
async def list_agents(session_id: Optional[str] = None):
    """
    List available agents.
    
    Phase 2: Agent registry with availability status.
    """
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    
    # Validate session if provided
    if session_id and not session_manager.validate_session(session_id):
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Get agents
    agents = await runtime.list_agents()
    
    return [
        AgentInfoResponse(
            agent_type=agent.agent_type,
            name=agent.name,
            description=agent.description,
            available=agent.available,
            capabilities=agent.capabilities or [],
            metadata=agent.metadata
        )
        for agent in agents
    ]


@router.get("/skills", response_model=List[SkillInfoResponse])
async def list_skills(session_id: Optional[str] = None):
    """
    List available skills.
    
    Phase 2: Skill ecosystem with permission requirements.
    """
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    
    # Validate session if provided
    if session_id and not session_manager.validate_session(session_id):
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Get skills
    skills = await runtime.list_skills()
    
    return [
        SkillInfoResponse(
            skill_id=skill.skill_id,
            name=skill.name,
            description=skill.description,
            required_permissions=skill.required_permissions or [],
            metadata=skill.metadata
        )
        for skill in skills
    ]
