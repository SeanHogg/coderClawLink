"""Database models for the portal."""

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()


class ProjectStatus(str, enum.Enum):
    """Project status enumeration."""
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"
    ON_HOLD = "on_hold"


class TaskStatus(str, enum.Enum):
    """Task status enumeration - Phase 1 compatibility."""
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = "in_review"
    DONE = "done"
    BLOCKED = "blocked"


class ExecutionState(str, enum.Enum):
    """
    Execution state for distributed task lifecycle (Phase 2).
    
    State machine:
    PENDING -> PLANNING -> RUNNING -> (WAITING) -> COMPLETED/FAILED/CANCELLED
    """
    PENDING = "pending"
    PLANNING = "planning"
    RUNNING = "running"
    WAITING = "waiting"
    FAILED = "failed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class TaskPriority(str, enum.Enum):
    """Task priority enumeration."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AgentType(str, enum.Enum):
    """Supported agent types."""
    AUGGIE = "auggie"
    CLAUDE = "claude"
    OPENDEVIN = "opendevin"
    GOOSE = "goose"
    OLLAMA = "ollama"


class Project(Base):
    """Project model - similar to Jira projects."""
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    key = Column(String(50), unique=True, nullable=False, index=True)  # e.g., "PROJ"
    description = Column(Text)
    status = Column(SQLEnum(ProjectStatus), default=ProjectStatus.ACTIVE)
    
    # GitHub integration
    github_repo_url = Column(String(500))
    github_repo_owner = Column(String(255))
    github_repo_name = Column(String(255))
    
    # Telegram
    telegram_chat_id = Column(String(255))
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")


class Task(Base):
    """Task/Issue model - similar to Jira issues."""
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    key = Column(String(50), unique=True, nullable=False, index=True)  # e.g., "PROJ-123"
    title = Column(String(500), nullable=False)
    description = Column(Text)
    
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.TODO)
    priority = Column(SQLEnum(TaskPriority), default=TaskPriority.MEDIUM)
    
    # Agent assignment
    assigned_agent_type = Column(SQLEnum(AgentType))
    agent_execution_status = Column(String(100))
    
    # GitHub PR info
    github_pr_url = Column(String(500))
    github_pr_number = Column(Integer)
    github_branch_name = Column(String(255))
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
    executions = relationship("AgentExecution", back_populates="task", cascade="all, delete-orphan")


class AgentExecution(Base):
    """Track agent execution history with Phase 2 distributed lifecycle."""
    __tablename__ = "agent_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False)
    
    # Phase 2: Globally unique execution ID
    execution_uuid = Column(String(36), unique=True, nullable=True, index=True)
    
    agent_type = Column(SQLEnum(AgentType), nullable=False)
    prompt = Column(Text, nullable=False)
    response = Column(Text)
    
    # Phase 2: Use ExecutionState for distributed lifecycle
    status = Column(String(50))  # backward compatibility: pending, running, completed, failed
    execution_state = Column(SQLEnum(ExecutionState), nullable=True)
    
    error_message = Column(Text)
    
    # Phase 2: Enhanced tracking
    session_id = Column(String(36), nullable=True, index=True)
    user_id = Column(String(255), nullable=True, index=True)
    
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    # Relationships
    task = relationship("Task", back_populates="executions")
    events = relationship("ExecutionEvent", back_populates="execution", cascade="all, delete-orphan")


class ExecutionEvent(Base):
    """
    Auditable event history for executions (Phase 2).
    
    Provides structured logs and event tracking for distributed execution.
    """
    __tablename__ = "execution_events"
    
    id = Column(Integer, primary_key=True, index=True)
    execution_id = Column(Integer, ForeignKey("agent_executions.id"), nullable=False)
    
    event_type = Column(String(50), nullable=False)  # state_change, progress, log, error
    event_state = Column(SQLEnum(ExecutionState), nullable=True)
    
    message = Column(Text)
    progress = Column(Integer)  # 0-100
    
    event_metadata = Column(Text)  # JSON metadata (renamed from 'metadata' to avoid SQLAlchemy conflict)
    
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    execution = relationship("AgentExecution", back_populates="events")
