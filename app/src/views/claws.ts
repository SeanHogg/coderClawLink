import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { claws as clawsApi, getTenantToken, tenants, type Claw, type ClawRegistration } from "../api.js";
import "./claw/chat.js";
import "./claw/agents.js";
import "./claw/config.js";
import "./claw/sessions.js";
import "./claw/claw-skills.js";
import "./claw/usage.js";
import "./claw/cron.js";
import "./claw/nodes.js";
import "./claw/channels.js";
import "./claw/claw-logs.js";
import "./claw/projects.js";
import "./claw/workspace.js";
import "./quickstart.js";

type Tab = "chat" | "agents" | "config" | "sessions" | "skills" | "usage" | "cron" | "nodes" | "channels" | "projects" | "workspace" | "logs";

const TABS: { id: Tab; label: string }[] = [
  { id: "chat",     label: "Chat" },
  { id: "agents",   label: "Agents" },
  { id: "config",   label: "Config" },
  { id: "sessions", label: "Sessions" },
  { id: "skills",   label: "Skills" },
  { id: "usage",    label: "Usage" },
  { id: "cron",     label: "Cron" },
  { id: "nodes",    label: "Nodes" },
  { id: "channels", label: "Channels" },
  { id: "projects", label: "Projects" },
  { id: "workspace", label: "Workspace" },
  { id: "logs",     label: "Logs" },
];

