import { Hono } from 'hono';
import { TaskService } from '../../application/task/TaskService';
import { TaskPriority, AgentType, TaskStatus } from '../../domain/shared/types';
import type { HonoEnv } from '../../env';
import { authMiddleware } from '../middleware/authMiddleware';

export function createTaskRoutes(taskService: TaskService): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();
  router.use('*', authMiddleware);

  // GET /api/tasks?project_id=1
  router.get('/', async (c) => {
    const projectIdParam = c.req.query('project_id');
    const projectId = projectIdParam ? Number(projectIdParam) : undefined;
    const tasks = await taskService.listTasks(projectId);
    return c.json(tasks.map(t => t.toPlain()));
  });

  // GET /api/tasks/:id
  router.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const task = await taskService.getTask(id);
    return c.json(task.toPlain());
  });

  // POST /api/tasks
  router.post('/', async (c) => {
    const body = await c.req.json<{
      projectId: number;
      title: string;
      description?: string | null;
      priority?: TaskPriority;
      assignedAgentType?: AgentType | null;
    }>();
    const task = await taskService.createTask(body);
    return c.json(task.toPlain(), 201);
  });

  // PATCH /api/tasks/:id
  router.patch('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<{
      title?: string;
      description?: string | null;
      status?: TaskStatus;
      priority?: TaskPriority;
      assignedAgentType?: AgentType | null;
      githubPrUrl?: string | null;
      githubPrNumber?: number | null;
    }>();
    const task = await taskService.updateTask(id, body);
    return c.json(task.toPlain());
  });

  // DELETE /api/tasks/:id
  router.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await taskService.deleteTask(id);
    return c.body(null, 204);
  });

  return router;
}
