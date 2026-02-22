import { eq } from 'drizzle-orm';
import { IExecutionRepository } from '../../domain/execution/IExecutionRepository';
import { Execution, ExecutionProps } from '../../domain/execution/Execution';
import {
  ExecutionId, TaskId, TenantId, AgentId, ExecutionStatus,
  asExecutionId, asTaskId, asTenantId, asAgentId,
} from '../../domain/shared/types';
import { executions as executionsTable } from '../database/schema';
import type { Db } from '../database/connection';

export class ExecutionRepository implements IExecutionRepository {
  constructor(private readonly db: Db) {}

  async findById(id: ExecutionId): Promise<Execution | null> {
    const [row] = await this.db
      .select().from(executionsTable)
      .where(eq(executionsTable.id, id)).limit(1);
    return row ? toDomain(row) : null;
  }

  async findByTask(taskId: TaskId): Promise<Execution[]> {
    const rows = await this.db
      .select().from(executionsTable)
      .where(eq(executionsTable.taskId, taskId));
    return rows.map(toDomain);
  }

  async findByTenant(tenantId: TenantId, limit = 50): Promise<Execution[]> {
    const rows = await this.db
      .select().from(executionsTable)
      .where(eq(executionsTable.tenantId, tenantId))
      .limit(limit);
    return rows.map(toDomain);
  }

  async save(execution: Execution): Promise<Execution> {
    const plain = execution.toPlain();
    const [inserted] = await this.db
      .insert(executionsTable)
      .values({
        taskId:      plain.taskId,
        agentId:     plain.agentId ?? undefined,
        tenantId:    plain.tenantId,
        submittedBy: plain.submittedBy,
        status:      plain.status,
        payload:     plain.payload ?? undefined,
      })
      .returning();
    return toDomain(inserted);
  }

  async update(execution: Execution): Promise<Execution> {
    const plain = execution.toPlain();
    const [updated] = await this.db
      .update(executionsTable)
      .set({
        status:       plain.status,
        result:       plain.result ?? undefined,
        errorMessage: plain.errorMessage ?? undefined,
        startedAt:    plain.startedAt ?? undefined,
        completedAt:  plain.completedAt ?? undefined,
        updatedAt:    new Date(),
      })
      .where(eq(executionsTable.id, plain.id))
      .returning();
    return toDomain(updated);
  }
}

function toDomain(row: typeof executionsTable.$inferSelect): Execution {
  return Execution.reconstitute({
    id:           asExecutionId(row.id),
    taskId:       asTaskId(row.taskId),
    agentId:      row.agentId != null ? asAgentId(row.agentId) : null,
    tenantId:     asTenantId(row.tenantId),
    submittedBy:  row.submittedBy,
    status:       row.status as ExecutionStatus,
    payload:      row.payload ?? null,
    result:       row.result ?? null,
    errorMessage: row.errorMessage ?? null,
    startedAt:    row.startedAt ?? null,
    completedAt:  row.completedAt ?? null,
    createdAt:    row.createdAt,
    updatedAt:    row.updatedAt,
  } as ExecutionProps);
}
