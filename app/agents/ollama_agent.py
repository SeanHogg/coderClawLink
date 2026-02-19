"""Ollama agent implementation for local LLM inference."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
import httpx
import logging

logger = logging.getLogger(__name__)


class OllamaAgent(BaseAgent):
    """Agent implementation for Ollama (local LLM)."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize Ollama agent."""
        super().__init__(config)
        self.base_url = config.get("base_url", "http://localhost:11434")
        self.model = config.get("model", "codellama")
    
    @property
    def agent_type(self) -> str:
        """Return agent type."""
        return "ollama"
    
    def validate_config(self) -> bool:
        """Validate Ollama configuration."""
        return bool(self.base_url)
    
    async def execute(self, prompt: str, context: Optional[Dict[str, Any]] = None, file_context: Optional[List[str]] = None, working_directory: Optional[str] = None) -> AgentResponse:
        if not self.validate_config():
            return AgentResponse(
                success=False,
                error="Ollama agent not properly configured."
            )
        
        try:
            # Build full prompt with context
            full_prompt = prompt
            if context:
                full_prompt = f"Context: {context}\n\n{prompt}"
            
            # Call Ollama API
            async with httpx.AsyncClient(timeout=300.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": full_prompt,
                        "stream": False
                    }
                )
                response.raise_for_status()
                
                result_data = response.json()
                result = result_data.get("response", "")
                
                return AgentResponse(
                    success=True,
                    result=result,
                    metadata={
                        "model": self.model,
                        "base_url": self.base_url
                    }
                )
        
        except httpx.HTTPError as e:
            logger.error(f"Ollama agent HTTP error: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"Ollama HTTP error: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Ollama agent execution failed: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"Ollama execution failed: {str(e)}"
            )
