import { MiddlewareHandler } from 'hono';
import type { HonoEnv } from '../../env';

/**
 * CORS middleware.
 *
 * Reads allowed origins from the CORS_ORIGINS environment variable
 * (comma-separated).  Strict: rejects requests from unlisted origins.
 */
export const corsMiddleware: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const origin = c.req.header('Origin') ?? '';
  const allowed = (c.env.CORS_ORIGINS ?? 'https://app.coderclaw.ai')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const isAllowed = allowed.includes(origin);

  if (c.req.method === 'OPTIONS') {
    if (!isAllowed) {
      return c.newResponse(null, 403);
    }
    return c.newResponse(null, 204, {
      'Access-Control-Allow-Origin':  origin,
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Max-Age':       '86400',
      Vary: 'Origin',
    });
  }

  await next();

  if (isAllowed) {
    c.res.headers.set('Access-Control-Allow-Origin', origin);
    c.res.headers.set('Vary', 'Origin');
  }
};
