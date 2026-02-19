"""Generic HTTP-based agent for OpenDevin and Goose."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
import httpx
import logging

logger = logging.getLogger(__name__)


class HTTPAgent(BaseAgent):
    """Generic HTTP-based agent for external services."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize HTTP agent."""
        super().__init__(config)
        self.api_url = config.get("api_url")
        self.agent_name = config.get("name", "http")
        self.timeout = config.get("timeout", 300.0)
    
    @property
    def agent_type(self) -> str:
        """Return agent type."""
        return self.agent_name
    
    def validate_config(self) -> bool:
        """Validate HTTP agent configuration."""
        return bool(self.api_url)
    
    async def execute(self, prompt: str, context: Optional[Dict[str, Any]] = None, file_context: Optional[List[str]] = None, working_directory: Optional[str] = None) -> AgentResponse:
        if not self.validate_config():
            return AgentResponse(
                success=False,
                error=f"{self.agent_name} agent not properly configured. API URL missing."
            )
        
        try:
            # Prepare request payload
            payload = {
                "prompt": prompt,
                "context": context or {}
            }
            
            # Call agent API
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.api_url}/execute",
                    json=payload
                )
                response.raise_for_status()
                
                result_data = response.json()
                
                return AgentResponse(
                    success=True,
                    result=result_data.get("result", ""),
                    metadata=result_data.get("metadata", {})
                )
        
        except httpx.HTTPError as e:
            logger.error(f"{self.agent_name} agent HTTP error: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"{self.agent_name} HTTP error: {str(e)}"
            )
        except Exception as e:
            logger.error(f"{self.agent_name} agent execution failed: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"{self.agent_name} execution failed: {str(e)}"
            )


class OpenDevinAgent(HTTPAgent):
    """OpenDevin agent implementation."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize OpenDevin agent."""
        config["name"] = "opendevin"
        super().__init__(config)


class GooseAgent(HTTPAgent):
    """Goose agent implementation."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize Goose agent."""
        config["name"] = "goose"
        super().__init__(config)
