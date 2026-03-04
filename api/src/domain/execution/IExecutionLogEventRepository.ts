import { ExecutionLogEvent } from './ExecutionLogEvent';
import { ExecutionId, TenantId } from '../shared/types';

export interface IExecutionLogEventRepository {
  save(event: ExecutionLogEvent): Promise<ExecutionLogEvent>;
  findByExecution(executionId: ExecutionId, limit?: number): Promise<ExecutionLogEvent[]>;
  findByTenant(tenantId: TenantId, limit?: number): Promise<ExecutionLogEvent[]>;
}
