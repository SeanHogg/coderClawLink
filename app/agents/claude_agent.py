"""Claude agent implementation using Anthropic API."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
import anthropic
import logging

logger = logging.getLogger(__name__)


class ClaudeAgent(BaseAgent):
    """Agent implementation for Claude (Anthropic)."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize Claude agent."""
        super().__init__(config)
        self.api_key = config.get("api_key")
        self.model = config.get("model", "claude-3-5-sonnet-20241022")
        self.client = None
        
        if self.api_key:
            self.client = anthropic.AsyncAnthropic(api_key=self.api_key)
    
    @property
    def agent_type(self) -> str:
        """Return agent type."""
        return "claude"
    
    def validate_config(self) -> bool:
        """Validate Claude configuration."""
        return bool(self.api_key and self.client)
    
    async def execute(self, prompt: str, context: Optional[Dict[str, Any]] = None, file_context: Optional[List[str]] = None, working_directory: Optional[str] = None) -> AgentResponse:
        """Execute Claude agent with prompt."""
        if not self.validate_config():
            return AgentResponse(
                success=False,
                error="Claude agent not properly configured. API key missing."
            )
        
        try:
            # Build system message with context
            system_message = "You are a helpful AI assistant for code generation and project tasks."
            if context:
                system_message += f"\n\nContext: {context}"
            
            # Call Claude API
            message = await self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                system=system_message,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            result = message.content[0].text
            
            return AgentResponse(
                success=True,
                result=result,
                metadata={
                    "model": self.model,
                    "usage": {
                        "input_tokens": message.usage.input_tokens,
                        "output_tokens": message.usage.output_tokens
                    }
                }
            )
        
        except Exception as e:
            logger.error(f"Claude agent execution failed: {str(e)}")
            return AgentResponse(
                success=False,
                error=f"Claude execution failed: {str(e)}"
            )
