"""Local runtime implementation of the transport interface."""

import asyncio
import uuid
from typing import Dict, Any, Optional, AsyncIterator, List
from datetime import datetime
import logging

from app.transport.interface import (
    RuntimeInterface, TaskSubmission, TaskUpdate, TaskResult,
    AgentInfo, SkillInfo, TaskState
)
from app.agents.orchestrator import get_orchestrator
from app.agents.base import AgentResponse
from app.models.database import AgentType

logger = logging.getLogger(__name__)


class LocalRuntime(RuntimeInterface):
    """
    Local runtime implementation.
    
    This implementation runs agents locally without remote orchestration.
    It serves as the baseline implementation and reference for other transports.
    """
    
    def __init__(self):
        """Initialize local runtime."""
        self.orchestrator = get_orchestrator()
        self.active_tasks: Dict[str, TaskResult] = {}
        self.task_queues: Dict[str, asyncio.Queue] = {}
        self._sessions: Dict[str, Dict[str, Any]] = {}
        logger.info("Local runtime initialized")
    
    async def submit_task(self, submission: TaskSubmission) -> TaskResult:
        """Submit a task for local execution."""
        task_id = submission.task_id or str(uuid.uuid4())
        
        logger.info(f"Submitting task {task_id} with agent {submission.agent_type}")
        
        # Validate session if provided
        if submission.session_id and not await self.validate_session(submission.session_id):
            return TaskResult(
                task_id=task_id,
                state=TaskState.FAILED,
                success=False,
                error="Invalid session"
            )
        
        # Create task queue for updates
        self.task_queues[task_id] = asyncio.Queue()
        
        # Initialize task result
        result = TaskResult(
            task_id=task_id,
            state=TaskState.PENDING,
            success=False,
            metadata={"submitted_at": datetime.utcnow().isoformat()}
        )
        self.active_tasks[task_id] = result
        
        # Emit initial update
        await self._emit_update(task_id, TaskState.PENDING, "Task submitted")
        
        # Execute task asynchronously
        asyncio.create_task(self._execute_task(submission))
        
        return result
    
    async def _execute_task(self, submission: TaskSubmission):
        """Execute task in background."""
        task_id = submission.task_id
        start_time = datetime.utcnow()
        
        try:
            # Update to planning state
            await self._emit_update(task_id, TaskState.PLANNING, "Planning execution")
            
            # Map agent type
            try:
                agent_type = AgentType(submission.agent_type.lower())
            except ValueError:
                raise ValueError(f"Unknown agent type: {submission.agent_type}")
            
            # Update to running state
            await self._emit_update(task_id, TaskState.RUNNING, "Executing with agent")
            
            # Execute with orchestrator
            response: AgentResponse = await self.orchestrator.execute_task(
                agent_type=agent_type,
                prompt=submission.prompt,
                context=submission.context
            )
            
            # Calculate execution time
            execution_time = (datetime.utcnow() - start_time).total_seconds()
            
            # Update result
            if response.success:
                result = TaskResult(
                    task_id=task_id,
                    state=TaskState.COMPLETED,
                    success=True,
                    result=response.result,
                    execution_time=execution_time,
                    metadata=response.metadata
                )
                await self._emit_update(task_id, TaskState.COMPLETED, "Task completed successfully")
            else:
                result = TaskResult(
                    task_id=task_id,
                    state=TaskState.FAILED,
                    success=False,
                    error=response.error,
                    execution_time=execution_time,
                    metadata=response.metadata
                )
                await self._emit_update(task_id, TaskState.FAILED, f"Task failed: {response.error}")
            
            self.active_tasks[task_id] = result
            
        except Exception as e:
            logger.error(f"Task {task_id} execution failed: {str(e)}")
            execution_time = (datetime.utcnow() - start_time).total_seconds()
            
            result = TaskResult(
                task_id=task_id,
                state=TaskState.FAILED,
                success=False,
                error=str(e),
                execution_time=execution_time
            )
            self.active_tasks[task_id] = result
            await self._emit_update(task_id, TaskState.FAILED, f"Execution error: {str(e)}")
        
        finally:
            # Close the task queue
            await asyncio.sleep(1)  # Allow final updates to be consumed
            if task_id in self.task_queues:
                await self.task_queues[task_id].put(None)  # Signal end of updates
    
    async def _emit_update(self, task_id: str, state: TaskState, message: str):
        """Emit a task update."""
        if task_id in self.task_queues:
            update = TaskUpdate(
                task_id=task_id,
                state=state,
                timestamp=datetime.utcnow(),
                message=message
            )
            await self.task_queues[task_id].put(update)
    
    async def stream_task_updates(self, task_id: str) -> AsyncIterator[TaskUpdate]:
        """Stream updates for a task."""
        if task_id not in self.task_queues:
            # Task doesn't exist or already completed
            if task_id in self.active_tasks:
                # Return final state
                result = self.active_tasks[task_id]
                yield TaskUpdate(
                    task_id=task_id,
                    state=result.state,
                    timestamp=datetime.utcnow(),
                    message=f"Task in state: {result.state}"
                )
            return
        
        queue = self.task_queues[task_id]
        
        while True:
            update = await queue.get()
            if update is None:  # End of updates
                break
            yield update
    
    async def query_task_state(self, task_id: str) -> TaskResult:
        """Query current task state."""
        if task_id not in self.active_tasks:
            return TaskResult(
                task_id=task_id,
                state=TaskState.FAILED,
                success=False,
                error="Task not found"
            )
        
        return self.active_tasks[task_id]
    
    async def cancel_task(self, task_id: str) -> bool:
        """Cancel a task."""
        if task_id not in self.active_tasks:
            return False
        
        result = self.active_tasks[task_id]
        
        # Can only cancel pending, planning, or running tasks
        if result.state in [TaskState.PENDING, TaskState.PLANNING, TaskState.RUNNING]:
            result.state = TaskState.CANCELLED
            result.success = False
            result.error = "Task cancelled by user"
            
            await self._emit_update(task_id, TaskState.CANCELLED, "Task cancelled")
            
            logger.info(f"Task {task_id} cancelled")
            return True
        
        return False
    
    async def list_agents(self) -> List[AgentInfo]:
        """List available agents."""
        available_agents = self.orchestrator.list_available_agents()
        
        agent_info_map = {
            "claude": AgentInfo(
                agent_type="claude",
                name="Claude",
                description="Anthropic Claude AI assistant",
                available="claude" in available_agents,
                capabilities=["code_generation", "analysis", "conversation"]
            ),
            "auggie": AgentInfo(
                agent_type="auggie",
                name="Auggie",
                description="OpenAI-powered assistant",
                available="auggie" in available_agents,
                capabilities=["code_generation", "analysis", "conversation"]
            ),
            "ollama": AgentInfo(
                agent_type="ollama",
                name="Ollama",
                description="Local LLM via Ollama",
                available="ollama" in available_agents,
                capabilities=["code_generation", "conversation"]
            ),
            "opendevin": AgentInfo(
                agent_type="opendevin",
                name="OpenDevin",
                description="OpenDevin agent",
                available="opendevin" in available_agents,
                capabilities=["code_generation", "system_automation"]
            ),
            "goose": AgentInfo(
                agent_type="goose",
                name="Goose",
                description="Goose agent",
                available="goose" in available_agents,
                capabilities=["code_generation", "system_automation"]
            ),
        }
        
        return list(agent_info_map.values())
    
    async def list_skills(self) -> List[SkillInfo]:
        """List available skills."""
        # For now, return a basic set of skills
        # In future, this would be dynamic based on installed skill packages
        return [
            SkillInfo(
                skill_id="code_generation",
                name="Code Generation",
                description="Generate code based on prompts",
                required_permissions=["write"]
            ),
            SkillInfo(
                skill_id="code_analysis",
                name="Code Analysis",
                description="Analyze code and provide insights",
                required_permissions=["read"]
            ),
            SkillInfo(
                skill_id="documentation",
                name="Documentation",
                description="Generate or update documentation",
                required_permissions=["write"]
            ),
        ]
    
    async def validate_session(self, session_id: str) -> bool:
        """Validate a session."""
        # For local runtime, accept all sessions or create them on demand
        if session_id not in self._sessions:
            self._sessions[session_id] = {
                "created_at": datetime.utcnow(),
                "last_activity": datetime.utcnow()
            }
        else:
            self._sessions[session_id]["last_activity"] = datetime.utcnow()
        
        return True


# Global runtime instance
_local_runtime: Optional[LocalRuntime] = None


def get_local_runtime() -> LocalRuntime:
    """Get global local runtime instance."""
    global _local_runtime
    if _local_runtime is None:
        _local_runtime = LocalRuntime()
    return _local_runtime
