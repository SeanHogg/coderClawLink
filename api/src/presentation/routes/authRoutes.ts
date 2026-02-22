import { Hono } from 'hono';
import { AuthService } from '../../application/auth/AuthService';
import type { HonoEnv } from '../../env';
import { webAuthMiddleware } from '../middleware/webAuthMiddleware';
import type { UserId } from '../../domain/shared/types';

/**
 * Auth routes – no auth middleware on the entry points.
 *
 * API-key flow (SDK / CLI):
 *   POST /api/auth/register  – create user + get API key (one-time)
 *   POST /api/auth/token     – exchange API key for JWT
 *
 * Web / marketplace flow (email + password):
 *   POST /api/auth/web/register – create web user, returns WebJWT + user
 *   POST /api/auth/web/login    – verify password, returns WebJWT + user
 *   GET  /api/auth/me           – return caller's profile (WebJWT required)
 */
export function createAuthRoutes(authService: AuthService): Hono<HonoEnv> {
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

  return router;
}
