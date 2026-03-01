import { Hono } from 'hono';
import { and, eq, isNotNull } from 'drizzle-orm';
import { RuntimeService } from '../../application/runtime/RuntimeService';
import { ExecutionStatus } from '../../domain/shared/types';
import type { HonoEnv } from '../../env';
import { authMiddleware } from '../middleware/authMiddleware';
import type { Db } from '../../infrastructure/database/connection';
import { coderclawInstances, projects, tasks } from '../../infrastructure/database/schema';
import type { ClawRelayDO } from '../../infrastructure/relay/ClawRelayDO';

/**
 * Runtime routes – task execution lifecycle.
 *
 * POST   /api/runtime/executions             – submit a task for execution
 * GET    /api/runtime/executions             – list executions (tenant-wide or filtered by sessionId)
 * GET    /api/runtime/sessions/:sessionId/executions – full execution timeline for a session
 * GET    /api/runtime/executions/:id         – get execution state
 * POST   /api/runtime/executions/:id/cancel  – cancel an execution
 * PATCH  /api/runtime/executions/:id/state   – agent callback: update state
 * GET    /api/runtime/tasks/:taskId/executions – history for a task
 */
type RuntimeHonoEnv = HonoEnv & {
  Bindings: HonoEnv['Bindings'] & {
    CLAW_RELAY: DurableObjectNamespace<ClawRelayDO>;
  };
};

type DispatchMessage = {
  type: 'task.assign' | 'task.broadcast';
  executionId: number;
  taskId: number;
  payload?: string;
  task: {
    title: string;
    description?: string | null;
  };
};

