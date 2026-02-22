import { MiddlewareHandler } from 'hono';
import type { HonoEnv } from '../../env';
import { TenantRole, hasMinRole } from '../../domain/shared/types';
import { UnauthorizedError, ForbiddenError } from '../../domain/shared/errors';
import { verifyJwt } from '../../infrastructure/auth/JwtService';

/**
 * JWT authentication middleware.
 *
 * Reads `Authorization: Bearer <token>`, verifies it, and injects
 * `userId`, `tenantId`, and `role` into Hono context variables.
 *
 * Apply to any route that requires a logged-in user.
 */
export const authMiddleware: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const authHeader = c.req.header('Authorization') ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or malformed Authorization header');
  }

  const token = authHeader.slice(7);
  let payload;
  try {
    payload = await verifyJwt(token, c.env.JWT_SECRET);
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }

  c.set('userId',   payload.sub);
  c.set('tenantId', payload.tid);
  c.set('role',     payload.role);

  await next();
};

/**
 * Role-gating middleware factory.
 *
 * Usage:
 *   router.delete('/:id', authMiddleware, requireRole(TenantRole.MANAGER), handler)
 */
export function requireRole(minimum: TenantRole): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const role = c.get('role') as TenantRole;
    if (!hasMinRole(role, minimum)) {
      throw new ForbiddenError(
        `Requires at least '${minimum}' role, caller has '${role}'`,
      );
    }
    await next();
  };
}
