"""Session management with multi-session isolation."""

import uuid
from typing import Dict, Any, Optional, Set
from datetime import datetime, timedelta
from dataclasses import dataclass, field
import logging

logger = logging.getLogger(__name__)


@dataclass
class Session:
    """Session information."""
    session_id: str
    user_identity: Optional[Dict[str, Any]] = None
    device_id: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    last_activity: datetime = field(default_factory=datetime.utcnow)
    permissions: Set[str] = field(default_factory=set)
    metadata: Dict[str, Any] = field(default_factory=dict)
    memory_scope: Dict[str, Any] = field(default_factory=dict)
    
    def is_expired(self, timeout: timedelta = timedelta(hours=24)) -> bool:
        """Check if session is expired."""
        return datetime.utcnow() - self.last_activity > timeout
    
    def refresh(self):
        """Refresh session activity."""
        self.last_activity = datetime.utcnow()


class SessionManager:
    """
    Manages user sessions with multi-session isolation.
    
    Each session maintains:
    - Unique session ID
    - User identity
    - Device trust level
    - Permissions
    - Memory scope (isolated per session)
    """
    
    def __init__(self):
        """Initialize session manager."""
        self._sessions: Dict[str, Session] = {}
        self._user_sessions: Dict[str, Set[str]] = {}  # user_id -> session_ids
        logger.info("Session manager initialized")
    
    def create_session(
        self,
        user_identity: Optional[Dict[str, Any]] = None,
        device_id: Optional[str] = None,
        permissions: Optional[Set[str]] = None
    ) -> Session:
        """
        Create a new session.
        
        Args:
            user_identity: User identity information (OIDC, GitHub, etc.)
            device_id: Device identifier for trust tracking
            permissions: Initial permissions for the session
            
        Returns:
            New session object
        """
        session_id = str(uuid.uuid4())
        
        session = Session(
            session_id=session_id,
            user_identity=user_identity,
            device_id=device_id,
            permissions=permissions or set()
        )
        
        self._sessions[session_id] = session
        
        # Track user sessions
        if user_identity and "user_id" in user_identity:
            user_id = user_identity["user_id"]
            if user_id not in self._user_sessions:
                self._user_sessions[user_id] = set()
            self._user_sessions[user_id].add(session_id)
        
        logger.info(f"Created session {session_id} for user {user_identity.get('user_id') if user_identity else 'anonymous'}")
        
        return session
    
    def get_session(self, session_id: str) -> Optional[Session]:
        """Get session by ID."""
        session = self._sessions.get(session_id)
        
        if session:
            # Check expiration
            if session.is_expired():
                self.delete_session(session_id)
                return None
            
            # Refresh activity
            session.refresh()
        
        return session
    
    def delete_session(self, session_id: str) -> bool:
        """Delete a session."""
        session = self._sessions.pop(session_id, None)
        
        if session and session.user_identity and "user_id" in session.user_identity:
            user_id = session.user_identity["user_id"]
            if user_id in self._user_sessions:
                self._user_sessions[user_id].discard(session_id)
        
        logger.info(f"Deleted session {session_id}")
        return session is not None
    
    def list_user_sessions(self, user_id: str) -> Set[str]:
        """List all sessions for a user."""
        return self._user_sessions.get(user_id, set()).copy()
    
    def validate_session(self, session_id: str) -> bool:
        """Validate if session exists and is active."""
        return self.get_session(session_id) is not None
    
    def cleanup_expired_sessions(self):
        """Clean up expired sessions."""
        expired = [
            sid for sid, session in self._sessions.items()
            if session.is_expired()
        ]
        
        for session_id in expired:
            self.delete_session(session_id)
        
        if expired:
            logger.info(f"Cleaned up {len(expired)} expired sessions")


# Global session manager instance
_session_manager: Optional[SessionManager] = None


def get_session_manager() -> SessionManager:
    """Get global session manager instance."""
    global _session_manager
    if _session_manager is None:
        _session_manager = SessionManager()
    return _session_manager
