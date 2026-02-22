/** Branded type helpers to prevent ID mix-ups at compile time. */
export type ProjectId   = number & { readonly __brand: 'ProjectId' };
export type TaskId      = number & { readonly __brand: 'TaskId' };
export type TenantId    = number & { readonly __brand: 'TenantId' };
export type AgentId     = number & { readonly __brand: 'AgentId' };
export type SkillId     = number & { readonly __brand: 'SkillId' };
export type ExecutionId = number & { readonly __brand: 'ExecutionId' };
/** User IDs are UUID strings (not sequential integers). */
export type UserId = string & { readonly __brand: 'UserId' };

export const asProjectId   = (n: number): ProjectId   => n as ProjectId;
export const asTaskId      = (n: number): TaskId      => n as TaskId;
export const asTenantId    = (n: number): TenantId    => n as TenantId;
export const asAgentId     = (n: number): AgentId     => n as AgentId;
export const asSkillId     = (n: number): SkillId     => n as SkillId;
export const asExecutionId = (n: number): ExecutionId => n as ExecutionId;
export const asUserId      = (s: string): UserId      => s as UserId;

// ---------------------------------------------------------------------------
// Enumerations
// ---------------------------------------------------------------------------

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  ON_HOLD = 'on_hold',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  DONE = 'done',
  BLOCKED = 'blocked',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AgentType {
  CLAUDE = 'claude',
  OPENAI = 'openai',
  OLLAMA = 'ollama',
  HTTP = 'http',
}

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived',
}

export enum TenantRole {
  OWNER     = 'owner',
  MANAGER   = 'manager',
  DEVELOPER = 'developer',
  VIEWER    = 'viewer',
}

// Role hierarchy – higher index = more authority.
export const ROLE_ORDER: TenantRole[] = [
  TenantRole.VIEWER,
  TenantRole.DEVELOPER,
  TenantRole.MANAGER,
  TenantRole.OWNER,
];

/** Returns true if `actual` meets or exceeds `required`. */
export function hasMinRole(actual: TenantRole, required: TenantRole): boolean {
  return ROLE_ORDER.indexOf(actual) >= ROLE_ORDER.indexOf(required);
}

// ---------------------------------------------------------------------------
// Execution / Runtime
// ---------------------------------------------------------------------------

export enum ExecutionStatus {
  PENDING   = 'pending',
  SUBMITTED = 'submitted',
  RUNNING   = 'running',
  COMPLETED = 'completed',
  FAILED    = 'failed',
  CANCELLED = 'cancelled',
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export enum AuditEventType {
  USER_REGISTERED       = 'user_registered',
  USER_LOGIN            = 'user_login',
  TASK_SUBMITTED        = 'task_submitted',
  TASK_CANCELLED        = 'task_cancelled',
  EXECUTION_STARTED     = 'execution_started',
  EXECUTION_COMPLETED   = 'execution_completed',
  EXECUTION_FAILED      = 'execution_failed',
  AGENT_REGISTERED      = 'agent_registered',
  MEMBER_ADDED          = 'member_added',
  MEMBER_REMOVED        = 'member_removed',
  PROJECT_CREATED       = 'project_created',
  PROJECT_UPDATED       = 'project_updated',
  TASK_CREATED          = 'task_created',
  TASK_UPDATED          = 'task_updated',
}
