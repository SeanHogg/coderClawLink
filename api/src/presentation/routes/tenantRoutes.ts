import { Hono } from 'hono';
import { and, eq } from 'drizzle-orm';
import { TenantService } from '../../application/tenant/TenantService';
import { TenantRole, TenantBillingCycle } from '../../domain/shared/types';
import type { HonoEnv } from '../../env';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';
import { webAuthMiddleware } from '../middleware/webAuthMiddleware';
import type { Db } from '../../infrastructure/database/connection';
import { coderclawInstances, clawProjects } from '../../infrastructure/database/schema';

export function createTenantRoutes(tenantService: TenantService, db: Db): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();

  // GET /api/tenants/mine  – WebJWT required; returns tenants the caller belongs to
  // Used by the tenant picker immediately after login (before a tenant JWT exists)
  router.get('/mine', webAuthMiddleware, async (c) => {
    const userId = c.get('userId') as string;
    const result = await tenantService.listTenantsForUser(userId);
    return c.json({ tenants: result });
  });

  // POST /api/tenants/create  – WebJWT required; creates tenant + makes caller owner
  // Used from the tenant picker before the user has selected a tenant
  router.post('/create', webAuthMiddleware, async (c) => {
    const userId = c.get('userId') as string;
    const body   = await c.req.json<{ name: string }>();
    if (!body.name?.trim()) return c.json({ error: 'name is required' }, 400);
    const tenant = await tenantService.createTenant({ name: body.name, ownerUserId: userId });
    return c.json(tenant.toPlain(), 201);
  });

  // All routes below require a tenant-scoped JWT
  router.use('*', authMiddleware);

  // GET /api/tenants
  router.get('/', async (c) => {
    const tenants = await tenantService.listTenants();
    return c.json({ tenants: tenants.map(t => t.toPlain()) });
  });

  // GET /api/tenants/:id
  router.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const tenant = await tenantService.getTenant(id);
    return c.json(tenant.toPlain());
  });

  // GET /api/tenants/:id/default-claw
  router.get('/:id/default-claw', async (c) => {
    const id = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (id !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);
    const tenant = await tenantService.getTenant(id);
    return c.json({ defaultClawId: tenant.defaultClawId });
  });

  // PUT /api/tenants/:id/default-claw
  router.put('/:id/default-claw', requireRole(TenantRole.MANAGER), async (c) => {
    const id = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (id !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);

    const body = await c.req.json<{ clawId?: number | null }>();
    const clawId = body.clawId ?? null;

    if (clawId !== null) {
      const [claw] = await db
        .select({ id: coderclawInstances.id })
        .from(coderclawInstances)
        .where(
          and(
            eq(coderclawInstances.id, clawId),
            eq(coderclawInstances.tenantId, id),
          ),
        )
        .limit(1);
      if (!claw) return c.json({ error: 'Claw not found in workspace' }, 404);
    }

    const tenant = await tenantService.setDefaultClaw(id, clawId);
    return c.json({ defaultClawId: tenant.defaultClawId });
  });

  // GET /api/tenants/:id/subscription
  router.get('/:id/subscription', async (c) => {
    const tenantId = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (tenantId !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);

    const subscription = await tenantService.getSubscription(tenantId);
    return c.json(subscription);
  });

  // POST /api/tenants/:id/subscription/pro
  router.post('/:id/subscription/pro', requireRole(TenantRole.MANAGER), async (c) => {
    const tenantId = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (tenantId !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);

    const body = await c.req.json<{
      billingCycle: TenantBillingCycle;
      billingEmail: string;
      billingPaymentBrand: string;
      billingPaymentLast4: string;
    }>();

    if (
      !body.billingCycle ||
      !body.billingEmail ||
      !body.billingPaymentBrand ||
      !body.billingPaymentLast4
    ) {
      return c.json({ error: 'billingCycle, billingEmail, billingPaymentBrand and billingPaymentLast4 are required' }, 400);
    }

    const updated = await tenantService.activateProSubscription(tenantId, {
      billingCycle: body.billingCycle,
      billingEmail: body.billingEmail,
      billingPaymentBrand: body.billingPaymentBrand,
      billingPaymentLast4: body.billingPaymentLast4,
    });

    return c.json({ tenant: updated.toPlain() });
  });

  // POST /api/tenants/:id/subscription/free
  router.post('/:id/subscription/free', requireRole(TenantRole.MANAGER), async (c) => {
    const tenantId = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (tenantId !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);

    const updated = await tenantService.downgradeToFree(tenantId);
    return c.json({ tenant: updated.toPlain() });
  });

  // GET /api/tenants/:id/claws?status=online
  router.get('/:id/claws', async (c) => {
    const tenantId = Number(c.req.param('id'));
    const callerTenantId = c.get('tenantId') as number;
    if (tenantId !== callerTenantId) return c.json({ error: 'Forbidden' }, 403);

    const status = (c.req.query('status') ?? '').trim().toLowerCase();
    const rows = await db
      .select({
        id:           coderclawInstances.id,
        name:         coderclawInstances.name,
        slug:         coderclawInstances.slug,
        status:       coderclawInstances.status,
        connectedAt:  coderclawInstances.connectedAt,
        lastSeenAt:   coderclawInstances.lastSeenAt,
        capabilities: coderclawInstances.capabilities,
      })
      .from(coderclawInstances)
      .where(eq(coderclawInstances.tenantId, tenantId));

    const filtered = status === 'online'
      ? rows.filter((row) => row.connectedAt !== null)
      : rows;

    const claws = await Promise.all(
      filtered.map(async (row) => {
        const associatedProjects = await db
          .select({ projectId: clawProjects.projectId })
          .from(clawProjects)
          .where(
            and(
              eq(clawProjects.tenantId, tenantId),
              eq(clawProjects.clawId, row.id),
            ),
          );
        const capabilities: string[] = row.capabilities
          ? (JSON.parse(row.capabilities) as string[])
          : [];
        return {
          ...row,
          capabilities,
          capabilitySummary: {
            distributed: row.connectedAt !== null && associatedProjects.length > 1,
            remoteDispatch: row.connectedAt !== null && capabilities.includes('remote-dispatch'),
            projectCount: associatedProjects.length,
          },
          projectIds: associatedProjects.map((p) => p.projectId),
        };
      }),
    );

    return c.json({ claws });
  });

  // POST /api/tenants – create another tenant (caller must have a valid tenant JWT already)
  router.post('/', async (c) => {
    const userId = c.get('userId') as string;
    const body   = await c.req.json<{ name: string }>();
    if (!body.name?.trim()) return c.json({ error: 'name is required' }, 400);
    const tenant = await tenantService.createTenant({ name: body.name, ownerUserId: userId });
    return c.json(tenant.toPlain(), 201);
  });

  // POST /api/tenants/:id/members
  router.post('/:id/members', requireRole(TenantRole.MANAGER), async (c) => {
    const id   = Number(c.req.param('id'));
    const body = await c.req.json<{ newUserId: string; role: TenantRole }>();
    const actorUserId = c.get('userId') as string;
    const tenant = await tenantService.addMember(id, actorUserId, body.newUserId, body.role);
    return c.json(tenant.toPlain());
  });

  // DELETE /api/tenants/:id/members/:userId
  router.delete('/:id/members/:userId', requireRole(TenantRole.MANAGER), async (c) => {
    const id           = Number(c.req.param('id'));
    const targetUserId = c.req.param('userId');
    const actorUserId  = c.get('userId') as string;
    const tenant = await tenantService.removeMember(id, actorUserId, targetUserId);
    return c.json(tenant.toPlain());
  });

  // DELETE /api/tenants/:id
  router.delete('/:id', requireRole(TenantRole.OWNER), async (c) => {
    const id = Number(c.req.param('id'));
    await tenantService.deleteTenant(id);
    return c.body(null, 204);
  });

  return router;
}
