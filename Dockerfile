# ── Build / deploy image ──────────────────────────────────────────────────────
FROM node:22-alpine AS base

# wrangler needs git for some operations
RUN apk add --no-cache git

WORKDIR /app

# Copy manifests first for layer-cache efficiency
COPY package.json ./
COPY api/package.json ./api/
COPY app/package.json ./app/

# Install all workspace deps
RUN npm install --workspaces --include-workspace-root

# Copy source
COPY api/ ./api/
COPY app/ ./app/

# ── Deploy target ─────────────────────────────────────────────────────────────
# Usage:
#   docker compose run --rm deploy
#
# Required env vars (pass via .env or -e):
#   CLOUDFLARE_API_TOKEN
#   CLOUDFLARE_ACCOUNT_ID
#
FROM base AS deploy
CMD ["sh", "-c", \
  "npm run --workspace=api deploy && npm run --workspace=app deploy"]

# ── Dev target (used by docker compose up) ────────────────────────────────────
FROM base AS dev
# No CMD – overridden per-service in docker-compose.yml
