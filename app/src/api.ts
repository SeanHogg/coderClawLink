/** Typed API client for CoderClawLink.
 *  Manages JWT tokens and talks to api.coderclaw.ai.
 */

const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL)
  ?? "https://api.coderclaw.ai";

// ---------------------------------------------------------------------------
// Token storage
// ---------------------------------------------------------------------------

const WEB_TOKEN_KEY  = "ccl-web-token";
const TENANT_TOKEN_KEY = "ccl-tenant-token";
const TENANT_ID_KEY  = "ccl-tenant-id";
const USER_KEY       = "ccl-user";

export function getWebToken(): string | null   { return localStorage.getItem(WEB_TOKEN_KEY); }
export function getTenantToken(): string | null { return localStorage.getItem(TENANT_TOKEN_KEY); }
export function getTenantId(): string | null    { return localStorage.getItem(TENANT_ID_KEY); }

export function setWebToken(t: string)   { localStorage.setItem(WEB_TOKEN_KEY, t); }
export function setTenantToken(t: string) { localStorage.setItem(TENANT_TOKEN_KEY, t); }
export function setTenantId(id: string)  { localStorage.setItem(TENANT_ID_KEY, id); }

export function setUser(u: UserInfo)   { localStorage.setItem(USER_KEY, JSON.stringify(u)); }
export function getUser(): UserInfo | null {
  const s = localStorage.getItem(USER_KEY);
  return s ? JSON.parse(s) as UserInfo : null;
}

export function clearSession() {
  localStorage.removeItem(WEB_TOKEN_KEY);
  localStorage.removeItem(TENANT_TOKEN_KEY);
  localStorage.removeItem(TENANT_ID_KEY);
  localStorage.removeItem(USER_KEY);
}

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function request<T>(
  path: string,
  opts: RequestInit & { token?: string | null } = {}
): Promise<T> {
  const { token, ...rest } = opts;
  const bearer = token === undefined ? (getTenantToken() ?? getWebToken()) : token;
  const headers = new Headers(rest.headers);
  headers.set("Content-Type", "application/json");
  if (bearer) headers.set("Authorization", `Bearer ${bearer}`);

  const res = await fetch(`${BASE}${path}`, { ...rest, headers });

  // only dispatch a global unauthorized event when we actually attempted to send a
  // bearer token.  unauthenticated requests (e.g. login/register or exploratory
  // calls made before login) will still return 401 from the server but they
  // shouldn't force the app back to the landing screen.
  if (res.status === 401 && bearer) {
    clearSession();
    window.dispatchEvent(new CustomEvent("ccl:unauthorized"));
  }

  if (res.status === 428) {
    try {
      const payload = await res.json() as { error?: string; code?: string; requiredVersion?: string; acceptedVersion?: string | null };
      window.dispatchEvent(new CustomEvent("ccl:terms-required", { detail: payload }));
    } catch {
      window.dispatchEvent(new CustomEvent("ccl:terms-required", { detail: { error: "Terms acceptance required" } }));
    }
  }

  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); msg = j.error ?? j.message ?? msg; } catch { /* ignore */ }
    throw new ApiError(res.status, msg);
  }

  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UserInfo {
  id:            string;
  email:         string;
  username?:     string;
  displayName?:  string | null;
  isSuperadmin?: boolean;
  mfaEnabled?:   boolean;
}

export interface AuthSuccess {
  token: string;
  expiresIn?: number;
  user: UserInfo;
  mfaRequired?: false;
}

export interface MfaChallenge {
  mfaRequired: true;
  mfaToken: string;
  expiresIn: number;
  user: UserInfo;
  methods: string[];
}

export interface MfaStatus {
  enabled: boolean;
  setupPending: boolean;
  enabledAt: string | null;
  recoveryGeneratedAt: string | null;
}

export interface AuthSessionInfo {
  id: string;
  sessionName?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  isActive: boolean;
  revokedAt?: string | null;
  createdAt: string;
  lastSeenAt: string;
  activeTokens: number;
  isCurrent: boolean;
}

export interface AuthTokenInfo {
  jti: string;
  tokenType: "web" | "tenant" | "api" | "claw";
  tenantId?: number | null;
  sessionId?: string | null;
  issuedAt: string;
  expiresAt: string;
  revokedAt?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  lastSeenAt: string;
  isCurrent: boolean;
  isActive: boolean;
}

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  role: string;
  status: string;
  defaultClawId?: string | null;
  plan?: "free" | "pro";
  effectivePlan?: "free" | "pro";
  billingStatus?: "none" | "pending" | "active" | "past_due" | "cancelled";
}

export interface Tenant extends TenantSummary {
  members: TenantMember[];
}

export interface TenantSubscription {
  plan: "free" | "pro";
  effectivePlan: "free" | "pro";
  billingCycle: "monthly" | "yearly" | null;
  billingStatus: "none" | "pending" | "active" | "past_due" | "cancelled";
  billingEmail: string | null;
  billingPaymentBrand: string | null;
  billingPaymentLast4: string | null;
  billingUpdatedAt: string | null;
  pricing: {
    currency: string;
    pro: { monthly: number; yearly: number; yearlySavingsPercent: number };
  };
}

