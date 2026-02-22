import { ITaskRepository } from '../../domain/task/ITaskRepository';
import { IProjectRepository } from '../../domain/project/IProjectRepository';
import { Task } from '../../domain/task/Task';
import {
  ProjectId, TaskId, TaskStatus, TaskPriority, AgentType,
  asProjectId, asTaskId,
} from '../../domain/shared/types';
import { NotFoundError } from '../../domain/shared/errors';

export interface CreateTaskDto {
  projectId: number;
  title: string;
  description?: string | null;
  priority?: TaskPriority;
  assignedAgentType?: AgentType | null;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedAgentType?: AgentType | null;
  githubPrUrl?: string | null;
  githubPrNumber?: number | null;
}

/**
 * Application service: orchestrates Task use cases.
 *
 * Depends on ITaskRepository and IProjectRepository interfaces only.
 */
export class TaskService {
  constructor(
    private readonly tasks: ITaskRepository,
    private readonly projects: IProjectRepository,
  ) {}

  async listTasks(projectId?: number): Promise<Task[]> {
    return this.tasks.findAll(projectId !== undefined ? asProjectId(projectId) : undefined);
  }

  async getTask(id: number): Promise<Task> {
    const task = await this.tasks.findById(asTaskId(id));
    if (!task) throw new NotFoundError('Task', id);
    return task;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const project = await this.projects.findById(asProjectId(dto.projectId));
    if (!project) throw new NotFoundError('Project', dto.projectId);

    const taskCount = await this.tasks.countByProject(asProjectId(dto.projectId));

    const task = Task.create({
      projectId: asProjectId(dto.projectId),
      title: dto.title,
      description: dto.description ?? null,
      status: TaskStatus.TODO,
      priority: dto.priority ?? TaskPriority.MEDIUM,
      assignedAgentType: dto.assignedAgentType ?? null,
      projectKey: project.key,
      projectTaskCount: taskCount,
    });

    return this.tasks.save(task);
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTask(id);
    const updated = task.update(dto);
    return this.tasks.update(updated);
  }

  async deleteTask(id: number): Promise<void> {
    await this.getTask(id);
    await this.tasks.delete(asTaskId(id));
  }
}
