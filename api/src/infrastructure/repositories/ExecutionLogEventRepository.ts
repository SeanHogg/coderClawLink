import { asc, desc, eq } from 'drizzle-orm';
import { IExecutionLogEventRepository } from '../../domain/execution/IExecutionLogEventRepository';
import { ExecutionLogEvent, ExecutionLogEventProps, ExecutionLogEventType } from '../../domain/execution/ExecutionLogEvent';
import { ExecutionId, TenantId, asClawId, asExecutionId, asTenantId } from '../../domain/shared/types';
import { executionLogEvents as table } from '../database/schema';
import type { Db } from '../database/connection';

export class ExecutionLogEventRepository implements IExecutionLogEventRepository {
  constructor(private readonly db: Db) {}

  async save(event: ExecutionLogEvent): Promise<ExecutionLogEvent> {
    const plain = event.toPlain();
    const [inserted] = await this.db
      .insert(table)
      .values({
        executionId:   plain.executionId,
        tenantId:      plain.tenantId,
        clawId:        plain.clawId ?? undefined,
        eventType:     plain.eventType,
        agentRole:     plain.agentRole ?? undefined,
        label:         plain.label ?? undefined,
        detail:        plain.detail ?? undefined,
        parentEventId: plain.parentEventId ?? undefined,
        durationMs:    plain.durationMs ?? undefined,
        ts:            plain.ts,
      })
      .returning();
    if (!inserted) throw new Error('ExecutionLogEvent insert returned no rows');
    return toDomain(inserted);
  }

  async findByExecution(executionId: ExecutionId, limit = 500): Promise<ExecutionLogEvent[]> {
    const rows = await this.db
      .select().from(table)
      .where(eq(table.executionId, executionId))
      .orderBy(asc(table.ts))
      .limit(limit);
    return rows.map(toDomain);
  }

  async findByTenant(tenantId: TenantId, limit = 200): Promise<ExecutionLogEvent[]> {
    const rows = await this.db
      .select().from(table)
      .where(eq(table.tenantId, tenantId))
      .orderBy(desc(table.ts))
      .limit(limit);
    return rows.map(toDomain);
  }
}

function toDomain(row: typeof table.$inferSelect): ExecutionLogEvent {
  return ExecutionLogEvent.reconstitute({
    id:            row.id,
    executionId:   asExecutionId(row.executionId),
    tenantId:      asTenantId(row.tenantId),
    clawId:        row.clawId != null ? asClawId(row.clawId) : null,
    eventType:     row.eventType as ExecutionLogEventType,
    agentRole:     row.agentRole ?? null,
    label:         row.label ?? null,
    detail:        row.detail ?? null,
    parentEventId: row.parentEventId ?? null,
    durationMs:    row.durationMs ?? null,
    ts:            row.ts,
    createdAt:     row.createdAt,
  } as ExecutionLogEventProps);
}
