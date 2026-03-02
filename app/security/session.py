"""Session management for CoderClawLink.

Provides creation, validation, retrieval, and deletion of user sessions.
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Dict, Optional


@dataclass
class Session:
    session_id: str
    user_identity: Dict
    device_id: Optional[str] = None
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    is_valid: bool = True


class SessionManager:
    """In-memory session store."""

    def __init__(self) -> None:
        self._sessions: Dict[str, Session] = {}

    def create_session(
        self,
        user_identity: Dict,
        device_id: Optional[str] = None,
    ) -> Session:
        """Create and store a new session."""
        session = Session(
            session_id=str(uuid.uuid4()),
            user_identity=user_identity,
            device_id=device_id,
        )
        self._sessions[session.session_id] = session
        return session

    def validate_session(self, session_id: str) -> bool:
        """Return True if the session exists and is valid."""
        session = self._sessions.get(session_id)
        return session is not None and session.is_valid

    def get_session(self, session_id: str) -> Optional[Session]:
        """Retrieve a session by ID, or None if not found."""
        return self._sessions.get(session_id)

    def delete_session(self, session_id: str) -> bool:
        """Delete a session. Returns True if it existed."""
        if session_id in self._sessions:
            del self._sessions[session_id]
            return True
        return False


_session_manager: SessionManager | None = None


def get_session_manager() -> SessionManager:
    """Return a shared SessionManager instance."""
    global _session_manager
    if _session_manager is None:
        _session_manager = SessionManager()
    return _session_manager
