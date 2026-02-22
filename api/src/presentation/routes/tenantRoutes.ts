import { Hono } from 'hono';
import { TenantService } from '../../application/tenant/TenantService';
import { TenantRole } from '../../domain/shared/types';
import type { HonoEnv } from '../../env';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';

export function createTenantRoutes(tenantService: TenantService): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();
  router.use('*', authMiddleware);

  // GET /api/tenants
  router.get('/', async (c) => {
    const tenants = await tenantService.listTenants();
    return c.json(tenants.map(t => t.toPlain()));
  });

  // GET /api/tenants/:id
  router.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const tenant = await tenantService.getTenant(id);
    return c.json(tenant.toPlain());
  });

  // POST /api/tenants
  router.post('/', async (c) => {
    const body = await c.req.json<{ name: string; ownerUserId: string }>();
    const tenant = await tenantService.createTenant(body);
    return c.json(tenant.toPlain(), 201);
  });

  // POST /api/tenants/:id/members
  router.post('/:id/members', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<{
      actorUserId: string;
      newUserId: string;
      role: TenantRole;
    }>();
    const tenant = await tenantService.addMember(
      id,
      body.actorUserId,
      body.newUserId,
      body.role,
    );
    return c.json(tenant.toPlain());
  });

  // DELETE /api/tenants/:id/members/:userId
  router.delete('/:id/members/:userId', async (c) => {
    const id = Number(c.req.param('id'));
    const userId = c.req.param('userId');
    const { actorUserId } = await c.req.json<{ actorUserId: string }>();
    const tenant = await tenantService.removeMember(id, actorUserId, userId);
    return c.json(tenant.toPlain());
  });

  // DELETE /api/tenants/:id
  router.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await tenantService.deleteTenant(id);
    return c.body(null, 204);
  });

  return router;
}
