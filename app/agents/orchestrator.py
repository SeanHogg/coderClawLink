"""Agent orchestrator - manages and routes requests to different agents."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
from app.agents.claude_agent import ClaudeAgent
from app.agents.ollama_agent import OllamaAgent
from app.agents.openai_agent import OpenAIAgent, AuggieAgent
from app.agents.http_agent import OpenDevinAgent, GooseAgent
from app.models.database import AgentType
from app.core.config import get_settings
import logging

logger = logging.getLogger(__name__)


class AgentOrchestrator:
    """Orchestrates agent selection and execution."""
    
    def __init__(self):
        """Initialize agent orchestrator."""
        self.settings = get_settings()
        self.agents: Dict[str, BaseAgent] = {}
        self._initialize_agents()
    
    def _initialize_agents(self):
        """Initialize all available agents."""
        # Claude agent
        if self.settings.anthropic_api_key:
            self.agents[AgentType.CLAUDE.value] = ClaudeAgent({
                "api_key": self.settings.anthropic_api_key
            })
        
        # Auggie agent (OpenAI-based)
        if self.settings.openai_api_key:
            self.agents[AgentType.AUGGIE.value] = AuggieAgent({
                "api_key": self.settings.openai_api_key,
                "model": "gpt-4"
            })
        
        # Ollama agent
        self.agents[AgentType.OLLAMA.value] = OllamaAgent({
            "base_url": self.settings.ollama_base_url
        })
        
        # OpenDevin agent
        if self.settings.opendevin_api_url:
            self.agents[AgentType.OPENDEVIN.value] = OpenDevinAgent({
                "api_url": self.settings.opendevin_api_url
            })
        
        # Goose agent
        if self.settings.goose_api_url:
            self.agents[AgentType.GOOSE.value] = GooseAgent({
                "api_url": self.settings.goose_api_url
            })
        
        logger.info(f"Initialized {len(self.agents)} agents: {list(self.agents.keys())}")
    
    def get_agent(self, agent_type: AgentType) -> Optional[BaseAgent]:
        """Get agent by type."""
        return self.agents.get(agent_type.value)
    
    def list_available_agents(self) -> List[str]:
        """List all available and configured agents."""
        available = []
        for agent_type, agent in self.agents.items():
            if agent.validate_config():
                available.append(agent_type)
        return available
    
    async def execute_task(
        self,
        agent_type: AgentType,
        prompt: str,
        context: Optional[Dict[str, Any]] = None
    ) -> AgentResponse:
        """
        Execute a task with specified agent.
        
        Args:
            agent_type: Type of agent to use
            prompt: Task prompt/instruction
            context: Additional context (project, task details, etc.)
        
        Returns:
            AgentResponse with result or error
        """
        agent = self.get_agent(agent_type)
        
        if not agent:
            return AgentResponse(
                success=False,
                error=f"Agent type '{agent_type.value}' not available or not configured"
            )
        
        if not agent.validate_config():
            return AgentResponse(
                success=False,
                error=f"Agent '{agent_type.value}' is not properly configured"
            )
        
        logger.info(f"Executing task with {agent_type.value} agent")
        return await agent.execute(prompt, context)


# Global orchestrator instance
_orchestrator: Optional[AgentOrchestrator] = None


def get_orchestrator() -> AgentOrchestrator:
    """Get global orchestrator instance."""
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = AgentOrchestrator()
    return _orchestrator
