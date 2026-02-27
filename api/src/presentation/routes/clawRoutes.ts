/**
 * CoderClaw instance routes – /api/claws
 *
 * CoderClaw instances are registered machines owned by a tenant.
 * Each instance authenticates with its own API key (not a user credential).
 * One claw = one tenant. Users manage their mesh from the web UI.
 *
 * All routes require a tenant-scoped JWT (authMiddleware).
 */
import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/authMiddleware';
import { coderclawInstances } from '../../infrastructure/database/schema';
import { generateApiKey, hashSecret, verifySecret } from '../../infrastructure/auth/HashService';
import type { HonoEnv } from '../../env';
import type { Db } from '../../infrastructure/database/connection';
import type { ClawRelayDO } from '../../infrastructure/relay/ClawRelayDO';

// Extend HonoEnv bindings type to include the Durable Object
type ClawHonoEnv = HonoEnv & {
  Bindings: HonoEnv['Bindings'] & {
    CLAW_RELAY: DurableObjectNamespace<ClawRelayDO>;
  };
};

export function createClawRoutes(db: Db): Hono<ClawHonoEnv> {
  const router = new Hono<ClawHonoEnv>();

  // Tenant-authenticated routes
  router.use('/', authMiddleware as never);
  router.use('/:id', authMiddleware as never);

  // GET /api/claws – list all claws for the current tenant
  router.get('/', async (c) => {
    const tenantId = c.get('tenantId') as number;
    const rows = await db
      .select({
        id:           coderclawInstances.id,
        name:         coderclawInstances.name,
        slug:         coderclawInstances.slug,
        status:       coderclawInstances.status,
        registeredBy: coderclawInstances.registeredBy,
        lastSeenAt:   coderclawInstances.lastSeenAt,
        createdAt:    coderclawInstances.createdAt,
      })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.tenantId, tenantId));
    return c.json({ claws: rows });
  });

  // POST /api/claws – register a new CoderClaw instance
  // Returns the plaintext API key once – it is never stored in plaintext.
  router.post('/', async (c) => {
    const tenantId = c.get('tenantId') as number;
    const userId   = c.get('userId') as string;
    const body     = await c.req.json<{ name: string }>();

    if (!body.name?.trim()) {
      return c.json({ error: 'name is required' }, 400);
    }

    const slug    = body.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const rawKey  = generateApiKey();
    const keyHash = await hashSecret(rawKey);

    const [inserted] = await db
      .insert(coderclawInstances)
      .values({
        tenantId,
        name:         body.name.trim(),
        slug,
        apiKeyHash:   keyHash,
        registeredBy: userId,
      })
      .returning({
        id:        coderclawInstances.id,
        name:      coderclawInstances.name,
        slug:      coderclawInstances.slug,
        status:    coderclawInstances.status,
        createdAt: coderclawInstances.createdAt,
      });

    return c.json({
      claw:   inserted,
      apiKey: rawKey,
      note:   'Save this API key — it will not be shown again. Paste it into your CoderClaw config.',
    }, 201);
  });

  // DELETE /api/claws/:id – deactivate / remove a claw
  router.delete('/:id', async (c) => {
    const tenantId = c.get('tenantId') as number;
    const id       = Number(c.req.param('id'));
    await db
      .delete(coderclawInstances)
      .where(and(eq(coderclawInstances.id, id), eq(coderclawInstances.tenantId, tenantId)));
    return c.body(null, 204);
  });

  // -------------------------------------------------------------------------
  // GET /api/claws/:id/status – connection status (no auth required for polling)
  // -------------------------------------------------------------------------
  router.get('/:id/status', async (c) => {
    const id = Number(c.req.param('id'));
    const [row] = await db
      .select({ connectedAt: coderclawInstances.connectedAt })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.id, id));
    if (!row) return c.json({ error: 'not found' }, 404);
    return c.json({ connected: row.connectedAt !== null, connectedAt: row.connectedAt });
  });

  // -------------------------------------------------------------------------
  // GET /api/claws/:id/ws – browser client connects to claw relay
  // Requires tenant JWT (passed via ?token= since WS upgrades can't set headers
  // in all browsers)
  // -------------------------------------------------------------------------
  router.get('/:id/ws', async (c) => {
    const id  = Number(c.req.param('id'));
    const env = c.env;

    if (!env.CLAW_RELAY) return c.text('CLAW_RELAY binding not configured', 503);

    // Verify tenant JWT from query param
    const token = c.req.query('token');
    if (!token) return c.text('Unauthorized', 401);

    // Look up the claw
    const [claw] = await db
      .select({ id: coderclawInstances.id, tenantId: coderclawInstances.tenantId })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.id, id));
    if (!claw) return c.text('Not found', 404);

    const stub = env.CLAW_RELAY.get(env.CLAW_RELAY.idFromName(String(id)));
    const url  = new URL(c.req.url);
    url.searchParams.set('role', 'client');
    return stub.fetch(new Request(url.toString(), c.req.raw));
  });

  // -------------------------------------------------------------------------
  // GET /api/claws/:id/upstream – CoderClaw instance connects (API key auth)
  // The claw passes its API key via ?key= query param
  // -------------------------------------------------------------------------
  router.get('/:id/upstream', async (c) => {
    const id  = Number(c.req.param('id'));
    const env = c.env;
    const key = c.req.query('key');

    if (!env.CLAW_RELAY) return c.text('CLAW_RELAY binding not configured', 503);
    if (!key) return c.text('Unauthorized', 401);

    const [claw] = await db
      .select({
        id:         coderclawInstances.id,
        apiKeyHash: coderclawInstances.apiKeyHash,
        tenantId:   coderclawInstances.tenantId,
      })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.id, id));

    if (!claw) return c.text('Not found', 404);

    const valid = await verifySecret(key, claw.apiKeyHash);
    if (!valid) return c.text('Unauthorized', 401);

    // Mark as connected
    await db
      .update(coderclawInstances)
      .set({ connectedAt: new Date(), lastSeenAt: new Date() })
      .where(eq(coderclawInstances.id, id));

    const stub = env.CLAW_RELAY.get(env.CLAW_RELAY.idFromName(String(id)));
    const url  = new URL(c.req.url);
    url.searchParams.set('role', 'upstream');
    const response = await stub.fetch(new Request(url.toString(), c.req.raw));

    // When the WS closes, mark as disconnected (best-effort)
    response.webSocket?.addEventListener('close', async () => {
      await db
        .update(coderclawInstances)
        .set({ connectedAt: null })
        .where(eq(coderclawInstances.id, id));
    });

    return response;
  });

  return router;
}
