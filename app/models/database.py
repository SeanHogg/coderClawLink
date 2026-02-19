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
    """Task status enumeration."""
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = "in_review"
    DONE = "done"
    BLOCKED = "blocked"


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
    """Project model for organizing tasks and issues."""
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
    """Task/Issue model for tracking work items."""
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
    """Track agent execution history."""
    __tablename__ = "agent_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False)
    
    agent_type = Column(SQLEnum(AgentType), nullable=False)
    prompt = Column(Text, nullable=False)
    response = Column(Text)
    
    status = Column(String(50))  # pending, running, completed, failed
    error_message = Column(Text)
    
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    # Relationships
    task = relationship("Task", back_populates="executions")
