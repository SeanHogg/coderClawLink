"""Base agent interface and abstract class."""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from dataclasses import dataclass


@dataclass
class AgentResponse:
    """Standard agent response format."""
    success: bool
    result: Optional[str] = None
    error: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class BaseAgent(ABC):
    """Abstract base class for all agents."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize agent with configuration."""
        self.config = config
    
    @abstractmethod
    async def execute(
        self,
        prompt: str,
        context: Optional[Dict[str, Any]] = None,
        file_context: Optional[List[str]] = None,
        working_directory: Optional[str] = None,
    ) -> AgentResponse:
        """
        Execute the agent with given prompt and context.
        
        Args:
            prompt: The prompt/instruction for the agent
            context: Additional context (project info, task details, etc.)
            file_context: List of file paths to include in the agent context
            working_directory: Directory in which the agent should operate
        
        Returns:
            AgentResponse with result or error
        """
        pass
    
    @abstractmethod
    def validate_config(self) -> bool:
        """Validate that the agent is properly configured."""
        pass
    
    @property
    @abstractmethod
    def agent_type(self) -> str:
        """Return the agent type identifier."""
        pass
