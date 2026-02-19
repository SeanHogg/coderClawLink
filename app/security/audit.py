"""Audit logging system for tracking AI actions."""

from enum import Enum
from typing import Dict, Any, Optional, List
from dataclasses import dataclass, field, asdict
from datetime import datetime
import json
import logging

logger = logging.getLogger(__name__)


class AuditEventType(str, Enum):
    """Types of audit events."""
    # Session events
    SESSION_CREATED = "session.created"
    SESSION_DELETED = "session.deleted"
    
    # Task events
    TASK_SUBMITTED = "task.submitted"
    TASK_STARTED = "task.started"
    TASK_COMPLETED = "task.completed"
    TASK_FAILED = "task.failed"
    TASK_CANCELLED = "task.cancelled"
    
    # Agent events
    AGENT_EXECUTED = "agent.executed"
    AGENT_CONFIGURED = "agent.configured"
    
    # Permission events
    PERMISSION_GRANTED = "permission.granted"
    PERMISSION_REVOKED = "permission.revoked"
    PERMISSION_DENIED = "permission.denied"
    
    # Resource events
    RESOURCE_ACCESSED = "resource.accessed"
    RESOURCE_MODIFIED = "resource.modified"
    RESOURCE_DELETED = "resource.deleted"


@dataclass
class AuditEvent:
    """Audit event record."""
    event_id: str
    event_type: AuditEventType
    timestamp: datetime
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    resource_type: Optional[str] = None
    resource_id: Optional[str] = None
    action: Optional[str] = None
    status: str = "success"
    details: Dict[str, Any] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        data = asdict(self)
        data["timestamp"] = self.timestamp.isoformat()
        data["event_type"] = self.event_type.value
        return data
    
    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict())


class AuditLogger:
    """
    Audit logging system for enterprise readiness.
    
    Tracks:
    - All AI actions and executions
    - Permission changes
    - Resource access
    - Session activities
    """
    
    def __init__(self, max_events: int = 10000):
        """
        Initialize audit logger.
        
        Args:
            max_events: Maximum events to keep in memory
        """
        self._events: List[AuditEvent] = []
        self._max_events = max_events
        logger.info("Audit logger initialized")
    
    def log_event(
        self,
        event_type: AuditEventType,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        action: Optional[str] = None,
        status: str = "success",
        details: Optional[Dict[str, Any]] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> AuditEvent:
        """
        Log an audit event.
        
        Args:
            event_type: Type of event
            user_id: User who performed the action
            session_id: Session ID
            resource_type: Type of resource affected
            resource_id: ID of resource affected
            action: Action performed
            status: Status of the action (success/failure)
            details: Additional details
            metadata: Additional metadata
            
        Returns:
            Created audit event
        """
        import uuid
        
        event = AuditEvent(
            event_id=str(uuid.uuid4()),
            event_type=event_type,
            timestamp=datetime.utcnow(),
            user_id=user_id,
            session_id=session_id,
            resource_type=resource_type,
            resource_id=resource_id,
            action=action,
            status=status,
            details=details or {},
            metadata=metadata or {}
        )
        
        self._events.append(event)
        
        # Trim old events if needed
        if len(self._events) > self._max_events:
            self._events = self._events[-self._max_events:]
        
        # Also log to standard logger
        logger.info(
            f"AUDIT: {event_type.value} | user={user_id} | "
            f"session={session_id} | resource={resource_type}:{resource_id} | "
            f"status={status}"
        )
        
        return event
    
    def get_events(
        self,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        event_type: Optional[AuditEventType] = None,
        resource_type: Optional[str] = None,
        limit: Optional[int] = None
    ) -> List[AuditEvent]:
        """
        Query audit events with filters.
        
        Args:
            user_id: Filter by user
            session_id: Filter by session
            event_type: Filter by event type
            resource_type: Filter by resource type
            limit: Maximum number of events to return
            
        Returns:
            List of matching audit events
        """
        events = self._events
        
        if user_id:
            events = [e for e in events if e.user_id == user_id]
        
        if session_id:
            events = [e for e in events if e.session_id == session_id]
        
        if event_type:
            events = [e for e in events if e.event_type == event_type]
        
        if resource_type:
            events = [e for e in events if e.resource_type == resource_type]
        
        # Sort by timestamp descending (most recent first)
        events = sorted(events, key=lambda e: e.timestamp, reverse=True)
        
        if limit:
            events = events[:limit]
        
        return events
    
    def get_user_activity(self, user_id: str, limit: int = 100) -> List[AuditEvent]:
        """Get recent activity for a user."""
        return self.get_events(user_id=user_id, limit=limit)
    
    def get_session_activity(self, session_id: str, limit: int = 100) -> List[AuditEvent]:
        """Get activity for a session."""
        return self.get_events(session_id=session_id, limit=limit)
    
    def export_events(
        self,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        event_type: Optional[AuditEventType] = None,
        limit: Optional[int] = None
    ) -> str:
        """
        Export audit events as JSON.
        
        Returns:
            JSON string of events
        """
        events = self.get_events(
            user_id=user_id,
            session_id=session_id,
            event_type=event_type,
            limit=limit
        )
        
        return json.dumps([e.to_dict() for e in events], indent=2)


# Global audit logger instance
_audit_logger: Optional[AuditLogger] = None


def get_audit_logger() -> AuditLogger:
    """Get global audit logger instance."""
    global _audit_logger
    if _audit_logger is None:
        _audit_logger = AuditLogger()
    return _audit_logger
