import { Task } from './Task';
import { TaskId, ProjectId } from '../shared/types';

export interface ITaskRepository {
  findAll(projectId?: ProjectId): Promise<Task[]>;
  findById(id: TaskId): Promise<Task | null>;
  countByProject(projectId: ProjectId): Promise<number>;
  save(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: TaskId): Promise<void>;
}
