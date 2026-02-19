# Phase 2: Distributed AI Node Architecture

## Overview

Phase 2 transforms coderClawLink from a basic productivity portal into a **secure, distributed AI node** capable of remote orchestration while maintaining strict separation between:
- **Intelligence** (coderClaw core)
- **Transport** (clawlink or other adapters)

## Key Features

### 1️⃣ Transport Abstraction Layer

The runtime exposes a structured local API through a pluggable adapter layer:

- **Submit task**: Create and execute agent tasks
- **Stream task updates**: Real-time task progress streaming
- **Query task state**: Check current execution state
- **Cancel task**: Stop running tasks
- **List available agents**: Discover configured agents
- **List available skills**: Browse skill ecosystem

**Design Principle**: The runtime does NOT assume HTTP, WebSocket, CLI, or any specific protocol. All communication flows through the adapter layer.

```python
from app.transport.local_runtime import get_local_runtime
from app.transport.interface import TaskSubmission

runtime = get_local_runtime()

# Submit a task
submission = TaskSubmission(
    task_id="unique-id",
    agent_type="claude",
    prompt="Generate login component",
    context={"project": "my-app"}
)

result = await runtime.submit_task(submission)
```

### 2️⃣ Remote Orchestration Support

Secure remote command execution with:

- **Multi-session isolation**: Each session has isolated memory scope
- **Remote agent invocation**: Execute agents from remote sessions
- **Structured output streaming**: Real-time progress updates
- **Role-based access control**: Fine-grained permissions

```python
# Create a session
POST /api/runtime/sessions
{
  "user_id": "user@example.com",
  "device_id": "device-123"
}

# Submit a task with session
POST /api/runtime/tasks/submit
{
  "agent_type": "claude",
  "prompt": "Create API endpoint",
  "session_id": "session-uuid"
}
```

### 3️⃣ Distributed Task Lifecycle

Enhanced task engine with:

- **Globally unique task IDs**: UUID-based identification
- **State machine**: PENDING → PLANNING → RUNNING → WAITING → COMPLETED/FAILED/CANCELLED
- **Long-running job persistence**: Tasks survive restarts
- **Structured logs**: Event history tracking
- **Auditable execution**: Full audit trail

```python
# Query task state
GET /api/runtime/tasks/{task_id}/state

# Cancel a task
POST /api/runtime/tasks/{task_id}/cancel
```

### 4️⃣ Identity & Security Model

Security-first design with:

- **Session-based authentication**: Validated sessions for all operations
- **Device-level trust**: Track and manage trusted devices
- **Role-based permissions**: Admin, Developer, Viewer, Guest roles
- **Agent-level authorization**: Control which users can execute which agents
- **Skill-level execution controls**: Permissions per skill

```python
from app.security.rbac import get_rbac_manager, Role, Permission

rbac = get_rbac_manager()

# Assign role
rbac.assign_role("user-id", Role.DEVELOPER)

# Check permission
can_execute = rbac.has_permission("user-id", Permission.AGENT_EXECUTE)
```

### 5️⃣ Team & Enterprise Readiness

Enterprise features:

- **Audit logging**: Track all AI actions
- **Activity history**: User and session activity logs
- **Permission management**: Fine-grained access control
- **Centralized policies**: Team-wide enforcement

```python
# View audit logs (admin only)
GET /api/audit/events?session_id={session_id}&limit=100

# Get user activity
GET /api/audit/users/{user_id}/activity?session_id={session_id}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Transport Adapters                     │
│  (HTTP/WebSocket/CLI/clawlink - Pluggable)             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Runtime Interface Contract                  │
│  - submit_task()                                        │
│  - stream_task_updates()                                │
│  - query_task_state()                                   │
│  - cancel_task()                                        │
│  - list_agents()                                        │
│  - list_skills()                                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Local Runtime Implementation                │
│  - Task execution                                       │
│  - Session management                                   │
│  - RBAC enforcement                                     │
│  - Audit logging                                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Agent Orchestrator (Phase 1)                │
│  - Claude, Auggie, Ollama, OpenDevin, Goose            │
└─────────────────────────────────────────────────────────┘
```

## Security Boundaries

### Session Isolation

Each session maintains:
- Unique session ID
- User identity
- Device trust level
- Isolated memory scope
- Permission set

Sessions automatically expire after 24 hours of inactivity.

### Permission Model

**Roles**:
- `ADMIN`: Full system access
- `DEVELOPER`: Execute tasks, manage projects
- `VIEWER`: Read-only access
- `GUEST`: Limited discovery

**Permissions**:
- `task:submit`, `task:cancel`, `task:view`
- `agent:list`, `agent:execute`, `agent:configure`
- `skill:list`, `skill:execute`, `skill:install`
- `project:read`, `project:write`, `project:delete`
- `admin:users`, `admin:system`

### Audit Trail

All actions are logged:
- Session creation/deletion
- Task submission/completion/failure
- Agent execution
- Permission grants/revocations
- Resource access

## API Endpoints

### Session Management

- `POST /api/runtime/sessions` - Create session
- `GET /api/runtime/sessions/{session_id}` - Get session info

### Task Execution

- `POST /api/runtime/tasks/submit` - Submit task
- `GET /api/runtime/tasks/{task_id}/state` - Query state
- `POST /api/runtime/tasks/{task_id}/cancel` - Cancel task

### Discovery

- `GET /api/runtime/agents` - List agents
- `GET /api/runtime/skills` - List skills

### Audit & Compliance

- `GET /api/audit/events` - Query audit events (admin)
- `GET /api/audit/users/{user_id}/activity` - User activity
- `GET /api/audit/sessions/{session_id}/activity` - Session activity

## Deployment Modes

### Local-Only Mode (Default)

No remote access, runs on localhost:
```bash
python -m app.main
```

### Remote-Enabled Mode

With transport adapter for remote access (future):
```bash
# With clawlink adapter (Phase 2+)
python -m app.main --transport clawlink
```

### Distributed Cluster Mode

Multiple nodes with shared state (future):
```bash
# With distributed backend
python -m app.main --transport clawlink --cluster-mode
```

## Design Constraints

Phase 2 maintains:
- ✅ Not a monolithic server
- ✅ No hardcoded tunnel implementation
- ✅ No cloud hosting assumptions
- ✅ clawlink remains optional and replaceable
- ✅ Backward compatibility with Phase 1

## Migration from Phase 1

All Phase 1 APIs remain functional:
- `/api/projects/*`
- `/api/tasks/*`
- `/api/agents/*`

New Phase 2 features are additive:
- `/api/runtime/*` - Transport abstraction
- `/api/audit/*` - Enterprise features

## Future Enhancements

- WebSocket streaming for real-time updates
- SSO integration (OIDC, GitHub, OAuth)
- Remote clawlink transport adapter
- Distributed state management
- Skill marketplace and registry
- Policy as code
