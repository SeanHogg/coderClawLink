# coderClawLink — AI Agent Orchestration Portal

> **Replace Jira with an AI-native workflow control plane.** coderClawLink is the orchestration portal and REST API backend for [coderClaw.ai](https://coderclaw.ai) — connecting self-healing AI agents to projects, tasks, and human reviewers with built-in RBAC, real-time WebSocket execution streaming, chat persistence, a skills marketplace, and a full compliance-grade audit trail.

<p align="center">
  <a href="https://discord.gg/qkhbAGHRBT"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://coderclaw.ai"><img src="https://img.shields.io/badge/Website-coderclaw.ai-orange?style=for-the-badge" alt="Website"></a>
  <a href="https://app.coderclaw.ai"><img src="https://img.shields.io/badge/Portal-app.coderclaw.ai-blue?style=for-the-badge" alt="Portal"></a>
</p>

coderClawLink is the **orchestration portal and backend API** that connects AI agents (Claws) to projects, tasks, and human reviewers — with built-in auth, RBAC, real-time execution tracking, chat persistence, a skills marketplace, and a full audit trail. It runs entirely on **Cloudflare Workers** — zero cold start, globally distributed — backed by your own Postgres database.

| Worker | URL | Purpose |
|--------|-----|---------|
| `app/` | `app.coderclaw.ai` | Lit 3 SPA — dashboard, brain assistant, code editor, marketplace |
| `api/` | `api.coderclaw.ai` | Hono REST API + Durable Objects + Postgres |

---

## Table of Contents

- [What is coderClaw.ai?](#what-is-coderclawai)
- [coderClawLink in the Ecosystem](#coderclawlink-in-the-coderclawai-ecosystem)
- [Key Platform Capabilities](#key-platform-capabilities)
- [coderClawLLM — AI Compute API](#coderclawllm--ai-agent-compute-api)
- [Pricing](#pricing)
- [Who Uses coderClaw.ai?](#who-uses-coderclawai)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [API Reference](#api-reference)
- [RBAC](#rbac)

---

## What is coderClaw.ai?

[coderClaw.ai](https://coderclaw.ai) is a **self-healing AI engineering agent and orchestration platform** that manages tasks, workflows, and collaboration across all AI agents. It provides:

- **Persistent memory** — agents retain project context across sessions, restarts, and handoffs
- **Context-aware reasoning** — deep AST analysis, semantic code maps, dependency graphs, and git history awareness
- **Self-repair** — AI systems detect failures, fix themselves, and adapt over time without manual intervention
- **Human-in-the-loop governance** — every autonomous action surfaces an approval gate; humans stay in control
- **Multi-channel access** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, Microsoft Teams, and more

> See the [coderClaw core agent runtime →](https://github.com/SeanHogg/coderClaw)

---

## coderClawLink in the coderClaw.ai Ecosystem

coderClawLink is the **centralized orchestration portal** within the coderClaw.ai platform. It replaces Jira by giving teams full visibility into AI-driven workflows without changing how they work today.

```
┌───────────────────────────────────────────────────────────────┐
│                      coderClaw.ai Platform                    │
│                                                               │
│  ┌──────────────────┐   ┌────────────────────────────────┐   │
│  │  coderClaw       │   │  coderClawLink                 │   │
│  │  (core agent)    │◄──►  (orchestration portal)        │   │
│  │                  │   │  app.coderclaw.ai              │   │
│  │  Self-healing    │   │  api.coderclaw.ai              │   │
│  │  Multi-agent     │   │                                │   │
│  │  Persistent mem  │   │  Projects · Tasks · Claws      │   │
│  └────────┬─────────┘   │  Runtime · Audit · RBAC        │   │
│           │             │  Marketplace · Chat · Brain     │   │
│           │             └──────────────┬─────────────────┘   │
│           │                            │                      │
│  ┌────────▼────────────────────────────▼──────────────────┐  │
│  │              coderClawLLM                               │  │
│  │  Pay-per-use AI agent compute API                       │  │
│  │  Free model pool · Pro model pool · Usage metrics       │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

**coderClawLink provides:**
- Workflow visibility and auditability for all agent actions
- Human-in-the-loop control with approval gates
- Seamless adoption across teams of any size — no workflow disruption
- RBAC-enforced multi-tenancy for enterprise governance
- Full execution history and audit log for compliance
- Skills marketplace for sharing and discovering agent capabilities
- Persistent chat history across all claw sessions
- Browser-based code editor for direct file inspection

---

## Key Platform Capabilities

### 🔄 Self-Healing Agents
coderClaw.ai agents monitor their own execution state. When a task fails, the system automatically diagnoses the failure, attempts remediation, and escalates to human review only when it cannot self-repair. The execution lifecycle (`PENDING → SUBMITTED → RUNNING → COMPLETED / FAILED`) is tracked in coderClawLink with full state history. Execution state changes stream in real-time via a WebSocket endpoint (`GET /api/runtime/executions/:id/stream`), eliminating polling latency.

### 🧠 Persistent Memory & Context
Unlike ephemeral AI tools, every agent maintains a `.coderClaw/` knowledge base per project — storing architectural docs, coding standards, semantic indices, and session handoffs. coderClawLink persists agent registrations, skill catalogs, and execution histories so nothing is lost between sessions. Context window usage and token spend are tracked per session via `usage.snapshot` relay frames and stored in the `usage_snapshots` table.

### 👥 Human-in-the-Loop Governance

The web UI now includes direct access to a project's governance rules via a **Governance** menu item in the system sidebar. Super‑admins also see a governance tab in the admin console for quick reference. A **Next task** menu lets you fetch the highest‑priority ready task from the queue.

All autonomous operations are subject to role-based approval policies. The MANAGER and OWNER roles control who can register agents, view audit logs, and manage organizational members. Every state change is recorded in the immutable audit trail. For destructive or high-risk actions, agents can request human approval via `POST /api/approvals`; the portal notifies reviewers in real-time over the WebSocket relay and awaits an `approved` or `rejected` decision before the agent proceeds.

### 🤖 Multi-Agent Orchestration
Register any number of specialized agents (Code Creator, Code Reviewer, Test Generator, Bug Analyzer, Refactor Agent, Documentation Agent, Architecture Advisor, or custom roles) against coderClawLink. Each agent declares its skills; the runtime routes tasks to the most capable available agent. Claw-to-claw task delegation is fully bidirectional: the `POST /api/claws/:targetId/forward` endpoint returns a `correlationId`; the target claw sends a `remote.result` frame when its task completes, which the relay forwards back to the originating claw so dependent workflow steps receive their expected `output`.

### 📋 Spec-Driven Workflow Portal
The `/spec` TUI command produces structured planning output (PRD, architecture spec, task list) that coderClaw pushes to `POST /api/specs`. Specs are queryable by goal, project, and status (`draft → reviewed → approved → in_progress → done`). Each spec links to one or more `workflows`, which track the full execution DAG with per-task states visible in the portal.

### ⏱ Visual Execution Timeline & Debugger
Instead of reading raw log output, the portal provides **three visual debug views** for every claw run:

- **Timeline** — horizontal swimlane chart showing each tool call and workflow task on a shared time axis (bar colour = status, hover = args preview + duration)
- **List** — flat chronological log of every recorded event with timestamps and durations
- **Graph** — dependency graph of workflow tasks rendered as nodes with directed edges showing `dependsOn` relationships between sub-agents

The timeline is accessible at the **Logs → Visual Timeline** tab (tenant-wide), inside each **Project workspace → Timeline** tab, and in the **Task drawer → Timeline** tab. Data is sourced from tool audit events (`POST /api/claws/:id/tool-audit`) and workflow task states. See [docs/visual-debugging.md](./docs/visual-debugging.md) for full details.

### 🛒 Skills Marketplace
The built-in marketplace (`/marketplace/*`) lets teams publish, discover, and install reusable agent skills. Skills can be assigned at the tenant level (available to all claws) or scoped to individual claws. Full-text search, categories, versioning, and like/download counters are included. Marketplace auth is separate from the orchestration API — email + password → JWT with `tid: 0`.

### 💬 Chat Persistence & History
Every claw session's conversation is persisted by the relay Durable Object and queryable through the portal. Agents push messages via `POST /api/claws/:id/messages?key=`; users browse their full interaction history in the **Chats** view, filterable by claw and session.

### 🧠 Brain — AI Project Assistant
The **Brain** view is an in-portal AI assistant that understands your projects and tasks. Ask it to create projects, break down tasks, query claw status, or navigate the portal. Conversation history is persisted in localStorage (per tenant, last 50 messages) and sent as context on each request so the assistant maintains continuity.

### 💻 Browser Code Editor
The **Code Editor** view connects to claw file-system directories, letting users browse and view source files directly in the browser — no local IDE required. Supports 30+ file types (TypeScript, Go, Rust, Java, SQL, YAML, and more). Read-only by default; file contents are fetched through the claw's API key-authenticated directory endpoints.

### 🔌 CI/CD Integration
Agents can be triggered on PR events, push events, or scheduled jobs. Execution state callbacks (`PATCH /api/runtime/executions/:id/state`) allow CI runners and agent runtimes to report progress and attach code-change telemetry. Project code-change insights are recorded via `POST /api/projects/:id/insights/code-changes`.

### 🏠 Private & Self-Hosted Deployments
The entire platform runs on Cloudflare Workers (zero cold-start, globally distributed) backed by your own Postgres database. For air-gapped or compliance-sensitive environments, a Docker-based self-hosted option is provided via `Dockerfile` and `docker-compose.yml` with profiles for `dev`, `deploy`, and `migrate`.

### 🔐 Security & Compliance
- **TOTP MFA** — per-user TOTP-based multi-factor authentication with encrypted secrets and recovery codes
- **GDPR / CCPA** — built-in privacy request handling (`/api/admin/privacy-requests`) and versioned legal documents
- **Immutable audit trail** — every state change is recorded with actor, timestamp, and diff
- **Superadmin panel** — platform-wide health monitoring, error log, user impersonation, and newsletter management

---

## coderClawLLM — AI Agent Compute API

coderClawLLM is the **pay-per-use API layer** for AI agent compute built into coderClawLink:

| Feature | Detail |
|---------|--------|
| Free model pool | Shared, rate-limited pool for development and low-volume workloads |
| Pro model pool | Dedicated, higher-capacity models for production agent pipelines |
| OpenAI-compatible API | Drop `https://api.coderclaw.ai/llm/v1` as the `baseURL` in any OpenAI SDK |
| Tenant-aware billing | Usage tracked per tenant and per user (`GET /llm/v1/usage`) |
| Automatic failover | Model routing handles provider outages transparently |

Agents authenticate with the same JWT issued by `POST /api/auth/token`, so no separate credential management is needed.

---

## Pricing

coderClaw.ai uses a **freemium + usage-based** model. The orchestration portal (coderClawLink) is **MIT licensed and free to self-host**. Managed cloud tiers bundle hosting, the LLM compute proxy, and support.

| | **Free** | **Pro** | **Enterprise** |
|---|---|---|---|
| **Price** | $0 forever | $29 / seat / month | Custom |
| **Claws (AI agents)** | 1 | Unlimited | Unlimited |
| **Projects** | 3 | Unlimited | Unlimited |
| **Tasks** | 50 | Unlimited | Unlimited |
| **Team members** | 1 | Up to 25 | Unlimited |
| **coderClawLLM compute** | Free model pool (rate-limited) | Pro model pool (priority) | Dedicated capacity |
| **LLM requests / month** | 1,000 | 50,000 | Unlimited / SLA |
| **Chat history** | 7 days | 90 days | Unlimited |
| **Audit log retention** | 30 days | 1 year | Unlimited |
| **Approval gates** | ✅ | ✅ | ✅ |
| **Specs & Workflows** | ✅ | ✅ | ✅ |
| **Marketplace skills** | ✅ install | ✅ publish + install | ✅ private registry |
| **RBAC** | Basic (owner + viewer) | Full (4 roles) | Full + SSO/SAML |
| **MFA (TOTP)** | ✅ | ✅ | ✅ + hardware key |
| **GDPR / CCPA tooling** | ✅ | ✅ | ✅ + DPA |
| **Self-hosted** | ✅ MIT | ✅ MIT | ✅ air-gap support |
| **SLA** | Community | Business hours | 99.9% uptime SLA |
| **Support** | Discord | Email + Discord | Dedicated CSM |

### Upgrade / Downgrade

```http
POST /api/tenants/:id/subscription/pro    # upgrade to Pro (billing details required)
POST /api/tenants/:id/subscription/free   # downgrade to Free
GET  /api/tenants/:id/subscription        # current plan + usage
```

> **Self-hosted users**: all tiers are available under the MIT license at no cost. Pricing applies to the managed `api.coderclaw.ai` / `app.coderclaw.ai` cloud service. See [docs/pricing.md](./docs/pricing.md) for the full billing FAQ.

---

### Startups (5–50 developers)
Use coderClaw.ai as a **virtual AI workforce**: a small human team coordinates a fleet of AI agents that handle code generation, review, testing, and documentation — with coderClawLink as the task board and audit trail. Subscription tiers start free.

### Scale-ups (50–200 developers)
Accelerate delivery by wiring coderClawLink into your CI/CD pipeline. Agents run in parallel across repositories, specs drive task creation automatically, and the approval-gate workflow keeps human reviewers in the loop without slowing teams down.

### Enterprises (200–1,000+ developers)
Run **complex multi-agent pipelines** at scale: parallel execution across hundreds of repositories, strict RBAC for department-level isolation, full audit trails for compliance (SOC 2, HIPAA-adjacent workflows), GDPR/CCPA privacy tooling, and private/self-hosted deployment options. coderClawLink replaces Jira as the orchestration layer without disrupting existing developer tooling.

---

## Architecture

```
coderClawLink/
├── api/                              # Cloudflare Worker – api.coderclaw.ai
│   ├── src/
│   │   ├── domain/                   # Layer 1 – pure business logic, no deps
│   │   │   ├── shared/               #   types.ts  errors.ts
│   │   │   ├── user/                 #   User entity + IUserRepository
│   │   │   ├── tenant/               #   Tenant aggregate + ITenantRepository
│   │   │   ├── project/              #   Project aggregate + IProjectRepository
│   │   │   ├── task/                 #   Task entity + ITaskRepository
│   │   │   ├── agent/                #   Agent entity + IAgentRepository
│   │   │   ├── skill/                #   Skill entity + ISkillRepository
│   │   │   ├── execution/            #   Execution aggregate + IExecutionRepository
│   │   │   └── audit/                #   AuditEvent + IAuditRepository
│   │   ├── application/              # Layer 2 – use-case services (DI via interfaces)
│   │   │   ├── auth/AuthService.ts   #   registration, API-key login, JWT issuance
│   │   │   ├── project/ProjectService.ts
│   │   │   ├── task/TaskService.ts
│   │   │   ├── tenant/TenantService.ts
│   │   │   ├── agent/AgentService.ts #   agent + skill registration/discovery
│   │   │   ├── runtime/RuntimeService.ts  # task execution lifecycle
│   │   │   └── audit/AuditService.ts
│   │   ├── infrastructure/           # Layer 3 – concrete adapters
│   │   │   ├── auth/                 #   JwtService (Web Crypto)  HashService
│   │   │   ├── database/             #   Drizzle schema + Hyperdrive connection
│   │   │   ├── relay/                #   ClawRelayDO (WebSocket relay Durable Object)
│   │   │   └── repositories/         #   Postgres implementations of all domain ports
│   │   ├── presentation/             # Layer 4 – HTTP (Hono routes + middleware)
│   │   │   ├── middleware/           #   cors  errorHandler  authMiddleware
│   │   │   └── routes/               #   auth  projects  tasks  tenants
│   │   │                             #   agents  skills  runtime  audit
│   │   │                             #   specs  workflows  approvals
│   │   ├── env.ts                    # Worker Env + HonoEnv types
│   │   └── index.ts                  # Composition root + Worker export
│   ├── migrations/                   # SQL migration files
│   ├── wrangler.toml
│   ├── drizzle.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── app/                              # Cloudflare Worker – app.coderclaw.ai
│   ├── src/index.ts                  # Worker entry (serves static assets)
│   ├── static/                       # SPA (index.html  app.js  styles.css)
│   ├── wrangler.toml
│   ├── package.json
│   └── tsconfig.json
│
├── Dockerfile                        # Multi-stage: base › dev / deploy / migrate
├── docker-compose.yml                # Profiles: dev  deploy  migrate
└── package.json                      # npm workspace root
```

### Design Principles

- **DDD** – rich aggregates with invariants; repositories are port interfaces
- **SOLID** – services depend on interfaces (DIP); one concern per file (SRP)
- **N-Layer** – Domain → Application → Infrastructure ← Presentation (outer depends inward)

---

## Tech Stack

| Concern | Technology |
|---------|-----------|
| Runtime | Cloudflare Workers (TypeScript, ES2022) |
| Routing | Hono 4 |
| ORM | Drizzle ORM |
| DB | Postgres via Cloudflare Hyperdrive |
| Auth | HMAC-SHA-256 JWT + PBKDF2 passwords + TOTP MFA (Web Crypto API — no npm dependency) |
| Frontend | Lit 3 web components + Vite |
| Real-time | Cloudflare Durable Objects (WebSocket relay) |

---

## Contributing

Before opening a PR, follow the required checklist in [CONTRIBUTING.md](./CONTRIBUTING.md), especially:

- Run `pnpm --filter app build`
- Run `pnpm --filter app type-check`
- Run `pnpm --filter api exec tsc --noEmit`
- Keep PR scope focused and describe what changed + why

---

## API Reference

All protected routes require `Authorization: Bearer <jwt>`.

### Auth (public)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Create user + receive one-time API key |
| `POST` | `/api/auth/token` | Exchange API key for JWT |

### Projects

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/projects` | List projects |
| `POST` | `/api/projects` | Create project |
| `POST` | `/api/projects/scaffold` | Scaffold project from dashboard prompt (supports `rootWorkingDirectory`) |
| `GET` | `/api/projects/:id` | Get project |
| `PATCH` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |

### Tasks

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tasks?project_id=` | List tasks |
| `POST` | `/api/tasks` | Create task |
| `GET` | `/api/tasks/:id` | Get task |
| `PATCH` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `POST` | `/api/tasks/next` | Claim next ready task |

### Tenants & Members

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tenants` | List tenants |
| `POST` | `/api/tenants` | Create tenant |
| `GET` | `/api/tenants/:id` | Get tenant |
| `GET` | `/api/tenants/:id/default-claw` | Get tenant default claw |
| `PUT` | `/api/tenants/:id/default-claw` | Set or clear tenant default claw |
| `GET` | `/api/tenants/:id/subscription` | Get tenant subscription and pricing |
| `POST` | `/api/tenants/:id/subscription/pro` | Upgrade to Pro (billing details required) |
| `POST` | `/api/tenants/:id/subscription/free` | Downgrade to Free |
| `GET` | `/api/tenants/:id/insights?days=30` | Tenant-level code-change insights (all plans) |
| `POST` | `/api/tenants/:id/members` | Add member |
| `DELETE` | `/api/tenants/:id/members/:userId` | Remove member |
| `DELETE` | `/api/tenants/:id` | Delete tenant |

### Project Insights

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/projects/:id/insights/code-changes` | Record project code changes from user interactions |

### coderClawLLM / coderClawLLMPro

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/llm/v1/chat/completions` | Tenant-aware LLM chat proxy (free/pro model pools) |
| `GET` | `/llm/v1/models` | List model pool for caller’s effective plan |
| `GET` | `/llm/v1/usage?days=30` | Tenant and user consumption metrics |
| `GET` | `/llm/v1/health` | LLM proxy health |

### Agents & Skills

| Method | Path | Min Role | Description |
|--------|------|----------|-------------|
| `GET` | `/api/agents` | VIEWER | List agents for tenant |
| `POST` | `/api/agents` | MANAGER | Register agent |
| `GET` | `/api/agents/:id` | VIEWER | Get agent |
| `DELETE` | `/api/agents/:id` | MANAGER | Deactivate agent |
| `GET` | `/api/agents/:id/skills` | VIEWER | List agent skills |
| `POST` | `/api/agents/:id/skills` | MANAGER | Register skill |
| `GET` | `/api/skills` | VIEWER | All skills (discovery) |

### Runtime — Execution Lifecycle

```
PENDING → SUBMITTED → RUNNING → COMPLETED
                              └→ FAILED
PENDING/SUBMITTED/RUNNING → CANCELLED
```

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/runtime/executions` | Submit task for execution |
| `GET` | `/api/runtime/executions` | List executions for tenant |
| `GET` | `/api/runtime/executions/:id` | Get execution state (REST polling) |
| `GET` | `/api/runtime/executions/:id/stream` | **WebSocket** – stream `ExecutionEvent` frames until terminal state |
| `POST` | `/api/runtime/executions/:id/cancel` | Cancel execution |
| `PATCH` | `/api/runtime/executions/:id/state` | Agent callback: update state (`completed` supports optional `codeChanges`) |
| `GET` | `/api/runtime/tasks/:taskId/executions` | Execution history for task |

#### WebSocket Execution Stream (`GET /api/runtime/executions/:id/stream`)

Upgrade the connection to receive real-time frames:

```json
{ "type": "status_change", "status": "running" | "completed" | "failed" }
{ "type": "done", "execution": { ...full execution object... } }
{ "type": "error", "message": "execution_not_found" }
```

The connection closes automatically when the execution reaches a terminal state.

### Audit (MANAGER+ only)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/audit/events` | Tenant-wide event log |
| `GET` | `/api/audit/users/:userId/activity` | User activity log |

### Specs (Planning Storage)

Specs are structured planning documents produced by the coderClaw `/spec` command.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/specs` | JWT or claw key | Create/upsert a spec |
| `GET` | `/api/specs` | JWT | List specs for tenant (`?projectId=` filter) |
| `GET` | `/api/specs/:id` | JWT | Get spec detail |
| `PATCH` | `/api/specs/:id` | JWT | Update status/content |
| `DELETE` | `/api/specs/:id` | JWT | Delete spec |
| `GET` | `/api/specs/:id/workflows` | JWT | List workflows linked to spec |
| `POST` | `/api/specs/:id/workflows` | JWT | Link existing workflow to spec |

**Claw-key auth**: add `?clawId=<id>&key=<apiKey>` query params.

### Workflows (Execution Portal)

Workflows are structured execution records for orchestrated multi-step plans.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/workflows` | JWT or claw key | Register a workflow |
| `GET` | `/api/workflows` | JWT | List workflows (`?status=&workflowType=&clawId=`) |
| `GET` | `/api/workflows/:id` | JWT | Get workflow + tasks |
| `PATCH` | `/api/workflows/:id` | JWT | Update status/description |
| `GET` | `/api/workflows/:id/tasks` | JWT | List tasks for workflow |
| `POST` | `/api/workflows/:id/tasks` | JWT | Add task to workflow |
| `PATCH` | `/api/workflows/:id/tasks/:tid` | JWT | Update individual task state |

#### Relay frame for live updates

```json
{ "type": "workflow.update", "workflowId": "…", "status": "…", "taskId": "…" }
```

### Approvals (Human-in-the-Loop)

Approval gates for destructive / high-risk agent actions.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/approvals` | JWT or claw key | Create pending approval |
| `GET` | `/api/approvals` | JWT | List approvals (`?status=&clawId=`) |
| `GET` | `/api/approvals/:id` | JWT | Get approval detail |
| `PATCH` | `/api/approvals/:id` | JWT, MANAGER+ | Accept or reject (`status: "approved" \| "rejected"`) |

#### Relay frames

```json
{ "type": "approval.request", "approvalId": "…", "actionType": "…", "description": "…" }
{ "type": "approval.decision", "approvalId": "…", "status": "approved" | "rejected", "reviewNote": "…" }
```

### Fleet Capability Management (P2-3)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/claws/fleet/route?requires=<cap1,cap2>` | JWT | Best-matching claw for required capabilities |
| `PATCH` | `/api/claws/:id/capabilities` | JWT | Update declared capabilities for a claw |

### Claw Telemetry (claw API key auth)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/claws/:id/relay-result?key=` | P0-1: Route `remote.result` to source claw relay |
| `POST` | `/api/claws/:id/usage-snapshot?key=` | P2-2: Persist context window / token usage snapshot |
| `POST` | `/api/claws/:id/tool-audit?key=` | P2-4: Persist tool call audit event |
| `POST` | `/api/claws/:id/approval-request?key=` | P3-3: Create pending approval from claw |

#### `remote.result` relay frame (P0-1)

When a target claw completes a remote task it sends this frame upstream:

```json
{
  "type": "remote.result",
  "taskCorrelationId": "<uuid>",
  "fromClawId": "<clawId>",
  "result": "<output string>",
  "status": "completed" | "failed",
  "error": "<optional error message>"
}
```

`POST /api/claws/:targetId/forward` now includes `correlationId` in the request body and response:

```jsonc
// Request body (addition)
{ "correlationId": "<uuid>", "type": "remote.task", "task": "…" }
// Response
{ "ok": true, "delivered": true, "correlationId": "<uuid>" }
```

#### `usage.snapshot` relay frame (P2-2)

```json
{
  "type": "usage.snapshot",
  "sessionKey": "…",
  "inputTokens": 12000,
  "outputTokens": 3400,
  "contextTokens": 87000,
  "contextWindowMax": 200000,
  "compactionCount": 2,
  "ts": "2026-03-04T…"
}
```

#### `tool.audit` relay frame (P2-4)

```json
{
  "type": "tool.audit",
  "runId": "…",
  "sessionKey": "…",
  "toolCallId": "…",
  "toolName": "bash",
  "args": { "command": "npm test" },
  "result": "…",
  "durationMs": 1234,
  "ts": "…"
}
```

### Chat Persistence

Persistent chat history for claw sessions. Agents push messages; the portal provides a browse UI.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/claws/:clawId/messages?key=` | Claw API key | Bulk-insert session messages (upserts session) |
| `GET` | `/api/chats` | JWT | List all chat sessions for tenant |
| `GET` | `/api/chats/:sessionId/messages` | JWT | Get messages for a session |
| `GET` | `/api/claws/:clawId/sessions/:sessionKey/messages` | JWT | Get messages by session key |

### Skill Assignments

Assign marketplace skills at the tenant level (all claws) or scoped to a specific claw.

**Tenant-level** (require MANAGER+):

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/skill-assignments/tenant` | List skills assigned to the tenant |
| `POST` | `/api/skill-assignments/tenant` | Assign a marketplace skill to the tenant |
| `DELETE` | `/api/skill-assignments/tenant/:slug` | Remove tenant-level assignment |

**Claw-level** (require MANAGER+):

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/skill-assignments/claws/:clawId` | List skills assigned to a claw |
| `POST` | `/api/skill-assignments/claws/:clawId` | Assign a skill to a claw |
| `DELETE` | `/api/skill-assignments/claws/:clawId/:slug` | Remove claw-level assignment |

### Marketplace (public skills registry)

Marketplace auth is separate from the orchestration API: email + password → JWT with `tid: 0`.

**Auth:**

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/marketplace/auth/register` | Register marketplace account |
| `POST` | `/marketplace/auth/login` | Login and receive JWT |
| `GET` | `/marketplace/auth/me` | Get current user profile |

**Users:**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/marketplace/users/:username` | Public profile + published skills |
| `PUT` | `/marketplace/users/me` | Update own profile (auth required) |

**Skills:**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/marketplace/skills` | List published skills (`?category=&q=&page=&limit=`) |
| `GET` | `/marketplace/skills/:slug` | Get skill detail (increments download counter) |
| `POST` | `/marketplace/skills` | Publish a skill (auth required) |
| `PUT` | `/marketplace/skills/:slug` | Update own skill (auth required) |
| `POST` | `/marketplace/skills/:slug/like` | Toggle like on a skill (auth required) |

### Project Insights

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/projects/:id/insights/code-changes` | Record code-change telemetry from agent interactions |

---

## RBAC

Roles (ascending authority): `viewer` → `developer` → `manager` → `owner`

| Permission | Min Role |
|-----------|----------|
| Read resources | VIEWER |
| Create/update tasks & projects | DEVELOPER |
| Register/deactivate agents, view audit | MANAGER |
| Manage members, full admin | OWNER |

---

## Setup

> For a detailed walkthrough, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Prerequisites

- Node.js 20+, pnpm 9+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm i -g wrangler`) authenticated
- Cloudflare account
- External Postgres database (Neon, Supabase, etc.)

### 1. Install

```bash
pnpm install
```

### 2. Create Hyperdrive binding

```bash
wrangler hyperdrive create coderclawlink-db \
  --connection-string="postgres://user:pass@host/db"
```

Paste the returned `id` into `api/wrangler.toml` under `[[hyperdrive]]`.

### 3. Set secrets

```bash
wrangler secret put JWT_SECRET      # 32+ char random string
wrangler secret put CORS_ORIGINS    # e.g. https://app.coderclaw.ai
```

### 4. Run migrations

```bash
DATABASE_URL=postgres://... pnpm db:migrate
```

### 5. Local development

```bash
pnpm dev:api                         # http://localhost:8787
pnpm dev:app                         # http://localhost:8788
pnpm --filter app dev:ui             # http://localhost:5173 (hot-reload)
```

### 6. Deploy

```bash
pnpm --filter api run deploy         # migrations + wrangler deploy
pnpm --filter app run deploy         # vite build + wrangler deploy
```

---

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `HYPERDRIVE` binding | `api/wrangler.toml` | CF Hyperdrive ID |
| `CORS_ORIGINS` | `wrangler secret put CORS_ORIGINS` | Comma-separated allowed origins |
| `ENVIRONMENT` | `api/wrangler.toml` `[vars]` | `production` or `development` |
| `JWT_SECRET` | `wrangler secret put JWT_SECRET` | JWT signing key (32+ chars) |
| `API_URL` | `app/wrangler.toml` `[vars]` | `https://api.coderclaw.ai` |
