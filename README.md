
# coderClawLink

A telegram-aware agentic portal for project management and code generation through multiple AI agents. Connect to GitHub repositories and create pull requests directly from the platform.

## 🌟 Features

- **Web Interface**: Modern project and task management UI with Kanban boards
- **Telegram Bot Integration**: Interact with projects and agents via Telegram
- **Multi-Agent Support**: Execute tasks with different AI agents:
  - 🤖 Auggie (OpenAI-based)
  - 🧠 Claude (Anthropic)
  - 🔨 OpenDevin
  - 🦆 Goose
  - 🦙 Ollama (local LLM)
- **GitHub Integration**: Connect projects to repositories and create PRs automatically
- **Prompt-based Communication**: Natural language interaction with projects
- **Task Tracking**: Full CRUD operations for tasks with status tracking

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Git
- (Optional) Telegram Bot Token
- (Optional) GitHub Token
- (Optional) API keys for agents (Anthropic, OpenAI, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SeanHogg/AI-Agent-Orchestrator-.git
cd AI-Agent-Orchestrator-
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Database
DATABASE_URL=sqlite+aiosqlite:///./portal.db

# Telegram Bot (get token from @BotFather)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# GitHub (create personal access token)
GITHUB_TOKEN=your_github_token_here

# Agent API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Ollama (if running locally)
OLLAMA_BASE_URL=http://localhost:11434

# Server
API_HOST=0.0.0.0
API_PORT=8000
```

5. Run the application:
```bash
python -m app.main
```

6. Open your browser to `http://localhost:8000`

## 📱 Telegram Bot Usage

### Getting Started

1. Open Telegram and search for your bot
2. Start a conversation with `/start`
3. Use the following commands:

### Available Commands

- `/start` or `/help` - Show help message
- `/projects` - List all projects
- `/create_project <key> <name>` - Create a new project
- `/tasks <project_key>` - List tasks for a project
- `/create_task <project_key> <title>` - Create a new task
- `/execute <task_key> <agent_type>` - Execute task with an agent
- `/agents` - List available agents

### Example Workflow

```
/create_project DEMO Demo Project
/create_task DEMO Implement login feature
/execute DEMO-1 claude
```

You can also send direct messages to chat with agents when the chat is linked to a project.

## 🌐 Web Interface

### Projects View

- View all projects in a card grid
- Create new projects with GitHub integration
- Quick access to project tasks

### Tasks Board (Kanban)

- Drag-and-drop task management (To Do, In Progress, In Review, Done)
- Filter tasks by project
- Create and assign tasks to agents
- View task details and execution history

### Agents View

- See all supported agent types
- Check which agents are configured and available
- Visual status indicators

## 🔗 GitHub Integration

### Connecting a Project to GitHub

1. When creating a project, provide the GitHub repository URL
2. Ensure your `GITHUB_TOKEN` has appropriate permissions

### Creating Pull Requests

From a task detail view:
1. Click "Create PR" button
2. The system will:
   - Create a new branch (`task/{task-key}`)
   - Open a pull request to the main branch
   - Link the PR to the task

## 🤖 Agent Configuration

### Claude (Anthropic)

```env
ANTHROPIC_API_KEY=sk-ant-xxx
```

### Auggie (OpenAI)

```env
OPENAI_API_KEY=sk-xxx
```

### Ollama (Local)

1. Install Ollama: https://ollama.ai
2. Pull a model: `ollama pull codellama`
3. Configure URL in `.env`:
```env
OLLAMA_BASE_URL=http://localhost:11434
```

### OpenDevin / Goose

Configure the API endpoints:
```env
OPENDEVIN_API_URL=http://localhost:3000
GOOSE_API_URL=http://localhost:8000
```

## 📊 API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Key Endpoints

- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `POST /api/tasks/execute` - Execute task with agent
- `POST /api/tasks/{task_id}/create_pr` - Create GitHub PR
- `GET /api/agents/available` - List configured agents

## 🏗️ Architecture

```
┌─────────────┐
│   Telegram  │◄────┐
│     Bot     │     │
└─────────────┘     │
                    │
┌─────────────┐     │      ┌──────────────┐
│     Web     │◄────┼─────►│   FastAPI    │
│   Frontend  │     │      │   Backend    │
└─────────────┘     │      └──────┬───────┘
                    │             │
                    │             ├─► SQLite DB
                    │             │
┌─────────────┐     │             ├─► Agent Orchestrator
│   GitHub    │◄────┘             │   ├─► Claude
│     API     │                   │   ├─► Auggie
└─────────────┘                   │   ├─► Ollama
                                  │   ├─► OpenDevin
                                  │   └─► Goose
                                  │
                                  └─► GitHub Integration
```

## 🛠️ Development

### Project Structure

```
app/
├── agents/           # Agent implementations
│   ├── base.py       # Base agent interface
│   ├── claude_agent.py
│   ├── ollama_agent.py
│   ├── openai_agent.py
│   ├── http_agent.py
│   └── orchestrator.py
├── api/              # FastAPI routes
│   ├── projects.py
│   ├── tasks.py
│   └── agents.py
├── core/             # Core configuration
│   ├── config.py
│   └── database.py
├── github_integration/ # GitHub API client
│   └── client.py
├── models/           # Database models and schemas
│   ├── database.py
│   └── schemas.py
├── static/           # Frontend assets
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── telegram_bot/     # Telegram bot
│   └── bot.py
└── main.py           # Application entry point
```

### Running Tests

```bash
# TODO: Add tests
pytest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Task comments and activity history
- [ ] File uploads and attachments
- [ ] Advanced agent configuration
- [ ] Custom agent workflows
- [ ] Integration with more messaging services (chat platforms, etc.)
- [ ] Analytics and reporting dashboard

## 💬 Support