@customElement("ccl-claws")
export class ClawsView extends LitElement {
  override createRenderRoot() { return this; }
  private refreshTimer: ReturnType<typeof setInterval> | null = null;
  @property() tenantId: string = "";
  @state() private clawList: Claw[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private showRegisterModal = false;
  @state() private showManualRegister = false;
  @state() private registerName = "";
  @state() private registering = false;
  @state() private registerError = "";
  @state() private newClaw: ClawRegistration | null = null;
  @state() private apiKeyCopied = false;
  @state() private pluginEnvCopied = false;
  @state() private pluginEnvDownloaded = false;
  @state() private panelOpen = false;
  @state() private activeClaw: Claw | null = null;
  @state() private activeTab: Tab = "chat";
  @state() private defaultClawId: number | null = null;
  @state() private savingDefaultClaw = false;
  @state() private defaultActionClawId: string | null = null;
  @state() private deleteConfirmId: string | null = null;
  @state() private deleting = false;

  override connectedCallback() {
    super.connectedCallback();
    void this.loadClaws();
    this.startPresenceRefresh();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private async loadClaws() {
    this.loading = true;
    this.error = "";
    try {
      const [claws, defaultClaw] = await Promise.all([
        clawsApi.list(),
        this.tenantId ? tenants.defaultClaw(this.tenantId) : Promise.resolve({ defaultClawId: null }),
      ]);
      this.clawList = claws;
      this.defaultClawId = defaultClaw.defaultClawId;
    }
    catch (e: unknown) { this.error = (e as Error).message ?? "Failed to load claws"; }
    finally { this.loading = false; }
  }

  private isDefaultClaw(claw: Claw): boolean {
    return this.defaultClawId !== null && Number(claw.id) === this.defaultClawId;
  }

  private async setDefaultClaw(clawId: number | null, clawRowId?: string) {
    if (!this.tenantId) return;
    this.savingDefaultClaw = true;
    this.defaultActionClawId = clawRowId ?? null;
    try {
      const res = await tenants.setDefaultClaw(this.tenantId, clawId);
      this.defaultClawId = res.defaultClawId;
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to save default claw";
    } finally {
      this.savingDefaultClaw = false;
      this.defaultActionClawId = null;
    }
  }

  private startPresenceRefresh() {
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
    }
    this.refreshTimer = setInterval(() => {
      void this.refreshPresence();
    }, 15_000);
  }

  private async refreshPresence() {
    try {
      this.clawList = await clawsApi.list();
    } catch {}
  }

  private openPanel(claw: Claw) {
    this.activeClaw = claw;
    this.activeTab = "chat";
    this.panelOpen = true;
    this.error = "";
    document.body.style.overflow = "hidden";
  }

  private closePanel() {
    this.panelOpen = false;
    document.body.style.overflow = "";
    setTimeout(() => { this.activeClaw = null; }, 300);
  }

  private async handleRegister() {
    if (!this.registerName.trim()) return;
    this.registering = true;
    this.registerError = "";
    try {
      const result = await clawsApi.register(this.registerName.trim());
      this.newClaw = result;
      this.clawList = [...this.clawList, result];
      if (this.defaultClawId == null) {
        this.defaultClawId = Number(result.id);
      }
      this.registerName = "";
    } catch (e: unknown) {
      this.registerError = (e as Error).message ?? "Registration failed";
    } finally { this.registering = false; }
  }

  private closeRegisterModal() {
    this.showRegisterModal = false;
    this.showManualRegister = false;
    this.newClaw = null;
    this.registerName = "";
    this.registerError = "";
    this.apiKeyCopied = false;
    this.pluginEnvCopied = false;
    this.pluginEnvDownloaded = false;
  }

  private async copyApiKey() {
    if (!this.newClaw) return;
    try {
      await navigator.clipboard.writeText(this.newClaw.apiKey);
      this.apiKeyCopied = true;
      setTimeout(() => { this.apiKeyCopied = false; }, 2000);
    } catch { /* ignore */ }
  }

  private buildPluginEnvTemplate() {
    const tenantToken = getTenantToken() ?? "";
    const apiUrl = ((window as unknown as { API_URL?: string }).API_URL ?? "https://api.coderclaw.ai").replace(/\/+$/, "");
    const clawName = this.newClaw?.name ?? "openclaw-node";
    return [
      `CODERCLAW_LINK_URL=${apiUrl}`,
      `CODERCLAW_LINK_TENANT_TOKEN=${tenantToken}`,
      `CODERCLAW_LINK_CLAW_NAME=${clawName}`,
      `CODERCLAW_LINK_CLAW_ID=${this.newClaw?.id ?? ""}`,
      `CODERCLAW_LINK_API_KEY=${this.newClaw?.apiKey ?? ""}`,
      "OPENCLAW_EXEC_COMMAND=",
      "OPENCLAW_MAX_CONCURRENT_TASKS=1",
      "OPENCLAW_EXEC_TIMEOUT_MS=900000",
      "OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json",
      "OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env",
    ].join("\n");
  }

  private async copyPluginEnvTemplate() {
    if (!this.newClaw) return;
    if (!getTenantToken()) {
      this.registerError = "No tenant token found for current workspace session.";
      return;
    }

    try {
      await navigator.clipboard.writeText(this.buildPluginEnvTemplate());
      this.pluginEnvCopied = true;
      setTimeout(() => {
        this.pluginEnvCopied = false;
      }, 2000);
    } catch {
      this.registerError = "Failed to copy plugin env file.";
    }
  }

  private downloadPluginEnvTemplate() {
    if (!this.newClaw) return;
    if (!getTenantToken()) {
      this.registerError = "No tenant token found for current workspace session.";
      return;
    }

    try {
      const content = this.buildPluginEnvTemplate();
      const blob = new Blob([`${content}\n`], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "coderclawlink.env";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      this.pluginEnvDownloaded = true;
      setTimeout(() => {
        this.pluginEnvDownloaded = false;
      }, 2000);
    } catch {
      this.registerError = "Failed to download plugin env file.";
    }
  }

  private async handleDelete(id: string) {
    this.deleting = true;
    try {
      await clawsApi.remove(id);
      this.clawList = this.clawList.filter(c => c.id !== id);
      this.deleteConfirmId = null;
      if (this.activeClaw?.id === id) this.closePanel();
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Delete failed";
    } finally { this.deleting = false; }
  }

  private statusBadge(claw: Claw) {
    if (claw.status === "active")    return html`<span class="badge badge-green">active</span>`;
    if (claw.status === "suspended") return html`<span class="badge badge-red">suspended</span>`;
    return html`<span class="badge badge-gray">${claw.status}</span>`;
  }

  private connectedDot(claw: Claw) {
    const dotClass = claw.status === "active" && claw.connectedAt ? "dot dot-green" : "dot dot-gray";
    return html`<span class="${dotClass}" title="${claw.connectedAt ? 'connected' : 'offline'}"></span>`;
  }

  private renderRegisterModal() {
    if (!this.showRegisterModal) return html``;
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.closeRegisterModal(); }}>
        <div class="modal" style="width:min(980px,95vw)">
          <div class="modal-title">Register new claw</div>
          ${this.newClaw ? html`
            <div class="modal-sub">Claw registered. Save this API key &mdash; it will not be shown again.</div>
            <div style="margin:1rem 0;background:var(--bg-2,#f4f4f5);border-radius:6px;padding:0.75rem 1rem;font-family:monospace;font-size:0.875rem;word-break:break-all;">${this.newClaw.apiKey}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" @click=${this.copyApiKey}>
                ${this.apiKeyCopied ? "Copied!" : "Copy API key"}
              </button>
              <button class="btn btn-secondary btn-sm" @click=${this.copyPluginEnvTemplate}>
                ${this.pluginEnvCopied ? "Env copied!" : "Copy plugin env file"}
              </button>
              <button class="btn btn-secondary btn-sm" @click=${this.downloadPluginEnvTemplate}>
                ${this.pluginEnvDownloaded ? "Downloaded!" : "Download .env file"}
              </button>
            </div>
            <div style="margin-top:10px;font-size:12px;color:var(--muted,#71717a)">
              Use this env file to run the OpenClaw plugin relay on your node host.
            </div>
            ${this.registerError ? html`<div class="error-banner">${this.registerError}</div>` : ""}
            <div class="modal-footer">
              <button class="btn btn-primary" @click=${this.closeRegisterModal}>Done</button>
            </div>
          ` : !this.showManualRegister ? html`
            <div class="modal-sub">Run the onboarding command on the machine where CoderClaw is installed. It auto-registers a new claw, or reuses existing local CoderClawLink credentials when already connected.</div>
            <ccl-quickstart></ccl-quickstart>
            <div class="modal-footer" style="margin-top:12px">
              <button class="btn btn-ghost" @click=${this.closeRegisterModal}>Close</button>
              <button class="btn btn-secondary" @click=${async () => { await this.loadClaws(); this.closeRegisterModal(); }}>I ran the command — Refresh</button>
              <button class="btn btn-primary" @click=${() => { this.showManualRegister = true; }}>Manual register</button>
            </div>
          ` : html`
            <div class="field">
              <label class="label">Claw name</label>
              <input class="input" placeholder="my-claw"
                .value=${this.registerName}
                @input=${(e: InputEvent) => { this.registerName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.handleRegister(); }}
              />
            </div>
            ${this.registerError ? html`<div class="error-banner">${this.registerError}</div>` : ""}
            <div class="modal-footer">
              <button class="btn btn-ghost" @click=${() => { this.showManualRegister = false; }}>Back</button>
              <button class="btn btn-primary" ?disabled=${this.registering || !this.registerName.trim()}
                @click=${this.handleRegister}>${this.registering ? "Registering…" : "Register"}</button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  private renderDeleteConfirm(claw: Claw) {
    if (this.deleteConfirmId !== claw.id) return html``;
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.deleteConfirmId = null; }}>
        <div class="modal">
          <div class="modal-title">Delete claw</div>
          <div class="modal-sub">Are you sure you want to delete <strong>${claw.name}</strong>? This cannot be undone.</div>
          <div class="modal-footer">
            <button class="btn btn-ghost" @click=${() => { this.deleteConfirmId = null; }}>Cancel</button>
            <button class="btn btn-danger" ?disabled=${this.deleting}
              @click=${() => void this.handleDelete(claw.id)}
            >${this.deleting ? "Deleting…" : "Delete"}</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderPanel() {
    if (!this.activeClaw) return html``;
    const claw = this.activeClaw;
    const wsUrl = clawsApi.wsUrl(claw.id);
    return html`
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:40;transition:opacity 0.2s;
        opacity:${this.panelOpen ? "1" : "0"};" @click=${this.closePanel}></div>
      <div style="position:fixed;top:0;right:0;bottom:0;width:min(860px,100vw);
        background:var(--bg-1,#fff);z-index:50;display:flex;flex-direction:column;
        box-shadow:-4px 0 24px rgba(0,0,0,0.15);
        transform:translateX(${this.panelOpen ? "0" : "100%"});
        transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);">
        <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem 1.25rem;
          border-bottom:1px solid var(--border,#e4e4e7);flex-shrink:0;">
          <button class="btn btn-ghost btn-sm" @click=${this.closePanel}>← Close</button>
          <span style="font-weight:600;font-size:1rem;">${claw.name}</span>
          ${this.isDefaultClaw(claw) ? html`<span class="badge badge-blue">Default</span>` : ""}
          ${this.statusBadge(claw)}
          <span style="font-size:0.75rem;color:var(--muted,#71717a);font-family:monospace;">${claw.slug}</span>
          ${!this.isDefaultClaw(claw) && this.tenantId ? html`
            <button
              class="btn btn-secondary btn-sm"
              style="margin-left:auto"
              ?disabled=${this.savingDefaultClaw}
              @click=${() => void this.setDefaultClaw(Number(claw.id), claw.id)}
            >${this.defaultActionClawId === claw.id ? "Setting…" : "Set as default"}</button>
          ` : html`<span style="margin-left:auto"></span>`}
        </div>
        <div style="display:flex;border-bottom:1px solid var(--border,#e4e4e7);flex-shrink:0;overflow-x:auto;">
          ${TABS.map(t => html`
            <button style="padding:0.625rem 1rem;font-size:0.875rem;border:none;background:none;
              cursor:pointer;white-space:nowrap;
              border-bottom:2px solid ${this.activeTab === t.id ? "var(--accent,#6366f1)" : "transparent"};
              color:${this.activeTab === t.id ? "var(--accent,#6366f1)" : "var(--muted,#71717a)"};
              font-weight:${this.activeTab === t.id ? "600" : "400"}"
              @click=${() => { this.activeTab = t.id as Tab; }}
            >${t.label}</button>
          `)}
        </div>
        <div style="flex:1;overflow:auto;min-height:0;">
          ${this.activeTab === "chat"     ? html`<ccl-claw-chat     .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-chat>` : ""}
          ${this.activeTab === "agents"   ? html`<ccl-claw-agents   .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-agents>` : ""}
          ${this.activeTab === "config"   ? html`<ccl-claw-config   .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-config>` : ""}
          ${this.activeTab === "sessions" ? html`<ccl-claw-sessions .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-sessions>` : ""}
          ${this.activeTab === "skills"   ? html`<ccl-claw-skills   .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-skills>` : ""}
          ${this.activeTab === "usage"    ? html`<ccl-claw-usage    .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-usage>` : ""}
          ${this.activeTab === "cron"     ? html`<ccl-claw-cron     .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-cron>` : ""}
          ${this.activeTab === "nodes"    ? html`<ccl-claw-nodes    .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-nodes>` : ""}
          ${this.activeTab === "channels" ? html`<ccl-claw-channels .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-channels>` : ""}
          ${this.activeTab === "projects" ? html`<ccl-claw-projects .clawId=${claw.id}></ccl-claw-projects>` : ""}
          ${this.activeTab === "workspace" ? html`<ccl-claw-workspace .clawId=${claw.id}></ccl-claw-workspace>` : ""}
          ${this.activeTab === "logs"     ? html`<ccl-claw-logs     .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-logs>` : ""}
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div>
        <div class="page-header">
          <div><div class="page-title">Claws</div><div class="page-sub">${this.clawList.length} registered</div></div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end">
            <button class="btn btn-primary" @click=${() => { this.showManualRegister = false; this.showRegisterModal = true; }}>Register claw</button>
          </div>
        </div>
        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div class="empty-state">Loading…</div>` : ""}
        ${!this.loading && this.clawList.length === 0 ? html`
          <div>
            <div class="empty-state">
              <div class="empty-state-title">No claws registered yet</div>
              <div class="empty-state-sub">Register your first claw to get started.</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.showManualRegister = false; this.showRegisterModal = true; }}>Register claw</button>
            </div>
            <ccl-quickstart></ccl-quickstart>
          </div>
        ` : ""}
        ${!this.loading && this.clawList.length > 0 ? html`
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th></th><th>Name</th><th>Slug</th><th>Status</th><th>Last seen</th><th></th></tr></thead>
              <tbody>
                ${this.clawList.map(claw => html`
                  <tr class="claw-row">
                    <td style="width:2rem;">${this.connectedDot(claw)}</td>
                    <td style="font-weight:500;">${claw.name}</td>
                    <td style="font-family:monospace;font-size:0.8125rem;color:var(--muted,#71717a);">${claw.slug}</td>
                    <td>${this.statusBadge(claw)}</td>
                    <td style="font-size:0.8125rem;color:var(--muted,#71717a);">${claw.lastSeenAt ? new Date(claw.lastSeenAt).toLocaleString() : "never"}</td>
                    <td>
                      <div class="claw-row-actions">
                        ${this.isDefaultClaw(claw)
                          ? html`<span class="badge badge-blue">Default</span>`
                          : (this.tenantId
                              ? html`
                                <button
                                  class="btn btn-secondary btn-sm claw-default-action"
                                  ?disabled=${this.savingDefaultClaw}
                                  @click=${() => void this.setDefaultClaw(Number(claw.id), claw.id)}
                                >${this.defaultActionClawId === claw.id ? "Setting…" : "Set default"}</button>
                              `
                              : "")}
                        <button class="btn btn-primary btn-sm" @click=${() => this.openPanel(claw)}>Open</button>
                        <button class="btn btn-danger btn-sm" @click=${() => { this.deleteConfirmId = claw.id; }}>Delete</button>
                      </div>
                      ${this.renderDeleteConfirm(claw)}
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        ` : ""}
      </div>
      ${this.renderRegisterModal()}
      ${this.renderPanel()}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claws": ClawsView; } }
