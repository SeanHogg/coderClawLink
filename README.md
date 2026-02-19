
# coderClawLink

**Phase 2: Distributed AI Node with Transport Abstraction**

A secure, distributed AI-native development runtime that transforms from a basic productivity portal into a networked AI node capable of remote orchestration. Connect to GitHub repositories, execute multi-agent tasks, and maintain enterprise-grade security and audit trails.

## 🌟 Features

### Phase 1: Core Intelligence
- **Jira-like Web Interface**: Modern project and task management UI with Kanban boards
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

### Phase 2: Distributed AI Node ✨ NEW
- **Transport Abstraction Layer**: Pluggable adapter pattern for any protocol (HTTP, WebSocket, CLI, clawlink)
- **Remote Orchestration**: Secure remote command execution with multi-session isolation
- **Distributed Task Lifecycle**: UUID-based tasks with state machine (PENDING → PLANNING → RUNNING → WAITING → COMPLETED/FAILED/CANCELLED)
- **Identity & Security**: Session-based authentication, RBAC, device-level trust
- **Enterprise Readiness**: Comprehensive audit logging, activity tracking, permission management
- **Skill Ecosystem**: Discoverable skills with permission requirements

## 🏗️ Architecture

See [PHASE2.md](PHASE2.md) for detailed Phase 2 architecture documentation.

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

### Phase 1 Endpoints (Project Management)

- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `POST /api/tasks/execute` - Execute task with agent
- `POST /api/tasks/{task_id}/create_pr` - Create GitHub PR
- `GET /api/agents/available` - List configured agents

### Phase 2 Endpoints (Distributed Runtime) ✨ NEW

**Session Management:**
- `POST /api/runtime/sessions` - Create session
- `GET /api/runtime/sessions/{session_id}` - Get session info

**Task Execution:**
- `POST /api/runtime/tasks/submit` - Submit task through transport layer
- `GET /api/runtime/tasks/{task_id}/state` - Query task state
- `POST /api/runtime/tasks/{task_id}/cancel` - Cancel running task

**Discovery:**
- `GET /api/runtime/agents` - List available agents
- `GET /api/runtime/skills` - List available skills

**Audit & Compliance:**
- `GET /api/audit/events` - Query audit events (requires admin)
- `GET /api/audit/users/{user_id}/activity` - User activity history
- `GET /api/audit/sessions/{session_id}/activity` - Session activity

### Phase 2 Example Usage

```python
# Create a session
response = requests.post("http://localhost:8000/api/runtime/sessions", json={
    "user_id": "user@example.com",
    "device_id": "device-123"
})
session_id = response.json()["session_id"]

# Submit a task
response = requests.post("http://localhost:8000/api/runtime/tasks/submit", json={
    "agent_type": "claude",
    "prompt": "Create a login component",
    "session_id": session_id,
    "context": {"project": "my-app"}
})
task_id = response.json()["task_id"]

# Query task state
response = requests.get(f"http://localhost:8000/api/runtime/tasks/{task_id}/state")
state = response.json()
print(f"Task state: {state['state']}")
```

Or use the provided demo:
```bash
python -m examples.phase2_demo
```

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
├── agents/              # Agent implementations
│   ├── base.py          # Base agent interface
│   ├── claude_agent.py
│   ├── ollama_agent.py
│   ├── openai_agent.py
│   ├── http_agent.py
│   └── orchestrator.py
├── api/                 # FastAPI routes
│   ├── projects.py      # Phase 1: Project management
│   ├── tasks.py         # Phase 1: Task management
│   ├── agents.py        # Phase 1: Agent discovery
│   ├── runtime.py       # Phase 2: Runtime interface ✨
│   └── audit.py         # Phase 2: Audit logging ✨
├── core/                # Core configuration
│   ├── config.py
│   └── database.py
├── github_integration/  # GitHub API client
│   └── client.py
├── models/              # Database models and schemas
│   ├── database.py      # Enhanced with Phase 2 models
│   └── schemas.py       # Enhanced with Phase 2 schemas
├── security/            # Phase 2: Security layer ✨
│   ├── session.py       # Multi-session isolation
│   ├── rbac.py          # Role-based access control
│   └── audit.py         # Audit logging system
├── transport/           # Phase 2: Transport abstraction ✨
│   ├── interface.py     # Runtime interface contract
│   └── local_runtime.py # Local implementation
├── static/              # Frontend assets
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── telegram_bot/        # Telegram bot
│   └── bot.py
└── main.py              # Application entry point
```

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run all tests
pytest

# Run Phase 2 tests specifically
pytest tests/test_phase2.py -v
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

### Phase 1 Enhancements
- [ ] Task comments and activity history
- [ ] File uploads and attachments
- [ ] Advanced agent configuration
- [ ] Custom agent workflows
- [ ] Integration with more services (Slack, Discord, etc.)
- [ ] Analytics and reporting dashboard

### Phase 2 Roadmap
- [ ] WebSocket streaming for real-time task updates
- [ ] SSO integration (OIDC, GitHub OAuth, Enterprise SSO)
- [ ] Remote clawlink transport adapter
- [ ] Distributed state management (Redis/etcd)
- [ ] Skill marketplace and registry
- [ ] Policy as code (OPA integration)
- [ ] Multi-node cluster support
- [ ] Advanced audit analytics
- [ ] Federated identity management
- [ ] End-to-end encryption for remote sessions

### Completed ✅
- [x] Phase 2: Transport abstraction layer
- [x] Phase 2: Multi-session isolation
- [x] Phase 2: Role-based access control (RBAC)
- [x] Phase 2: Audit logging system
- [x] Phase 2: Distributed task lifecycle
- [x] Phase 2: Session-based authentication
- [x] Phase 2: Agent and skill discovery APIs

## 💬 Support
