import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  customType,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

// custom tsvector type for full-text search
const tsvector = customType<{ data: string }>({
  dataType() { return 'tsvector'; },
});

// ---------------------------------------------------------------------------
// Enum columns (coderClawLink orchestration)
// ---------------------------------------------------------------------------

export const projectStatusEnum = pgEnum('project_status', [
  'active', 'completed', 'archived', 'on_hold',
]);

export const taskStatusEnum = pgEnum('task_status', [
  'todo', 'in_progress', 'in_review', 'done', 'blocked',
]);

export const taskPriorityEnum = pgEnum('task_priority', [
  'low', 'medium', 'high', 'critical',
]);

export const agentTypeEnum = pgEnum('agent_type', [
  'claude', 'openai', 'ollama', 'http',
]);

export const tenantStatusEnum = pgEnum('tenant_status', [
  'active', 'suspended', 'archived',
]);

export const tenantRoleEnum = pgEnum('tenant_role', [
  'owner', 'manager', 'developer', 'viewer',
]);

export const executionStatusEnum = pgEnum('execution_status', [
  'pending', 'submitted', 'running', 'completed', 'failed', 'cancelled',
]);

export const auditEventTypeEnum = pgEnum('audit_event_type', [
  'user_registered', 'user_login',
  'task_submitted', 'task_cancelled',
  'execution_started', 'execution_completed', 'execution_failed',
  'agent_registered',
  'member_added', 'member_removed',
  'project_created', 'project_updated',
  'task_created', 'task_updated',
]);

// ---------------------------------------------------------------------------
// CoderClawLink orchestration users (separate from the marketplace users table)
// Table name: ccl_users
// ---------------------------------------------------------------------------

