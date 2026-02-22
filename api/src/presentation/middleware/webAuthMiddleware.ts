import { MiddlewareHandler } from 'hono';
import type { HonoEnv } from '../../env';
import { UnauthorizedError } from '../../domain/shared/errors';
import { verifyWebJwt } from '../../infrastructure/auth/JwtService';

/**
 * Web/marketplace JWT middleware.
 *
 * Reads `Authorization: Bearer <webToken>`, verifies the HS256 signature,
 * and injects only `userId` into the Hono context.
 *
 * Unlike `authMiddleware`, this does NOT require a tenantId / role claim –
 * web tokens are issued during email+password registration/login.
 */
export const webAuthMiddleware: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const authHeader = c.req.header('Authorization') ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or malformed Authorization header');
  }

  const token = authHeader.slice(7);
  let payload;
  try {
    payload = await verifyWebJwt(token, c.env.JWT_SECRET);
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }

  c.set('userId', payload.sub);
  await next();
};
