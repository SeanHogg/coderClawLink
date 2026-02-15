"""Telegram bot for project interaction."""

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes
)
from typing import Optional
from app.core.config import get_settings
from app.core.database import AsyncSessionLocal
from app.models.database import Project, Task, AgentType, TaskStatus
from app.agents.orchestrator import get_orchestrator
from app.github_integration.client import get_github_integration
from sqlalchemy import select
import logging

logger = logging.getLogger(__name__)


class TelegramBot:
    """Telegram bot for portal interaction."""
    
    def __init__(self):
        """Initialize Telegram bot."""
        self.settings = get_settings()
        self.app = None
        self.orchestrator = get_orchestrator()
        self.github = get_github_integration()
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command."""
        await update.message.reply_text(
            "🤖 Welcome to AI Agent Orchestrator Portal!\n\n"
            "Available commands:\n"
            "/projects - List all projects\n"
            "/create_project <key> <name> - Create a new project\n"
            "/tasks <project_key> - List tasks for a project\n"
            "/create_task <project_key> <title> - Create a new task\n"
            "/execute <task_key> <agent_type> - Execute task with agent\n"
            "/agents - List available agents\n"
            "/help - Show this message"
        )
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /help command."""
        await self.start_command(update, context)
    
    async def projects_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /projects command - list all projects."""
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(Project))
            projects = result.scalars().all()
            
            if not projects:
                await update.message.reply_text("No projects found. Create one with /create_project")
                return
            
            message = "📋 Projects:\n\n"
            for project in projects:
                message += f"• [{project.key}] {project.name} - {project.status.value}\n"
                if project.github_repo_url:
                    message += f"  GitHub: {project.github_repo_url}\n"
            
            await update.message.reply_text(message)
    
    async def create_project_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /create_project command."""
        if len(context.args) < 2:
            await update.message.reply_text(
                "Usage: /create_project <key> <name>\n"
                "Example: /create_project PROJ My Project"
            )
            return
        
        project_key = context.args[0].upper()
        project_name = " ".join(context.args[1:])
        
        async with AsyncSessionLocal() as session:
            # Check if project exists
            result = await session.execute(
                select(Project).where(Project.key == project_key)
            )
            existing = result.scalar_one_or_none()
            
            if existing:
                await update.message.reply_text(f"Project with key '{project_key}' already exists!")
                return
            
            # Create project
            project = Project(
                name=project_name,
                key=project_key,
                telegram_chat_id=str(update.effective_chat.id)
            )
            session.add(project)
            await session.commit()
            
            await update.message.reply_text(
                f"✅ Created project [{project_key}] {project_name}\n"
                f"Use /tasks {project_key} to view tasks"
            )
    
    async def tasks_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /tasks command - list tasks for a project."""
        if len(context.args) < 1:
            await update.message.reply_text("Usage: /tasks <project_key>")
            return
        
        project_key = context.args[0].upper()
        
        async with AsyncSessionLocal() as session:
            # Get project
            result = await session.execute(
                select(Project).where(Project.key == project_key)
            )
            project = result.scalar_one_or_none()
            
            if not project:
                await update.message.reply_text(f"Project '{project_key}' not found!")
                return
            
            # Get tasks
            result = await session.execute(
                select(Task).where(Task.project_id == project.id)
            )
            tasks = result.scalars().all()
            
            if not tasks:
                await update.message.reply_text(
                    f"No tasks found for project {project_key}.\n"
                    f"Create one with /create_task {project_key} <title>"
                )
                return
            
            message = f"📝 Tasks for [{project_key}]:\n\n"
            for task in tasks:
                status_emoji = {
                    TaskStatus.TODO: "⚪",
                    TaskStatus.IN_PROGRESS: "🔵",
                    TaskStatus.IN_REVIEW: "🟡",
                    TaskStatus.DONE: "🟢",
                    TaskStatus.BLOCKED: "🔴"
                }.get(task.status, "⚪")
                
                message += f"{status_emoji} [{task.key}] {task.title}\n"
                if task.assigned_agent_type:
                    message += f"   Agent: {task.assigned_agent_type.value}\n"
                if task.github_pr_url:
                    message += f"   PR: {task.github_pr_url}\n"
            
            await update.message.reply_text(message)
    
    async def create_task_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /create_task command."""
        if len(context.args) < 2:
            await update.message.reply_text(
                "Usage: /create_task <project_key> <title>\n"
                "Example: /create_task PROJ Implement login feature"
            )
            return
        
        project_key = context.args[0].upper()
        task_title = " ".join(context.args[1:])
        
        async with AsyncSessionLocal() as session:
            # Get project
            result = await session.execute(
                select(Project).where(Project.key == project_key)
            )
            project = result.scalar_one_or_none()
            
            if not project:
                await update.message.reply_text(f"Project '{project_key}' not found!")
                return
            
            # Get next task number
            result = await session.execute(
                select(Task).where(Task.project_id == project.id)
            )
            existing_tasks = result.scalars().all()
            task_number = len(existing_tasks) + 1
            
            # Create task
            task = Task(
                project_id=project.id,
                key=f"{project_key}-{task_number}",
                title=task_title
            )
            session.add(task)
            await session.commit()
            
            await update.message.reply_text(
                f"✅ Created task [{task.key}] {task_title}\n"
                f"Execute with: /execute {task.key} <agent_type>"
            )
    
    async def agents_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /agents command - list available agents."""
        available = self.orchestrator.list_available_agents()
        
        if not available:
            await update.message.reply_text("No agents are currently configured.")
            return
        
        message = "🤖 Available agents:\n\n"
        for agent_type in available:
            message += f"• {agent_type}\n"
        
        message += "\nUse with: /execute <task_key> <agent_type>"
        await update.message.reply_text(message)
    
    async def execute_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /execute command - execute task with agent."""
        if len(context.args) < 2:
            await update.message.reply_text(
                "Usage: /execute <task_key> <agent_type>\n"
                "Example: /execute PROJ-1 claude"
            )
            return
        
        task_key = context.args[0].upper()
        agent_type_str = context.args[1].lower()
        
        # Validate agent type
        try:
            agent_type = AgentType(agent_type_str)
        except ValueError:
            await update.message.reply_text(
                f"Invalid agent type '{agent_type_str}'.\n"
                f"Use /agents to see available agents."
            )
            return
        
        async with AsyncSessionLocal() as session:
            # Get task
            result = await session.execute(
                select(Task).where(Task.key == task_key)
            )
            task = result.scalar_one_or_none()
            
            if not task:
                await update.message.reply_text(f"Task '{task_key}' not found!")
                return
            
            # Get project
            result = await session.execute(
                select(Project).where(Project.id == task.project_id)
            )
            project = result.scalar_one_or_none()
            
            await update.message.reply_text(
                f"🚀 Executing task [{task_key}] with {agent_type.value} agent...\n"
                f"This may take a few moments."
            )
            
            # Build context for task execution
            task_execution_context = {
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
            
            # Execute with agent
            prompt = f"Task: {task.title}\n\nDescription: {task.description or 'No description provided.'}\n\nGenerate code or solution for this task."
            
            response = await self.orchestrator.execute_task(
                agent_type=agent_type,
                prompt=prompt,
                context=task_execution_context
            )
            
            if response.success:
                # Update task
                task.assigned_agent_type = agent_type
                task.agent_execution_status = "completed"
                task.status = TaskStatus.IN_REVIEW
                await session.commit()
                
                result_preview = response.result[:500] if response.result else "No result"
                await update.message.reply_text(
                    f"✅ Task [{task_key}] executed successfully!\n\n"
                    f"Result preview:\n{result_preview}..."
                )
            else:
                await update.message.reply_text(
                    f"❌ Task execution failed:\n{response.error}"
                )
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle general messages (prompt-based interaction)."""
        message_text = update.message.text
        chat_id = str(update.effective_chat.id)
        
        # Check if chat is linked to a project
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(Project).where(Project.telegram_chat_id == chat_id)
            )
            project = result.scalar_one_or_none()
            
            if not project:
                await update.message.reply_text(
                    "This chat is not linked to a project. Use /create_project first."
                )
                return
            
            # Use default agent (Claude if available, otherwise first available)
            available_agents = self.orchestrator.list_available_agents()
            if not available_agents:
                await update.message.reply_text("No agents are configured.")
                return
            
            agent_type_str = "claude" if "claude" in available_agents else available_agents[0]
            agent_type = AgentType(agent_type_str)
            
            await update.message.reply_text(f"🤖 Processing with {agent_type.value}...")
            
            # Execute prompt with agent
            prompt_context = {
                "project": {
                    "key": project.key,
                    "name": project.name
                }
            }
            
            response = await self.orchestrator.execute_task(
                agent_type=agent_type,
                prompt=message_text,
                context=prompt_context
            )
            
            if response.success:
                result_text = response.result[:4000] if response.result else "No result"
                await update.message.reply_text(result_text)
            else:
                await update.message.reply_text(f"❌ Error: {response.error}")
    
    def setup_handlers(self):
        """Setup command and message handlers."""
        self.app.add_handler(CommandHandler("start", self.start_command))
        self.app.add_handler(CommandHandler("help", self.help_command))
        self.app.add_handler(CommandHandler("projects", self.projects_command))
        self.app.add_handler(CommandHandler("create_project", self.create_project_command))
        self.app.add_handler(CommandHandler("tasks", self.tasks_command))
        self.app.add_handler(CommandHandler("create_task", self.create_task_command))
        self.app.add_handler(CommandHandler("agents", self.agents_command))
        self.app.add_handler(CommandHandler("execute", self.execute_command))
        
        # Handle general messages
        self.app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
    
    async def start(self):
        """Start the bot."""
        if not self.settings.telegram_bot_token:
            logger.error("Telegram bot token not configured")
            return
        
        self.app = Application.builder().token(self.settings.telegram_bot_token).build()
        self.setup_handlers()
        
        logger.info("Starting Telegram bot...")
        await self.app.initialize()
        await self.app.start()
        await self.app.updater.start_polling()
    
    async def stop(self):
        """Stop the bot."""
        if self.app:
            await self.app.updater.stop()
            await self.app.stop()
            await self.app.shutdown()


# Global bot instance
_bot: Optional[TelegramBot] = None


def get_bot() -> TelegramBot:
    """Get global bot instance."""
    global _bot
    if _bot is None:
        _bot = TelegramBot()
    return _bot