export const users = pgTable('ccl_users', {
  id:         uuid('id').primaryKey().defaultRandom(),
  email:      varchar('email', { length: 255 }).notNull().unique(),
  apiKeyHash: varchar('api_key_hash', { length: 64 }).notNull(),
  createdAt:  timestamp('created_at').notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Marketplace tables – these map to the EXISTING tables created by coderclaw.ai
// ---------------------------------------------------------------------------

/** Public marketplace users (email + password, existing `users` table) */
export const marketplaceUsers = pgTable('users', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        text('email').notNull().unique(),
  username:     text('username').notNull().unique(),
  displayName:  text('display_name'),
  avatarUrl:    text('avatar_url'),
  bio:          text('bio'),
  passwordHash: text('password_hash').notNull(),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Marketplace skills (existing `skills` table) */
export const marketplaceSkills = pgTable('skills', {
  id:           serial('id').primaryKey(),
  name:         varchar('name', { length: 255 }).notNull(),
  slug:         varchar('slug', { length: 255 }).notNull().unique(),
  description:  text('description'),
  authorId:     uuid('author_id').notNull().references(() => marketplaceUsers.id, { onDelete: 'cascade' }),
  category:     varchar('category', { length: 100 }).notNull(),
  tags:         text('tags'),
  version:      varchar('version', { length: 50 }).notNull().default('1.0.0'),
  readme:       text('readme'),
  iconUrl:      varchar('icon_url', { length: 500 }),
  repoUrl:      varchar('repo_url', { length: 500 }),
  downloads:    integer('downloads').notNull().default(0),
  likes:        integer('likes').notNull().default(0),
  published:    boolean('published').notNull().default(false),
  searchVector: tsvector('search_vector'),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Marketplace skill likes (existing `skill_likes` table) */
export const marketplaceSkillLikes = pgTable('skill_likes', {
  userId:    uuid('user_id').notNull().references(() => marketplaceUsers.id, { onDelete: 'cascade' }),
  skillSlug: varchar('skill_slug', { length: 255 }).notNull(),
}, (t) => [
  primaryKey({ columns: [t.userId, t.skillSlug] }),
]);

// ---------------------------------------------------------------------------
// CoderClawLink Orchestration tables (new tables)
// ---------------------------------------------------------------------------

export const tenants = pgTable('tenants', {
  id:        serial('id').primaryKey(),
  name:      varchar('name', { length: 255 }).notNull(),
  slug:      varchar('slug', { length: 255 }).notNull().unique(),
  status:    tenantStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const tenantMembers = pgTable('tenant_members', {
  id:        serial('id').primaryKey(),
  tenantId:  integer('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  userId:    uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role:      tenantRoleEnum('role').notNull().default('developer'),
  isActive:  boolean('is_active').notNull().default(true),
  joinedAt:  timestamp('joined_at').notNull().defaultNow(),
});

export const projects = pgTable('projects', {
  id:              serial('id').primaryKey(),
  tenantId:        integer('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  key:             varchar('key', { length: 50 }).notNull().unique(),
  name:            varchar('name', { length: 255 }).notNull(),
  description:     text('description'),
  status:          projectStatusEnum('status').notNull().default('active'),
  githubRepoUrl:   varchar('github_repo_url', { length: 500 }),
  githubRepoOwner: varchar('github_repo_owner', { length: 255 }),
  githubRepoName:  varchar('github_repo_name', { length: 255 }),
  createdAt:       timestamp('created_at').notNull().defaultNow(),
  updatedAt:       timestamp('updated_at').notNull().defaultNow(),
});

export const tasks = pgTable('tasks', {
  id:                serial('id').primaryKey(),
  projectId:         integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  key:               varchar('key', { length: 100 }).notNull().unique(),
  title:             varchar('title', { length: 500 }).notNull(),
  description:       text('description'),
  status:            taskStatusEnum('status').notNull().default('todo'),
  priority:          taskPriorityEnum('priority').notNull().default('medium'),
  assignedAgentType: agentTypeEnum('assigned_agent_type'),
  githubPrUrl:       varchar('github_pr_url', { length: 500 }),
  githubPrNumber:    integer('github_pr_number'),
  createdAt:         timestamp('created_at').notNull().defaultNow(),
  updatedAt:         timestamp('updated_at').notNull().defaultNow(),
});

export const agents = pgTable('agents', {
  id:         serial('id').primaryKey(),
  tenantId:   integer('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  name:       varchar('name', { length: 255 }).notNull(),
  type:       agentTypeEnum('type').notNull(),
  endpoint:   varchar('endpoint', { length: 500 }).notNull(),
  apiKeyHash: varchar('api_key_hash', { length: 64 }),
  isActive:   boolean('is_active').notNull().default(true),
  config:     text('config'),
  createdAt:  timestamp('created_at').notNull().defaultNow(),
  updatedAt:  timestamp('updated_at').notNull().defaultNow(),
});

/** Agent skills (new table: agent_skills) – different from marketplace skills */
export const skills = pgTable('agent_skills', {
  id:           serial('id').primaryKey(),
  agentId:      integer('agent_id').notNull().references(() => agents.id, { onDelete: 'cascade' }),
  name:         varchar('name', { length: 255 }).notNull(),
  description:  text('description'),
  inputSchema:  text('input_schema'),
  outputSchema: text('output_schema'),
  createdAt:    timestamp('created_at').notNull().defaultNow(),
});

export const executions = pgTable('executions', {
  id:           serial('id').primaryKey(),
  taskId:       integer('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  agentId:      integer('agent_id').references(() => agents.id),
  tenantId:     integer('tenant_id').notNull().references(() => tenants.id),
  submittedBy:  uuid('submitted_by').notNull(),
  status:       executionStatusEnum('status').notNull().default('pending'),
  payload:      text('payload'),
  result:       text('result'),
  errorMessage: text('error_message'),
  startedAt:    timestamp('started_at'),
  completedAt:  timestamp('completed_at'),
  createdAt:    timestamp('created_at').notNull().defaultNow(),
  updatedAt:    timestamp('updated_at').notNull().defaultNow(),
});

export const auditEvents = pgTable('audit_events', {
  id:           serial('id').primaryKey(),
  tenantId:     integer('tenant_id').references(() => tenants.id),
  userId:       uuid('user_id'),
  eventType:    auditEventTypeEnum('event_type').notNull(),
  resourceType: varchar('resource_type', { length: 100 }),
  resourceId:   varchar('resource_id', { length: 100 }),
  metadata:     text('metadata'),
  createdAt:    timestamp('created_at').notNull().defaultNow(),
});
