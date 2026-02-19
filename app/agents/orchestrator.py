"""Agent orchestrator - manages and routes requests to different agents."""

from typing import Dict, Any, Optional, List
from app.agents.base import BaseAgent, AgentResponse
from app.agents.claude_agent import ClaudeAgent
from app.agents.ollama_agent import OllamaAgent
from app.agents.openai_agent import OpenAIAgent, AuggieAgent
from app.agents.http_agent import OpenDevinAgent, GooseAgent
from app.models.database import AgentType
from app.core.config import get_settings
from app.core.file_editor import (
    read_files, build_file_context_prompt, parse_edit_blocks, apply_edits,
)
from app.core.repo_map import generate_repo_map
from app.core.git_commit import auto_commit
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
        context: Optional[Dict[str, Any]] = None,
        file_context: Optional[List[str]] = None,
        working_directory: Optional[str] = None,
    ) -> AgentResponse:
        """
        Execute a task with the specified agent.

        When *file_context* is supplied the orchestrator:
        1. Reads the listed files from disk.
        2. Optionally prepends a repo map for orientation.
        3. Injects file contents + edit instructions into the prompt.
        4. Calls the LLM agent with the enriched prompt.
        5. Parses SEARCH/REPLACE edit blocks from the response.
        6. Applies those edits to disk.
        7. Auto-commits changed files if the directory is a git repo.

        Args:
            agent_type:        Type of agent to use.
            prompt:            Task prompt/instruction.
            context:           Additional context (project, task details, etc.)
            file_context:      List of file paths to include and potentially edit.
            working_directory: Directory used to resolve file paths and for git.

        Returns:
            AgentResponse with result or error.  When edits were applied the
            metadata includes ``edit_result`` and optionally ``commit_sha``.
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

        # ------------------------------------------------------------------ #
        # File-aware pipeline (Aider-style)                                    #
        # ------------------------------------------------------------------ #
        if file_context:
            file_contents = read_files(file_context, working_directory)

            repo_map: Optional[str] = None
            try:
                repo_map = generate_repo_map(working_directory, max_depth=3,
                                             include_symbols=True)
            except Exception:
                pass  # repo map is best-effort

            enriched_prompt = build_file_context_prompt(
                file_contents, prompt, repo_map=repo_map
            )

            response = await agent.execute(enriched_prompt, context)

            if response.success and response.result:
                blocks = parse_edit_blocks(response.result)
                if blocks:
                    edit_result = apply_edits(blocks, working_directory)

                    changed = edit_result.applied + edit_result.created
                    commit_sha = auto_commit(
                        changed,
                        prompt_summary=prompt[:72],
                        working_directory=working_directory,
                    )

                    meta = dict(response.metadata or {})
                    meta["edit_result"] = {
                        "applied": edit_result.applied,
                        "created": edit_result.created,
                        "skipped": edit_result.skipped,
                    }
                    if commit_sha:
                        meta["commit_sha"] = commit_sha

                    return AgentResponse(
                        success=True,
                        result=response.result,
                        metadata=meta,
                    )

            return response

        # ------------------------------------------------------------------ #
        # Plain execution (no file context)                                    #
        # ------------------------------------------------------------------ #
        return await agent.execute(prompt, context)


# Global orchestrator instance
_orchestrator: Optional[AgentOrchestrator] = None


def get_orchestrator() -> AgentOrchestrator:
    """Get global orchestrator instance."""
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = AgentOrchestrator()
    return _orchestrator
