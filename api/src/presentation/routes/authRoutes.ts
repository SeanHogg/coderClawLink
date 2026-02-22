import { Hono } from 'hono';
import { AuthService } from '../../application/auth/AuthService';
import type { HonoEnv } from '../../env';

/**
 * Auth routes – no auth middleware here (these are the entry points).
 *
 * POST /api/auth/register  – create user + get API key (one-time)
 * POST /api/auth/token     – exchange API key for JWT
 */
export function createAuthRoutes(authService: AuthService): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();

  // POST /api/auth/register
  router.post('/register', async (c) => {
    const body = await c.req.json<{ email: string; tenantId: number }>();
    const result = await authService.register(body);
    // Return the API key once – stored only as a hash in the DB
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

  return router;
}