async function dispatchToClaw(env: RuntimeHonoEnv['Bindings'], clawId: number, message: DispatchMessage): Promise<boolean> {
  if (!env.CLAW_RELAY) return false;
  const stub = env.CLAW_RELAY.get(env.CLAW_RELAY.idFromName(String(clawId)));
  const response = await stub.fetch('https://relay.internal/dispatch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  return response.ok;
}

async function getDispatchTargets(db: Db, tenantId: number, assignedClawId?: number | null): Promise<number[]> {
  if (assignedClawId != null) {
    const [row] = await db
      .select({ id: coderclawInstances.id })
      .from(coderclawInstances)
      .where(
        and(
          eq(coderclawInstances.id, assignedClawId),
          eq(coderclawInstances.tenantId, tenantId),
        ),
      );
    return row ? [row.id] : [];
  }

  const rows = await db
    .select({ id: coderclawInstances.id })
    .from(coderclawInstances)
    .where(
      and(
        eq(coderclawInstances.tenantId, tenantId),
        isNotNull(coderclawInstances.connectedAt),
      ),
    );
  return rows.map((row) => row.id);
}

export function createRuntimeRoutes(runtimeService: RuntimeService, db: Db): Hono<RuntimeHonoEnv> {
  const router = new Hono<RuntimeHonoEnv>();
  router.use('*', authMiddleware);

  // Submit a task for execution
  router.post('/executions', async (c) => {
    const body = await c.req.json<{
      taskId:   number;
      agentId?: number;
      clawId?:  number | null;
      sessionId?: string;
      payload?: string;
    }>();
    const execution = await runtimeService.submit({
      taskId:      body.taskId,
      agentId:     body.agentId,
      clawId:      body.clawId,
      tenantId:    c.get('tenantId'),
      submittedBy: c.get('userId'),
      sessionId:   body.sessionId,
      payload:     body.payload,
    });

    const [taskRow] = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        assignedClawId: tasks.assignedClawId,
      })
      .from(tasks)
      .innerJoin(projects, eq(projects.id, tasks.projectId))
      .where(
        and(
          eq(tasks.id, body.taskId),
          eq(projects.tenantId, c.get('tenantId')),
        ),
      );

    if (taskRow) {
      const targets = await getDispatchTargets(db, c.get('tenantId'), taskRow.assignedClawId);
      const dispatchType: DispatchMessage['type'] = taskRow.assignedClawId != null ? 'task.assign' : 'task.broadcast';
      const message: DispatchMessage = {
        type: dispatchType,
        executionId: execution.id,
        taskId: taskRow.id,
        payload: body.payload,
        task: {
          title: taskRow.title,
          description: taskRow.description,
        },
      };

      await Promise.all(targets.map((targetId) => dispatchToClaw(c.env, targetId, message).catch(() => false)));
    }

    return c.json(execution.toPlain(), 201);
  });

  // List executions for the caller's tenant
  router.get('/executions', async (c) => {
    const limit = Number(c.req.query('limit') ?? '50');
    const sessionId = (c.req.query('sessionId') ?? '').trim();
    const executions = sessionId
      ? await runtimeService.listBySession(c.get('tenantId'), sessionId, limit)
      : await runtimeService.listByTenant(c.get('tenantId'), limit);
    return c.json(executions.map(e => e.toPlain()));
  });

  // Full execution timeline for one session (newest first)
  router.get('/sessions/:sessionId/executions', async (c) => {
    const sessionId = c.req.param('sessionId').trim();
    const limit = Number(c.req.query('limit') ?? '200');
    if (!sessionId) {
      return c.json({ error: 'sessionId is required' }, 400);
    }
    const executions = await runtimeService.listBySession(c.get('tenantId'), sessionId, limit);
    return c.json({ sessionId, executions: executions.map((e) => e.toPlain()) });
  });

  // Get a single execution by ID
  router.get('/executions/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const execution = await runtimeService.getExecution(id);
    return c.json(execution.toPlain());
  });

  // Cancel an execution
  router.post('/executions/:id/cancel', async (c) => {
    const id = Number(c.req.param('id'));
    const execution = await runtimeService.cancel(id, c.get('userId'));
    return c.json(execution.toPlain());
  });

  // Agent callback: update execution state (running / completed / failed)
  router.patch('/executions/:id/state', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<{
      status:        ExecutionStatus;
      result?:       string;
      errorMessage?: string;
    }>();
    const execution = await runtimeService.update(id, body);
    return c.json(execution.toPlain());
  });

  // Execution history for a specific task
  router.get('/tasks/:taskId/executions', async (c) => {
    const taskId = Number(c.req.param('taskId'));
    const executions = await runtimeService.listByTask(taskId);
    return c.json(executions.map(e => e.toPlain()));
  });

  // Broadcast an existing task to all currently connected claws in the tenant.
  router.post('/tasks/:taskId/broadcast', async (c) => {
    const taskId = Number(c.req.param('taskId'));
    const body = await c.req.json<{ payload?: string }>().catch((): { payload?: string } => ({}));

    const [taskRow] = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
      })
      .from(tasks)
      .innerJoin(projects, eq(projects.id, tasks.projectId))
      .where(
        and(
          eq(tasks.id, taskId),
          eq(projects.tenantId, c.get('tenantId')),
        ),
      );

    if (!taskRow) {
      return c.json({ error: 'Task not found' }, 404);
    }

    const execution = await runtimeService.submit({
      taskId,
      tenantId: c.get('tenantId'),
      submittedBy: c.get('userId'),
      payload: body.payload,
    });

    const targets = await getDispatchTargets(db, c.get('tenantId'), null);
    const message: DispatchMessage = {
      type: 'task.broadcast',
      executionId: execution.id,
      taskId: taskRow.id,
      payload: body.payload,
      task: {
        title: taskRow.title,
        description: taskRow.description,
      },
    };

    const results = await Promise.all(targets.map(async (targetId) => ({
      clawId: targetId,
      delivered: await dispatchToClaw(c.env, targetId, message).catch(() => false),
    })));

    return c.json({
      execution: execution.toPlain(),
      dispatched: results,
    });
  });

  return router;
}
