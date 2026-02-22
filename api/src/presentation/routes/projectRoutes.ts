import { Hono } from 'hono';
import { ProjectService } from '../../application/project/ProjectService';
import type { HonoEnv } from '../../env';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';
import { TenantRole } from '../../domain/shared/types';

/**
 * Presentation layer: Project HTTP routes.
 *
 * Maps between HTTP request/response and the application service.
 * No business logic lives here.
 */
export function createProjectRoutes(projectService: ProjectService): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();
  router.use('*', authMiddleware);

  // GET /api/projects
  router.get('/', async (c) => {
    const projects = await projectService.listProjects();
    return c.json(projects.map(p => p.toPlain()));
  });

  // GET /api/projects/:id
  router.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const project = await projectService.getProject(id);
    return c.json(project.toPlain());
  });

  // POST /api/projects
  router.post('/', async (c) => {
    const body = await c.req.json<{
      key: string;
      name: string;
      description?: string | null;
      githubRepoUrl?: string | null;
    }>();
    const project = await projectService.createProject(body);
    return c.json(project.toPlain(), 201);
  });

  // PATCH /api/projects/:id
  router.patch('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const project = await projectService.updateProject(id, body);
    return c.json(project.toPlain());
  });

  // DELETE /api/projects/:id
  router.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await projectService.deleteProject(id);
    return c.body(null, 204);
  });

  return router;
}
