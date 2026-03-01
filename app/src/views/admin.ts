import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  adminApi,
  getWebToken,
  setTenantToken, setTenantId,
  type AdminUser, type AdminTenant, type AdminHealth, type AdminError,
  type LlmUsageStats,
} from "../api.js";

type AdminTab = "health" | "users" | "tenants" | "errors" | "usage";

@customElement("ccl-admin")
export class CclAdmin extends LitElement {
  override createRenderRoot() { return this; }

  @state() private tab: AdminTab = "health";
  @state() private health: AdminHealth | null = null;
  @state() private users: AdminUser[] = [];
  @state() private tenants: AdminTenant[] = [];
  @state() private errors: AdminError[] = [];
  @state() private llmUsage: LlmUsageStats | null = null;
  @state() private usageDays = 30;
  @state() private loading = false;
  @state() private errorMsg = "";
  @state() private showAdminToken = false;
  @state() private copiedAdminToken = false;
  @state() private copiedAdminEnv = false;
  @state() private downloadedAdminEnv = false;
  @state() private impersonateUserId: string | null = null;
  @state() private impersonateTenants: AdminTenant[] = [];
  @state() private expandedErrorId: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.loadTab("health");
  }

  private async loadTab(tab: AdminTab) {
    this.tab = tab;
    this.loading = true;
    this.errorMsg = "";
    try {
      if (tab === "health") {
        this.health = await adminApi.health();
      } else if (tab === "users") {
        this.users = await adminApi.users();
      } else if (tab === "tenants") {
        this.tenants = await adminApi.tenants();
      } else if (tab === "errors") {
        this.errors = await adminApi.errors();
      } else if (tab === "usage") {
        this.llmUsage = await adminApi.llmUsage(this.usageDays);
      }
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.loading = false;
    }
  }

  private async startImpersonate(userId: string) {
    // Load tenants list if not loaded yet
    if (!this.tenants.length) {
      this.tenants = await adminApi.tenants();
    }
    this.impersonateUserId = userId;
    this.impersonateTenants = this.tenants;
  }

  private async doImpersonate(tenantId: number) {
    if (!this.impersonateUserId) return;
    try {
      const res = await adminApi.impersonate(this.impersonateUserId, tenantId);
      setTenantToken(res.token);
      setTenantId(String(tenantId));
      this.impersonateUserId = null;
      // Navigate back to dashboard
      this.dispatchEvent(new CustomEvent("ccl:impersonate", {
        bubbles: true, composed: true,
        detail: { tenantId },
      }));
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    }
  }

  private fmtCooldown(until: number) {
    const secs = Math.max(0, Math.ceil((until - Date.now()) / 1000));
    return secs >= 60 ? `${Math.ceil(secs / 60)}m` : `${secs}s`;
  }

  private fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  private fmtDateTime(d: string) {
    return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  private async copyAdminToken() {
    const webToken = getWebToken();
    if (!webToken) {
      this.errorMsg = "No superadmin web token found for this session.";
      return;
    }
    try {
      await navigator.clipboard.writeText(webToken);
      this.copiedAdminToken = true;
      setTimeout(() => {
        this.copiedAdminToken = false;
      }, 2000);
    } catch (err) {
      this.errorMsg = (err as Error).message;
    }
  }

  private buildSuperadminEnvTemplate() {
    const webToken = getWebToken() ?? "";
    const apiUrl = ((window as unknown as { API_URL?: string }).API_URL ?? "https://api.coderclaw.ai").replace(/\/+$/, "");
    return [
      `CODERCLAW_LINK_URL=${apiUrl}`,
      `CODERCLAW_LINK_WEB_TOKEN=${webToken}`,
      "CODERCLAW_LINK_TENANT_TOKEN=",
      "CODERCLAW_LINK_CLAW_NAME=openclaw-superadmin-node",
      "CODERCLAW_LINK_CLAW_ID=",
      "CODERCLAW_LINK_API_KEY=",
      "OPENCLAW_EXEC_COMMAND=",
      "OPENCLAW_MAX_CONCURRENT_TASKS=1",
      "OPENCLAW_EXEC_TIMEOUT_MS=900000",
      "OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json",
      "OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env",
    ].join("\n");
  }

  private async copySuperadminEnvTemplate() {
    const webToken = getWebToken();
    if (!webToken) {
      this.errorMsg = "No superadmin web token found for this session.";
      return;
    }
    try {
      await navigator.clipboard.writeText(this.buildSuperadminEnvTemplate());
      this.copiedAdminEnv = true;
      setTimeout(() => {
        this.copiedAdminEnv = false;
      }, 2000);
    } catch (err) {
      this.errorMsg = (err as Error).message;
    }
  }

  private downloadSuperadminEnvTemplate() {
    const webToken = getWebToken();
    if (!webToken) {
      this.errorMsg = "No superadmin web token found for this session.";
      return;
    }
    try {
      const content = this.buildSuperadminEnvTemplate();
      const blob = new Blob([`${content}\n`], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "coderclawlink.superadmin.env";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      this.downloadedAdminEnv = true;
      setTimeout(() => {
        this.downloadedAdminEnv = false;
      }, 2000);
    } catch (err) {
      this.errorMsg = (err as Error).message;
    }
  }

  override render() {
    return html`
      <div class="admin-shell">
        <!-- Header -->
        <div class="admin-header">
          <div class="admin-header-left">
            <span class="admin-badge">Platform Admin</span>
            <h1 class="admin-title">CoderClawLink Admin</h1>
          </div>
          <button class="btn btn-ghost btn-sm" @click=${() => this.dispatchEvent(new CustomEvent("ccl:exit-admin", { bubbles: true, composed: true }))}>
            ← Back to Workspace
          </button>
        </div>

        <!-- Tabs -->
        <nav class="admin-tabs">
          ${(["health", "usage", "users", "tenants", "errors"] as AdminTab[]).map(t => html`
            <button
              class="admin-tab ${this.tab === t ? "active" : ""}"
              @click=${() => this.loadTab(t)}
            >${t.charAt(0).toUpperCase() + t.slice(1)}</button>
          `)}
        </nav>

        <!-- Error banner -->
        ${this.errorMsg ? html`<div class="alert alert-error">${this.errorMsg}</div>` : ""}

        <!-- Content -->
        <div class="admin-content">
          ${this.loading ? html`<div class="loading-state">Loading…</div>` : this.renderTab()}
        </div>

        <!-- Impersonate modal -->
        ${this.impersonateUserId ? this.renderImpersonateModal() : ""}
      </div>
    `;
  }

  private renderTab() {
    if (this.tab === "health")  return this.renderHealth();
    if (this.tab === "usage")   return this.renderUsage();
    if (this.tab === "users")   return this.renderUsers();
    if (this.tab === "tenants") return this.renderTenants();
    if (this.tab === "errors")  return this.renderErrors();
    return html``;
  }

  private renderHealth() {
    const h = this.health;
    const webToken = getWebToken() ?? "";
    if (!h) return html`<div class="loading-state">No data</div>`;

    return html`
      <div class="health-grid">
        <!-- Status card -->
        <div class="health-card ${h.status === "ok" ? "health-ok" : "health-degraded"}">
          <div class="health-label">System Status</div>
          <div class="health-value">${h.status.toUpperCase()}</div>
          <div class="health-sub">${h.timestamp ? this.fmtDateTime(h.timestamp) : ""}</div>
        </div>

        <!-- DB card -->
        <div class="health-card ${h.db.ok ? "health-ok" : "health-degraded"}">
          <div class="health-label">Database</div>
          <div class="health-value">${h.db.ok ? "Connected" : "Error"}</div>
          <div class="health-sub">${h.db.latencyMs}ms latency</div>
        </div>

        <!-- Platform counts -->
        <div class="health-card">
          <div class="health-label">Users</div>
          <div class="health-value">${h.platform.userCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Workspaces</div>
          <div class="health-value">${h.platform.tenantCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Paid Workspaces</div>
          <div class="health-value">${h.platform.paidTenantCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Claws</div>
          <div class="health-value">${h.platform.clawCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Executions</div>
          <div class="health-value">${h.platform.executionCount}</div>
        </div>
        <div class="health-card ${h.platform.errorCount > 0 ? "health-warn" : ""}">
          <div class="health-label">Error Log</div>
          <div class="health-value">${h.platform.errorCount}</div>
          ${h.platform.errorCount > 0 ? html`<div class="health-sub"><button class="btn btn-ghost btn-xs" @click=${() => this.loadTab("errors")}>View errors →</button></div>` : ""}
        </div>

        <!-- LLM pool -->
        <div class="health-card health-wide">
          <div class="health-label">LLM Model Pool (${h.llm.pool} models)</div>
          <div class="model-list">
            ${h.llm.models.map(m => {
              const chipStyle = m.available
                ? "background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)"
                : "background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)";
              const label = m.available
                ? `${m.preferred ? "★ " : ""}${m.model}`
                : `${m.model} ⏳${this.fmtCooldown(m.cooldownUntil ?? 0)}`;
              const title = m.available
                ? `${m.preferred ? "Preferred (round-robin). " : "Fallback. "}Available`
                : `On cooldown — available in ${this.fmtCooldown(m.cooldownUntil ?? 0)}`;
              return html`<span class="model-chip" style="${chipStyle}" title="${title}">${label}</span>`;
            })}
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--text-muted,#6b7280)">
            ★ preferred (round-robin) · green = available · red = on cooldown
          </div>
        </div>
      </div>

      <div class="admin-refresh">
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("health")}>↻ Refresh</button>
      </div>

      <div class="card" style="max-width:680px;margin-top:24px">
        <div class="card-title" style="margin-bottom:8px">Superadmin token (advanced)</div>
        <div style="font-size:12px;color:var(--text-muted,#6b7280);line-height:1.5;margin-bottom:12px">
          This web token grants superadmin API access for your current session. Share only with trusted tooling.
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <button class="btn btn-secondary btn-sm" @click=${() => { this.showAdminToken = !this.showAdminToken; }}>
            ${this.showAdminToken ? "Hide token" : "Show token"}
          </button>
          <button class="btn btn-primary btn-sm" @click=${this.copyAdminToken} ?disabled=${!webToken}>
            ${this.copiedAdminToken ? "Copied!" : "Copy token"}
          </button>
          <button class="btn btn-secondary btn-sm" @click=${this.copySuperadminEnvTemplate} ?disabled=${!webToken}>
            ${this.copiedAdminEnv ? "Env copied!" : "Copy plugin env file"}
          </button>
          <button class="btn btn-secondary btn-sm" @click=${this.downloadSuperadminEnvTemplate} ?disabled=${!webToken}>
            ${this.downloadedAdminEnv ? "Downloaded!" : "Download .env file"}
          </button>
        </div>
        ${this.showAdminToken
          ? html`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${webToken || "No superadmin web token found"}</textarea>`
          : html`<div style="font-size:12px;color:var(--text-muted,#6b7280);font-family:var(--mono)">${webToken ? "••••••••••••••••••••••••••••" : "No superadmin web token found"}</div>`}
      </div>
    `;
  }

  private fmtNum(n: number | string) {
    return Number(n).toLocaleString();
  }

  private renderUsage() {
    const u = this.llmUsage;
    if (!u) return html`<div class="loading-state">No data</div>`;

    return html`
      <!-- Totals -->
      <div class="health-grid" style="margin-bottom:24px">
        <div class="health-card">
          <div class="health-label">Total Requests</div>
          <div class="health-value">${this.fmtNum(u.totals.requests)}</div>
          <div class="health-sub">all time</div>
        </div>
        <div class="health-card">
          <div class="health-label">Total Tokens</div>
          <div class="health-value">${this.fmtNum(u.totals.totalTokens)}</div>
          <div class="health-sub">all time</div>
        </div>
        <div class="health-card">
          <div class="health-label">Prompt Tokens</div>
          <div class="health-value">${this.fmtNum(u.totals.promptTokens)}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Completion Tokens</div>
          <div class="health-value">${this.fmtNum(u.totals.completionTokens)}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Models Used</div>
          <div class="health-value">${u.totals.modelCount}</div>
          <div class="health-sub">of ${u.byModel.length > 0 ? u.byModel.length : "—"} tracked</div>
        </div>
        <div class="health-card">
          <div class="health-label">Spend</div>
          <div class="health-value">$0</div>
          <div class="health-sub">free tier</div>
        </div>
      </div>

      <!-- Per-model table -->
      <div class="table-header">
        <span class="table-count">By model — last
          <select class="usage-days-select" @change=${(e: Event) => {
            this.usageDays = Number((e.target as HTMLSelectElement).value);
            this.loadTab("usage");
          }}>
            ${[7, 14, 30, 60, 90].map(d => html`
              <option value="${d}" ?selected=${this.usageDays === d}>${d} days</option>
            `)}
          </select>
        </span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("usage")}>↻ Refresh</button>
      </div>

      ${u.byModel.length === 0 ? html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No LLM usage recorded yet</div>
          <div class="empty-sub">Usage will appear here once requests flow through the proxy.</div>
        </div>
      ` : html`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th style="text-align:right">Requests</th>
                <th style="text-align:right">Prompt Tokens</th>
                <th style="text-align:right">Completion Tokens</th>
                <th style="text-align:right">Total Tokens</th>
                <th style="text-align:right">Retries</th>
                <th style="text-align:right">Streamed</th>
              </tr>
            </thead>
            <tbody>
              ${u.byModel.map(m => html`
                <tr>
                  <td>
                    <span class="model-chip" style="font-size:12px">${m.model}</span>
                  </td>
                  <td style="text-align:right">${this.fmtNum(m.requests)}</td>
                  <td style="text-align:right text-muted">${this.fmtNum(m.prompt_tokens)}</td>
                  <td style="text-align:right">${this.fmtNum(m.completion_tokens)}</td>
                  <td style="text-align:right font-weight:600">${this.fmtNum(m.total_tokens)}</td>
                  <td style="text-align:right">${m.retries}</td>
                  <td style="text-align:right">${this.fmtNum(m.streamed_requests)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr style="font-weight:600;border-top:2px solid var(--border)">
                <td>Total</td>
                <td style="text-align:right">${this.fmtNum(u.byModel.reduce((s, m) => s + m.requests, 0))}</td>
                <td style="text-align:right">${this.fmtNum(u.byModel.reduce((s, m) => s + Number(m.prompt_tokens), 0))}</td>
                <td style="text-align:right">${this.fmtNum(u.byModel.reduce((s, m) => s + Number(m.completion_tokens), 0))}</td>
                <td style="text-align:right">${this.fmtNum(u.byModel.reduce((s, m) => s + Number(m.total_tokens), 0))}</td>
                <td style="text-align:right">${u.byModel.reduce((s, m) => s + m.retries, 0)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Daily bar chart (CSS-only) -->
        ${u.daily.length > 0 ? html`
          <div style="margin-top:24px">
            <div class="table-header"><span class="table-count">Daily requests — last ${u.days} days</span></div>
            <div class="usage-bars">
              ${(() => {
                const max = Math.max(...u.daily.map(d => d.requests), 1);
                return u.daily.map(d => html`
                  <div class="usage-bar-col" title="${d.day}: ${this.fmtNum(d.requests)} requests, ${this.fmtNum(d.total_tokens)} tokens">
                    <div class="usage-bar" style="height:${Math.max(4, Math.round((d.requests / max) * 80))}px"></div>
                    <div class="usage-bar-label">${d.day.slice(5)}</div>
                  </div>
                `);
              })()}
            </div>
          </div>
        ` : ""}

        <!-- Failover breakdown -->
        ${u.failovers.length > 0 ? html`
          <div style="margin-top:24px">
            <div class="table-header">
              <span class="table-count">Failovers — last ${u.days} days</span>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th style="text-align:right">HTTP Code</th>
                    <th style="text-align:right">Count</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  ${u.failovers.map(f => html`
                    <tr>
                      <td><span class="model-chip" style="font-size:12px">${f.model}</span></td>
                      <td style="text-align:right">
                        ${f.errorCode === 0
                          ? html`<span class="badge badge-neutral">body</span>`
                          : html`<span class="badge badge-danger">${f.errorCode}</span>`}
                      </td>
                      <td style="text-align:right;font-weight:600">${this.fmtNum(f.count)}</td>
                      <td class="text-muted" style="font-size:12px">
                        ${f.errorCode === 0 ? "Provider error in response body" :
                          f.errorCode === 429 ? "Rate limited" :
                          f.errorCode === 402 ? "Spend limit reached" :
                          f.errorCode === 503 ? "Model unavailable" :
                          f.errorCode === 420 ? "Rate limited (420)" :
                          `HTTP ${f.errorCode}`}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>
        ` : html`
          <div style="margin-top:24px;color:var(--text-muted,#6b7280);font-size:13px">
            No failover events in the last ${u.days} days.
          </div>
        `}
      `}
    `;
  }

  private renderUsers() {
    return html`
      <div class="table-header">
        <span class="table-count">${this.users.length} users</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("users")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Workspaces</th>
              <th>Joined</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(u => html`
              <tr>
                <td>${u.email}</td>
                <td class="text-muted">${u.username ?? "—"}</td>
                <td>${u.tenantCount}</td>
                <td class="text-muted">${this.fmtDate(u.createdAt)}</td>
                <td>
                  ${u.isSuperadmin
                    ? html`<span class="badge badge-danger">superadmin</span>`
                    : html`<span class="badge badge-neutral">user</span>`}
                </td>
                <td>
                  <button class="btn btn-ghost btn-xs" @click=${() => this.startImpersonate(u.id)}
                    title="Impersonate this user">
                    Impersonate
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderTenants() {
    return html`
      <div class="table-header">
        <span class="table-count">${this.tenants.length} workspaces</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("tenants")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Billing</th>
              <th>Members</th>
              <th>Claws</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            ${this.tenants.map(t => html`
              <tr>
                <td>${t.name}</td>
                <td class="text-muted">${t.slug}</td>
                <td>
                  <span class="badge ${t.status === "active" ? "badge-success" : "badge-neutral"}">
                    ${t.status}
                  </span>
                </td>
                <td>
                  <span class="badge ${t.effectivePlan === "pro" ? "badge-danger" : "badge-neutral"}">
                    ${t.effectivePlan}
                  </span>
                </td>
                <td class="text-muted">${t.billingStatus}</td>
                <td>${t.memberCount}</td>
                <td>${t.clawCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderErrors() {
    if (!this.errors.length) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div class="empty-title">No errors logged</div>
          <div class="empty-sub">The API error log is clean.</div>
        </div>
      `;
    }

    return html`
      <div class="table-header">
        <span class="table-count">${this.errors.length} errors (last 200)</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("errors")}>↻ Refresh</button>
      </div>
      <div class="error-log">
        ${this.errors.map(e => html`
          <div class="error-entry" @click=${() => this.expandedErrorId = this.expandedErrorId === e.id ? null : e.id}>
            <div class="error-entry-header">
              <span class="error-method">${e.method ?? "?"}</span>
              <span class="error-path">${e.path ?? "?"}</span>
              <span class="error-msg">${e.message}</span>
              <span class="error-time text-muted">${this.fmtDateTime(e.createdAt)}</span>
              <span class="error-chevron">${this.expandedErrorId === e.id ? "▲" : "▼"}</span>
            </div>
            ${this.expandedErrorId === e.id && e.stack ? html`
              <pre class="error-stack">${e.stack}</pre>
            ` : ""}
          </div>
        `)}
      </div>
    `;
  }

  private renderImpersonateModal() {
    const user = this.users.find(u => u.id === this.impersonateUserId);
    return html`
      <div class="modal-backdrop" @click=${() => this.impersonateUserId = null}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">
            <h3>Impersonate ${user?.email ?? "user"}</h3>
            <button class="btn btn-ghost btn-icon" @click=${() => this.impersonateUserId = null}>✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">Select a workspace to enter as this user. A temporary token will be issued.</p>
            ${this.impersonateTenants.length === 0
              ? html`<div class="text-muted">This user has no workspaces.</div>`
              : html`
                <div class="tenant-list">
                  ${this.impersonateTenants.map(t => html`
                    <button class="tenant-option" @click=${() => this.doImpersonate(t.id)}>
                      <span class="tenant-option-name">${t.name}</span>
                      <span class="text-muted">${t.slug}</span>
                      <span class="tenant-option-arrow">→</span>
                    </button>
                  `)}
                </div>
              `}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-admin": CclAdmin; }
}
