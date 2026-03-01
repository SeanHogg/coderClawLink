import { Hono, type Context } from 'hono';
import { and, count, eq, inArray } from 'drizzle-orm';
import { ProjectService } from '../../application/project/ProjectService';
import type { HonoEnv } from '../../env';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';
import { ProjectStatus, TenantRole } from '../../domain/shared/types';
import type { Db } from '../../infrastructure/database/connection';
import { clawProjects, coderclawInstances, projects, sourceControlIntegrations, tasks, tenants } from '../../infrastructure/database/schema';

type SourceControlProvider = 'github' | 'bitbucket';

type ResolvedSourceControlAssignment = {
  sourceControlIntegrationId: number | null;
  sourceControlProvider: SourceControlProvider | null;
  sourceControlRepoFullName: string | null;
  sourceControlRepoUrl: string | null;
  githubRepoUrl: string | null;
};

type AssignmentResolveResult =
  | { ok: true; value: ResolvedSourceControlAssignment }
  | { ok: false; status: 400; message: string };

type ProjectRecommendation = {
  name: string;
  description: string;
};

type ChatCompletionPayload = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

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

  const deriveFallbackNameFromPrompt = (prompt: string) => {
    const domainMatch = prompt.match(/https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z0-9.-]+)+/);
    if (domainMatch?.[1]) {
      return domainMatch[1].trim();
    }
    return deriveProjectName(prompt);
  };

  const extractJsonObject = (content: string): string | null => {
    const trimmed = content.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    return trimmed.slice(start, end + 1);
  };

  const summarizePrompt = (prompt: string) => {
    const singleLine = prompt.replace(/\s+/g, ' ').trim();
    return singleLine.length > 420 ? `${singleLine.slice(0, 417)}...` : singleLine;
  };

  const recommendProjectFromPrompt = async (
    c: Context<HonoEnv>,
    prompt: string,
  ): Promise<ProjectRecommendation | null> => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return null;

    const llmUrl = new URL('/llm/v1/chat/completions', c.req.url).toString();
    const systemPrompt = [
      'You are a product planning assistant for software projects.',
      'Given a raw user prompt, produce a concise project name and summary.',
      'Return ONLY valid JSON with this exact shape:',
      '{"name":"string","description":"string"}',
      'Rules:',
      '- name: 1-4 words, concise, product-like, no punctuation suffixes.',
      '- If a domain is provided (e.g. burnrateos.com), infer the product name from it.',
      '- description: 1-3 sentences summarizing what should be built.',
      '- Do not include markdown or code fences.',
    ].join('\n');

    const llmResponse = await fetch(llmUrl, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stream: false,
        temperature: 0.2,
        max_tokens: 280,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!llmResponse.ok) return null;

    const payload = await llmResponse.json() as ChatCompletionPayload;
    const content = payload.choices?.[0]?.message?.content?.trim();
    if (!content) return null;

    const candidateJson = extractJsonObject(content);
    if (!candidateJson) return null;

    const parsed = JSON.parse(candidateJson) as Partial<ProjectRecommendation>;
    const name = parsed.name?.trim();
    const description = parsed.description?.trim();
    if (!name || !description) return null;

    return { name, description };
  };

  const resolveSourceControlAssignment = async (
    tenantId: number,
    input: {
      sourceControlIntegrationId?: number | null;
      sourceControlRepoFullName?: string | null;
      sourceControlRepoUrl?: string | null;
      githubRepoUrl?: string | null;
    },
    existing?: {
      sourceControlIntegrationId: number | null;
      sourceControlProvider: SourceControlProvider | null;
      sourceControlRepoFullName: string | null;
      sourceControlRepoUrl: string | null;
      githubRepoUrl: string | null;
    },
  ): Promise<AssignmentResolveResult> => {
    const hasScmInput =
      input.sourceControlIntegrationId !== undefined
      || input.sourceControlRepoFullName !== undefined
      || input.sourceControlRepoUrl !== undefined;

    if (!hasScmInput && input.githubRepoUrl === undefined) {
      return {
        ok: true,
        value: {
          sourceControlIntegrationId: existing?.sourceControlIntegrationId ?? null,
          sourceControlProvider: existing?.sourceControlProvider ?? null,
          sourceControlRepoFullName: existing?.sourceControlRepoFullName ?? null,
          sourceControlRepoUrl: existing?.sourceControlRepoUrl ?? null,
          githubRepoUrl: existing?.githubRepoUrl ?? null,
        },
      };
    }

    const integrationId = input.sourceControlIntegrationId !== undefined
      ? input.sourceControlIntegrationId
      : existing?.sourceControlIntegrationId ?? null;

    const repoFullName = input.sourceControlRepoFullName !== undefined
      ? input.sourceControlRepoFullName?.trim() || null
      : existing?.sourceControlRepoFullName ?? null;

    const explicitRepoUrl = input.sourceControlRepoUrl !== undefined
      ? input.sourceControlRepoUrl?.trim() || null
      : existing?.sourceControlRepoUrl ?? null;

    const explicitGithubRepoUrl = input.githubRepoUrl !== undefined
      ? input.githubRepoUrl?.trim() || null
      : existing?.githubRepoUrl ?? null;

    if (!integrationId) {
      return {
        ok: true,
        value: {
          sourceControlIntegrationId: null,
          sourceControlProvider: null,
          sourceControlRepoFullName: null,
          sourceControlRepoUrl: null,
          githubRepoUrl: explicitGithubRepoUrl,
        },
      };
    }

    const [integration] = await db
      .select({
        id: sourceControlIntegrations.id,
        provider: sourceControlIntegrations.provider,
      })
      .from(sourceControlIntegrations)
      .where(
        and(
          eq(sourceControlIntegrations.id, integrationId),
          eq(sourceControlIntegrations.tenantId, tenantId),
          eq(sourceControlIntegrations.isActive, true),
        ),
      )
      .limit(1);

    if (!integration) {
      return { ok: false, status: 400, message: 'Selected integration is not available for this workspace' };
    }

    if (!repoFullName) {
      return { ok: false, status: 400, message: 'sourceControlRepoFullName is required when assigning an integration' };
    }

    const provider = integration.provider as SourceControlProvider;
    const sourceControlRepoUrl = explicitRepoUrl
      ?? (provider === 'github'
        ? `https://github.com/${repoFullName}`
        : `https://bitbucket.org/${repoFullName}`);

    return {
      ok: true,
      value: {
        sourceControlIntegrationId: integration.id,
        sourceControlProvider: provider,
        sourceControlRepoFullName: repoFullName,
        sourceControlRepoUrl,
        githubRepoUrl: provider === 'github' ? (explicitGithubRepoUrl ?? sourceControlRepoUrl) : null,
      },
    };
  };

  // GET /api/projects
  router.get('/', async (c) => {
    const projectList = await projectService.listProjects(c.get('tenantId'));
    const plainProjects = projectList.map((project) => project.toPlain());

    if (plainProjects.length === 0) {
      return c.json({ projects: [] });
    }

    const projectIds = plainProjects.map((project) => project.id);
    const taskCounts = await db
      .select({
        projectId: tasks.projectId,
        taskCount: count(),
      })
      .from(tasks)
      .where(
        and(
          inArray(tasks.projectId, projectIds),
          eq(tasks.archived, false),
        ),
      )
      .groupBy(tasks.projectId);

    const taskCountByProject = new Map<number, number>(
      taskCounts.map((row) => [row.projectId, Number(row.taskCount)]),
    );

    return c.json({
      projects: plainProjects.map((project) => ({
        ...project,
        taskCount: taskCountByProject.get(project.id) ?? 0,
      })),
    });
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
      sourceControlIntegrationId?: number | null;
      sourceControlRepoFullName?: string | null;
      sourceControlRepoUrl?: string | null;
      githubRepoUrl?: string | null;
    }>();
    const tenantId = c.get('tenantId');
    const name = body.name?.trim();
    if (!name) return c.json({ error: 'name is required' }, 400);

    const assignment = await resolveSourceControlAssignment(tenantId, {
      sourceControlIntegrationId: body.sourceControlIntegrationId,
      sourceControlRepoFullName: body.sourceControlRepoFullName,
      sourceControlRepoUrl: body.sourceControlRepoUrl,
      githubRepoUrl: body.githubRepoUrl,
    });
    if (!assignment.ok) return c.json({ error: assignment.message }, assignment.status);

    const project = await projectService.createProject({
      key:           body.key?.trim() || buildProjectKey(tenantId, name),
      name,
      description:   body.description,
      rootWorkingDirectory: body.rootWorkingDirectory,
      sourceControlIntegrationId: assignment.value.sourceControlIntegrationId,
      sourceControlProvider: assignment.value.sourceControlProvider,
      sourceControlRepoFullName: assignment.value.sourceControlRepoFullName,
      sourceControlRepoUrl: assignment.value.sourceControlRepoUrl,
      githubRepoUrl: assignment.value.githubRepoUrl,
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
      sourceControlIntegrationId?: number | null;
      sourceControlRepoFullName?: string | null;
      sourceControlRepoUrl?: string | null;
      githubRepoUrl?: string | null;
    }>();

    const name = body.name?.trim();
    if (!name) return c.json({ error: 'name is required' }, 400);

    const projects = await projectService.listProjects(tenantId);
    const existing = projects.find((project) => normalizeName(project.name) === normalizeName(name));

    const assignment = await resolveSourceControlAssignment(
      tenantId,
      {
        sourceControlIntegrationId: body.sourceControlIntegrationId,
        sourceControlRepoFullName: body.sourceControlRepoFullName,
        sourceControlRepoUrl: body.sourceControlRepoUrl,
        githubRepoUrl: body.githubRepoUrl,
      },
      existing ? {
        sourceControlIntegrationId: existing.sourceControlIntegrationId,
        sourceControlProvider: existing.sourceControlProvider,
        sourceControlRepoFullName: existing.sourceControlRepoFullName,
        sourceControlRepoUrl: existing.sourceControlRepoUrl,
        githubRepoUrl: existing.githubRepoUrl,
      } : undefined,
    );
    if (!assignment.ok) return c.json({ error: assignment.message }, assignment.status);

    if (existing) {
      const updated = await projectService.updateProject(
        existing.id,
        {
          name,
          description: body.description,
          rootWorkingDirectory: body.rootWorkingDirectory,
          sourceControlIntegrationId: assignment.value.sourceControlIntegrationId,
          sourceControlProvider: assignment.value.sourceControlProvider,
          sourceControlRepoFullName: assignment.value.sourceControlRepoFullName,
          sourceControlRepoUrl: assignment.value.sourceControlRepoUrl,
          githubRepoUrl: assignment.value.githubRepoUrl,
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
      sourceControlIntegrationId: assignment.value.sourceControlIntegrationId,
      sourceControlProvider: assignment.value.sourceControlProvider,
      sourceControlRepoFullName: assignment.value.sourceControlRepoFullName,
      sourceControlRepoUrl: assignment.value.sourceControlRepoUrl,
      githubRepoUrl: assignment.value.githubRepoUrl,
    });

    return c.json({ action: 'created', project: created.toPlain() }, 201);
  });

  // PATCH /api/projects/:id
  router.patch('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const tenantId = c.get('tenantId');
    const body = await c.req.json<{
      name?: string;
      description?: string | null;
      rootWorkingDirectory?: string | null;
      status?: ProjectStatus;
      sourceControlIntegrationId?: number | null;
      sourceControlRepoFullName?: string | null;
      sourceControlRepoUrl?: string | null;
      githubRepoUrl?: string | null;
    }>();

    const existing = await projectService.getProject(id, tenantId);
    const assignment = await resolveSourceControlAssignment(
      tenantId,
      {
        sourceControlIntegrationId: body.sourceControlIntegrationId,
        sourceControlRepoFullName: body.sourceControlRepoFullName,
        sourceControlRepoUrl: body.sourceControlRepoUrl,
        githubRepoUrl: body.githubRepoUrl,
      },
      {
        sourceControlIntegrationId: existing.sourceControlIntegrationId,
        sourceControlProvider: existing.sourceControlProvider,
        sourceControlRepoFullName: existing.sourceControlRepoFullName,
        sourceControlRepoUrl: existing.sourceControlRepoUrl,
        githubRepoUrl: existing.githubRepoUrl,
      },
    );
    if (!assignment.ok) return c.json({ error: assignment.message }, assignment.status);

    const project = await projectService.updateProject(id, {
      ...body,
      sourceControlIntegrationId: assignment.value.sourceControlIntegrationId,
      sourceControlProvider: assignment.value.sourceControlProvider,
      sourceControlRepoFullName: assignment.value.sourceControlRepoFullName,
      sourceControlRepoUrl: assignment.value.sourceControlRepoUrl,
      githubRepoUrl: assignment.value.githubRepoUrl,
    }, tenantId);
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

    let recommendation: ProjectRecommendation | null = null;
    try {
      recommendation = await recommendProjectFromPrompt(c, prompt);
    } catch {
      recommendation = null;
    }

    const name = recommendation?.name?.trim() || deriveFallbackNameFromPrompt(prompt);
    const description = recommendation?.description?.trim() || summarizePrompt(prompt);
    const rootWorkingDirectory = body.rootWorkingDirectory?.trim() || null;

    const existingProjects = await projectService.listProjects(tenantId);
    const existing = existingProjects.find((project) => normalizeName(project.name) === normalizeName(name));

    const project = existing
      ? await projectService.updateProject(
          existing.id,
          { description, rootWorkingDirectory },
          tenantId,
        )
      : await projectService.createProject({
          tenantId,
          key: buildProjectKey(tenantId, name),
          name,
          description,
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
