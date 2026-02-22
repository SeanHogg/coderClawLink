import { Context } from 'hono';
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  ForbiddenError,
} from '../../domain/shared/errors';

/**
 * Global error handler for the Hono application.
 *
 * Maps domain errors to HTTP status codes and returns a consistent JSON body.
 * Unknown errors are logged and surfaced as 500s.
 */
export function errorHandler(err: Error, c: Context): Response {
  if (err instanceof ValidationError) {
    return c.json({ error: err.message }, 400);
  }
  if (err instanceof NotFoundError) {
    return c.json({ error: err.message }, 404);
  }
  if (err instanceof ConflictError) {
    return c.json({ error: err.message }, 409);
  }
  if (err instanceof ForbiddenError) {
    return c.json({ error: err.message }, 403);
  }

  // Unexpected errors – avoid leaking internals in production
  console.error('[unhandled]', err);
  return c.json({ error: 'Internal server error' }, 500);
}
