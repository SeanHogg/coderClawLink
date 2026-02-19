"""OpenAI-based agent implementation (for Auggie and other OpenAI-compatible agents)."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
import openai
import logging

logger = logging.getLogger(__name__)


class OpenAIAgent(BaseAgent):
    """Agent implementation for OpenAI and compatible APIs."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize OpenAI agent."""
        super().__init__(config)
        self.api_key = config.get("api_key")
        self.base_url = config.get("base_url")  # Optional for custom endpoints
        self.model = config.get("model", "gpt-4")
        self.client = None
        
        if self.api_key:
            client_kwargs = {"api_key": self.api_key}
            if self.base_url:
                client_kwargs["base_url"] = self.base_url
            self.client = openai.AsyncOpenAI(**client_kwargs)
    
    @property
    def agent_type(self) -> str:
        """Return agent type."""
        return "openai"
    
    def validate_config(self) -> bool:
        """Validate OpenAI configuration."""
        return bool(self.api_key and self.client)
    
    async def execute(self, prompt: str, context: Optional[Dict[str, Any]] = None, file_context: Optional[List[str]] = None, working_directory: Optional[str] = None) -> AgentResponse:
        if not self.validate_config():
            return AgentResponse(
                success=False,
                error="OpenAI agent not properly configured. API key missing."
            )
        
        try:
            # Build system message with context
            system_message = "You are a helpful AI assistant for code generation and project tasks."
            if context:
                system_message += f"\n\nContext: {context}"
            
            # Call OpenAI API
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=4096
            )
            
            result = response.choices[0].message.content
            
            return AgentResponse(
                success=True,
                result=result,
                metadata={
                    "model": self.model,
                    "usage": {
                        "prompt_tokens": response.usage.prompt_tokens,
                        "completion_tokens": response.usage.completion_tokens,
                        "total_tokens": response.usage.total_tokens
                    }
                }
            )
        
        except Exception as e:
            logger.error(f"OpenAI agent execution failed: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"OpenAI execution failed: {str(e)}"
            )


class AuggieAgent(OpenAIAgent):
    """Auggie agent - extends OpenAI agent with custom configuration."""
    
    @property
    def agent_type(self) -> str:
        """Return agent type."""
        return "auggie"
