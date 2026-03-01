import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  adminApi,
  getWebToken,
  setTenantToken, setTenantId,
  type AdminUser, type AdminTenant, type AdminHealth, type AdminError,
  type AdminSecurityUser,
  type LlmUsageStats,
} from "../api.js";
import QRCode from "qrcode";

type AdminTab = "health" | "billing" | "users" | "tenants" | "errors" | "usage" | "security";
type LlmPoolTab = "coderClawLLM" | "coderClawLLMPro";

@customElement("ccl-admin")
export class CclAdmin extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) initialTab: AdminTab = "security";

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
  @state() private llmPoolTab: LlmPoolTab = "coderClawLLM";
  @state() private copiedAdminToken = false;
  @state() private copiedAdminEnv = false;
  @state() private downloadedAdminEnv = false;
  @state() private impersonateUserId: string | null = null;
  @state() private impersonateTenants: AdminTenant[] = [];
  @state() private expandedErrorId: number | null = null;
  @state() private securityTenantId: number | null = null;
  @state() private securityUsers: AdminSecurityUser[] = [];
  @state() private securityUserId: string | null = null;
  @state() private securityUserEmail = "";
  @state() private securityMfaStatus: { enabled: boolean; setupPending: boolean; enabledAt: string | null; recoveryGeneratedAt: string | null } | null = null;
  @state() private securitySessions: Array<{
    id: string;
    sessionName?: string | null;
    userAgent?: string | null;
    ipAddress?: string | null;
    isActive: boolean;
    revokedAt?: string | null;
    createdAt: string;
    lastSeenAt: string;
    activeTokens: number;
  }> = [];
  @state() private securityTokens: Array<{
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
    isActive: boolean;
  }> = [];
  @state() private securityLoading = false;
  @state() private securityMfaSetupBusy = false;
  @state() private securityMfaEnableBusy = false;
  @state() private securityMfaDisableBusy = false;
  @state() private securityMfaRegenerateBusy = false;
  @state() private securityMfaMode: "totp" | "recovery" = "totp";
  @state() private securityMfaCode = "";
  @state() private securityRecoveryCode = "";
  @state() private securityMfaManualKey = "";
  @state() private securityMfaQrDataUrl = "";
  @state() private securityRecoveryCodes: string[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.loadTab(this.initialTab ?? "security");
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
      } else if (tab === "billing") {
        const [tenants, errors] = await Promise.all([
          adminApi.tenants(),
          adminApi.errors(),
        ]);
        this.tenants = tenants;
        this.errors = errors;
      } else if (tab === "security") {
        await this.loadSecurityContext();
      }
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.loading = false;
    }
  }

  private async loadSecurityContext() {
    this.securityLoading = true;
    try {
      if (!this.tenants.length) {
        this.tenants = await adminApi.tenants();
      }
      if (!this.securityTenantId && this.tenants.length) {
        this.securityTenantId = this.tenants[0].id;
      }
      await this.reloadSecurityUsers();
      if (this.securityTenantId && this.securityUserId) {
        await this.reloadSecurityDetails();
      }
    } finally {
      this.securityLoading = false;
    }
  }

  private async reloadSecurityUsers() {
    if (!this.securityTenantId) {
      this.securityUsers = [];
      this.securityUserId = null;
      return;
    }
    this.securityUsers = await adminApi.securityUsers(this.securityTenantId);
    if (!this.securityUsers.length) {
      this.securityUserId = null;
      this.securityUserEmail = "";
      this.securityMfaStatus = null;
      this.securitySessions = [];
      this.securityTokens = [];
      return;
    }
    if (!this.securityUserId || !this.securityUsers.some((user) => user.id === this.securityUserId)) {
      this.securityUserId = this.securityUsers[0].id;
    }
  }

  private async reloadSecurityDetails() {
    if (!this.securityTenantId || !this.securityUserId) return;
    const details = await adminApi.securityDetails(this.securityTenantId, this.securityUserId);
    this.securityUserEmail = details.user.email;
    this.securityMfaStatus = details.mfa;
    this.securitySessions = details.sessions;
    this.securityTokens = details.tokens;
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
          ${(["health", "billing", "usage", "users", "tenants", "security", "errors"] as AdminTab[]).map(t => html`
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
    if (this.tab === "billing") return this.renderBilling();
    if (this.tab === "usage")   return this.renderUsage();
    if (this.tab === "users")   return this.renderUsers();
    if (this.tab === "tenants") return this.renderTenants();
    if (this.tab === "security") return this.renderSecurity();
    if (this.tab === "errors")  return this.renderErrors();
    return html``;
  }

  private composeMailto(email: string, subject: string, body: string) {
    const q = new URLSearchParams({ subject, body });
    return `mailto:${encodeURIComponent(email)}?${q.toString()}`;
  }

  private renderBilling() {
    const activePaid = this.tenants.filter((tenant) => tenant.billingStatus === "active" && tenant.effectivePlan === "pro");
    const pastDue = this.tenants.filter((tenant) => tenant.billingStatus === "past_due");
    const pending = this.tenants.filter((tenant) => tenant.billingStatus === "pending");
    const freeUpgradeLeads = this.tenants.filter((tenant) => tenant.effectivePlan === "free");
    const invoiceQueue = this.tenants.filter((tenant) => ["active", "past_due", "pending"].includes(tenant.billingStatus));
    const feedbackItems = this.errors.slice(0, 20);

    const invoiceSubject = "CoderClaw billing invoice";
    const invoiceBody = "Hi team,\n\nYour latest CoderClaw invoice is ready. Reply to this email if you need a detailed line-item breakdown.\n\nThanks,\nCoderClaw Billing";
    const reminderSubject = "Action needed: billing update for your CoderClaw workspace";
    const reminderBody = "Hi team,\n\nWe noticed your workspace billing needs attention. Please update payment details to keep Pro features active.\n\nThanks,\nCoderClaw Billing";
    const upgradeSubject = "Unlock CoderClaw Pro for your workspace";
    const upgradeBody = "Hi team,\n\nYour workspace is on Free. Upgrade to Pro for higher limits, stronger model access, and priority performance.\n\nReply if you want a quick recommendation for the best plan.\n\nThanks,\nCoderClaw Team";

    return html`
      <div class="billing-crm-grid">
        <div class="health-card">
          <div class="health-label">Paid Workspaces</div>
          <div class="health-value">${activePaid.length}</div>
          <div class="health-sub">Income-driving active subscriptions</div>
        </div>
        <div class="health-card ${pastDue.length ? "health-warn" : ""}">
          <div class="health-label">Past Due</div>
          <div class="health-value">${pastDue.length}</div>
          <div class="health-sub">Need payment follow-up</div>
        </div>
        <div class="health-card ${pending.length ? "health-warn" : ""}">
          <div class="health-label">Pending Billing</div>
          <div class="health-value">${pending.length}</div>
          <div class="health-sub">Pending payment activation</div>
        </div>
        <div class="health-card">
          <div class="health-label">Upgrade Leads</div>
          <div class="health-value">${freeUpgradeLeads.length}</div>
          <div class="health-sub">Free workspaces to nurture</div>
        </div>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Invoice queue (${invoiceQueue.length})</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("billing")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Plan</th>
              <th>Billing</th>
              <th>Billing Email</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${invoiceQueue.map(tenant => html`
              <tr>
                <td>${tenant.name}</td>
                <td>
                  <span class="badge ${tenant.effectivePlan === "pro" ? "badge-success" : "badge-neutral"}">
                    ${tenant.effectivePlan}
                  </span>
                </td>
                <td class="text-muted">${tenant.billingStatus}</td>
                <td class="text-muted">${tenant.billingEmail ?? "—"}</td>
                <td class="text-muted">${tenant.billingUpdatedAt ? this.fmtDateTime(tenant.billingUpdatedAt) : "—"}</td>
                <td class="billing-actions-cell">
                  ${tenant.billingEmail ? html`
                    <a
                      class="btn btn-ghost btn-xs"
                      href=${this.composeMailto(tenant.billingEmail, invoiceSubject, invoiceBody)}
                    >Send invoice</a>
                    <a
                      class="btn btn-ghost btn-xs"
                      href=${this.composeMailto(tenant.billingEmail, reminderSubject, reminderBody)}
                    >Payment reminder</a>
                  ` : html`<span class="text-muted" style="font-size:12px">No billing email</span>`}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Upgrade communications (${freeUpgradeLeads.length})</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Status</th>
              <th>Members</th>
              <th>Claws</th>
              <th>Billing Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${freeUpgradeLeads.slice(0, 200).map(tenant => html`
              <tr>
                <td>${tenant.name}</td>
                <td><span class="badge badge-neutral">${tenant.status}</span></td>
                <td>${tenant.memberCount}</td>
                <td>${tenant.clawCount}</td>
                <td class="text-muted">${tenant.billingEmail ?? "—"}</td>
                <td>
                  ${tenant.billingEmail
                    ? html`<a class="btn btn-ghost btn-xs" href=${this.composeMailto(tenant.billingEmail, upgradeSubject, upgradeBody)}>Send upgrade message</a>`
                    : html`<span class="text-muted" style="font-size:12px">No email on file</span>`}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Feedback & issues (${feedbackItems.length})</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("errors")}>Open full error log</button>
      </div>
      <div class="error-log">
        ${feedbackItems.length === 0
          ? html`<div class="empty-state" style="padding:24px 0"><div class="empty-sub">No feedback/issues captured yet.</div></div>`
          : feedbackItems.map(item => html`
            <div class="error-entry">
              <div class="error-entry-header">
                <span class="error-method">${item.method ?? "N/A"}</span>
                <span class="error-path">${item.path ?? "Unknown path"}</span>
                <span class="error-msg">${item.message ?? "No message"}</span>
                <span class="error-time text-muted">${this.fmtDateTime(item.createdAt)}</span>
                <span class="error-chevron">•</span>
              </div>
            </div>
          `)}
      </div>
    `;
  }

  private renderHealth() {
    const h = this.health;
    const webToken = getWebToken() ?? "";
    if (!h) return html`<div class="loading-state">No data</div>`;

    const freeModels = h.llm.models.filter((m) => m.model.toLowerCase().includes(":free"));
    const paidModels = h.llm.models.filter((m) => !m.model.toLowerCase().includes(":free"));
    const selectedModels = this.llmPoolTab === "coderClawLLM" ? freeModels : paidModels;

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
          <div class="model-pool-tabs">
            <button
              class="model-pool-tab ${this.llmPoolTab === "coderClawLLM" ? "active" : ""}"
              @click=${() => { this.llmPoolTab = "coderClawLLM"; }}
            >
              coderClawLLM (${freeModels.length})
            </button>
            <button
              class="model-pool-tab ${this.llmPoolTab === "coderClawLLMPro" ? "active" : ""}"
              @click=${() => { this.llmPoolTab = "coderClawLLMPro"; }}
            >
              coderClawLLMPro (${paidModels.length})
            </button>
          </div>
          <div class="model-list">
            ${selectedModels.map(m => {
              const chipStyle = m.available
                ? "background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)"
                : "background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)";
              const statusLabel = m.available ? "available" : `cooldown ${this.fmtCooldown(m.cooldownUntil ?? 0)}`;
              const label = `${m.preferred ? "★ " : ""}${m.model} · ${statusLabel}`;
              const title = m.available
                ? `${m.preferred ? "Preferred (round-robin). " : "Fallback. "}Available`
                : `On cooldown — available in ${this.fmtCooldown(m.cooldownUntil ?? 0)}`;
              return html`<span class="model-chip" style="${chipStyle}" title="${title}">${label}</span>`;
            })}
          </div>
          ${selectedModels.length === 0 ? html`
            <div class="health-sub">No models in this pool.</div>
          ` : ""}
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

  private async onSecurityTenantChange(e: Event) {
    this.securityTenantId = Number((e.target as HTMLSelectElement).value);
    this.securityUserId = null;
    this.securityMfaQrDataUrl = "";
    this.securityMfaManualKey = "";
    this.securityRecoveryCodes = [];
    try {
      await this.reloadSecurityUsers();
      await this.reloadSecurityDetails();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    }
  }

  private async onSecurityUserChange(e: Event) {
    this.securityUserId = (e.target as HTMLSelectElement).value;
    this.securityMfaQrDataUrl = "";
    this.securityMfaManualKey = "";
    this.securityRecoveryCodes = [];
    try {
      await this.reloadSecurityDetails();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    }
  }

  private async startSecurityMfaSetup() {
    if (!this.securityTenantId || !this.securityUserId) return;
    this.securityMfaSetupBusy = true;
    this.errorMsg = "";
    try {
      const setup = await adminApi.securityMfaSetup(this.securityTenantId, this.securityUserId);
      this.securityMfaManualKey = setup.manualEntryKey;
      this.securityMfaQrDataUrl = await QRCode.toDataURL(setup.otpauthUrl, { width: 220, margin: 1 });
      this.securityRecoveryCodes = [];
      await this.reloadSecurityDetails();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    } finally {
      this.securityMfaSetupBusy = false;
    }
  }

  private async enableSecurityMfa() {
    if (!this.securityTenantId || !this.securityUserId || !this.securityMfaCode.trim()) return;
    this.securityMfaEnableBusy = true;
    this.errorMsg = "";
    try {
      const res = await adminApi.securityMfaEnable(this.securityTenantId, this.securityUserId, this.securityMfaCode.trim());
      this.securityRecoveryCodes = res.recoveryCodes;
      this.securityMfaCode = "";
      this.securityMfaQrDataUrl = "";
      this.securityMfaManualKey = "";
      await this.reloadSecurityDetails();
      await this.reloadSecurityUsers();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    } finally {
      this.securityMfaEnableBusy = false;
    }
  }

  private async disableSecurityMfa() {
    if (!this.securityTenantId || !this.securityUserId) return;
    if (this.securityMfaMode === "totp" && !this.securityMfaCode.trim()) return;
    if (this.securityMfaMode === "recovery" && !this.securityRecoveryCode.trim()) return;
    this.securityMfaDisableBusy = true;
    this.errorMsg = "";
    try {
      await adminApi.securityMfaDisable(this.securityTenantId, this.securityUserId, {
        code: this.securityMfaMode === "totp" ? this.securityMfaCode.trim() : undefined,
        recoveryCode: this.securityMfaMode === "recovery" ? this.securityRecoveryCode.trim() : undefined,
      });
      this.securityMfaCode = "";
      this.securityRecoveryCode = "";
      this.securityRecoveryCodes = [];
      await this.reloadSecurityDetails();
      await this.reloadSecurityUsers();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    } finally {
      this.securityMfaDisableBusy = false;
    }
  }

  private async regenerateSecurityRecoveryCodes() {
    if (!this.securityTenantId || !this.securityUserId) return;
    if (this.securityMfaMode === "totp" && !this.securityMfaCode.trim()) return;
    if (this.securityMfaMode === "recovery" && !this.securityRecoveryCode.trim()) return;
    this.securityMfaRegenerateBusy = true;
    this.errorMsg = "";
    try {
      const res = await adminApi.securityRegenerateRecoveryCodes(this.securityTenantId, this.securityUserId, {
        code: this.securityMfaMode === "totp" ? this.securityMfaCode.trim() : undefined,
        recoveryCode: this.securityMfaMode === "recovery" ? this.securityRecoveryCode.trim() : undefined,
      });
      this.securityRecoveryCodes = res.recoveryCodes;
      this.securityMfaCode = "";
      this.securityRecoveryCode = "";
      await this.reloadSecurityDetails();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    } finally {
      this.securityMfaRegenerateBusy = false;
    }
  }

  private downloadSecurityRecoveryCodes() {
    if (!this.securityRecoveryCodes.length) return;
    const content = this.securityRecoveryCodes.join("\n");
    const blob = new Blob([`${content}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `recovery-codes-${this.securityUserEmail || "user"}.txt`;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  private async revokeSecuritySession(sessionId: string) {
    if (!this.securityTenantId || !this.securityUserId) return;
    if (!confirm("Revoke this session and sign out the device?")) return;
    try {
      await adminApi.securityRevokeSession(this.securityTenantId, this.securityUserId, sessionId);
      await this.reloadSecurityDetails();
      await this.reloadSecurityUsers();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    }
  }

  private async revokeAllSecuritySessions() {
    if (!this.securityTenantId || !this.securityUserId) return;
    if (!confirm("Revoke all sessions for this user?")) return;
    try {
      await adminApi.securityRevokeAllSessions(this.securityTenantId, this.securityUserId);
      await this.reloadSecurityDetails();
      await this.reloadSecurityUsers();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    }
  }

  private async revokeSecurityToken(jti: string) {
    if (!this.securityTenantId || !this.securityUserId) return;
    if (!confirm("Revoke this token?")) return;
    try {
      await adminApi.securityRevokeToken(this.securityTenantId, this.securityUserId, jti);
      await this.reloadSecurityDetails();
      await this.reloadSecurityUsers();
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : String(err);
    }
  }

  private renderSecurity() {
    const tenantOptions = this.tenants;
    const selectedTenant = tenantOptions.find((tenant) => tenant.id === this.securityTenantId);
    const selectedUser = this.securityUsers.find((user) => user.id === this.securityUserId);

    return html`
      <div class="table-header">
        <span class="table-count">Tenant-level security management</span>
        <button class="btn btn-ghost btn-sm" @click=${() => this.loadTab("security")}>↻ Refresh</button>
      </div>

      <div style="display:grid;gap:10px;grid-template-columns:1fr 1fr;margin-bottom:14px">
        <div>
          <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:6px">Tenant</div>
          <select class="select" .value=${String(this.securityTenantId ?? "")} @change=${this.onSecurityTenantChange}>
            ${tenantOptions.map((tenant) => html`<option value=${tenant.id}>${tenant.name} (${tenant.slug})</option>`)}
          </select>
        </div>
        <div>
          <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:6px">User</div>
          <select class="select" .value=${this.securityUserId ?? ""} @change=${this.onSecurityUserChange} ?disabled=${!this.securityUsers.length}>
            ${this.securityUsers.map((user) => html`<option value=${user.id}>${user.email}</option>`)}
          </select>
        </div>
      </div>

      ${this.securityLoading
        ? html`<div class="loading-state">Loading security context…</div>`
        : !selectedTenant
          ? html`<div class="empty-state"><div class="empty-sub">No tenant available.</div></div>`
          : !selectedUser
            ? html`<div class="empty-state"><div class="empty-sub">No active members found for this tenant.</div></div>`
            : html`
              <div class="health-grid" style="margin-bottom:16px">
                <div class="health-card">
                  <div class="health-label">User</div>
                  <div class="health-value" style="font-size:14px">${selectedUser.email}</div>
                  <div class="health-sub">${selectedUser.displayName ?? selectedUser.username ?? "—"}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">MFA</div>
                  <div class="health-value">${this.securityMfaStatus?.enabled ? "Enabled" : "Disabled"}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">Active Sessions</div>
                  <div class="health-value">${selectedUser.activeSessions}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">Active Tokens</div>
                  <div class="health-value">${selectedUser.activeTokens}</div>
                </div>
              </div>

              <div class="card" style="max-width:760px;margin-bottom:16px">
                <div class="card-title" style="margin-bottom:8px">MFA Controls</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                  ${this.securityMfaStatus?.enabled
                    ? html`<button class="btn btn-danger btn-sm" @click=${this.disableSecurityMfa} ?disabled=${this.securityMfaDisableBusy}>${this.securityMfaDisableBusy ? "Disabling…" : "Disable MFA"}</button>`
                    : html`<button class="btn btn-primary btn-sm" @click=${this.startSecurityMfaSetup} ?disabled=${this.securityMfaSetupBusy}>${this.securityMfaSetupBusy ? "Preparing…" : "Set up MFA"}</button>`}
                  ${this.securityMfaStatus?.enabled
                    ? html`<button class="btn btn-secondary btn-sm" @click=${this.regenerateSecurityRecoveryCodes} ?disabled=${this.securityMfaRegenerateBusy}>${this.securityMfaRegenerateBusy ? "Regenerating…" : "Regenerate recovery codes"}</button>`
                    : ""}
                </div>

                ${this.securityMfaQrDataUrl ? html`
                  <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:10px;display:grid;gap:10px">
                    <div style="font-size:12px;color:var(--text-muted,#6b7280)">Scan QR with the user authenticator app and verify with a 6-digit code.</div>
                    <img alt="MFA QR" src=${this.securityMfaQrDataUrl} style="width:220px;height:220px;border:1px solid var(--border);border-radius:8px;background:#fff;padding:8px" />
                    <div style="font-size:12px;color:var(--text-muted,#6b7280)">Manual key: <span style="font-family:var(--mono)">${this.securityMfaManualKey}</span></div>
                  </div>
                ` : ""}

                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                  <button type="button" class="btn ${this.securityMfaMode === "totp" ? "btn-primary" : "btn-secondary"} btn-sm" @click=${() => { this.securityMfaMode = "totp"; }}>Use authenticator code</button>
                  <button type="button" class="btn ${this.securityMfaMode === "recovery" ? "btn-primary" : "btn-secondary"} btn-sm" @click=${() => { this.securityMfaMode = "recovery"; }}>Use recovery code</button>
                </div>

                ${this.securityMfaMode === "totp"
                  ? html`<input class="input" placeholder="6-digit code" .value=${this.securityMfaCode} @input=${(e: InputEvent) => { this.securityMfaCode = (e.target as HTMLInputElement).value; }} style="margin-bottom:8px" />`
                  : html`<input class="input" placeholder="ABCD-EFGH" .value=${this.securityRecoveryCode} @input=${(e: InputEvent) => { this.securityRecoveryCode = (e.target as HTMLInputElement).value; }} style="margin-bottom:8px" />`}

                ${this.securityMfaQrDataUrl
                  ? html`<button class="btn btn-primary btn-sm" @click=${this.enableSecurityMfa} ?disabled=${this.securityMfaEnableBusy || !this.securityMfaCode.trim()}>${this.securityMfaEnableBusy ? "Enabling…" : "Enable MFA"}</button>`
                  : ""}

                ${this.securityRecoveryCodes.length
                  ? html`
                    <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px">
                      <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:8px">Save these one-time recovery codes now.</div>
                      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:8px;font-family:var(--mono);font-size:12px;color:var(--text-strong)">
                        ${this.securityRecoveryCodes.map((code) => html`<div>${code}</div>`)}
                      </div>
                      <button class="btn btn-secondary btn-sm" @click=${this.downloadSecurityRecoveryCodes}>Download recovery codes</button>
                    </div>
                  `
                  : ""}
              </div>

              <div class="card" style="max-width:760px;margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <div class="card-title" style="margin:0">Active Sessions</div>
                  <button class="btn btn-danger btn-sm" @click=${this.revokeAllSecuritySessions}>Revoke all sessions</button>
                </div>
                <div style="display:grid;gap:8px">
                  ${this.securitySessions.length === 0
                    ? html`<div style="font-size:12px;color:var(--text-muted,#6b7280)">No sessions found.</div>`
                    : this.securitySessions.map((session) => html`
                      <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                          <div style="font-size:13px;color:var(--text-strong);font-weight:600">${session.sessionName || "Session"}</div>
                          <button class="btn btn-danger btn-sm" @click=${() => this.revokeSecuritySession(session.id)}>Revoke</button>
                        </div>
                        <div style="font-size:12px;color:var(--text-muted,#6b7280)">${session.userAgent || "Unknown device"}</div>
                        <div style="font-size:12px;color:var(--text-muted,#6b7280)">IP: ${session.ipAddress || "Unknown"} · Tokens: ${session.activeTokens} · Last seen: ${new Date(session.lastSeenAt).toLocaleString()}</div>
                      </div>
                    `)}
                </div>
              </div>

              <div class="card" style="max-width:760px">
                <div class="card-title" style="margin-bottom:8px">JWT Tokens</div>
                <div style="display:grid;gap:8px">
                  ${this.securityTokens.slice(0, 30).map((token) => html`
                    <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                      <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-size:12px;color:var(--text-strong);font-family:var(--mono)">${token.jti}</div>
                        <button class="btn btn-danger btn-sm" @click=${() => this.revokeSecurityToken(token.jti)}>Revoke</button>
                      </div>
                      <div style="font-size:12px;color:var(--text-muted,#6b7280)">${token.tokenType.toUpperCase()}${token.tenantId != null ? ` · Tenant ${token.tenantId}` : ""} · ${token.isActive ? "Active" : "Inactive"}</div>
                      <div style="font-size:12px;color:var(--text-muted,#6b7280)">Expires: ${new Date(token.expiresAt).toLocaleString()}</div>
                    </div>
                  `)}
                </div>
              </div>
            `}
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
