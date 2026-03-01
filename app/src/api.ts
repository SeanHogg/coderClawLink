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
  const bearer = token ?? getTenantToken() ?? getWebToken();
  const headers = new Headers(rest.headers);
  headers.set("Content-Type", "application/json");
  if (bearer) headers.set("Authorization", `Bearer ${bearer}`);

  const res = await fetch(`${BASE}${path}`, { ...rest, headers });

  if (res.status === 401) {
    clearSession();
    window.dispatchEvent(new CustomEvent("ccl:unauthorized"));
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

export interface TenantMember {
  userId: string;
  email: string;
  role: string;
  joinedAt: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  description?: string;
  rootWorkingDirectory?: string | null;
  status: string;
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

  async subscription(id: string): Promise<TenantSubscription> {
    return request(`/api/tenants/${id}/subscription`);
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
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects = {
  async list(): Promise<Project[]> {
    const res = await request<{ projects: Project[] }>("/api/projects");
    return res.projects;
  },

  async create(data: { name: string; description?: string; rootWorkingDirectory?: string | null }): Promise<Project> {
    return request("/api/projects", { method: "POST", body: JSON.stringify(data) });
  },

  async upsert(data: { name: string; description?: string; rootWorkingDirectory?: string | null; githubRepoUrl?: string }): Promise<{ action: "created" | "updated"; project: Project }> {
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
    return `${base}/api/claws/${id}/ws?token=${encodeURIComponent(token)}`;
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
};
