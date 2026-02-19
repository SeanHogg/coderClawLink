"""API routes for audit logging (Phase 2 enterprise features)."""

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional

from app.models.schemas import AuditLogResponse
from app.security.audit import get_audit_logger, AuditEventType
from app.security.session import get_session_manager
from app.security.rbac import get_rbac_manager, Permission

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("/events", response_model=List[AuditLogResponse])
async def get_audit_events(
    session_id: str = Query(..., description="Session ID for authentication"),
    user_id: Optional[str] = Query(None, description="Filter by user ID"),
    event_type: Optional[str] = Query(None, description="Filter by event type"),
    resource_type: Optional[str] = Query(None, description="Filter by resource type"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum events to return")
):
    """
    Get audit events with filtering.
    
    Phase 2: Enterprise readiness with audit logging.
    Requires admin permissions.
    """
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    audit_logger = get_audit_logger()
    
    # Validate session
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Check admin permission
    requesting_user_id = session.user_identity.get("user_id") if session.user_identity else None
    if requesting_user_id and not rbac_manager.has_permission(requesting_user_id, Permission.ADMIN_SYSTEM):
        raise HTTPException(status_code=403, detail="Admin permission required to view audit logs")
    
    # Parse event type if provided
    event_type_enum = None
    if event_type:
        try:
            event_type_enum = AuditEventType(event_type)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid event type: {event_type}")
    
    # Get events
    events = audit_logger.get_events(
        user_id=user_id,
        event_type=event_type_enum,
        resource_type=resource_type,
        limit=limit
    )
    
    return [
        AuditLogResponse(
            event_id=event.event_id,
            event_type=event.event_type.value,
            timestamp=event.timestamp,
            user_id=event.user_id,
            session_id=event.session_id,
            resource_type=event.resource_type,
            resource_id=event.resource_id,
            action=event.action,
            status=event.status,
            details=event.details
        )
        for event in events
    ]


@router.get("/users/{user_id}/activity", response_model=List[AuditLogResponse])
async def get_user_activity(
    user_id: str,
    session_id: str = Query(..., description="Session ID for authentication"),
    limit: int = Query(100, ge=1, le=1000)
):
    """
    Get activity history for a specific user.
    
    Users can view their own activity; admins can view any user's activity.
    """
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    audit_logger = get_audit_logger()
    
    # Validate session
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    requesting_user_id = session.user_identity.get("user_id") if session.user_identity else None
    
    # Check if user is viewing their own activity or has admin permission
    if requesting_user_id != user_id:
        if not requesting_user_id or not rbac_manager.has_permission(requesting_user_id, Permission.ADMIN_USERS):
            raise HTTPException(status_code=403, detail="Can only view own activity or requires admin permission")
    
    # Get user activity
    events = audit_logger.get_user_activity(user_id, limit=limit)
    
    return [
        AuditLogResponse(
            event_id=event.event_id,
            event_type=event.event_type.value,
            timestamp=event.timestamp,
            user_id=event.user_id,
            session_id=event.session_id,
            resource_type=event.resource_type,
            resource_id=event.resource_id,
            action=event.action,
            status=event.status,
            details=event.details
        )
        for event in events
    ]


@router.get("/sessions/{session_id}/activity", response_model=List[AuditLogResponse])
async def get_session_activity(
    session_id: str,
    requesting_session_id: str = Query(..., alias="auth_session_id", description="Session ID for authentication"),
    limit: int = Query(100, ge=1, le=1000)
):
    """Get activity history for a specific session."""
    session_manager = get_session_manager()
    audit_logger = get_audit_logger()
    
    # Validate requesting session
    requesting_session = session_manager.get_session(requesting_session_id)
    if not requesting_session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Validate target session (just to make sure it exists or existed)
    target_session = session_manager.get_session(session_id)
    if not target_session:
        # Session might be expired, but we can still show history
        pass
    
    # Get session activity
    events = audit_logger.get_session_activity(session_id, limit=limit)
    
    return [
        AuditLogResponse(
            event_id=event.event_id,
            event_type=event.event_type.value,
            timestamp=event.timestamp,
            user_id=event.user_id,
            session_id=event.session_id,
            resource_type=event.resource_type,
            resource_id=event.resource_id,
            action=event.action,
            status=event.status,
            details=event.details
        )
        for event in events
    ]
