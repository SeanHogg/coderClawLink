"""Audit logging for CoderClawLink.

Records security and operational events with queryable storage.
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Dict, List, Optional


class AuditEventType(Enum):
    SESSION_CREATED = 'session_created'
    SESSION_DELETED = 'session_deleted'
    USER_LOGIN = 'user_login'
    USER_LOGOUT = 'user_logout'
    TASK_SUBMITTED = 'task_submitted'
    TASK_COMPLETED = 'task_completed'
    TASK_FAILED = 'task_failed'
    TASK_CANCELLED = 'task_cancelled'
    AGENT_REGISTERED = 'agent_registered'
    PERMISSION_GRANTED = 'permission_granted'
    PERMISSION_REVOKED = 'permission_revoked'
    ROLE_ASSIGNED = 'role_assigned'
    REQUIREMENT_CREATED = 'requirement_created'
    REQUIREMENT_UPDATED = 'requirement_updated'
    INTEGRATION_CREATED = 'integration_created'
    INTEGRATION_UPDATED = 'integration_updated'


@dataclass
class AuditEvent:
    event_id: str
    event_type: AuditEventType
    user_id: Optional[str]
    session_id: Optional[str] = None
    status: str = 'success'
    metadata: Optional[Dict] = None
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


class AuditLogger:
    """In-memory audit event logger."""

    def __init__(self) -> None:
        self._events: List[AuditEvent] = []

    def log_event(
        self,
        event_type: AuditEventType,
        user_id: Optional[str] = None,
        session_id: Optional[str] = None,
        status: str = 'success',
        metadata: Optional[Dict] = None,
    ) -> AuditEvent:
        """Record an audit event and return it."""
        event = AuditEvent(
            event_id=str(uuid.uuid4()),
            event_type=event_type,
            user_id=user_id,
            session_id=session_id,
            status=status,
            metadata=metadata,
        )
        self._events.append(event)
        return event

    def get_events(
        self,
        user_id: Optional[str] = None,
        event_type: Optional[AuditEventType] = None,
        limit: int = 100,
    ) -> List[AuditEvent]:
        """Return events filtered by user and/or type, newest first."""
        results = self._events
        if user_id is not None:
            results = [e for e in results if e.user_id == user_id]
        if event_type is not None:
            results = [e for e in results if e.event_type == event_type]
        return list(reversed(results))[:limit]
