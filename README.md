# coderClawLink

Cloudflare Workers bridge that connects AI agents to projects and tasks, with auth, RBAC, runtime execution tracking, and a full audit trail.

| Worker | Domain |
|--------|--------|
| `app/` | `app.coderclaw.ai` – static SPA frontend |
| `api/` | `api.coderclaw.ai` – REST API + Postgres |

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
│   │   │   └── repositories/         #   Postgres implementations of all domain ports
│   │   ├── presentation/             # Layer 4 – HTTP (Hono routes + middleware)
│   │   │   ├── middleware/           #   cors  errorHandler  authMiddleware
│   │   │   └── routes/               #   auth  projects  tasks  tenants
│   │   │                             #   agents  skills  runtime  audit
│   │   ├── env.ts                    # Worker Env + HonoEnv types
│   │   └── index.ts                  # Composition root + Worker export
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
| Auth | HMAC-SHA-256 JWT (Web Crypto API — no npm dependency) |
| Frontend | Vanilla HTML/CSS/JS |

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
| `GET` | `/api/runtime/executions/:id` | Get execution state |
| `POST` | `/api/runtime/executions/:id/cancel` | Cancel execution |
| `PATCH` | `/api/runtime/executions/:id/state` | Agent callback: update state (`completed` supports optional `codeChanges`) |
| `GET` | `/api/runtime/tasks/:taskId/executions` | Execution history for task |

### Audit (MANAGER+ only)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/audit/events` | Tenant-wide event log |
| `GET` | `/api/audit/users/:userId/activity` | User activity log |

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

### Prerequisites

- Node.js + [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm i -g wrangler`)
- Cloudflare account with a zone for `coderclaw.ai`
- External Postgres database (Neon, Supabase, etc.)

### 1. Install dependencies

```bash
npm install
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

### 3. Create Hyperdrive binding

```bash
wrangler hyperdrive create coderclawlink-db \
  --connection-string="postgres://user:pass@host/db"
```

Paste the returned `id` into `api/wrangler.toml` under `[[hyperdrive]]`.

### 4. Set JWT secret

```bash
wrangler secret put JWT_SECRET   # enter a 32+ char random string
```

### 5. Run migrations

```bash
cd api && npx drizzle-kit migrate
```

### 6. Local development

```bash
# api
cd api && wrangler dev
# app (separate terminal)
cd app && wrangler dev
```

### 7. Deploy

```bash
cd api && wrangler deploy
cd app && wrangler deploy
```

---

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `HYPERDRIVE` binding | `api/wrangler.toml` | CF Hyperdrive ID |
| `CORS_ORIGINS` | `wrangler secret put CORS_ORIGINS` | Allowed origins |
| `ENVIRONMENT` | `api/wrangler.toml` `[vars]` | `production` or `development` |
| `JWT_SECRET` | `wrangler secret put JWT_SECRET` | JWT signing key (32+ chars) |


## Architecture

```
coderClawLink/
├── api/                          # Cloudflare Worker – api.coderclaw.ai
│   ├── src/
│   │   ├── domain/               # Layer 1 – pure business logic, no deps
│   │   │   ├── shared/           #   types.ts, errors.ts
│   │   │   ├── project/          #   Project entity + IProjectRepository port
│   │   │   ├── task/             #   Task entity + ITaskRepository port
│   │   │   └── tenant/           #   Tenant aggregate + ITenantRepository port
│   │   ├── application/          # Layer 2 – use-case services (DI via interfaces)
│   │   │   ├── project/ProjectService.ts
│   │   │   ├── task/TaskService.ts
│   │   │   └── tenant/TenantService.ts
│   │   ├── infrastructure/       # Layer 3 – concrete adapters
│   │   │   ├── database/         #   Drizzle schema + Hyperdrive connection
│   │   │   └── repositories/     #   Postgres implementations of domain ports
│   │   ├── presentation/         # Layer 4 – HTTP (Hono routes + middleware)
│   │   │   ├── middleware/        #   cors.ts, errorHandler.ts
│   │   │   └── routes/           #   projectRoutes, taskRoutes, tenantRoutes
│   │   ├── env.ts                # Worker Env interface
│   │   └── index.ts              # Composition root + Worker export
│   ├── wrangler.toml
│   ├── drizzle.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── app/                          # Cloudflare Worker – app.coderclaw.ai
│   ├── src/index.ts              # Worker entry (serves static assets)
│   ├── static/                   # SPA served by [assets] binding
│   │   ├── index.html
│   │   ├── app.js
│   │   └── styles.css
│   ├── wrangler.toml
│   ├── package.json
│   └── tsconfig.json
│
└── package.json                  # pnpm workspace root
```

## Design Principles

- **DDD** – rich entities with invariants; repositories as port interfaces
- **SOLID** – services depend on interfaces (D), single-responsibility per file (S)
- **N-Layer** – Domain → Application → Infrastructure / Presentation (outer depends inward)

## Tech Stack

| Concern | Technology |
|---------|-----------|
| Runtime | Cloudflare Workers (TypeScript) |
| Routing | Hono |
| ORM | Drizzle ORM |
| DB | Postgres via Cloudflare Hyperdrive |
| Frontend | Vanilla HTML/CSS/JS (no framework) |

## Setup

### Prerequisites

- Node.js 20+ / pnpm 9+
- `wrangler` authenticated (`wrangler login`)
- Postgres database accessible from the internet (Neon, Supabase, etc.)

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

### 3. Migrate database

```bash
pnpm db:generate                 # generate SQL from Drizzle schema
DATABASE_URL=postgres://... pnpm --filter api exec drizzle-kit push
```

### 4. Local dev

```bash
pnpm dev:api    # http://localhost:8787
pnpm dev:app    # http://localhost:8788
```

### 5. Deploy

```bash
pnpm deploy     # deploys both workers
```

## Environment Variables (Cloudflare Dashboard → Secrets)

| Variable | Worker | Description |
|----------|--------|-------------|
| `CORS_ORIGINS` | api | Comma-separated origins, e.g. `https://app.coderclaw.ai` |
| `ENVIRONMENT` | api | `production` or `development` |
| `API_URL` | app | `https://api.coderclaw.ai` |
