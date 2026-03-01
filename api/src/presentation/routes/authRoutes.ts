import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { AuthService } from '../../application/auth/AuthService';
import type { HonoEnv } from '../../env';
import { webAuthMiddleware } from '../middleware/webAuthMiddleware';
import { TenantRole, type UserId } from '../../domain/shared/types';
import { coderclawInstances } from '../../infrastructure/database/schema';
import { hashSecret } from '../../infrastructure/auth/HashService';
import { signJwt } from '../../infrastructure/auth/JwtService';
import type { Db } from '../../infrastructure/database/connection';

/**
 * Auth routes – no auth middleware on the entry points.
 *
 * API-key flow (SDK / CLI):
 *   POST /api/auth/register  – create user + get API key (one-time)
 *   POST /api/auth/token     – exchange API key + tenantId for JWT (backward compat / claw auth)
 *
 * Web / marketplace flow (email + password):
 *   POST /api/auth/web/register   – create account, returns WebJWT + user
 *   POST /api/auth/web/login      – verify password, returns WebJWT + user
 *   GET  /api/auth/my-tenants     – list tenants the caller belongs to (WebJWT required)
 *   POST /api/auth/tenant-token   – exchange WebJWT + tenantId for tenant-scoped JWT
 *   GET  /api/auth/me             – return caller's profile (WebJWT required)
 */
export function createAuthRoutes(authService: AuthService, db: Db): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();

  // POST /api/auth/register
  router.post('/register', async (c) => {
    const body = await c.req.json<{ email: string; tenantId: number }>();
    const result = await authService.register(body);
    return c.json({
      user:   result.user,
      apiKey: result.apiKey,
      note:   'Save your API key – it will not be shown again.',
    }, 201);
  });

  // POST /api/auth/token
  router.post('/token', async (c) => {
    const body = await c.req.json<{ apiKey: string; tenantId: number }>();
    const result = await authService.login(body.apiKey, body.tenantId);
    return c.json({ token: result.token, expiresIn: result.expiresIn });
  });

  // -------------------------------------------------------------------------
  // Web / marketplace auth
  // -------------------------------------------------------------------------

  // POST /api/auth/web/register
  router.post('/web/register', async (c) => {
    const body = await c.req.json<{ email: string; username: string; password: string }>();
    if (!body.email || !body.username || !body.password) {
      return c.json({ error: 'email, username and password are required' }, 400);
    }
    const result = await authService.registerWeb(body);
    return c.json(result, 201);
  });

  // POST /api/auth/web/login
  router.post('/web/login', async (c) => {
    const body = await c.req.json<{ email: string; password: string }>();
    if (!body.email || !body.password) {
      return c.json({ error: 'email and password are required' }, 400);
    }
    const result = await authService.loginWeb(body);
    return c.json(result);
  });

  // GET /api/auth/me  (requires WebJWT)
  router.get('/me', webAuthMiddleware, async (c) => {
    const userId = c.get('userId') as UserId;
    const user = await authService.getMe(userId);
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json({ user });
  });

  // POST /api/auth/claw-token – a CoderClaw instance authenticates with its API key
  // Returns a tenant-scoped JWT so the claw can call all tenant APIs.
  router.post('/claw-token', async (c) => {
    const body = await c.req.json<{ apiKey: string }>();
    if (!body.apiKey) return c.json({ error: 'apiKey is required' }, 400);

    const keyHash = await hashSecret(body.apiKey);
    const [claw] = await db
      .select()
      .from(coderclawInstances)
      .where(eq(coderclawInstances.apiKeyHash, keyHash))
      .limit(1);

    if (!claw || claw.status !== 'active') {
      return c.json({ error: 'Invalid or inactive API key' }, 401);
    }

    const expiresIn = 3600;
    const token = await signJwt(
      { sub: `claw:${claw.id}`, tid: claw.tenantId, role: TenantRole.DEVELOPER },
      c.env.JWT_SECRET,
      expiresIn,
    );
    return c.json({ token, expiresIn, clawId: claw.id, tenantId: claw.tenantId });
  });

  // GET /api/auth/my-tenants  (requires WebJWT)
  router.get('/my-tenants', webAuthMiddleware, async (c) => {
    const userId = c.get('userId') as string;
    const result = await authService.myTenants(userId);
    return c.json(result);
  });

  // POST /api/auth/tenant-token  (requires WebJWT + body: { tenantId })
  router.post('/tenant-token', webAuthMiddleware, async (c) => {
    const userId = c.get('userId') as string;
    const body = await c.req.json<{ tenantId: number }>();
    if (!body.tenantId) return c.json({ error: 'tenantId is required' }, 400);
    const result = await authService.tenantToken(userId, body.tenantId);
    return c.json(result);
  });

  return router;
}
