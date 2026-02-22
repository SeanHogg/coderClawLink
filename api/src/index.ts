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
import type { Env, HonoEnv } from './env';

import { buildDatabase } from './infrastructure/database/connection';

// Repositories
import { ProjectRepository }   from './infrastructure/repositories/ProjectRepository';
import { TaskRepository }       from './infrastructure/repositories/TaskRepository';
import { TenantRepository }     from './infrastructure/repositories/TenantRepository';
import { UserRepository }       from './infrastructure/repositories/UserRepository';
import { AgentRepository }      from './infrastructure/repositories/AgentRepository';
import { SkillRepository }       from './infrastructure/repositories/SkillRepository';
import { ExecutionRepository }  from './infrastructure/repositories/ExecutionRepository';
import { AuditRepository }      from './infrastructure/repositories/AuditRepository';

// Application services
import { ProjectService }  from './application/project/ProjectService';
import { TaskService }     from './application/task/TaskService';
import { TenantService }   from './application/tenant/TenantService';
import { AuthService }     from './application/auth/AuthService';
import { AgentService }    from './application/agent/AgentService';
import { RuntimeService }  from './application/runtime/RuntimeService';
import { AuditService }    from './application/audit/AuditService';

// Routes
import { createProjectRoutes }     from './presentation/routes/projectRoutes';
import { createTaskRoutes }        from './presentation/routes/taskRoutes';
import { createTenantRoutes }      from './presentation/routes/tenantRoutes';
import { createAuthRoutes }        from './presentation/routes/authRoutes';
import { createAgentRoutes, createSkillRoutes } from './presentation/routes/agentRoutes';
import { createRuntimeRoutes }     from './presentation/routes/runtimeRoutes';
import { createAuditRoutes }       from './presentation/routes/auditRoutes';
import { createMarketplaceRoutes } from './presentation/routes/marketplaceRoutes';

// Middleware
import { corsMiddleware } from './presentation/middleware/cors';
import { errorHandler }   from './presentation/middleware/errorHandler';

// ---------------------------------------------------------------------------
// Composition root: build the full Hono app for a single request,
// injecting the concrete infrastructure implementations.
// ---------------------------------------------------------------------------

function buildApp(env: Env): Hono<HonoEnv> {
  const db = buildDatabase(env);

  // --- Infrastructure ---
  const projectRepo   = new ProjectRepository(db);
  const taskRepo      = new TaskRepository(db);
  const tenantRepo    = new TenantRepository(db);
  const userRepo      = new UserRepository(db);
  const agentRepo     = new AgentRepository(db);
  const skillRepo      = new SkillRepository(db);
  const executionRepo = new ExecutionRepository(db);
  const auditRepo     = new AuditRepository(db);

  // --- Application ---
  const projectService  = new ProjectService(projectRepo);
  const taskService     = new TaskService(taskRepo, projectRepo);
  const tenantService   = new TenantService(tenantRepo);
  const authService     = new AuthService(userRepo, tenantRepo, auditRepo, env.JWT_SECRET);
  const agentService    = new AgentService(agentRepo, skillRepo, auditRepo);
  const runtimeService  = new RuntimeService(executionRepo, taskRepo, agentRepo, auditRepo);
  const auditService    = new AuditService(auditRepo);

  // --- Presentation ---
  const app = new Hono<HonoEnv>();

  app.use('*', corsMiddleware);

  app.get('/health', (c) => c.json({ status: 'ok', worker: 'api.coderclaw.ai' }));

  // Marketplace (no JWT required for read, required for write)
  app.route('/marketplace', createMarketplaceRoutes(db));

  // Public endpoints (no JWT required)
  app.route('/api/auth',    createAuthRoutes(authService));

  // Protected endpoints (JWT injected by authMiddleware inside each router)
  app.route('/api/projects', createProjectRoutes(projectService));
  app.route('/api/tasks',    createTaskRoutes(taskService));
  app.route('/api/tenants',  createTenantRoutes(tenantService));
  app.route('/api/agents',   createAgentRoutes(agentService));
  app.route('/api/skills',   createSkillRoutes(agentService));
  app.route('/api/runtime',  createRuntimeRoutes(runtimeService));
  app.route('/api/audit',    createAuditRoutes(auditService));

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
