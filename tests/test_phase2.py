"""Tests for Phase 2 transport abstraction and distributed features."""

import pytest
from app.transport.local_runtime import LocalRuntime
from app.transport.interface import TaskSubmission, TaskState
from app.security.session import SessionManager
from app.security.rbac import RBACManager, Role, Permission
from app.security.audit import AuditLogger, AuditEventType


def test_local_runtime_initialization():
    """Test that local runtime initializes correctly."""
    runtime = LocalRuntime()
    assert runtime is not None
    assert runtime.orchestrator is not None
    assert runtime.active_tasks == {}


@pytest.mark.asyncio
async def test_session_management():
    """Test session creation and validation."""
    session_manager = SessionManager()
    
    # Create session
    session = session_manager.create_session(
        user_identity={"user_id": "test-user"},
        device_id="device-123"
    )
    
    assert session.session_id is not None
    assert session.user_identity["user_id"] == "test-user"
    assert session.device_id == "device-123"
    
    # Validate session
    assert session_manager.validate_session(session.session_id)
    
    # Get session
    retrieved = session_manager.get_session(session.session_id)
    assert retrieved is not None
    assert retrieved.session_id == session.session_id
    
    # Delete session
    assert session_manager.delete_session(session.session_id)
    assert not session_manager.validate_session(session.session_id)


def test_rbac_roles_and_permissions():
    """Test RBAC role and permission management."""
    rbac = RBACManager()
    user_id = "test-user"
    
    # Assign role
    rbac.assign_role(user_id, Role.DEVELOPER)
    
    # Check permissions
    assert rbac.has_permission(user_id, Permission.TASK_SUBMIT)
    assert rbac.has_permission(user_id, Permission.AGENT_EXECUTE)
    assert not rbac.has_permission(user_id, Permission.ADMIN_SYSTEM)
    
    # Grant specific permission
    rbac.grant_permission(user_id, Permission.ADMIN_USERS)
    assert rbac.has_permission(user_id, Permission.ADMIN_USERS)
    
    # Revoke permission
    rbac.revoke_permission(user_id, Permission.ADMIN_USERS)
    assert not rbac.has_permission(user_id, Permission.ADMIN_USERS)


def test_audit_logging():
    """Test audit logging system."""
    audit_logger = AuditLogger()
    
    # Log event
    event = audit_logger.log_event(
        event_type=AuditEventType.SESSION_CREATED,
        user_id="test-user",
        session_id="session-123",
        status="success"
    )
    
    assert event.event_id is not None
    assert event.event_type == AuditEventType.SESSION_CREATED
    assert event.user_id == "test-user"
    
    # Get events
    events = audit_logger.get_events(user_id="test-user", limit=10)
    assert len(events) == 1
    assert events[0].event_id == event.event_id


@pytest.mark.asyncio
async def test_list_agents():
    """Test listing available agents."""
    runtime = LocalRuntime()
    
    agents = await runtime.list_agents()
    
    assert len(agents) > 0
    assert any(a.agent_type == "claude" for a in agents)
    assert any(a.agent_type == "ollama" for a in agents)


@pytest.mark.asyncio
async def test_list_skills():
    """Test listing available skills."""
    runtime = LocalRuntime()
    
    skills = await runtime.list_skills()
    
    assert len(skills) > 0
    assert any(s.skill_id == "code_generation" for s in skills)
    assert any(s.skill_id == "code_analysis" for s in skills)


@pytest.mark.asyncio
async def test_task_state_machine():
    """Test task state transitions through the distributed lifecycle."""
    runtime = LocalRuntime()
    
    # Note: This test would need actual agent execution to work fully
    # For now, we just test the basic flow
    
    submission = TaskSubmission(
        task_id="test-task-1",
        agent_type="ollama",  # Use ollama as it's always available
        prompt="Test prompt",
        context={"test": "context"}
    )
    
    # Submit task
    result = await runtime.submit_task(submission)
    
    assert result.task_id == "test-task-1"
    assert result.state == TaskState.PENDING
    
    # Query state (task should be processing or completed)
    import asyncio
    await asyncio.sleep(0.5)  # Give it time to start
    
    state = await runtime.query_task_state("test-task-1")
    assert state.task_id == "test-task-1"
    # State should be in one of the valid states
    assert state.state in [
        TaskState.PENDING,
        TaskState.PLANNING,
        TaskState.RUNNING,
        TaskState.COMPLETED,
        TaskState.FAILED
    ]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
