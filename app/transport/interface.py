"""Transport layer interface definitions for CoderClawLink.

Defines the abstractions used by runtime implementations to submit tasks
and query their execution state.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, Optional


class TaskState(Enum):
    PENDING = 'pending'
    PLANNING = 'planning'
    RUNNING = 'running'
    COMPLETED = 'completed'
    FAILED = 'failed'
    CANCELLED = 'cancelled'


@dataclass
class TaskSubmission:
    task_id: str
    agent_type: str
    prompt: str
    context: Optional[Dict[str, Any]] = None
    session_id: Optional[str] = None
    user_identity: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class TaskResult:
    task_id: str
    state: TaskState
    result: Optional[str] = None
    error: Optional[str] = None
    success: bool = False
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class AgentInfo:
    agent_type: str
    name: str
    available: bool = True
    description: Optional[str] = None


@dataclass
class SkillInfo:
    skill_id: str
    name: str
    description: Optional[str] = None
    required_permissions: list = field(default_factory=list)
