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
  id: string;
  email: string;
}

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  role: string;
  status: string;
}

export interface Tenant extends TenantSummary {
  members: TenantMember[];
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
  status: string;
  taskCount?: number;
  createdAt: string;
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

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const auth = {
  async register(email: string, username: string, password: string): Promise<{ token: string; user: UserInfo }> {
    return request("/api/auth/web/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      token: null,
    });
  },

  async login(email: string, password: string): Promise<{ token: string; user: UserInfo }> {
    return request("/api/auth/web/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects = {
  async list(): Promise<Project[]> {
    const res = await request<{ projects: Project[] }>("/api/projects");
    return res.projects;
  },

  async create(data: { name: string; description?: string }): Promise<Project> {
    return request("/api/projects", { method: "POST", body: JSON.stringify(data) });
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
    if (params?.projectId) q.set("projectId", params.projectId);
    if (params?.status)    q.set("status", params.status);
    if (params?.archived)  q.set("archived", "true");
    const res = await request<{ tasks: Task[] }>(`/api/tasks${q.size ? `?${q}` : ""}`);
    return res.tasks;
  },

  async create(data: Partial<Task>): Promise<Task> {
    return request("/api/tasks", { method: "POST", body: JSON.stringify(data) });
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    return request(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify(data) });
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

  async status(id: string): Promise<{ connected: boolean; clients: number }> {
    return request(`/api/claws/${id}/status`);
  },

  /** WebSocket URL for connecting to a claw's relay */
  wsUrl(id: string): string {
    const base = BASE.replace(/^http/, "ws");
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
      body: JSON.stringify({ slug }),
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
