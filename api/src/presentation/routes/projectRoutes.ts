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

  const normalizeName = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');
  const buildProjectKey = (tenantId: number, name: string) => {
    const slug = name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 36) || 'PROJECT';
    return `${tenantId}-${slug}`.slice(0, 50);
  };

  // GET /api/projects
  router.get('/', async (c) => {
    const projects = await projectService.listProjects(c.get('tenantId'));
    return c.json({ projects: projects.map(p => p.toPlain()) });
  });

  // GET /api/projects/:id
  router.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const project = await projectService.getProject(id, c.get('tenantId'));
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
    const project = await projectService.createProject({
      key:           body.key,
      name:          body.name,
      description:   body.description,
      githubRepoUrl: body.githubRepoUrl,
      tenantId:      c.get('tenantId'),   // always from JWT, never from body
    });
    return c.json(project.toPlain(), 201);
  });

  // POST /api/projects/upsert
  router.post('/upsert', async (c) => {
    const tenantId = c.get('tenantId');
    const body = await c.req.json<{
      name: string;
      description?: string | null;
      githubRepoUrl?: string | null;
    }>();

    const name = body.name?.trim();
    if (!name) return c.json({ error: 'name is required' }, 400);

    const projects = await projectService.listProjects(tenantId);
    const existing = projects.find((project) => normalizeName(project.name) === normalizeName(name));

    if (existing) {
      const updated = await projectService.updateProject(
        existing.id,
        {
          name,
          description: body.description,
          githubRepoUrl: body.githubRepoUrl,
        },
        tenantId,
      );
      return c.json({ action: 'updated', project: updated.toPlain() });
    }

    const created = await projectService.createProject({
      tenantId,
      key: buildProjectKey(tenantId, name),
      name,
      description: body.description,
      githubRepoUrl: body.githubRepoUrl,
    });

    return c.json({ action: 'created', project: created.toPlain() }, 201);
  });

  // PATCH /api/projects/:id
  router.patch('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const project = await projectService.updateProject(id, body, c.get('tenantId'));
    return c.json(project.toPlain());
  });

  // DELETE /api/projects/:id
  router.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await projectService.deleteProject(id, c.get('tenantId'));
    return c.body(null, 204);
  });

  return router;
}
