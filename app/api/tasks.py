"""API routes for tasks."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.database import Task, Project, AgentExecution
from app.models.schemas import TaskCreate, TaskUpdate, TaskResponse, AgentExecutionRequest, AgentExecutionResponse
from app.agents.orchestrator import get_orchestrator
from app.github_integration.client import get_github_integration

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=List[TaskResponse])
async def list_tasks(
    project_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    """List all tasks, optionally filtered by project."""
    query = select(Task)
    
    if project_id:
        query = query.where(Task.project_id == project_id)
    
    result = await db.execute(query)
    tasks = result.scalars().all()
    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific task."""
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task


@router.post("", response_model=TaskResponse, status_code=201)
async def create_task(
    task_data: TaskCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new task."""
    # Verify project exists
    result = await db.execute(select(Project).where(Project.id == task_data.project_id))
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Get next task number for this project
    result = await db.execute(select(Task).where(Task.project_id == task_data.project_id))
    existing_tasks = result.scalars().all()
    task_number = len(existing_tasks) + 1
    
    # Create task
    task = Task(
        project_id=task_data.project_id,
        key=f"{project.key}-{task_number}",
        title=task_data.title,
        description=task_data.description,
        status=task_data.status,
        priority=task_data.priority,
        assigned_agent_type=task_data.assigned_agent_type
    )
    
    db.add(task)
    await db.commit()
    await db.refresh(task)
    
    return task


@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update a task."""
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update fields
    update_data = task_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    await db.commit()
    await db.refresh(task)
    
    return task


@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    """Delete a task."""
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    await db.delete(task)
    await db.commit()


@router.post("/execute", response_model=AgentExecutionResponse)
async def execute_task(
    execution_request: AgentExecutionRequest,
    db: AsyncSession = Depends(get_db)
):
    """Execute a task with an agent."""
    # Get task
    result = await db.execute(select(Task).where(Task.id == execution_request.task_id))
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Get project
    result = await db.execute(select(Project).where(Project.id == task.project_id))
    project = result.scalar_one_or_none()
    
    # Create execution record
    execution = AgentExecution(
        task_id=task.id,
        agent_type=execution_request.agent_type,
        prompt=execution_request.prompt,
        status="running"
    )
    db.add(execution)
    await db.commit()
    
    try:
        # Build context
        context = {
            "project": {
                "key": project.key,
                "name": project.name,
                "github_repo": project.github_repo_url
            },
            "task": {
                "key": task.key,
                "title": task.title,
                "description": task.description
            }
        }
        
        # Execute with orchestrator
        orchestrator = get_orchestrator()
        response = await orchestrator.execute_task(
            agent_type=execution_request.agent_type,
            prompt=execution_request.prompt,
            context=context
        )
        
        # Update execution
        if response.success:
            execution.response = response.result
            execution.status = "completed"
            task.assigned_agent_type = execution_request.agent_type
            task.agent_execution_status = "completed"
        else:
            execution.error_message = response.error
            execution.status = "failed"
        
        execution.completed_at = datetime.utcnow()
        
        await db.commit()
        await db.refresh(execution)
        
        return execution
    
    except Exception as e:
        execution.status = "failed"
        execution.error_message = str(e)
        execution.completed_at = datetime.utcnow()
        await db.commit()
        raise HTTPException(status_code=500, detail=f"Execution failed: {str(e)}")


@router.post("/{task_id}/create_pr")
async def create_pr_for_task(
    task_id: int,
    title: Optional[str] = None,
    body: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """Create a GitHub PR for a task."""
    # Get task
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Get project
    result = await db.execute(select(Project).where(Project.id == task.project_id))
    project = result.scalar_one_or_none()
    
    if not project.github_repo_owner or not project.github_repo_name:
        raise HTTPException(status_code=400, detail="Project not connected to GitHub repository")
    
    # Create branch name
    branch_name = f"task/{task.key.lower()}"
    task.github_branch_name = branch_name
    
    # Create PR
    github = get_github_integration()
    
    pr_title = title or f"[{task.key}] {task.title}"
    pr_body = body or f"Automated PR for task {task.key}\n\n{task.description or ''}"
    
    # Create branch first
    branch_created = await github.create_branch(
        owner=project.github_repo_owner,
        repo_name=project.github_repo_name,
        branch_name=branch_name
    )
    
    if not branch_created:
        raise HTTPException(status_code=500, detail="Failed to create branch")
    
    # Create PR
    pr_info = await github.create_pull_request(
        owner=project.github_repo_owner,
        repo_name=project.github_repo_name,
        title=pr_title,
        body=pr_body,
        head_branch=branch_name
    )
    
    if not pr_info:
        raise HTTPException(status_code=500, detail="Failed to create pull request")
    
    # Update task with PR info
    task.github_pr_url = pr_info["url"]
    task.github_pr_number = pr_info["number"]
    
    await db.commit()
    
    return {
        "success": True,
        "pr_url": pr_info["url"],
        "pr_number": pr_info["number"],
        "branch_name": branch_name
    }