export interface TenantLlmUsage {
  days: number;
  tenantId: number;
  plan: "free" | "pro";
  effectivePlan: "free" | "pro";
  billingStatus: "none" | "pending" | "active" | "past_due" | "cancelled";
  totals: {
    requests: number;
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
  mine: {
    userId: string | null;
    requests: number;
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
  byModel: Array<{
    llmProduct: string;
    model: string;
    requests: number;
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    retries: number;
  }>;
  byDay: Array<{
    day: string;
    requests: number;
    total_tokens: number;
  }>;
  byUser: Array<{
    user_id: string;
    requests: number;
    total_tokens: number;
  }>;
}

export interface TenantProjectInsight {
  project_id: number;
  project_name: string;
  events: number;
  code_changes: number;
  last_activity_at: string | null;
}

export interface TenantInsightByDay {
  day: string;
  events: number;
  code_changes: number;
}

export interface TenantInsights {
  days: number;
  tenantId: number;
  totals: {
    events: number;
    codeChanges: number;
    activeUsers: number;
  };
  byProject: TenantProjectInsight[];
  byDay: TenantInsightByDay[];
}

export interface TenantMember {
  userId: string;
  email: string;
  role: string;
  joinedAt: string;
}

export interface TenantSecurityUser {
  id: string;
  email: string;
  username: string | null;
  displayName: string | null;
  mfaEnabled: boolean;
  mfaEnabledAt: string | null;
  activeSessions: number;
  activeTokens: number;
}

export interface TenantSecurityDetails {
  user: {
    id: string;
    email: string;
    username: string | null;
    displayName: string | null;
  };
  mfa: MfaStatus;
  sessions: Array<Omit<AuthSessionInfo, "isCurrent">>;
  tokens: Array<Omit<AuthTokenInfo, "isCurrent">>;
}

export interface LegalDocument {
  documentType: "terms" | "privacy";
  version: string;
  title: string;
  content: string;
  publishedAt: string;
}

export interface TermsAcceptanceStatus {
  requiredVersion: string | null;
  acceptedVersion: string | null;
  needsAcceptance: boolean;
  terms: LegalDocument;
}

export interface NewsletterSubscribeResponse {
  ok: boolean;
  email: string;
  status: "subscribed" | "unsubscribed";
  subscribed: boolean;
}

export interface AdminNewsletterSubscriber {
  id: number;
  userId: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  source: string;
  status: "subscribed" | "unsubscribed" | "suppressed";
  subscribedAt: string | null;
  unsubscribedAt: string | null;
  unsubscribeReason: string | null;
  lastCommunicationAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userDisplayName: string | null;
  userUsername: string | null;
}

export interface AdminPrivacyRequest {
  id: number;
  userId: string | null;
  email: string;
  requestType: "ccpa" | "gdpr";
  status: string;
  details: string | null;
  resolution: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  closedAt: string | null;
}

export interface AdminNewsletterTemplate {
  id: number;
  name: string;
  slug: string;
  subject: string;
  preheader: string | null;
  bodyMarkdown: string;
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AdminNewsletterEvent {
  id: number;
  eventType: "subscribed" | "unsubscribed" | "template_sent" | "email_opened" | "email_clicked";
  metadata: string | null;
  createdAt: string | null;
  subscriberId: number;
  email: string;
  templateId: number | null;
  templateName: string | null;
  templateSlug: string | null;
}

export type SourceControlProvider = "github" | "bitbucket";

export interface SourceControlIntegration {
  id: number;
  tenantId: number;
  provider: SourceControlProvider;
  name: string;
  accountIdentifier: string;
  hostUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  description?: string;
  rootWorkingDirectory?: string | null;
  status: string;
  sourceControlIntegrationId?: number | null;
  sourceControlProvider?: SourceControlProvider | null;
  sourceControlRepoFullName?: string | null;
  sourceControlRepoUrl?: string | null;
  githubRepoUrl?: string | null;
  taskCount?: number;
  createdAt: string;
}

export interface ProjectScaffoldResult {
  project: Project;
  scaffold: {
    clawId: number | null;
    wip: boolean;
    synced: boolean;
  };
}

export type TaskStatus = "todo" | "in_progress" | "in_review" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: string;
  assignedClawId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

export interface Claw {
  id: string;
  name: string;
  slug: string;
  status: string;
  connectedAt?: string | null;
  lastSeenAt?: string | null;
  registeredBy?: string;
  createdAt: string;
}

export interface ClawRegistration extends Claw {
  apiKey: string; // one-time plaintext key
}

export interface ClawDirectory {
  id: string;
  projectId?: string | null;
  absPath: string;
  status: "pending" | "synced" | "error";
  errorMessage?: string | null;
  metadata?: string | null;
  lastSeenAt?: string | null;
  lastSyncedAt?: string | null;
  updatedAt: string;
}

export interface ClawDirectoryFile {
  relPath: string;
  contentHash: string;
  sizeBytes: number;
  updatedAt: string;
}

export interface ClawSyncHistoryEntry {
  id: number;
  triggeredBy: string;
  fileCount: number;
  bytesTotal: number;
  status: string;
  errorMsg?: string | null;
  createdAt: string;
}

export interface ChatSession {
  id: number;
  clawId: number;
  clawName?: string;
  sessionKey: string;
  startedAt: string;
  endedAt?: string | null;
  msgCount: number;
  lastMsgAt?: string | null;
}

export interface ChatMessage {
  id: number;
  role: string;
  content: string;
  metadata?: string | null;
  seq: number;
  createdAt: string;
}

export interface Execution {
  id: string;
  taskId: string;
  clawId?: string;
  status: string;
  result?: string;
  payload?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export type ExecutionLogEventType =
  | "agent_start"
  | "agent_end"
  | "tool_call"
  | "tool_result"
  | "subagent_start"
  | "subagent_end"
  | "message"
  | "checkpoint"
  | "error";

export interface ExecutionLogEvent {
  id: number;
  executionId: number;
  tenantId: number;
  clawId?: number;
  eventType: ExecutionLogEventType;
  agentRole?: string;
  label?: string;
  detail?: string;
  parentEventId?: number;
  durationMs?: number;
  ts: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  version?: string;
  icon?: string;
}

export interface SkillAssignment {
  slug: string;
  name: string;
  assignedAt: string;
}

export type LlmChatRole = "system" | "user" | "assistant";

export interface LlmChatMessage {
  role: LlmChatRole;
  content: string;
}

export interface LlmChatCompletionResponse {
  id?: string;
  choices?: Array<{
    index?: number;
    finish_reason?: string | null;
    message?: {
      role?: string;
      content?: string | null;
    };
  }>;
  _coderclaw?: {
    resolvedModel?: string;
    retries?: number;
    pool?: number;
  };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const auth = {
  async register(email: string, username: string, password: string): Promise<AuthSuccess> {
    return request("/api/auth/web/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      token: null,
    });
  },

  async login(email: string, password: string, sessionName?: string): Promise<AuthSuccess | MfaChallenge> {
    return request("/api/auth/web/login", {
      method: "POST",
      body: JSON.stringify({ email, password, sessionName }),
      token: null,
    });
  },

  async loginMfa(
    mfaToken: string,
    data: { code?: string; recoveryCode?: string; sessionName?: string },
  ): Promise<AuthSuccess> {
    return request("/api/auth/web/login/mfa", {
      method: "POST",
      body: JSON.stringify({ mfaToken, ...data }),
      token: null,
    });
  },

  async tenantToken(tenantId: string): Promise<{ token: string }> {
    return request("/api/auth/tenant-token", {
      method: "POST",
      body: JSON.stringify({ tenantId }),
    });
  },

  async listTenants(): Promise<TenantSummary[]> {
    const res = await request<{ tenants: TenantSummary[] }>("/api/tenants/mine");
    return res.tenants;
  },

  async mfaStatus(): Promise<MfaStatus> {
    return request("/api/auth/mfa/status", { method: "GET" });
  },

  async mfaSetup(): Promise<{ otpauthUrl: string; manualEntryKey: string; expiresIn: number }> {
    return request("/api/auth/mfa/setup", { method: "POST", body: JSON.stringify({}) });
  },

  async mfaEnable(code: string): Promise<{ enabled: boolean; recoveryCodes: string[] }> {
    return request("/api/auth/mfa/enable", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },

  async mfaDisable(data: { code?: string; recoveryCode?: string }): Promise<{ enabled: boolean }> {
    return request("/api/auth/mfa/disable", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async mfaRegenerateRecoveryCodes(data: { code?: string; recoveryCode?: string }): Promise<{ recoveryCodes: string[] }> {
    return request("/api/auth/mfa/recovery-codes/regenerate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async listSessions(): Promise<AuthSessionInfo[]> {
    const res = await request<{ sessions: AuthSessionInfo[] }>("/api/auth/sessions", { method: "GET" });
    return res.sessions;
  },

  async revokeSession(sessionId: string): Promise<void> {
    return request(`/api/auth/sessions/${sessionId}/revoke`, { method: "POST", body: JSON.stringify({}) });
  },

  async revokeOtherSessions(): Promise<void> {
    return request("/api/auth/sessions/revoke-others", { method: "POST", body: JSON.stringify({}) });
  },

  async listTokens(): Promise<AuthTokenInfo[]> {
    const res = await request<{ tokens: AuthTokenInfo[] }>("/api/auth/tokens", { method: "GET" });
    return res.tokens;
  },

  async revokeToken(jti: string): Promise<void> {
    return request(`/api/auth/tokens/${jti}/revoke`, { method: "POST", body: JSON.stringify({}) });
  },

  async legalCurrent(): Promise<{ terms: LegalDocument; privacy: LegalDocument }> {
    return request("/api/auth/legal/current", { method: "GET", token: null });
  },

  async termsStatus(): Promise<TermsAcceptanceStatus> {
    return request("/api/auth/legal/terms/status", { method: "GET" });
  },

  async acceptTerms(version?: string): Promise<{ acceptedVersion: string; acceptedAt: string; terms: LegalDocument }> {
    return request("/api/auth/legal/terms/accept", {
      method: "POST",
      body: JSON.stringify(version ? { version } : {}),
    });
  },
};

export const newsletter = {
  async updateSubscription(data: {
    email: string;
    action?: "subscribe" | "unsubscribe";
    source?: string;
    firstName?: string;
    lastName?: string;
    reason?: string;
  }): Promise<NewsletterSubscribeResponse> {
    return request("/api/auth/newsletter/subscribers", {
      method: "POST",
      body: JSON.stringify(data),
      token: null,
    });
  },
};

// ---------------------------------------------------------------------------
// Tenants
// ---------------------------------------------------------------------------

export const tenants = {
  async create(name: string): Promise<TenantSummary> {
    return request("/api/tenants/create", { method: "POST", body: JSON.stringify({ name }) });
  },

  async get(id: string): Promise<Tenant> {
    return request(`/api/tenants/${id}`);
  },

  async inviteMember(id: string, email: string, role: string): Promise<void> {
    return request(`/api/tenants/${id}/members`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  },

  async removeMember(id: string, userId: string): Promise<void> {
    return request(`/api/tenants/${id}/members/${userId}`, { method: "DELETE" });
  },

  async securityUsers(id: string): Promise<TenantSecurityUser[]> {
    const res = await request<{ users: TenantSecurityUser[] }>(`/api/tenants/${id}/security/users`);
    return res.users;
  },

  async securityDetails(id: string, userId: string): Promise<TenantSecurityDetails> {
    return request<TenantSecurityDetails>(`/api/tenants/${id}/security/users/${encodeURIComponent(userId)}`);
  },

  async securityRevokeSession(id: string, userId: string, sessionId: string): Promise<void> {
    return request(`/api/tenants/${id}/security/users/${encodeURIComponent(userId)}/sessions/${encodeURIComponent(sessionId)}/revoke`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async securityRevokeAllSessions(id: string, userId: string): Promise<void> {
    return request(`/api/tenants/${id}/security/users/${encodeURIComponent(userId)}/sessions/revoke-all`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async securityRevokeToken(id: string, userId: string, jti: string): Promise<void> {
    return request(`/api/tenants/${id}/security/users/${encodeURIComponent(userId)}/tokens/${encodeURIComponent(jti)}/revoke`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async subscription(id: string): Promise<TenantSubscription> {
    return request(`/api/tenants/${id}/subscription`);
  },

  async insights(id: string, days = 30): Promise<TenantInsights> {
    const q = new URLSearchParams();
    q.set("days", String(days));
    return request<TenantInsights>(`/api/tenants/${id}/insights?${q.toString()}`);
  },

  async defaultClaw(id: string): Promise<{ defaultClawId: number | null }> {
    return request(`/api/tenants/${id}/default-claw`);
  },

  async setDefaultClaw(id: string, clawId: number | null): Promise<{ defaultClawId: number | null }> {
    return request(`/api/tenants/${id}/default-claw`, {
      method: "PUT",
      body: JSON.stringify({ clawId }),
    });
  },

  async upgradeToPro(
    id: string,
    data: {
      billingCycle: "monthly" | "yearly";
      billingEmail: string;
      billingPaymentBrand: string;
      billingPaymentLast4: string;
    },
  ): Promise<{ tenant: Tenant }> {
    return request(`/api/tenants/${id}/subscription/pro`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async downgradeToFree(id: string): Promise<{ tenant: Tenant }> {
    return request(`/api/tenants/${id}/subscription/free`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async listSourceControlIntegrations(id: string): Promise<SourceControlIntegration[]> {
    const res = await request<{ integrations: SourceControlIntegration[] }>(`/api/tenants/${id}/source-control-integrations`);
    return res.integrations;
  },

  async createSourceControlIntegration(
    id: string,
    data: {
      provider: SourceControlProvider;
      name: string;
      accountIdentifier: string;
      hostUrl?: string | null;
      isActive?: boolean;
    },
  ): Promise<SourceControlIntegration> {
    return request(`/api/tenants/${id}/source-control-integrations`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateSourceControlIntegration(
    id: string,
    integrationId: number,
    data: {
      provider?: SourceControlProvider;
      name?: string;
      accountIdentifier?: string;
      hostUrl?: string | null;
      isActive?: boolean;
    },
  ): Promise<SourceControlIntegration> {
    return request(`/api/tenants/${id}/source-control-integrations/${integrationId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteSourceControlIntegration(id: string, integrationId: number): Promise<void> {
    return request(`/api/tenants/${id}/source-control-integrations/${integrationId}`, {
      method: "DELETE",
    });
  },
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects = {
  async list(): Promise<Project[]> {
    const res = await request<{ projects: Project[] }>("/api/projects");
    return res.projects;
  },

  async create(data: {
    name: string;
    description?: string;
    rootWorkingDirectory?: string | null;
    sourceControlIntegrationId?: number | null;
    sourceControlRepoFullName?: string | null;
    sourceControlRepoUrl?: string | null;
  }): Promise<Project> {
    return request("/api/projects", { method: "POST", body: JSON.stringify(data) });
  },

  async upsert(data: {
    name: string;
    description?: string;
    rootWorkingDirectory?: string | null;
    sourceControlIntegrationId?: number | null;
    sourceControlRepoFullName?: string | null;
    sourceControlRepoUrl?: string | null;
    githubRepoUrl?: string;
  }): Promise<{ action: "created" | "updated"; project: Project }> {
    return request("/api/projects/upsert", { method: "POST", body: JSON.stringify(data) });
  },

  async scaffold(data: { prompt: string; rootWorkingDirectory?: string | null; clawId?: number | null }): Promise<ProjectScaffoldResult> {
    return request("/api/projects/scaffold", { method: "POST", body: JSON.stringify(data) });
  },

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return request(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },

  async remove(id: string): Promise<void> {
    return request(`/api/projects/${id}`, { method: "DELETE" });
  },

  async recordCodeChanges(id: string, data: { codeChanges: number; executionId?: number | null }): Promise<{ ok: true; projectId: number; codeChanges: number }> {
    return request(`/api/projects/${id}/insights/code-changes`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async listClaws(id: string): Promise<Claw[]> {
    const res = await request<{ claws: Claw[] }>(`/api/projects/${id}/claws`);
    return res.claws;
  },
};

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

export const tasks = {
  async list(params?: { projectId?: string; status?: string; archived?: boolean }): Promise<Task[]> {
    const q = new URLSearchParams();
    if (params?.projectId) q.set("project_id", params.projectId);
    if (params?.status)    q.set("status", params.status);
    if (params?.archived)  q.set("archived", "true");
    const res = await request<{ tasks: Array<Task & { assignedClawId?: number | string | null }> }>(`/api/tasks${q.size ? `?${q}` : ""}`);
    return res.tasks.map((task) => ({
      ...task,
      assignedClawId: task.assignedClawId == null ? undefined : String(task.assignedClawId),
    }));
  },

  async create(data: Partial<Task>): Promise<Task> {
    const payload = {
      ...data,
      projectId:
        data.projectId === undefined
          ? undefined
          : Number(data.projectId),
      assignedClawId:
        data.assignedClawId === undefined
          ? undefined
          : data.assignedClawId === ""
            ? null
            : Number(data.assignedClawId),
    };
    const created = await request<Task & { assignedClawId?: number | string | null }>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return {
      ...created,
      assignedClawId: created.assignedClawId == null ? undefined : String(created.assignedClawId),
    };
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const payload = {
      ...data,
      projectId:
        data.projectId === undefined
          ? undefined
          : Number(data.projectId),
      assignedClawId:
        data.assignedClawId === undefined
          ? undefined
          : data.assignedClawId === ""
            ? null
            : Number(data.assignedClawId),
    };
    const updated = await request<Task & { assignedClawId?: number | string | null }>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return {
      ...updated,
      assignedClawId: updated.assignedClawId == null ? undefined : String(updated.assignedClawId),
    };
  },

  async remove(id: string): Promise<void> {
    return request(`/api/tasks/${id}`, { method: "DELETE" });
  },

  async run(id: string, payload?: string): Promise<Execution> {
    return request(`/api/runtime/executions`, {
      method: "POST",
      body: JSON.stringify({ taskId: Number(id), payload }),
    });
  },

  async executions(id: string): Promise<Execution[]> {
    return request(`/api/runtime/tasks/${id}/executions`);
  },
};

// ---------------------------------------------------------------------------
// Claws
// ---------------------------------------------------------------------------

export const claws = {
  async list(): Promise<Claw[]> {
    const res = await request<{ claws: Claw[] }>("/api/claws");
    return res.claws;
  },

  async register(name: string): Promise<ClawRegistration> {
    return request("/api/claws", { method: "POST", body: JSON.stringify({ name }) });
  },

  async remove(id: string): Promise<void> {
    return request(`/api/claws/${id}`, { method: "DELETE" });
  },

  async projects(id: string): Promise<Project[]> {
    const res = await request<{ projects: Project[] }>(`/api/claws/${id}/projects`);
    return res.projects;
  },

  async associateProject(id: string, projectId: string): Promise<void> {
    return request(`/api/claws/${id}/projects/${projectId}`, { method: "PUT" });
  },

  async unassociateProject(id: string, projectId: string): Promise<void> {
    return request(`/api/claws/${id}/projects/${projectId}`, { method: "DELETE" });
  },

  async directories(id: string): Promise<ClawDirectory[]> {
    const res = await request<{ directories: ClawDirectory[] }>(`/api/claws/${id}/directories`);
    return res.directories;
  },

  async directoryFiles(id: string, directoryId: string): Promise<ClawDirectoryFile[]> {
    const res = await request<{ files: ClawDirectoryFile[] }>(`/api/claws/${id}/directories/${directoryId}/files`);
    return res.files;
  },

  async directoryFileContent(id: string, directoryId: string, filePath: string): Promise<{ relPath: string; content: string | null; contentHash: string; updatedAt: string }> {
    return request(`/api/claws/${id}/directories/${directoryId}/files/content?path=${encodeURIComponent(filePath)}`);
  },

  async status(id: string): Promise<{ connected: boolean; clients: number }> {
    return request(`/api/claws/${id}/status`);
  },

  /** WebSocket URL for connecting to a claw's relay */
  wsUrl(id: string): string {
    const baseUrl = typeof BASE === "string" ? BASE : "https://api.coderclaw.ai";
    const base = baseUrl.replace(/^http/, "ws");
    const token = getTenantToken() ?? "";
    let tokenExpIso: string | null = null;
    let tokenExpired = false;
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length >= 2) {
          const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
          const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
          const payload = JSON.parse(atob(padded)) as { exp?: number };
          if (typeof payload.exp === "number") {
            const expMs = payload.exp * 1000;
            tokenExpIso = new Date(expMs).toISOString();
            tokenExpired = Date.now() >= expMs;
          }
        }
      } catch {
        // ignore decode errors for diagnostics
      }
    }
    console.debug("[ccl-chat] api.wsUrl", {
      clawId: id,
      base,
      hasToken: Boolean(token),
      tokenExpIso,
      tokenExpired,
    });
    return `${base}/api/claws/${id}/ws?token=${encodeURIComponent(token)}`;
  },

  async syncHistory(id: string): Promise<ClawSyncHistoryEntry[]> {
    const res = await request<{ history: ClawSyncHistoryEntry[] }>(`/api/claws/${id}/sync-history`);
    return res.history;
  },

  async sessionMessages(id: string, sessionKey: string, limit = 50): Promise<ChatMessage[]> {
    const res = await request<{ messages: ChatMessage[] }>(
      `/api/claws/${id}/sessions/${encodeURIComponent(sessionKey)}/messages?limit=${limit}`,
    );
    return res.messages;
  },
};

// ---------------------------------------------------------------------------
// Chats (tenant-level chat history)
// ---------------------------------------------------------------------------

export const chats = {
  async list(params?: { limit?: number; offset?: number }): Promise<ChatSession[]> {
    const q = new URLSearchParams();
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.offset) q.set("offset", String(params.offset));
    const res = await request<{ sessions: ChatSession[] }>(`/api/chats${q.size ? `?${q}` : ""}`);
    return res.sessions;
  },

  async messages(sessionId: number, limit = 100): Promise<ChatMessage[]> {
    const res = await request<{ messages: ChatMessage[] }>(`/api/chats/${sessionId}/messages?limit=${limit}`);
    return res.messages;
  },
};

// ---------------------------------------------------------------------------
// Skills marketplace
// ---------------------------------------------------------------------------

export const marketplace = {
  async list(): Promise<Skill[]> {
    const res = await request<{ skills: Skill[] }>("/marketplace/skills");
    return res.skills;
  },
};

export const skillAssignments = {
  async listTenant(): Promise<SkillAssignment[]> {
    const res = await request<{ assignments: SkillAssignment[] }>("/api/skill-assignments/tenant");
    return res.assignments;
  },

  async assignTenant(slug: string): Promise<void> {
    return request("/api/skill-assignments/tenant", {
      method: "POST",
      body: JSON.stringify({ slug }),
    });
  },

  async unassignTenant(slug: string): Promise<void> {
    return request(`/api/skill-assignments/tenant/${slug}`, { method: "DELETE" });
  },

  async assignClaw(clawId: string, slug: string): Promise<void> {
    return request(`/api/skill-assignments/claws/${clawId}`, {
      method: "POST",
      body: JSON.stringify({ skillSlug: slug }),
    });
  },
};

// ---------------------------------------------------------------------------
// Executions / audit
// ---------------------------------------------------------------------------

export const executions = {
  async list(params?: { taskId?: string; clawId?: string }): Promise<Execution[]> {
    const q = new URLSearchParams();
    if (params?.taskId) q.set("taskId", params.taskId);
    if (params?.clawId) q.set("clawId", params.clawId);
    return request(`/api/runtime/executions${q.size ? `?${q}` : ""}`);
  },
  async events(executionId: string | number): Promise<ExecutionLogEvent[]> {
    return request(`/api/runtime/executions/${executionId}/events`);
  },
};

// ---------------------------------------------------------------------------
// coderClawLLM
// ---------------------------------------------------------------------------

export const llm = {
  async chat(
    messages: LlmChatMessage[],
    opts?: { temperature?: number; maxTokens?: number },
  ): Promise<LlmChatCompletionResponse> {
    const res = await fetch(`${BASE}/llm/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getTenantToken() ? { Authorization: `Bearer ${getTenantToken()}` } : {}),
      },
      body: JSON.stringify({
        messages,
        stream: false,
        temperature: opts?.temperature,
        max_tokens: opts?.maxTokens,
      }),
    });

    if (!res.ok) {
      let message = res.statusText;
      try {
        const body = await res.json() as { error?: string; message?: string };
        message = body.error ?? body.message ?? message;
      } catch {
        // ignore parse errors
      }
      throw new ApiError(res.status, message);
    }

    return res.json() as Promise<LlmChatCompletionResponse>;
  },

  async usage(days = 30): Promise<TenantLlmUsage> {
    const q = new URLSearchParams();
    q.set("days", String(days));
    return request<TenantLlmUsage>(`/llm/v1/usage?${q.toString()}`);
  },
};

// ---------------------------------------------------------------------------
// Admin (superadmin only — uses WebJWT with sa: true)
// ---------------------------------------------------------------------------

export interface AdminUser {
  id:            string;
  email:         string;
  username:      string | null;
  displayName:   string | null;
  isSuperadmin:  boolean;
  createdAt:     string;
  tenantCount:   number;
}

export interface AdminTenant {
  id:           number;
  name:         string;
  slug:         string;
  status:       string;
  plan:         "free" | "pro";
  effectivePlan: "free" | "pro";
  billingStatus: "none" | "pending" | "active" | "past_due" | "cancelled";
  billingEmail: string | null;
  billingUpdatedAt: string | null;
  isPaid:       boolean;
  createdAt:    string;
  memberCount:  number;
  clawCount:    number;
}

export interface AdminHealth {
  status:    string;
  db:        { ok: boolean; latencyMs: number };
  platform:  { userCount: number; tenantCount: number; clawCount: number; executionCount: number; errorCount: number; paidTenantCount: number };
  llm:       { pool: number; models: Array<{ model: string; preferred: boolean; available: boolean; cooldownUntil?: number }> };
  timestamp: string;
}

export interface AdminError {
  id:        number;
  method:    string | null;
  path:      string | null;
  message:   string | null;
  stack:     string | null;
  createdAt: string;
}

export interface AdminSecurityUser {
  id: string;
  email: string;
  username: string | null;
  displayName: string | null;
  mfaEnabled: boolean;
  mfaEnabledAt: string | null;
  activeSessions: number;
  activeTokens: number;
}

export interface AdminSecurityDetails {
  user: {
    id: string;
    email: string;
    username: string | null;
    displayName: string | null;
  };
  mfa: MfaStatus;
  sessions: Array<Omit<AuthSessionInfo, "isCurrent">>;
  tokens: Array<Omit<AuthTokenInfo, "isCurrent">>;
}

export interface AdminLegalCurrent {
  terms: LegalDocument;
  privacy: LegalDocument;
}

/** Admin API uses the WebJWT (not tenant token) since it crosses tenant boundaries. */
function adminRequest<T>(path: string, opts: RequestInit = {}): Promise<T> {
  return request<T>(path, { ...opts, token: getWebToken() });
}

export interface LlmModelStat {
  model:             string;
  requests:          number;
  prompt_tokens:     number;
  completion_tokens: number;
  total_tokens:      number;
  retries:           number;
  streamed_requests: number;
}

export interface LlmDailyStat {
  day:          string;
  requests:     number;
  total_tokens: number;
}

export interface LlmFailoverStat {
  model:     string;
  errorCode: number;
  count:     number;
}

export interface LlmUsageStats {
  days:   number;
  totals: {
    requests:         number;
    totalTokens:      number;
    promptTokens:     number;
    completionTokens: number;
    modelCount:       number;
  };
  byModel:   LlmModelStat[];
  daily:     LlmDailyStat[];
  failovers: LlmFailoverStat[];
}

export const adminApi = {
  async users(): Promise<AdminUser[]> {
    const res = await adminRequest<{ users: AdminUser[] }>("/api/admin/users");
    return res.users;
  },

  async tenants(): Promise<AdminTenant[]> {
    const res = await adminRequest<{ tenants: AdminTenant[] }>("/api/admin/tenants");
    return res.tenants;
  },

  async health(): Promise<AdminHealth> {
    return adminRequest<AdminHealth>("/api/admin/health");
  },

  async errors(): Promise<AdminError[]> {
    const res = await adminRequest<{ errors: AdminError[] }>("/api/admin/errors");
    return res.errors;
  },

  async impersonate(userId: string, tenantId: number): Promise<{ token: string; email: string; role: string }> {
    return adminRequest("/api/admin/impersonate", {
      method: "POST",
      body: JSON.stringify({ userId, tenantId }),
    });
  },

  async llmUsage(days = 30): Promise<LlmUsageStats> {
    return adminRequest<LlmUsageStats>(`/api/admin/llm-usage?days=${days}`);
  },

  async securityUsers(tenantId: number): Promise<AdminSecurityUser[]> {
    const res = await adminRequest<{ users: AdminSecurityUser[] }>(`/api/admin/security/users?tenantId=${tenantId}`);
    return res.users;
  },

  async securityDetails(tenantId: number, userId: string): Promise<AdminSecurityDetails> {
    return adminRequest<AdminSecurityDetails>(`/api/admin/security/users/${encodeURIComponent(userId)}?tenantId=${tenantId}`);
  },

  async securityMfaSetup(tenantId: number, userId: string): Promise<{ otpauthUrl: string; manualEntryKey: string; expiresIn: number }> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/mfa/setup?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async securityMfaEnable(tenantId: number, userId: string, code: string): Promise<{ enabled: boolean; recoveryCodes: string[] }> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/mfa/enable?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },

  async securityMfaDisable(tenantId: number, userId: string, data: { code?: string; recoveryCode?: string }): Promise<{ enabled: boolean }> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/mfa/disable?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async securityRegenerateRecoveryCodes(tenantId: number, userId: string, data: { code?: string; recoveryCode?: string }): Promise<{ recoveryCodes: string[] }> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/mfa/recovery-codes/regenerate?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async securityRevokeSession(tenantId: number, userId: string, sessionId: string): Promise<void> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/sessions/${encodeURIComponent(sessionId)}/revoke?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async securityRevokeAllSessions(tenantId: number, userId: string): Promise<void> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/sessions/revoke-all?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async securityRevokeToken(tenantId: number, userId: string, jti: string): Promise<void> {
    return adminRequest(`/api/admin/security/users/${encodeURIComponent(userId)}/tokens/${encodeURIComponent(jti)}/revoke?tenantId=${tenantId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  async legalCurrent(): Promise<AdminLegalCurrent> {
    return adminRequest("/api/admin/legal/current");
  },

  async publishTerms(data: { version: string; title?: string; content: string }): Promise<{ terms: LegalDocument }> {
    return adminRequest("/api/admin/legal/terms/publish", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async newsletterSubscribers(params?: { status?: "subscribed" | "unsubscribed" | "suppressed"; q?: string; limit?: number }): Promise<AdminNewsletterSubscriber[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.q) query.set("q", params.q);
    if (params?.limit) query.set("limit", String(params.limit));
    const suffix = query.toString();
    const res = await adminRequest<{ subscribers: AdminNewsletterSubscriber[] }>(`/api/admin/newsletter/subscribers${suffix ? `?${suffix}` : ""}`);
    return res.subscribers;
  },

  async newsletterTemplates(): Promise<AdminNewsletterTemplate[]> {
    const res = await adminRequest<{ templates: AdminNewsletterTemplate[] }>("/api/admin/newsletter/templates");
    return res.templates;
  },

  async createNewsletterTemplate(data: {
    name: string;
    slug?: string;
    subject: string;
    preheader?: string;
    bodyMarkdown: string;
    isActive?: boolean;
  }): Promise<{ template: AdminNewsletterTemplate }> {
    return adminRequest("/api/admin/newsletter/templates", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateNewsletterTemplate(id: number, data: {
    name?: string;
    slug?: string;
    subject?: string;
    preheader?: string | null;
    bodyMarkdown?: string;
    isActive?: boolean;
  }): Promise<{ template: AdminNewsletterTemplate }> {
    return adminRequest(`/api/admin/newsletter/templates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async privacyRequests(params?: { status?: string; type?: string; q?: string; limit?: number }): Promise<AdminPrivacyRequest[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.type) query.set("type", params.type);
    if (params?.q) query.set("q", params.q);
    if (params?.limit) query.set("limit", String(params.limit));
    const suffix = query.toString();
    const res = await adminRequest<{ requests: AdminPrivacyRequest[] }>(`/api/admin/privacy-requests${suffix ? `?${suffix}` : ""}`);
    return res.requests;
  },

  async updatePrivacyRequest(id: number, data: { status?: string; resolution?: string | null }): Promise<{ request: AdminPrivacyRequest }> {
    return adminRequest(`/api/admin/privacy-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async newsletterEvents(limit = 300): Promise<AdminNewsletterEvent[]> {
    const res = await adminRequest<{ events: AdminNewsletterEvent[] }>(`/api/admin/newsletter/events?limit=${Math.max(1, Math.min(limit, 1000))}`);
    return res.events;
  },

  async trackNewsletterEvent(data: {
    subscriberEmail: string;
    templateId?: number | null;
    eventType: "template_sent" | "email_opened" | "email_clicked";
    metadata?: string;
  }): Promise<{ ok: boolean }> {
    return adminRequest("/api/admin/newsletter/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
