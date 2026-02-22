# coderClawLink

| Worker | Domain |
|--------|--------|
| `app/` | `app.coderclaw.ai` – static SPA frontend |
| `api/` | `api.coderclaw.ai` – REST API + Postgres |

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
