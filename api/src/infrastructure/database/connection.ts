import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import type { Env } from '../../env';

export type Db = PostgresJsDatabase<typeof schema>;

/**
 * Build a Drizzle database instance from a Cloudflare Hyperdrive binding.
 *
 * Hyperdrive provides a connection-pooled, authenticated connection string
 * pointing to the real Postgres instance.  Using `max: 1` is required inside
 * a Cloudflare Worker because persistent connections are not supported.
 */
export function buildDatabase(env: Env): Db {
  const client = postgres(env.HYPERDRIVE.connectionString, {
    max: 1,
    // Disable prepare – Hyperdrive proxies do not support extended query protocol.
    prepare: false,
  });
  return drizzle(client, { schema });
}
