# coderClawLink — Technical Architecture

> This document describes the system design of coderClawLink: the four-layer DDD API, the Lit 3 SPA, the Cloudflare Durable Object relay, and how all the pieces connect.

---

## Table of Contents

1. [High-Level System Map](#1-high-level-system-map)
2. [API — Four-Layer DDD](#2-api--four-layer-ddd)
3. [Frontend — Lit 3 SPA](#3-frontend--lit-3-spa)
4. [Real-Time Relay — Durable Objects](#4-real-time-relay--durable-objects)
5. [Database Schema Overview](#5-database-schema-overview)
6. [Authentication & Security](#6-authentication--security)
7. [Repository Layout](#7-repository-layout)
8. [Design Principles](#8-design-principles)
9. [Data Flow Examples](#9-data-flow-examples)

---

## 1. High-Level System Map

```
Browser (app.coderclaw.ai)
  │  Lit 3 SPA — Vite build, served by Cloudflare static asset Worker
  │
  │  REST + WebSocket
  ▼
Cloudflare Worker (api.coderclaw.ai)  ──  Hono 4 router
  │
  ├─── Durable Object: ClawRelayDO  ──►  WebSocket ──►  coderClaw runtime (local machine)
  │         (one DO per Claw)
  │
  ├─── Cloudflare Hyperdrive  ──►  Postgres (Neon / Supabase / self-managed)
  │
  └─── (optional) LLM Proxy  ──►  Anthropic / OpenAI / Gemini / Ollama / …
```

All traffic runs on **Cloudflare's edge network** — no cold starts, globally distributed. The only stateful service is your Postgres database.

---

## 2. API — Four-Layer DDD

The API (`api/src/`) follows **Domain-Driven Design** with a strict four-layer dependency rule: outer layers depend inward, never the reverse.

### Layer 1 — Domain

`api/src/domain/`

Pure business logic — no framework, no database imports.

| Subdirectory | Contents |
|---|---|
| `shared/` | `types.ts` (enums, value objects), `errors.ts` (domain error classes) |
| `user/` | `User` entity, `IUserRepository` port |
| `tenant/` | `Tenant` aggregate, `ITenantRepository` port, member + role management |
| `project/` | `Project` aggregate, `IProjectRepository` port |
| `task/` | `Task` entity, `ITaskRepository` port, status/priority transitions |
| `agent/` | `Agent` entity, `IAgentRepository` port |
| `skill/` | `Skill` entity, `ISkillRepository` port |
| `execution/` | `Execution` aggregate with formal state machine, `IExecutionRepository` |
| `audit/` | `AuditEvent`, `IAuditRepository` |

**State machine (Execution):**
```
PENDING ──► SUBMITTED ──► RUNNING ──► COMPLETED
                                  └──► FAILED
PENDING / SUBMITTED / RUNNING ──► CANCELLED
```

### Layer 2 — Application

`api/src/application/`

Use-case services. Depend on domain ports (interfaces), never on concrete implementations.

| Service | Responsibility |
|---|---|
| `AuthService` | User registration, API-key issuance, JWT sign/verify |
| `ProjectService` | CRUD + scaffold |
| `TaskService` | CRUD + status transitions |
| `TenantService` | Tenant CRUD, member management, subscription |
| `AgentService` | Agent + skill registration, discovery |
| `RuntimeService` | Execution submission, state callbacks, streaming |
| `AuditService` | Event recording |
| `LlmProxyService` | Model pool routing, failover, usage tracking |

### Layer 3 — Infrastructure

`api/src/infrastructure/`

Concrete adapters — depend on application ports.

| Subdirectory | Contents |
|---|---|
| `auth/` | `JwtService` (HMAC-SHA-256, Web Crypto), `HashService` (PBKDF2 passwords, bcrypt-compatible API keys), `MfaService` (TOTP — AES-GCM encrypted secrets, recovery codes) |
| `database/` | Drizzle ORM schema, Cloudflare Hyperdrive connection factory |
| `relay/` | `ClawRelayDO` — Durable Object WebSocket broker |
| `repositories/` | Drizzle/Postgres implementations of all domain ports |

### Layer 4 — Presentation

`api/src/presentation/`

Hono routes + middleware. Depends on application services.

| Route file | Path prefix | Notes |
|---|---|---|
| `authRoutes.ts` | `/api/auth` | Public registration + token exchange |
| `projectRoutes.ts` | `/api/projects` | CRUD + scaffold + insights |
| `taskRoutes.ts` | `/api/tasks` | CRUD + status |
| `tenantRoutes.ts` | `/api/tenants` | Tenant + member + subscription management |
| `clawRoutes.ts` | `/api/claws` | Claw CRUD, directories, file browser, relay forward |
| `agentRoutes.ts` | `/api/agents` | Agent + skill CRUD |
| `runtimeRoutes.ts` | `/api/runtime` | Execution lifecycle + WebSocket stream + timeline events |
| `specRoutes.ts` | `/api/specs` | Planning document CRUD |
| `workflowRoutes.ts` | `/api/workflows` | Workflow DAG CRUD |
| `approvalRoutes.ts` | `/api/approvals` | Human-in-the-loop gates |
| `auditRoutes.ts` | `/api/audit` | Immutable event log |
| `chatRoutes.ts` | `/api/chats`, `/api/claws/:id/messages` | Chat session persistence |
| `skillAssignmentRoutes.ts` | `/api/skill-assignments` | Tenant + claw skill assignments |
| `llmRoutes.ts` | `/llm/v1` | OpenAI-compatible LLM proxy |
| `marketplaceRoutes.ts` | `/marketplace` | Public skills registry + auth |
| `adminRoutes.ts` | `/api/admin` | Superadmin panel |

**Middleware:**
- `cors.ts` — configurable origin allowlist (`CORS_ORIGINS` secret)
- `errorHandler.ts` — structured error responses, logs to `apiErrorLog` table
- `authMiddleware.ts` — verifies JWT, injects `userId` + `tenantId` into context
- `superAdminMiddleware.ts` — verifies `sa: true` claim in JWT

---

## 3. Frontend — Lit 3 SPA

`app/src/`

The SPA is built with **Lit 3** (web components) and **Vite**, served by a minimal Cloudflare static asset Worker.

### Key files

| File | Description |
|------|-------------|
| `app.ts` | Root `<ccl-app>` — auth state machine + client-side routing |
| `api.ts` | Typed fetch wrapper — manages JWT refresh, dispatches `ccl:unauthorized` event |
| `gateway.ts` | `ClawGateway` — WebSocket client for the relay DO |
| `main.ts` | Entry point — registers all custom elements |
| `styles.css` | Design system — CSS custom properties, zero utility framework dependency |

### Views

| View file | Route | Description |
|-----------|-------|-------------|
| `dashboard.ts` | `/` | Overview — projects, tasks, claw status |
| `projects.ts` | `/projects` | Project list + CRUD |
| `tasks.ts` | `/tasks` | Task board + CRUD |
| `claws.ts` | `/claws` | Claw registry |
| `agents.ts` | `/agents` | Agent + skill management |
| `workspace.ts` | `/workspace` | Multi-claw workspace |
| `brain.ts` | `/brain` | AI project assistant (conversational UI) |
| `logs.ts` | `/logs` | Execution logs with visual timeline + raw output toggle |
| `code-editor.ts` | `/code-editor` | Browser-based file browser / editor |
| `skills.ts` | `/skills` | Marketplace skill browser |
| `admin.ts` | `/admin` | Superadmin panel |
| `auth.ts` | `/login`, `/register` | Auth forms |
| `quickstart.ts` | `/quickstart` | Interactive install wizard |
| `content.ts` | `/content` | Markdown content viewer |
| `debug.ts` | `/debug` | Dev diagnostics |

### Claw panel views (`src/views/claw/`)

| File | Description |
|------|-------------|
| `chat.ts` | Live chat with the connected claw |
| `agents.ts` | Agent fleet within the claw |
| `config.ts` | Claw configuration editor |
| `sessions.ts` | Session list + history browser |
| `channels.ts` | Connected messaging channels |
| `claw-logs.ts` | Real-time log stream |
| `claw-skills.ts` | Skills installed on the claw |
| `usage.ts` | Context window + token usage graphs |
| `nodes.ts` | Multi-node claw topology |
| `cron.ts` | Scheduled claw tasks |
| `instances.ts` | Multiple claw instances in tenant |
| `workspace.ts` | Claw workspace overview |
| `projects.ts` | Projects linked to claw |
| `execution-timeline.ts` | Visual execution timeline — chronological event graph with agent steps, tool calls, and sub-agent delegation |

---

## 4. Real-Time Relay — Durable Objects

The `ClawRelayDO` is a Cloudflare **Durable Object** — a stateful serverless primitive that maintains a persistent WebSocket connection per Claw.

```
coderClaw runtime
  │  wss://api.coderclaw.ai/api/relay/:clawId?key=<apiKey>
  ▼
ClawRelayDO (one instance per Claw ID)
  │  Fanout to all connected browser clients
  ▼
Browser (portal)  ──  ClawGateway WebSocket client
```

**How it works:**
1. The coderClaw runtime opens a WebSocket to `/api/relay/:clawId?key=<apiKey>`.
2. The DO authenticates the claw API key, then keeps the connection alive.
3. Browser clients connect to the same DO endpoint (with a user JWT).
4. The DO fans out inbound frames (from the claw) to all connected browser clients.
5. The portal can push frames back to the claw (approvals, remote.task forwards).

**Persistence:** The DO persists chat messages (`POST /api/claws/:id/messages`), usage snapshots, and tool audit events to Postgres via REST callbacks on the API Worker.

---

## 5. Database Schema Overview

All tables use Postgres via Cloudflare Hyperdrive. Migrations are in `api/migrations/` and tracked in `_migrations`.

| Table | Purpose |
|-------|---------|
| `users` | Platform user accounts (email, password hash, username, MFA) |
| `auth_tokens` | One-time API keys issued at registration |
| `auth_user_sessions` | Active JWT sessions |
| `user_mfa_recovery_codes` | TOTP recovery codes (hashed) |
| `tenants` | Tenant organisations |
| `tenant_members` | User ↔ Tenant membership + role |
| `coderclaw_instances` | Registered Claw instances (API key hash) |
| `claw_projects` | Claw ↔ Project associations |
| `claw_directories` | Synced file-system directories per Claw |
| `claw_directory_files` | Files within synced directories |
| `claw_sync_history` | Directory sync events |
| `projects` | Project metadata |
| `tasks` | Task entities with status + priority |
| `agents` | Agent role definitions |
| `skills` | Agent skill registrations |
| `claw_skill_assignments` | Skills assigned to a specific Claw |
| `tenant_skill_assignments` | Skills assigned to a tenant (all Claws) |
| `executions` | Task execution lifecycle records |
| `execution_log_events` | Structured per-execution timeline events (agent steps, tool calls, sub-agent delegation) |
| `specs` | Planning documents (PRD + arch + tasks) |
| `workflows` | Multi-step execution DAGs |
| `workflow_tasks` | Individual steps within a workflow |
| `approvals` | Human-in-the-loop approval records |
| `audit_events` | Immutable audit trail |
| `chat_sessions` | Chat session metadata per Claw |
| `chat_messages` | Individual messages (role, content, seq) |
| `usage_snapshots` | Context window + token usage per session |
| `tool_audit_events` | Tool call records from claw runtimes |
| `marketplace_skills` | Published skills in the public registry |
| `marketplace_skill_likes` | User ↔ Skill likes |
| `llm_usage_log` | Per-request LLM usage for billing |
| `llm_failover_log` | LLM provider failover events |
| `api_error_log` | API error events for admin health view |
| `newsletter_subscribers` | Newsletter opt-in records |
| `newsletter_templates` | Email templates |
| `newsletter_events` | Send events |
| `legal_documents` | Versioned ToS / Privacy Policy |
| `privacy_requests` | GDPR/CCPA data request records |

---

## 6. Authentication & Security

### Three auth schemes

| Scheme | Used by | Mechanism |
|--------|---------|-----------|
| User JWT | Browser portal | HMAC-SHA-256 signed, 24h expiry, carries `userId`, `tenantId`, `role` |
| Claw API key | Agent runtime | PBKDF2-hashed key stored in `coderclaw_instances.api_key_hash` |
| Marketplace JWT | Marketplace users | HMAC-SHA-256, 24h expiry, carries `sub`, `tid: 0` (no tenant scope) |

All cryptography uses the **Web Crypto API** — no third-party auth libraries in the critical path.

### MFA (TOTP)

- Secret generated as 20 random bytes, base32-encoded
- Secret encrypted with AES-GCM-256 before storage (`MfaService.encryptSecretForStorage`)
- Recovery codes: 8 × 8-character codes, each hashed (SHA-256 + salt) before storage
- TOTP verified with a ±1 step tolerance window (30-second steps)

### RBAC enforcement

`authMiddleware` injects `role` into the Hono context. Route handlers call `requireRole(TenantRole.MANAGER)` as a middleware guard.

### GDPR / CCPA

- `POST /api/admin/privacy-requests` — users can submit deletion or export requests
- Requests are tracked with status (`pending` → `completed` → `closed`)
- Legal documents are versioned and stored in `legal_documents`

---

## 7. Repository Layout

```
coderClawLink/
├── api/                              # Cloudflare Worker – api.coderclaw.ai
│   ├── src/
│   │   ├── domain/                   # Layer 1 – pure business logic
│   │   │   ├── shared/               #   types.ts  errors.ts
│   │   │   ├── user/                 #   User entity + IUserRepository
│   │   │   ├── tenant/               #   Tenant aggregate + ITenantRepository
│   │   │   ├── project/              #   Project + IProjectRepository
│   │   │   ├── task/                 #   Task + ITaskRepository
│   │   │   ├── agent/                #   Agent + IAgentRepository
│   │   │   ├── skill/                #   Skill + ISkillRepository
│   │   │   ├── execution/            #   Execution state machine
│   │   │   └── audit/                #   AuditEvent + IAuditRepository
│   │   ├── application/              # Layer 2 – use-case services
│   │   │   ├── auth/AuthService.ts
│   │   │   ├── project/ProjectService.ts
│   │   │   ├── task/TaskService.ts
│   │   │   ├── tenant/TenantService.ts
│   │   │   ├── agent/AgentService.ts
│   │   │   ├── runtime/RuntimeService.ts
│   │   │   ├── audit/AuditService.ts
│   │   │   └── llm/LlmProxyService.ts
│   │   ├── infrastructure/           # Layer 3 – concrete adapters
│   │   │   ├── auth/                 #   JwtService  HashService  MfaService
│   │   │   ├── database/             #   schema.ts  connection.ts  (Drizzle)
│   │   │   ├── relay/                #   ClawRelayDO  (Durable Object)
│   │   │   └── repositories/         #   Postgres implementations
│   │   ├── presentation/             # Layer 4 – Hono routes + middleware
│   │   │   ├── middleware/           #   cors  errorHandler  authMiddleware  superAdminMiddleware
│   │   │   └── routes/               #   all route files (see Architecture § 2)
│   │   ├── env.ts                    # Worker Env + HonoEnv types
│   │   └── index.ts                  # Composition root + Worker export
│   ├── migrations/                   # SQL migration files (auto-applied on deploy)
│   ├── wrangler.toml
│   ├── drizzle.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── app/                              # Cloudflare Worker – app.coderclaw.ai
│   ├── src/
│   │   ├── app.ts                    # Root <ccl-app> web component + router
│   │   ├── api.ts                    # Typed fetch wrapper
│   │   ├── gateway.ts                # ClawGateway WebSocket client
│   │   ├── main.ts                   # Entry point
│   │   ├── styles.css                # Design system (CSS custom properties)
│   │   ├── components/               # Shared UI components
│   │   └── views/                    # Route-level view components
│   │       └── claw/                 # Claw panel views
│   ├── static/                       # Built SPA output (committed, served by Worker)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.ui.json
│   ├── wrangler.toml
│   └── package.json
│
├── Dockerfile                        # Multi-stage: base › dev / deploy / migrate
├── docker-compose.yml                # Profiles: dev  deploy  migrate
├── pnpm-workspace.yaml
└── package.json                      # Workspace root
```

---

## 8. Design Principles

### Domain-Driven Design (DDD)
- Rich aggregates enforce invariants (e.g. `Execution` rejects invalid state transitions)
- Repositories are **port interfaces** in the domain layer; implementations live in infrastructure
- Application services receive ports via dependency injection — no `new ConcreteRepo()` in business logic

### SOLID
- **S** — one concern per file (e.g. `JwtService` vs `HashService` vs `MfaService`)
- **O** — adding a new route does not modify existing routes
- **D** — services depend on interfaces, not on `DrizzleUserRepository` directly

### N-Layer rule
```
Domain  ←  Application  ←  Infrastructure
                        ←  Presentation
```
Outer layers may depend inward; inner layers must never import from outer ones.

### Zero-framework auth
All cryptographic operations use the **Web Crypto API** (`crypto.subtle.*`), which is available natively in Cloudflare Workers. This eliminates `jsonwebtoken`, `bcrypt`, and similar npm dependencies from the auth critical path.

---

## 9. Data Flow Examples

### Agent executes a task

```
coderClaw runtime
  ─[POST /api/runtime/executions]──► API Worker
       RuntimeService.submit()
       INSERT executions (status=SUBMITTED)
       ─[relay: forward to claw DO]──► ClawRelayDO ──► claw WebSocket

coderClaw runtime processes task
  ─[POST /api/runtime/executions/:id/events {eventType:"agent_start", agentRole:"orchestrator"}]──► API Worker
       INSERT execution_log_events

  ─[POST /api/runtime/executions/:id/events {eventType:"tool_call", label:"read_file", detail:"..."}]──► API Worker
       INSERT execution_log_events

  (repeat for each step / sub-agent / tool result)

  ─[PATCH /api/runtime/executions/:id/state {status:"completed"}]──► API Worker
       RuntimeService.updateState()
       UPDATE executions (status=COMPLETED)
       ─[relay: broadcast status_change]──► ClawRelayDO ──► browser portal

Browser portal receives status_change via ClawGateway WebSocket
  → Updates execution status in the UI
  → User opens Logs view, expands execution
  → GET /api/runtime/executions/:id/events
  → <ccl-execution-timeline> renders vertical timeline with colour-coded event types,
     agent role badges, per-step durations, expandable JSON payloads,
     and a mini progress bar showing event density over the run's duration
```

### Human-in-the-loop approval

```
coderClaw runtime (wants to delete a file)
  ─[POST /api/claws/:id/approval-request?key=]──► API Worker
       INSERT approvals (status=pending)
       ─[relay: approval.request frame]──► ClawRelayDO ──► browser portal

Browser portal shows approval notification
  Manager clicks "Approve"
  ─[PATCH /api/approvals/:id {status:"approved"}]──► API Worker
       UPDATE approvals (status=approved)
       ─[relay: approval.decision frame]──► ClawRelayDO ──► claw WebSocket

coderClaw runtime receives approval.decision
  → Proceeds with the approved action
```

### Marketplace skill install

```
Browser portal
  ─[GET /marketplace/skills?category=code-quality]──► API Worker
       Returns published skills with author info

User selects "ts-linter"
  ─[POST /api/skill-assignments/tenant {slug:"ts-linter"}]──► API Worker
       INSERT tenant_skill_assignments
       Returns {ok: true}

coderClaw runtime (on next sync)
  ─[GET /api/claws/fleet?from=&key=]──► API Worker
       Returns tenant skill assignments
  → Loads the skill from the assignment
```
