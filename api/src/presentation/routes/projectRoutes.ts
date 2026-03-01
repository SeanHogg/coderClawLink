import { Hono } from 'hono';
import { and, eq } from 'drizzle-orm';
import { ProjectService } from '../../application/project/ProjectService';
import type { HonoEnv } from '../../env';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';
import { ProjectStatus, TenantRole } from '../../domain/shared/types';
import type { Db } from '../../infrastructure/database/connection';
import { clawProjects, coderclawInstances, projects, tenants } from '../../infrastructure/database/schema';

/**
 * Presentation layer: Project HTTP routes.
 *
 * Maps between HTTP request/response and the application service.
 * No business logic lives here.
 */
export function createProjectRoutes(projectService: ProjectService, db: Db): Hono<HonoEnv> {
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

  const deriveProjectName = (prompt: string) => {
    const cleaned = prompt
      .replace(/^[\s\-–—:]+|[\s\-–—:]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!cleaned) return 'New Project';
    const title = cleaned.split(/[.!?]/)[0]?.trim() ?? cleaned;
    return title.split(' ').slice(0, 6).join(' ').replace(/^[a-z]/, (c) => c.toUpperCase());
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
      key?: string;
      name: string;
      description?: string | null;
      rootWorkingDirectory?: string | null;
      githubRepoUrl?: string | null;
    }>();
    const tenantId = c.get('tenantId');
    const name = body.name?.trim();
    if (!name) return c.json({ error: 'name is required' }, 400);

    const project = await projectService.createProject({
      key:           body.key?.trim() || buildProjectKey(tenantId, name),
      name,
      description:   body.description,
      rootWorkingDirectory: body.rootWorkingDirectory,
      githubRepoUrl: body.githubRepoUrl,
      tenantId,
    });
    return c.json(project.toPlain(), 201);
  });

  // POST /api/projects/upsert
  router.post('/upsert', async (c) => {
    const tenantId = c.get('tenantId');
    const body = await c.req.json<{
      name: string;
      description?: string | null;
      rootWorkingDirectory?: string | null;
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
          rootWorkingDirectory: body.rootWorkingDirectory,
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
      rootWorkingDirectory: body.rootWorkingDirectory,
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

  // POST /api/projects/scaffold
  router.post('/scaffold', async (c) => {
    const tenantId = c.get('tenantId');
    const body = await c.req.json<{
      prompt: string;
      rootWorkingDirectory?: string | null;
      clawId?: number | null;
    }>();

    const prompt = body.prompt?.trim();
    if (!prompt) return c.json({ error: 'prompt is required' }, 400);

    const name = deriveProjectName(prompt);
    const rootWorkingDirectory = body.rootWorkingDirectory?.trim() || null;

    const existingProjects = await projectService.listProjects(tenantId);
    const existing = existingProjects.find((project) => normalizeName(project.name) === normalizeName(name));

    const project = existing
      ? await projectService.updateProject(
          existing.id,
          { description: prompt, rootWorkingDirectory },
          tenantId,
        )
      : await projectService.createProject({
          tenantId,
          key: buildProjectKey(tenantId, name),
          name,
          description: prompt,
          rootWorkingDirectory,
        });

    let selectedClawId: number | null = null;

    const [projectAssigned] = await db
      .select({ clawId: clawProjects.clawId })
      .from(clawProjects)
      .where(and(eq(clawProjects.tenantId, tenantId), eq(clawProjects.projectId, project.id)))
      .limit(1);

    if (projectAssigned) {
      selectedClawId = projectAssigned.clawId;
    } else {
      const requestedClawId = body.clawId ?? null;
      const [tenantRow] = await db
        .select({ defaultClawId: tenants.defaultClawId })
        .from(tenants)
        .where(eq(tenants.id, tenantId))
        .limit(1);

      const defaultCandidate = requestedClawId ?? tenantRow?.defaultClawId ?? null;
      if (defaultCandidate) {
        const [claw] = await db
          .select({ id: coderclawInstances.id })
          .from(coderclawInstances)
          .where(and(eq(coderclawInstances.id, defaultCandidate), eq(coderclawInstances.tenantId, tenantId)))
          .limit(1);

        if (claw) {
          selectedClawId = claw.id;
          await db
            .insert(clawProjects)
            .values({ tenantId, clawId: claw.id, projectId: project.id, role: 'default' })
            .onConflictDoUpdate({
              target: [clawProjects.tenantId, clawProjects.clawId, clawProjects.projectId],
              set: { updatedAt: new Date() },
            });
        }
      }
    }

    const finalProject = selectedClawId === null
      ? await projectService.updateProject(project.id, { status: ProjectStatus.ON_HOLD }, tenantId)
      : await projectService.updateProject(project.id, { status: ProjectStatus.ACTIVE }, tenantId);

    return c.json({
      project: finalProject.toPlain(),
      scaffold: {
        clawId: selectedClawId,
        wip: selectedClawId === null,
        synced: selectedClawId !== null,
      },
    });
  });

  // DELETE /api/projects/:id
  router.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await projectService.deleteProject(id, c.get('tenantId'));
    return c.body(null, 204);
  });

  return router;
}
