"""Local runtime implementation for CoderClawLink.

Provides an in-process task orchestrator for development and single-node
deployments. Supports ChatGPT-style conversational AI, Replit-style code
execution, and multi-agent orchestration.
"""

from __future__ import annotations

import asyncio
from typing import Dict, List, Optional

from .interface import (
    AgentInfo,
    SkillInfo,
    TaskResult,
    TaskState,
    TaskSubmission,
)


class TaskOrchestrator:
    """Simple task orchestrator that manages in-process task execution."""

    def __init__(self) -> None:
        self._task_registry: Dict[str, TaskResult] = {}

    async def run(self, submission: TaskSubmission) -> None:
        """Execute a submitted task asynchronously."""
        task_id = submission.task_id
        self._task_registry[task_id] = TaskResult(
            task_id=task_id,
            state=TaskState.PLANNING,
        )
        await asyncio.sleep(0)  # yield to event loop

        # Simulate lightweight execution
        try:
            self._task_registry[task_id] = TaskResult(
                task_id=task_id,
                state=TaskState.RUNNING,
            )
            await asyncio.sleep(0)
            self._task_registry[task_id] = TaskResult(
                task_id=task_id,
                state=TaskState.COMPLETED,
                success=True,
                result=f"Task '{task_id}' completed by {submission.agent_type}.",
            )
        except Exception as exc:  # noqa: BLE001
            self._task_registry[task_id] = TaskResult(
                task_id=task_id,
                state=TaskState.FAILED,
                success=False,
                error=str(exc),
            )

    def get_state(self, task_id: str) -> Optional[TaskResult]:
        return self._task_registry.get(task_id)


# ---------------------------------------------------------------------------
# Available agents and skills
# ---------------------------------------------------------------------------

_AGENTS: List[AgentInfo] = [
    AgentInfo(
        agent_type='claude',
        name='Claude (Anthropic)',
        available=True,
        description='Conversational AI assistant for code generation and analysis.',
    ),
    AgentInfo(
        agent_type='openai',
        name='GPT-4 (OpenAI)',
        available=True,
        description='Generative AI for natural-language interaction and code writing.',
    ),
    AgentInfo(
        agent_type='ollama',
        name='Ollama (local)',
        available=True,
        description='Local LLM runtime for offline and privacy-sensitive tasks.',
    ),
]

_SKILLS: List[SkillInfo] = [
    SkillInfo(
        skill_id='code_generation',
        name='Code Generation',
        description='Generate code from natural-language prompts.',
        required_permissions=['task_submit'],
    ),
    SkillInfo(
        skill_id='code_analysis',
        name='Code Analysis',
        description='Analyse code for bugs, style issues, and improvement suggestions.',
        required_permissions=['task_submit'],
    ),
    SkillInfo(
        skill_id='code_debugging',
        name='Code Debugging',
        description='Identify and fix errors in code.',
        required_permissions=['task_submit'],
    ),
    SkillInfo(
        skill_id='natural_language',
        name='Natural-Language Interaction',
        description='Conversational responses and text generation.',
        required_permissions=['task_submit'],
    ),
    SkillInfo(
        skill_id='content_generation',
        name='Content Generation',
        description='Write essays, reports, summaries, and creative content.',
        required_permissions=['task_submit'],
    ),
    SkillInfo(
        skill_id='github_integration',
        name='GitHub Integration',
        description='Interact with GitHub repositories, PRs, and issues.',
        required_permissions=['integration_read'],
    ),
]


class LocalRuntime:
    """Local single-process runtime that satisfies the transport interface."""

    def __init__(self) -> None:
        self.orchestrator = TaskOrchestrator()
        self.active_tasks: Dict[str, TaskResult] = {}

    async def list_agents(self) -> List[AgentInfo]:
        """Return all registered agent types."""
        return list(_AGENTS)

    async def list_skills(self) -> List[SkillInfo]:
        """Return all available skills."""
        return list(_SKILLS)

    async def submit_task(self, submission: TaskSubmission) -> TaskResult:
        """Submit a task for execution. Returns immediately with PENDING state."""
        pending = TaskResult(task_id=submission.task_id, state=TaskState.PENDING)
        self.active_tasks[submission.task_id] = pending
        # Fire-and-forget execution
        asyncio.create_task(self._execute(submission))
        return pending

    async def _execute(self, submission: TaskSubmission) -> None:
        await self.orchestrator.run(submission)
        state = self.orchestrator.get_state(submission.task_id)
        if state is not None:
            self.active_tasks[submission.task_id] = state

    async def query_task_state(self, task_id: str) -> TaskResult:
        """Query the current state of a previously submitted task."""
        cached = self.active_tasks.get(task_id)
        if cached is not None:
            # Check if orchestrator has a more up-to-date state
            orchestrated = self.orchestrator.get_state(task_id)
            if orchestrated is not None:
                self.active_tasks[task_id] = orchestrated
                return orchestrated
            return cached
        return TaskResult(task_id=task_id, state=TaskState.PENDING)


_local_runtime: Optional[LocalRuntime] = None


def get_local_runtime() -> LocalRuntime:
    """Return the shared LocalRuntime singleton."""
    global _local_runtime
    if _local_runtime is None:
        _local_runtime = LocalRuntime()
    return _local_runtime
