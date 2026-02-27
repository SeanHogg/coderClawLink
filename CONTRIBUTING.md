# Contributing to CoderClawLink

## Quick Links

- **GitHub:** https://github.com/seanhogg/coderclawlink
- **Discord:** https://discord.gg/qkhbAGHRBT
- **X/Twitter:** [@coderclaw](https://x.com/coderclaw)

---

## Project Structure

CoderClawLink is a pnpm workspace with two Cloudflare Worker packages:

```
coderclawlink/
├── api/        # api.coderclaw.ai — Hono REST API + Durable Objects + Postgres
└── app/        # app.coderclaw.ai — Vite + Lit SPA + static asset Worker
```

### `api/` — Backend

Four-layer DDD architecture: **Domain → Application → Infrastructure ← Presentation**

| Layer | Path | Description |
|-------|------|-------------|
| Domain | `src/domain/` | Pure business logic — entities, aggregates, port interfaces |
| Application | `src/application/` | Use-case services — depend on domain ports, not concretions |
| Infrastructure | `src/infrastructure/` | Drizzle/Postgres repos, JWT/Hash services, Durable Objects |
| Presentation | `src/presentation/` | Hono routes + middleware |

### `app/` — Frontend

Lit 3 web components built with Vite.

| Path | Description |
|------|-------------|
| `src/app.ts` | Root `<ccl-app>` — auth state machine + routing |
| `src/api.ts` | Typed fetch wrapper — manages JWT, dispatches `ccl:unauthorized` |
| `src/gateway.ts` | `ClawGateway` — WebSocket client for the claw relay |
| `src/views/` | Management views (projects, tasks, claws, skills, workspace, logs) |
| `src/views/claw/` | Claw panel views (chat, agents, config, sessions, etc.) |
| `src/styles.css` | Design system — CSS custom properties, no utility framework |

---

## Development Setup

### Prerequisites

- Node.js 20+, pnpm 9+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) authenticated (`wrangler login`)
- Postgres database (Neon, Supabase, etc.) accessible from the internet

### Install

```sh
pnpm install
```

### Local development

Three processes — run each in a separate terminal:

```sh
# 1. API Worker (http://localhost:8787)
pnpm dev:api

# 2. App Worker / static asset server (http://localhost:8788)
pnpm dev:app

# 3. Vite dev server for the UI (http://localhost:5173, proxies /api → 8787)
pnpm --filter app dev:ui
```

> For most UI work you only need terminals 1 and 3.
> `dev:ui` hot-reloads on save; `dev:app` serves the built `static/` output.

### Build the UI

```sh
pnpm --filter app build
# outputs to app/static/ — committed and served by the app Worker
```

### Type-check everything

```sh
pnpm --filter app type-check    # checks both tsconfig.json and tsconfig.ui.json
pnpm --filter api exec tsc --noEmit
```

### Database migrations

```sh
pnpm db:generate                              # generate SQL from Drizzle schema
DATABASE_URL=postgres://... pnpm db:migrate   # apply migrations
```

---

## Releasing / Deploying

Versions follow the **`YYYY.M.D`** scheme (e.g. `2026.2.27`). Always bump before deploying.

### Steps

1. **Bump version** in all three `package.json` files (root, `api/`, `app/`) to today's date:

   ```sh
   # root package.json
   # api/package.json
   # app/package.json
   # — set "version": "YYYY.M.D" in all three
   ```

2. **Run DB migrations** if the schema changed:

   ```sh
   DATABASE_URL=postgres://... pnpm db:migrate
   ```

3. **Deploy both workers:**

   ```sh
   pnpm --filter api run deploy    # wrangler deploy
   pnpm --filter app run deploy    # vite build && wrangler deploy
   ```

   > Use `pnpm --filter <pkg> run deploy` (not `pnpm --filter <pkg> deploy`) — pnpm has its
   > own `deploy` command that conflicts with the npm script name.

### Checklist before deploying

- [ ] Version bumped in root, `api/`, and `app/` `package.json`
- [ ] `pnpm --filter app build` succeeds with no errors
- [ ] DB migration run if `schema.ts` changed
- [ ] Wrangler authenticated (`wrangler whoami`)

---

## How to Contribute

1. **Bugs & small fixes** → Open a PR directly.
2. **New features / architecture** → Open a [GitHub Discussion](https://github.com/seanhogg/coderclawlink/discussions) or ask in Discord first.
3. **Questions** → Discord `#setup-help`.

---

## Before You PR

- Test locally against a real CoderClaw instance if your change touches the relay or claw panel.
- Run `pnpm --filter app build` — the PR should not break the Vite build.
- Keep PRs focused: one concern per PR, no unrelated cleanups mixed in.
- Describe **what** changed and **why**.

---

## Lit Decorator Style

The UI uses Lit with **legacy** decorators. Keep the existing style for reactive fields:

```ts
@state() private items: Project[] = [];
@property() clawId = "";
@property({ type: Number }) count = 0;
```

Both `tsconfig.ui.json` files are configured with `experimentalDecorators: true` and
`useDefineForClassFields: false`. Do not change these without also updating the build tooling.

---

## AI/Vibe-Coded PRs Welcome!

Built with Claude, Codex, or another AI tool? Great — just mark it:

- [ ] AI-assisted label in the PR title or description
- [ ] Note the degree of testing (untested / lightly tested / fully tested)
- [ ] Include prompts or session logs if possible
- [ ] Confirm you understand what the code does

AI PRs are first-class here. We just want transparency so reviewers know what to look for.

---

## Report a Vulnerability

Report security issues directly via GitHub:

- **CoderClawLink API / relay** — [seanhogg/coderclawlink](https://github.com/seanhogg/coderclawlink)
- **CoderClaw core** — [seanhogg/coderclaw](https://github.com/seanhogg/coderclaw)

For issues that don't fit a specific repo, email **security@coderclaw.ai**.

### Required in Reports

1. Title
2. Severity assessment
3. Impact
4. Affected component
5. Technical reproduction steps
6. Demonstrated impact
7. Environment
8. Remediation advice

Reports without reproduction steps and demonstrated impact will be deprioritized.
