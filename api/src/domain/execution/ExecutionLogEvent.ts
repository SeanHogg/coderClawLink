import { ExecutionId, TenantId, ClawId } from '../shared/types';

export type ExecutionLogEventType =
  | 'agent_start'
  | 'agent_end'
  | 'tool_call'
  | 'tool_result'
  | 'subagent_start'
  | 'subagent_end'
  | 'message'
  | 'checkpoint'
  | 'error';

export interface ExecutionLogEventProps {
  id:            number;
  executionId:   ExecutionId;
  tenantId:      TenantId;
  clawId:        ClawId | null;
  eventType:     ExecutionLogEventType;
  agentRole:     string | null;
  label:         string | null;
  detail:        string | null;
  parentEventId: number | null;
  durationMs:    number | null;
  ts:            Date;
  createdAt:     Date;
}

export class ExecutionLogEvent {
  private constructor(private readonly props: ExecutionLogEventProps) {}

  static create(props: Omit<ExecutionLogEventProps, 'id' | 'createdAt'>): ExecutionLogEvent {
    return new ExecutionLogEvent({ ...props, id: 0, createdAt: new Date() });
  }

  static reconstitute(props: ExecutionLogEventProps): ExecutionLogEvent {
    return new ExecutionLogEvent(props);
  }

  get id():            number                    { return this.props.id; }
  get executionId():   ExecutionId               { return this.props.executionId; }
  get tenantId():      TenantId                  { return this.props.tenantId; }
  get clawId():        ClawId | null             { return this.props.clawId; }
  get eventType():     ExecutionLogEventType     { return this.props.eventType; }
  get agentRole():     string | null             { return this.props.agentRole; }
  get label():         string | null             { return this.props.label; }
  get detail():        string | null             { return this.props.detail; }
  get parentEventId(): number | null             { return this.props.parentEventId; }
  get durationMs():    number | null             { return this.props.durationMs; }
  get ts():            Date                      { return this.props.ts; }
  get createdAt():     Date                      { return this.props.createdAt; }

  toPlain(): ExecutionLogEventProps { return { ...this.props }; }
}
