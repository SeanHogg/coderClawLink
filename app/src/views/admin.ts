import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  ApiError,
  adminApi,
  getWebToken,
  setTenantToken, setTenantId,
  type AdminUser, type AdminTenant, type AdminHealth, type AdminError,
  type AdminSecurityUser,
  type AdminLegalCurrent,
  type AdminNewsletterSubscriber,
  type AdminPrivacyRequest,
  type AdminNewsletterTemplate,
  type AdminNewsletterEvent,
  type LlmUsageStats,
} from "../api.js";
import QRCode from "qrcode";

import type { Persona } from "./personas.js";
import { BUILTIN_PERSONAS } from "./personas.js";

type AdminTab = "health" | "billing" | "users" | "tenants" | "errors" | "usage" | "security" | "legal" | "newsletter" | "privacy" | "personas" | "governance";
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
  @state() private legalCurrent: AdminLegalCurrent | null = null;
  @state() private legalPublishVersion = "";
  @state() private legalPublishTitle = "Terms of Use";
  @state() private legalPublishContent = "";
  @state() private legalPublishing = false;
  @state() private newsletterSubscribers: AdminNewsletterSubscriber[] = [];
  @state() private newsletterTemplates: AdminNewsletterTemplate[] = [];
  @state() private newsletterEvents: AdminNewsletterEvent[] = [];
  @state() private newsletterStatusFilter: "all" | "subscribed" | "unsubscribed" | "suppressed" = "subscribed";
  @state() private newsletterSearch = "";
  @state() private newsletterTemplateName = "";
  @state() private newsletterTemplateSubject = "";
  @state() private newsletterTemplatePreheader = "";
  @state() private newsletterTemplateBody = "";
  @state() private newsletterTemplateBusy = false;
  @state() private newsletterTrackTemplateId = "";
  @state() private newsletterTrackEmail = "";
  @state() private newsletterTrackBusy = false;

  @state() private privacyRequests: AdminPrivacyRequest[] = [];
  @state() private privacyStatusFilter: string = "";
  @state() private privacyTypeFilter: string = "";
  @state() private privacySearch = "";
  @state() private privacyUpdateBusy = false;
  @state() private systemPersonas: Persona[] = [...BUILTIN_PERSONAS];

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
      } else if (tab === "legal") {
        this.legalCurrent = await adminApi.legalCurrent();
      } else if (tab === "newsletter") {
        await this.loadNewsletterContext();
      } else if (tab === "privacy") {
        await this.loadPrivacyContext();
      } else if (tab === "governance") {
        // no additional data required; governance is managed in tenant workspace
      }
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.loading = false;
    }
  }

  private async loadNewsletterContext() {
    const status = this.newsletterStatusFilter === "all" ? undefined : this.newsletterStatusFilter;
    const [subscribers, templates, events] = await Promise.all([
      adminApi.newsletterSubscribers({ status, q: this.newsletterSearch || undefined, limit: 400 }),
      adminApi.newsletterTemplates(),
      adminApi.newsletterEvents(300),
    ]);
    this.newsletterSubscribers = subscribers;
    this.newsletterTemplates = templates;
    this.newsletterEvents = events;
  }

  private async loadPrivacyContext() {
    const status = this.privacyStatusFilter || undefined;
    const type = this.privacyTypeFilter || undefined;
    const [requests] = await Promise.all([
      adminApi.privacyRequests({ status, type, q: this.privacySearch || undefined, limit: 400 }),
    ]);
    this.privacyRequests = requests;
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
    try {
      this.securityUsers = await adminApi.securityUsers(this.securityTenantId);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        this.securityUsers = [];
        this.securityUserId = null;
        this.securityUserEmail = "";
        this.securityMfaStatus = null;
        this.securitySessions = [];
        this.securityTokens = [];
        this.errorMsg = "Security endpoints are not available on the current API deployment. Deploy the latest api service to enable the Security tab.";
        return;
      }
      throw error;
    }
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
          ${(["health", "billing", "usage", "users", "tenants", "security", "personas", "legal", "newsletter", "privacy", "governance", "errors"] as AdminTab[]).map(t => html`
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
    if (this.tab === "legal")   return this.renderLegal();
    if (this.tab === "newsletter") return this.renderNewsletter();
    if (this.tab === "privacy") return this.renderPrivacy();
    if (this.tab === "governance") return html`<div style="padding:18px"><div class="page-title">Governance</div><div class="page-sub">Project governance rules are managed per‑tenant in the workspace view.</div></div>`;
    if (this.tab === "personas") return this.renderPersonas();
    if (this.tab === "errors")  return this.renderErrors();
    return html``;
  }

  private async publishTerms() {
    if (!this.legalPublishVersion.trim() || !this.legalPublishContent.trim()) {
      this.errorMsg = "Version and content are required.";
      return;
    }

    this.legalPublishing = true;
    this.errorMsg = "";
    try {
      await adminApi.publishTerms({
        version: this.legalPublishVersion.trim(),
        title: this.legalPublishTitle.trim() || "Terms of Use",
        content: this.legalPublishContent.trim(),
      });
      this.legalCurrent = await adminApi.legalCurrent();
      this.legalPublishVersion = "";
      this.legalPublishTitle = "Terms of Use";
      this.legalPublishContent = "";
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.legalPublishing = false;
    }
  }

  private renderLegal() {
    const current = this.legalCurrent;
    return html`
      <div class="health-grid" style="margin-bottom:16px">
        <div class="health-card">
          <div class="health-label">Terms Version</div>
          <div class="health-value">${current?.terms.version ?? "—"}</div>
          <div class="health-sub">Published ${current?.terms.publishedAt ? this.fmtDateTime(current.terms.publishedAt) : "—"}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Privacy Version</div>
          <div class="health-value">${current?.privacy.version ?? "—"}</div>
          <div class="health-sub">Published ${current?.privacy.publishedAt ? this.fmtDateTime(current.privacy.publishedAt) : "—"}</div>
        </div>
      </div>

      <div class="card" style="max-width:900px;margin-bottom:16px">
        <div class="card-title" style="margin-bottom:10px">Current Terms</div>
        <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:10px">
          ${current?.terms.title ?? "Terms of Use"} · v${current?.terms.version ?? "—"}
        </div>
        <textarea class="textarea" style="min-height:220px" readonly>${current?.terms.content ?? ""}</textarea>
      </div>

      <div class="card" style="max-width:900px">
        <div class="card-title" style="margin-bottom:10px">Publish New Terms Version</div>
        <div style="display:grid;grid-template-columns:200px 1fr;gap:10px;margin-bottom:10px">
          <input
            class="input"
            placeholder="Version (e.g. 1.1.0)"
            .value=${this.legalPublishVersion}
            @input=${(e: InputEvent) => { this.legalPublishVersion = (e.target as HTMLInputElement).value; }}
          />
          <input
            class="input"
            placeholder="Title"
            .value=${this.legalPublishTitle}
            @input=${(e: InputEvent) => { this.legalPublishTitle = (e.target as HTMLInputElement).value; }}
          />
        </div>
        <textarea
          class="textarea"
          style="min-height:240px;margin-bottom:10px"
          placeholder="Terms content"
          .value=${this.legalPublishContent}
          @input=${(e: InputEvent) => { this.legalPublishContent = (e.target as HTMLTextAreaElement).value; }}
        ></textarea>
        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-primary btn-sm" @click=${this.publishTerms} ?disabled=${this.legalPublishing}>
            ${this.legalPublishing ? "Publishing…" : "Publish Terms"}
          </button>
        </div>
      </div>
    `;
  }

  private async createNewsletterTemplate() {
    if (!this.newsletterTemplateName.trim() || !this.newsletterTemplateSubject.trim() || !this.newsletterTemplateBody.trim()) {
      this.errorMsg = "Template name, subject, and body are required.";
      return;
    }

    this.newsletterTemplateBusy = true;
    this.errorMsg = "";
    try {
      await adminApi.createNewsletterTemplate({
        name: this.newsletterTemplateName.trim(),
        subject: this.newsletterTemplateSubject.trim(),
        preheader: this.newsletterTemplatePreheader.trim() || undefined,
        bodyMarkdown: this.newsletterTemplateBody,
      });
      this.newsletterTemplateName = "";
      this.newsletterTemplateSubject = "";
      this.newsletterTemplatePreheader = "";
      this.newsletterTemplateBody = "";
      await this.loadNewsletterContext();
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.newsletterTemplateBusy = false;
    }
  }

  private async trackNewsletterSend() {
    if (!this.newsletterTrackEmail.trim() || !this.newsletterTrackTemplateId.trim()) {
      this.errorMsg = "Subscriber email and template are required to track a send.";
      return;
    }

    this.newsletterTrackBusy = true;
    this.errorMsg = "";
    try {
      await adminApi.trackNewsletterEvent({
        subscriberEmail: this.newsletterTrackEmail.trim(),
        templateId: Number(this.newsletterTrackTemplateId),
        eventType: "template_sent",
      });
      this.newsletterTrackEmail = "";
      await this.loadNewsletterContext();
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.newsletterTrackBusy = false;
    }
  }

  private renderNewsletter() {
    return html`
      <div class="health-grid" style="margin-bottom:16px">
        <div class="health-card">
          <div class="health-label">Subscribers</div>
          <div class="health-value">${this.newsletterSubscribers.length}</div>
          <div class="health-sub">Current filtered audience</div>
        </div>
        <div class="health-card">
          <div class="health-label">Templates</div>
          <div class="health-value">${this.newsletterTemplates.length}</div>
          <div class="health-sub">Managed in app.coderclaw.ai</div>
        </div>
        <div class="health-card">
          <div class="health-label">Tracked Events</div>
          <div class="health-value">${this.newsletterEvents.length}</div>
          <div class="health-sub">Recent activity window</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title" style="margin-bottom:8px">Subscribers (CRM)</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <select class="input" style="max-width:220px" .value=${this.newsletterStatusFilter} @change=${async (e: Event) => {
            this.newsletterStatusFilter = (e.target as HTMLSelectElement).value as typeof this.newsletterStatusFilter;
            await this.loadNewsletterContext();
          }}>
            <option value="all">All statuses</option>
            <option value="subscribed">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="suppressed">Suppressed</option>
          </select>
          <input class="input" style="max-width:280px" placeholder="Search email" .value=${this.newsletterSearch} @change=${async (e: Event) => {
            this.newsletterSearch = (e.target as HTMLInputElement).value;
            await this.loadNewsletterContext();
          }} />
          <button class="btn btn-ghost btn-sm" @click=${() => this.loadNewsletterContext()}>↻ Refresh</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Source</th>
                <th>User</th>
                <th>Subscribed</th>
                <th>Unsubscribed</th>
              </tr>
            </thead>
            <tbody>
              ${this.newsletterSubscribers.map((subscriber) => html`
                <tr>
                  <td>${subscriber.email}</td>
                  <td><span class="badge ${subscriber.status === "subscribed" ? "badge-success" : "badge-neutral"}">${subscriber.status}</span></td>
                  <td class="text-muted">${subscriber.source}</td>
                  <td class="text-muted">${subscriber.userDisplayName ?? subscriber.userUsername ?? "—"}</td>
                  <td class="text-muted">${subscriber.subscribedAt ? this.fmtDateTime(subscriber.subscribedAt) : "—"}</td>
                  <td class="text-muted">${subscriber.unsubscribedAt ? this.fmtDateTime(subscriber.unsubscribedAt) : "—"}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title" style="margin-bottom:8px">Email Templates</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
          <input class="input" placeholder="Template name" .value=${this.newsletterTemplateName} @input=${(e: InputEvent) => { this.newsletterTemplateName = (e.target as HTMLInputElement).value; }} />
          <input class="input" placeholder="Subject" .value=${this.newsletterTemplateSubject} @input=${(e: InputEvent) => { this.newsletterTemplateSubject = (e.target as HTMLInputElement).value; }} />
        </div>
        <input class="input" style="margin-bottom:10px" placeholder="Preheader (optional)" .value=${this.newsletterTemplatePreheader} @input=${(e: InputEvent) => { this.newsletterTemplatePreheader = (e.target as HTMLInputElement).value; }} />
        <textarea class="textarea" style="min-height:140px;margin-bottom:10px" placeholder="Markdown body" .value=${this.newsletterTemplateBody} @input=${(e: InputEvent) => { this.newsletterTemplateBody = (e.target as HTMLTextAreaElement).value; }}></textarea>
        <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
          <button class="btn btn-primary btn-sm" @click=${this.createNewsletterTemplate} ?disabled=${this.newsletterTemplateBusy}>${this.newsletterTemplateBusy ? "Saving…" : "Save Template"}</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Slug</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              ${this.newsletterTemplates.map((template) => html`
                <tr>
                  <td>${template.name}</td>
                  <td>${template.subject}</td>
                  <td class="text-muted">${template.slug}</td>
                  <td class="text-muted">${template.updatedAt ? this.fmtDateTime(template.updatedAt) : "—"}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom:8px">Email Tracking</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <select class="input" style="max-width:260px" .value=${this.newsletterTrackTemplateId} @change=${(e: Event) => { this.newsletterTrackTemplateId = (e.target as HTMLSelectElement).value; }}>
            <option value="">Select template</option>
            ${this.newsletterTemplates.map((template) => html`<option value=${String(template.id)}>${template.name}</option>`)}
          </select>
          <input class="input" style="max-width:320px" placeholder="subscriber@email.com" .value=${this.newsletterTrackEmail} @input=${(e: InputEvent) => { this.newsletterTrackEmail = (e.target as HTMLInputElement).value; }} />
          <button class="btn btn-secondary btn-sm" @click=${this.trackNewsletterSend} ?disabled=${this.newsletterTrackBusy}>${this.newsletterTrackBusy ? "Tracking…" : "Track Send"}</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Event</th>
                <th>Email</th>
                <th>Template</th>
              </tr>
            </thead>
            <tbody>
              ${this.newsletterEvents.map((event) => html`
                <tr>
                  <td class="text-muted">${event.createdAt ? this.fmtDateTime(event.createdAt) : "—"}</td>
                  <td>${event.eventType}</td>
                  <td>${event.email}</td>
                  <td class="text-muted">${event.templateName ?? "—"}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private async updatePrivacyEntry(id: number, status?: string, resolution?: string | null) {
    if (!id) return;
    this.privacyUpdateBusy = true;
    this.errorMsg = "";
    try {
      await adminApi.updatePrivacyRequest(id, { status, resolution });
      await this.loadPrivacyContext();
    } catch (e: unknown) {
      this.errorMsg = e instanceof Error ? e.message : String(e);
    } finally {
      this.privacyUpdateBusy = false;
    }
  }

  private renderPrivacy() {
    return html`
      <div class="health-grid" style="margin-bottom:16px">
        <div class="health-card">
          <div class="health-label">Requests</div>
          <div class="health-value">${this.privacyRequests.length}</div>
          <div class="health-sub">Current filtered set</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-title" style="margin-bottom:8px">Filter</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <select class="input" style="max-width:200px" .value=${this.privacyStatusFilter} @change=${async (e: Event) => {
            this.privacyStatusFilter = (e.target as HTMLSelectElement).value;
            await this.loadPrivacyContext();
          }}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select class="input" style="max-width:200px" .value=${this.privacyTypeFilter} @change=${async (e: Event) => {
            this.privacyTypeFilter = (e.target as HTMLSelectElement).value;
            await this.loadPrivacyContext();
          }}>
            <option value="">All types</option>
            <option value="ccpa">CCPA</option>
            <option value="gdpr">GDPR</option>
          </select>
          <input class="input" style="max-width:280px" placeholder="Search email" .value=${this.privacySearch} @change=${async (e: Event) => {
            this.privacySearch = (e.target as HTMLInputElement).value;
            await this.loadPrivacyContext();
          }} />
          <button class="btn btn-ghost btn-sm" @click=${() => this.loadPrivacyContext()}>↻ Refresh</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Requested</th>
                <th>Details</th>
                <th>Resolution</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.privacyRequests.map(req => html`
                <tr>
                  <td>${req.email}</td>
                  <td>${req.requestType.toUpperCase()}</td>
                  <td><span class="badge ${req.status === "pending" ? "badge-neutral" : "badge-success"}">${req.status}</span></td>
                  <td class="text-muted">${req.createdAt ? this.fmtDateTime(req.createdAt) : "—"}</td>
                  <td class="text-muted">${req.details || "—"}</td>
                  <td class="text-muted">${req.resolution || "—"}</td>
                  <td>
                    ${req.status === "pending" ? html`
                      <button class="btn btn-sm btn-secondary" @click=${() => this.updatePrivacyEntry(req.id, "resolved", "processed")} ?disabled=${this.privacyUpdateBusy}>Mark Resolved</button>
                      <button class="btn btn-sm btn-ghost" @click=${() => this.updatePrivacyEntry(req.id, "rejected", null)} ?disabled=${this.privacyUpdateBusy}>Reject</button>
                    ` : ""}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
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

  private renderPersonas() {
    return html`
      <div style="display:grid;gap:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h2 style="font-size:18px;font-weight:700;color:var(--text-strong);margin:0">System Personas</h2>
            <p style="font-size:12px;color:var(--muted);margin:4px 0 0">
              Manage built-in and marketplace personas available across all tenants.
            </p>
          </div>
          <span style="font-size:13px;color:var(--muted)">${this.systemPersonas.length} personas registered</span>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--muted);font-weight:600">Name</th>
              <th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--muted);font-weight:600">Voice</th>
              <th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--muted);font-weight:600">Source</th>
              <th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--muted);font-weight:600">Prefix</th>
              <th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--muted);font-weight:600">Tags</th>
            </tr>
          </thead>
          <tbody>
            ${this.systemPersonas.map((p, i) => html`
              <tr style="background:${i % 2 === 0 ? "transparent" : "var(--surface)"}">
                <td style="padding:8px 12px;border-bottom:1px solid var(--border);font-weight:600;color:var(--text-strong)">
                  <span style="margin-right:6px">🎭</span>${p.name}
                </td>
                <td style="padding:8px 12px;border-bottom:1px solid var(--border);color:var(--text)">${p.voice}</td>
                <td style="padding:8px 12px;border-bottom:1px solid var(--border)">
                  <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${p.source === "builtin" ? "var(--accent,#6366f1)" : "#22c55e"};color:#fff;text-transform:uppercase">${p.source}</span>
                </td>
                <td style="padding:8px 12px;border-bottom:1px solid var(--border)">
                  <code style="background:var(--surface-2);padding:1px 6px;border-radius:4px;font-size:11px">${p.outputPrefix}</code>
                </td>
                <td style="padding:8px 12px;border-bottom:1px solid var(--border);text-align:center">
                  <div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center">
                    ${(p.tags ?? []).map((t) => html`
                      <span style="font-size:10px;padding:1px 6px;border-radius:99px;background:var(--surface-2);color:var(--text);border:1px solid var(--border)">${t}</span>
                    `)}
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-admin": CclAdmin; }
}
