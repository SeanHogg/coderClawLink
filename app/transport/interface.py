"""Runtime interface contract for transport abstraction."""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, AsyncIterator, List
from dataclasses import dataclass
from enum import Enum
from datetime import datetime
import uuid


class TaskState(str, Enum):
    """Task state machine for distributed execution."""
    PENDING = "pending"
    PLANNING = "planning"
    RUNNING = "running"
    WAITING = "waiting"
    FAILED = "failed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


@dataclass
class TaskSubmission:
    """Task submission request."""
    task_id: str
    agent_type: str
    prompt: str
    context: Optional[Dict[str, Any]] = None
    session_id: Optional[str] = None
    user_identity: Optional[Dict[str, Any]] = None


@dataclass
class TaskUpdate:
    """Task update event."""
    task_id: str
    state: TaskState
    timestamp: datetime
    message: Optional[str] = None
    progress: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class TaskResult:
    """Task execution result."""
    task_id: str
    state: TaskState
    success: bool
    result: Optional[Any] = None
    error: Optional[str] = None
    execution_time: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class AgentInfo:
    """Agent information."""
    agent_type: str
    name: str
    description: Optional[str] = None
    available: bool = False
    capabilities: Optional[List[str]] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class SkillInfo:
    """Skill information."""
    skill_id: str
    name: str
    description: Optional[str] = None
    required_permissions: Optional[List[str]] = None
    metadata: Optional[Dict[str, Any]] = None


class RuntimeInterface(ABC):
    """
    Abstract runtime interface for coderClaw.
    
    This interface defines the contract for all transport adapters.
    The runtime does not assume HTTP, WebSocket, CLI, or any specific protocol.
    All communication flows through this pluggable adapter layer.
    """
    
    @abstractmethod
    async def submit_task(self, submission: TaskSubmission) -> TaskResult:
        """
        Submit a task for execution.
        
        Args:
            submission: Task submission with agent type, prompt, and context
            
        Returns:
            Initial task result with task_id and state
        """
        pass
    
    @abstractmethod
    async def stream_task_updates(self, task_id: str) -> AsyncIterator[TaskUpdate]:
        """
        Stream task updates in real-time.
        
        Args:
            task_id: The unique task identifier
            
        Yields:
            TaskUpdate events as they occur
        """
        pass
    
    @abstractmethod
    async def query_task_state(self, task_id: str) -> TaskResult:
        """
        Query the current state of a task.
        
        Args:
            task_id: The unique task identifier
            
        Returns:
            Current task result and state
        """
        pass
    
    @abstractmethod
    async def cancel_task(self, task_id: str) -> bool:
        """
        Cancel a running task.
        
        Args:
            task_id: The unique task identifier
            
        Returns:
            True if cancellation was successful
        """
        pass
    
    @abstractmethod
    async def list_agents(self) -> List[AgentInfo]:
        """
        List available agents.
        
        Returns:
            List of agent information
        """
        pass
    
    @abstractmethod
    async def list_skills(self) -> List[SkillInfo]:
        """
        List available skills.
        
        Returns:
            List of skill information
        """
        pass
    
    @abstractmethod
    async def validate_session(self, session_id: str) -> bool:
        """
        Validate a session ID.
        
        Args:
            session_id: The session identifier to validate
            
        Returns:
            True if session is valid
        """
        pass


class TransportAdapter(ABC):
    """
    Abstract transport adapter.
    
    Transport adapters bridge specific protocols (HTTP, WebSocket, etc.)
    to the runtime interface.
    """
    
    def __init__(self, runtime: RuntimeInterface):
        """Initialize adapter with runtime interface."""
        self.runtime = runtime
    
    @abstractmethod
    async def start(self):
        """Start the transport adapter."""
        pass
    
    @abstractmethod
    async def stop(self):
        """Stop the transport adapter."""
        pass
