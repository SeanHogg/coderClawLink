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
import {
  coderclawInstances,
  clawProjects,
  clawDirectories,
  clawDirectoryFiles,
  projects,
} from '../../infrastructure/database/schema';
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

  const hashPath = async (value: string): Promise<string> => {
    const bytes = new TextEncoder().encode(value.trim().toLowerCase());
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const verifyClawApiKey = async (id: number, key?: string) => {
    if (!key) return null;
    const [claw] = await db
      .select({
        id: coderclawInstances.id,
        tenantId: coderclawInstances.tenantId,
        apiKeyHash: coderclawInstances.apiKeyHash,
      })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.id, id));
    if (!claw) return null;
    const valid = await verifySecret(key, claw.apiKeyHash);
    return valid ? claw : null;
  };

  // GET /api/claws – list all claws for the current tenant
  router.get('/', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const rows = await db
      .select({
        id:           coderclawInstances.id,
        name:         coderclawInstances.name,
        slug:         coderclawInstances.slug,
        status:       coderclawInstances.status,
        registeredBy: coderclawInstances.registeredBy,
        connectedAt:  coderclawInstances.connectedAt,
        lastSeenAt:   coderclawInstances.lastSeenAt,
        createdAt:    coderclawInstances.createdAt,
      })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.tenantId, tenantId));
    return c.json({ claws: rows });
  });

  // POST /api/claws – register a new CoderClaw instance
  // Returns the plaintext API key once – it is never stored in plaintext.
  router.post('/', authMiddleware as never, async (c) => {
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
  router.delete('/:id', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const id       = Number(c.req.param('id'));
    await db
      .delete(coderclawInstances)
      .where(and(eq(coderclawInstances.id, id), eq(coderclawInstances.tenantId, tenantId)));
    return c.body(null, 204);
  });

  // GET /api/claws/:id/projects – list projects associated with this claw
  router.get('/:id/projects', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const id = Number(c.req.param('id'));

    const rows = await db
      .select({
        id: projects.id,
        key: projects.key,
        name: projects.name,
        description: projects.description,
        status: projects.status,
        createdAt: projects.createdAt,
      })
      .from(clawProjects)
      .innerJoin(projects, eq(projects.id, clawProjects.projectId))
      .where(
        and(
          eq(clawProjects.tenantId, tenantId),
          eq(clawProjects.clawId, id),
        ),
      );

    return c.json({ projects: rows });
  });

  // PUT /api/claws/:id/projects/:projectId – associate project with claw
  router.put('/:id/projects/:projectId', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const clawId = Number(c.req.param('id'));
    const projectId = Number(c.req.param('projectId'));

    const [project] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.tenantId, tenantId)));
    if (!project) return c.json({ error: 'Project not found in tenant' }, 404);

    await db
      .insert(clawProjects)
      .values({ tenantId, clawId, projectId, role: 'default' })
      .onConflictDoUpdate({
        target: [clawProjects.tenantId, clawProjects.clawId, clawProjects.projectId],
        set: { updatedAt: new Date() },
      });

    return c.json({ ok: true });
  });

  // DELETE /api/claws/:id/projects/:projectId – unassociate project from claw
  router.delete('/:id/projects/:projectId', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const clawId = Number(c.req.param('id'));
    const projectId = Number(c.req.param('projectId'));

    await db
      .delete(clawProjects)
      .where(
        and(
          eq(clawProjects.tenantId, tenantId),
          eq(clawProjects.clawId, clawId),
          eq(clawProjects.projectId, projectId),
        ),
      );

    return c.body(null, 204);
  });

  // GET /api/claws/:id/directories – list synced directory manifest entries
  router.get('/:id/directories', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const clawId = Number(c.req.param('id'));

    const rows = await db
      .select({
        id: clawDirectories.id,
        projectId: clawDirectories.projectId,
        absPath: clawDirectories.absPath,
        status: clawDirectories.status,
        errorMessage: clawDirectories.errorMessage,
        metadata: clawDirectories.metadata,
        lastSeenAt: clawDirectories.lastSeenAt,
        lastSyncedAt: clawDirectories.lastSyncedAt,
        updatedAt: clawDirectories.updatedAt,
      })
      .from(clawDirectories)
      .where(
        and(
          eq(clawDirectories.tenantId, tenantId),
          eq(clawDirectories.clawId, clawId),
        ),
      );

    return c.json({ directories: rows });
  });

  // GET /api/claws/:id/directories/:directoryId/files – list synced files
  router.get('/:id/directories/:directoryId/files', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const clawId = Number(c.req.param('id'));
    const directoryId = Number(c.req.param('directoryId'));

    const files = await db
      .select({
        relPath: clawDirectoryFiles.relPath,
        contentHash: clawDirectoryFiles.contentHash,
        sizeBytes: clawDirectoryFiles.sizeBytes,
        updatedAt: clawDirectoryFiles.updatedAt,
      })
      .from(clawDirectoryFiles)
      .where(
        and(
          eq(clawDirectoryFiles.tenantId, tenantId),
          eq(clawDirectoryFiles.clawId, clawId),
          eq(clawDirectoryFiles.directoryId, directoryId),
        ),
      );

    return c.json({ files });
  });

  // GET /api/claws/:id/directories/:directoryId/files/content?path=...
  router.get('/:id/directories/:directoryId/files/content', authMiddleware as never, async (c) => {
    const tenantId = c.get('tenantId') as number;
    const clawId = Number(c.req.param('id'));
    const directoryId = Number(c.req.param('directoryId'));
    const relPath = c.req.query('path')?.trim();
    if (!relPath) return c.json({ error: 'path is required' }, 400);

    const [file] = await db
      .select({
        relPath: clawDirectoryFiles.relPath,
        content: clawDirectoryFiles.content,
        contentHash: clawDirectoryFiles.contentHash,
        updatedAt: clawDirectoryFiles.updatedAt,
      })
      .from(clawDirectoryFiles)
      .where(
        and(
          eq(clawDirectoryFiles.tenantId, tenantId),
          eq(clawDirectoryFiles.clawId, clawId),
          eq(clawDirectoryFiles.directoryId, directoryId),
          eq(clawDirectoryFiles.relPath, relPath),
        ),
      );

    if (!file) return c.json({ error: 'File not found' }, 404);
    return c.json(file);
  });

  // PUT /api/claws/:id/directories/sync – startup/full/delta sync from local gateway
  // Authentication: API key via ?key= query param.
  router.put('/:id/directories/sync', async (c) => {
    const clawId = Number(c.req.param('id'));
    const key = c.req.query('key');
    const claw = await verifyClawApiKey(clawId, key);
    if (!claw) return c.text('Unauthorized', 401);

    const body = await c.req.json<{
      projectId?: number | null;
      absPath: string;
      status?: 'pending' | 'synced' | 'error';
      metadata?: Record<string, unknown>;
      errorMessage?: string | null;
      files?: Array<{
        relPath: string;
        contentHash?: string;
        sizeBytes?: number;
        content?: string;
      }>;
    }>();

    const absPath = body.absPath?.trim();
    if (!absPath) return c.json({ error: 'absPath is required' }, 400);

    const pathHash = await hashPath(absPath);
    const [directory] = await db
      .insert(clawDirectories)
      .values({
        tenantId: claw.tenantId,
        clawId,
        projectId: body.projectId ?? null,
        absPath,
        pathHash,
        status: body.status ?? 'pending',
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
        errorMessage: body.errorMessage ?? null,
        lastSeenAt: new Date(),
        lastSyncedAt: body.status === 'synced' ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [clawDirectories.tenantId, clawDirectories.clawId, clawDirectories.pathHash],
        set: {
          projectId: body.projectId ?? null,
          absPath,
          status: body.status ?? 'pending',
          metadata: body.metadata ? JSON.stringify(body.metadata) : null,
          errorMessage: body.errorMessage ?? null,
          lastSeenAt: new Date(),
          lastSyncedAt: body.status === 'synced' ? new Date() : clawDirectories.lastSyncedAt,
          updatedAt: new Date(),
        },
      })
      .returning({ id: clawDirectories.id });

    if (!directory) {
      return c.json({ error: 'Unable to persist directory manifest entry' }, 500);
    }

    if (body.files?.length) {
      const fileRows = body.files
        .filter((file) => file.relPath?.trim())
        .map((file) => ({
          tenantId: claw.tenantId,
          clawId,
          directoryId: directory.id,
          relPath: file.relPath,
          contentHash: file.contentHash ?? '',
          sizeBytes: file.sizeBytes ?? (file.content ? file.content.length : 0),
          content: file.content ?? null,
          updatedAt: new Date(),
        }));

      for (const row of fileRows) {
        await db
          .insert(clawDirectoryFiles)
          .values(row)
          .onConflictDoUpdate({
            target: [clawDirectoryFiles.directoryId, clawDirectoryFiles.relPath],
            set: {
              contentHash: row.contentHash,
              sizeBytes: row.sizeBytes,
              content: row.content,
              updatedAt: row.updatedAt,
            },
          });
      }
    }

    return c.json({ ok: true, directoryId: directory.id });
  });

  // -------------------------------------------------------------------------
  // PATCH /api/claws/:id/heartbeat – claw keepalive, updates lastSeenAt
  // Called periodically by ClawLinkRelayService via HTTP alongside the WS.
  // Authentication: API key via ?key= query param (same as upstream WS).
  // -------------------------------------------------------------------------
  router.patch('/:id/heartbeat', async (c) => {
    const id  = Number(c.req.param('id'));
    const key = c.req.query('key');

    const claw = await verifyClawApiKey(id, key);
    if (!claw) return c.text('Unauthorized', 401);

    await db
      .update(coderclawInstances)
      .set({ lastSeenAt: new Date() })
      .where(eq(coderclawInstances.id, id));

    return c.json({ ok: true });
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

    const claw = await verifyClawApiKey(id, key);
    if (!claw) return c.text('Unauthorized', 401);

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
