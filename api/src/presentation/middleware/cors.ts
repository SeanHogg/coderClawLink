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
  const corsOrigins = c.env.CORS_ORIGINS ?? 'https://app.coderclaw.ai';
  const allowAll = corsOrigins === '*';
  const allowed = allowAll
    ? []
    : corsOrigins.split(',').map((s) => s.trim()).filter(Boolean);
  const isAllowed = allowAll || allowed.includes(origin);

  if (c.req.method === 'OPTIONS') {
    if (!isAllowed) {
      return c.newResponse(null, 403);
    }
    return c.newResponse(null, 204, {
      'Access-Control-Allow-Origin': allowAll ? '*' : origin,
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    });
  }

  await next();

  // WebSocket upgrade responses (101 Switching Protocols) are immutable in
  // Cloudflare Workers — attempting to set headers throws. Skip CORS headers
  // for WebSocket upgrades; the browser does not enforce CORS on WS responses.
  const isWebSocket = c.req.header('Upgrade')?.toLowerCase() === 'websocket';
  if (isAllowed && !isWebSocket) {
    c.res.headers.set('Access-Control-Allow-Origin', allowAll ? '*' : origin);
    c.res.headers.set('Vary', 'Origin');
  }
};
