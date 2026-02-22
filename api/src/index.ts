/**
 * Cloudflare Worker entry point – api.coderclaw.ai
 *
 * All infrastructure dependencies are wired per-request via a factory so
 * each Worker invocation gets its own short-lived Hyperdrive connection.
 *
 * Layer order (outermost → innermost):
 *   Presentation → Application → Domain ← Infrastructure
 */
import { Hono } from 'hono';
import type { Env } from './env';

import { buildDatabase } from './infrastructure/database/connection';
import { ProjectRepository } from './infrastructure/repositories/ProjectRepository';
import { TaskRepository } from './infrastructure/repositories/TaskRepository';
import { TenantRepository } from './infrastructure/repositories/TenantRepository';

import { ProjectService } from './application/project/ProjectService';
import { TaskService } from './application/task/TaskService';
import { TenantService } from './application/tenant/TenantService';

import { createProjectRoutes } from './presentation/routes/projectRoutes';
import { createTaskRoutes } from './presentation/routes/taskRoutes';
import { createTenantRoutes } from './presentation/routes/tenantRoutes';
import { corsMiddleware } from './presentation/middleware/cors';
import { errorHandler } from './presentation/middleware/errorHandler';

// ---------------------------------------------------------------------------
// Composition root: build the full Hono app for a single request,
// injecting the concrete infrastructure implementations.
// ---------------------------------------------------------------------------

function buildApp(env: Env): Hono<{ Bindings: Env }> {
  const db = buildDatabase(env);

  // Infrastructure
  const projectRepo = new ProjectRepository(db);
  const taskRepo    = new TaskRepository(db);
  const tenantRepo  = new TenantRepository(db);

  // Application
  const projectService = new ProjectService(projectRepo);
  const taskService    = new TaskService(taskRepo, projectRepo);
  const tenantService  = new TenantService(tenantRepo);

  // Presentation
  const app = new Hono<{ Bindings: Env }>();

  app.use('*', corsMiddleware);

  app.get('/health', (c) => c.json({ status: 'ok', worker: 'api.coderclaw.ai' }));

  app.route('/api/projects', createProjectRoutes(projectService));
  app.route('/api/tasks',    createTaskRoutes(taskService));
  app.route('/api/tenants',  createTenantRoutes(tenantService));

  app.onError(errorHandler);
  app.notFound((c) => c.json({ error: 'Not found' }, 404));

  return app;
}

// ---------------------------------------------------------------------------
// Worker export
// ---------------------------------------------------------------------------

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext): Response | Promise<Response> {
    return buildApp(env).fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
