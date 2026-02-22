import type { TenantRole } from './domain/shared/types';

/** Cloudflare Worker environment bindings for the API worker. */
export interface Env {
  /** Hyperdrive binding – connection-pooled Postgres. */
  HYPERDRIVE: Hyperdrive;
  /** Comma-separated allowed CORS origins, e.g. "https://app.coderclaw.ai" */
  CORS_ORIGINS: string;
  /** "production" | "development" */
  ENVIRONMENT: string;
  /** Secret used to sign JWTs.  Set via `wrangler secret put JWT_SECRET`. */
  JWT_SECRET: string;
}

/** Variables injected into Hono context by the auth middleware. */
export interface Vars {
  userId:   string;
  tenantId: number;
  role:     TenantRole;
}

/** Combined Hono environment type used across the app. */
export type HonoEnv = { Bindings: Env; Variables: Vars };
