import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";

import {
  auth, tenants, projects as projectsApi, tasks as tasksApi, clearSession,
  getWebToken, getTenantToken, getTenantId, getUser,
  setWebToken, setTenantToken, setTenantId, setUser,
  type LegalDocument,
  type TenantSummary, type UserInfo,
} from "./api.js";

declare const __APP_VERSION__: string;

// Views
import "./views/auth.js";
import "./views/workspace-picker.js";
import "./views/dashboard.js";
import "./views/projects.js";
import "./views/tasks.js";
import "./views/claws.js";
import "./views/skills.js";
import "./views/workspace.js";
import "./views/logs.js";
import "./views/admin.js";
import "./views/quickstart.js";
import "./views/brain.js";
import "./views/agents.js";
import "./views/chats.js";
import "./views/code-editor.js";
import "./views/content.js";
import "./views/debug.js";
import "./views/pricing.js";

type AppState = "loading" | "landing" | "auth" | "workspace-picker" | "dashboard" | "admin";
type DashTab = "home" | "projects" | "tasks" | "claws" | "skills" | "workspace" | "billing" | "logs" | "agents" | "chats" | "code-editor" | "content" | "pricing" | "debug";
type WorkspaceTab = "security" | "settings";
type WorkspaceSection = "settings" | "billing" | "consumption" | "details" | "security";

@customElement("ccl-app")
export class CclApp extends LitElement {
  // Disable shadow DOM so global CSS applies
  override createRenderRoot() { return this; }

  @state() private appState: AppState = "loading";
  @state() private tab: DashTab = "home";
  @state() private selectedProjectId = "";
  @state() private openProjectCreate = false;
  @state() private pendingPrompt = "";
  @state() private user: UserInfo | null = null;
  @state() private tenantList: TenantSummary[] = [];
  @state() private tenant: TenantSummary | null = null;
  @state() private theme: "dark" | "light" = "dark";
  @state() private navCollapsed = false;
  @state() private workspaceInitialTab: WorkspaceTab = "security";
  @state() private workspaceInitialSection = "";
  @state() private legalTerms: LegalDocument | null = null;
  @state() private legalPrivacy: LegalDocument | null = null;
  @state() private termsGateRequired = false;
  @state() private acceptingTerms = false;
  @state() private legalModalType: "terms" | "privacy" | null = null;
  @state() private showScrollTop = false;
  private scrollHandler = () => { this.showScrollTop = window.scrollY > 400; };

  override connectedCallback() {
    super.connectedCallback();
    this.loadTheme();
    void this.loadLegalDocs();
    this.bootstrap();
    window.addEventListener("ccl:unauthorized", this.handleUnauthorized);
    window.addEventListener("ccl:exit-admin", this.handleExitAdmin);
    window.addEventListener("ccl:impersonate", this.handleImpersonate as EventListener);
    window.addEventListener("ccl:open-project", this.handleOpenProject as EventListener);
    window.addEventListener("ccl:new-project", this.handleNewProject);
    window.addEventListener("ccl:navigate", this.handleNavigate as EventListener);
    window.addEventListener("ccl:dashboard-prompt", this.handleDashboardPrompt as EventListener);
    window.addEventListener("ccl:open-admin-security", this.handleOpenAdminSecurity as EventListener);
    window.addEventListener("ccl:terms-required", this.handleTermsRequired as EventListener);
    window.addEventListener("ccl:navigate-auth", this.handleNavigateAuth);
    window.addEventListener("scroll", this.scrollHandler, { passive: true });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("ccl:unauthorized", this.handleUnauthorized);
    window.removeEventListener("ccl:exit-admin", this.handleExitAdmin);
    window.removeEventListener("ccl:impersonate", this.handleImpersonate as EventListener);
    window.removeEventListener("ccl:open-project", this.handleOpenProject as EventListener);
    window.removeEventListener("ccl:new-project", this.handleNewProject);
    window.removeEventListener("ccl:navigate", this.handleNavigate as EventListener);
    window.removeEventListener("ccl:dashboard-prompt", this.handleDashboardPrompt as EventListener);
    window.removeEventListener("ccl:open-admin-security", this.handleOpenAdminSecurity as EventListener);
    window.removeEventListener("ccl:terms-required", this.handleTermsRequired as EventListener);
    window.removeEventListener("ccl:navigate-auth", this.handleNavigateAuth);
    window.removeEventListener("scroll", this.scrollHandler);
  }

  override updated(changed: PropertyValues) {
    if (this.appState !== "dashboard") return;
    if (changed.has("appState") || changed.has("tab") || changed.has("tenant")) {
      this.mountDashboardView();
    }
  }

  private handleUnauthorized = () => {
    clearSession();
    this.user = null;
    this.tenant = null;
    this.termsGateRequired = false;
    this.appState = "landing";
  };

  private handleTermsRequired = async () => {
    if (!getWebToken()) {
      this.termsGateRequired = false;
      return;
    }
    this.termsGateRequired = true;
    await this.loadLegalDocs();
  };

  private async loadLegalDocs() {
    try {
      const legal = await auth.legalCurrent();
      this.legalTerms = legal.terms;
      this.legalPrivacy = legal.privacy;
    } catch {
      // Keep footer resilient even if legal docs endpoint is temporarily unavailable.
    }
  }

  private async ensureTermsAccepted(): Promise<boolean> {
    const webToken = getWebToken();
    if (!webToken) {
      this.termsGateRequired = false;
      return true;
    }

    try {
      const status = await auth.termsStatus();
      this.legalTerms = status.terms;
      this.termsGateRequired = status.needsAcceptance;
      return !status.needsAcceptance;
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        const status = Number((error as { status?: unknown }).status);
        if (status === 401 || status === 403) {
          this.termsGateRequired = false;
          return true;
        }
      }
      this.termsGateRequired = false;
      return true;
    }
  }

  private async acceptCurrentTerms() {
    if (!this.legalTerms || !getWebToken()) return;
    this.acceptingTerms = true;
    try {
      const accepted = await auth.acceptTerms(this.legalTerms.version);
      this.legalTerms = accepted.terms;
      this.termsGateRequired = false;
      await this.bootstrap();
    } finally {
      this.acceptingTerms = false;
    }
  }

  private openLegalModal(type: "terms" | "privacy") {
    this.legalModalType = type;
    if (!this.legalTerms || !this.legalPrivacy) {
      void this.loadLegalDocs();
    }
  }

  private closeLegalModal() {
    this.legalModalType = null;
  }

  private handleExitAdmin = () => {
    // Return to workspace picker (or dashboard if they already had a tenant)
    this.appState = this.tenant ? "dashboard" : "workspace-picker";
  };

  private handleImpersonate = (e: CustomEvent<{ tenantId: number }>) => {
    // Token was already stored by the admin view; load tenant list and navigate
    const tenantId = String(e.detail.tenantId);
    const found = this.tenantList.find(t => String(t.id) === tenantId);
    if (found) {
      this.tenant = found;
    } else {
      // Tenant not in current list — create a minimal stub
      this.tenant = { id: tenantId, name: "Impersonated Workspace", slug: "", role: "viewer", status: "active" };
    }
    this.appState = "dashboard";
  };

  private async bootstrap() {
    const webToken = getWebToken();
    if (!webToken) { this.appState = "landing"; return; }
    this.user = getUser();

    const termsOk = await this.ensureTermsAccepted();
    if (!termsOk) {
      this.appState = "auth";
      return;
    }

    const tenantToken = getTenantToken();
    const tenantId = getTenantId();

    if (tenantToken && tenantId) {
      // Restore last tenant
      try {
        const list = await auth.listTenants();
        this.tenantList = list;
        const found = list.find(t => t.id === tenantId);
        if (found) {
          this.tenant = found;
          this.appState = "dashboard";
          return;
        }
      } catch { /* fall through to picker */ }
    }

    // Has web token but no tenant — go to picker
    try {
      this.tenantList = await auth.listTenants();
      this.appState = "workspace-picker";
    } catch {
      this.appState = "auth";
    }
  }

  // ---------------------------------------------------------------------------
  // Event handlers from child views
  // ---------------------------------------------------------------------------

  private async handleLogin(e: CustomEvent<{ token: string; user: UserInfo }>) {
    const { token, user } = e.detail;
    setWebToken(token);
    setUser(user);
    this.user = user;

    const termsOk = await this.ensureTermsAccepted();
    if (!termsOk) {
      this.appState = "auth";
      return;
    }

    try {
      this.tenantList = await auth.listTenants();
      this.appState = "workspace-picker";
    } catch {
      this.appState = "workspace-picker";
    }
  }

  private async handleSelectTenant(e: CustomEvent<TenantSummary>) {
    const t = e.detail;
    try {
      const { token } = await auth.tenantToken(t.id);
      setTenantToken(token);
      setTenantId(t.id);
      this.tenant = t;
      this.appState = "dashboard";
    } catch (err) {
      console.error("Failed to get tenant token", err);
    }
  }

  private async handleCreateTenant(e: CustomEvent<{ name: string }>) {
    try {
      const created = await tenants.create(e.detail.name);
      const { token } = await auth.tenantToken(created.id);
      setTenantToken(token);
      setTenantId(created.id);
      this.tenant = created;
      this.appState = "dashboard";
    } catch (err) {
      console.error("Failed to create tenant", err);
    }
  }

  private handleSignOut() {
    clearSession();
    this.user = null;
    this.tenant = null;
    this.tenantList = [];
    this.appState = "landing";
  }

  private handleSwitchWorkspace() {
    this.appState = "workspace-picker";
  }

  private handleOpenProject = (e: CustomEvent<{ projectId: string }>) => {
    this.selectedProjectId = e.detail.projectId;
    this.tab = "projects";
  };

  private handleNewProject = () => {
    this.openProjectCreate = true;
    this.tab = "projects";
  };

  private handleNavigate = (e: CustomEvent<{ tab: DashTab; workspaceTab?: WorkspaceTab; workspaceSection?: WorkspaceSection }>) => {
    const { tab, workspaceTab, workspaceSection } = e.detail;
    if (tab === "workspace" || tab === "billing") {
      this.workspaceInitialTab = workspaceTab ?? "settings";
      this.workspaceInitialSection = workspaceSection ?? "";
    }
    this.tab = tab;
  };

  private handleDashboardPrompt = (e: CustomEvent<{ prompt: string }>) => {
    void this.startDashboardScaffold(e.detail.prompt);
  };

  private handleOpenAdminSecurity = () => {
    if (!this.user?.isSuperadmin) return;
    this.appState = "admin";
  };

  private handleNavigateAuth = () => {
    this.appState = "auth";
  };

  private async startDashboardScaffold(promptRaw: string) {
    const prompt = promptRaw.trim();
    if (!prompt) return;

    try {
      const scaffold = await projectsApi.scaffold({
        prompt,
      });

      const titleSeed = prompt.split(/[.!?\n]/)[0]?.trim() || prompt;
      const title = `Scaffold: ${titleSeed.slice(0, 120)}`;
      await tasksApi.create({
        title,
        description: prompt,
        projectId: scaffold.project.id,
        assignedClawId: scaffold.scaffold.clawId != null ? String(scaffold.scaffold.clawId) : undefined,
        priority: "high",
        status: "todo",
      });

      if (scaffold.scaffold.wip) {
        this.selectedProjectId = scaffold.project.id;
        this.tab = "projects";
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("ccl:brain-open", {
            detail: { prompt, projectId: String(scaffold.project.id) },
          }));
        }, 0);
        return;
      }

      this.selectedProjectId = scaffold.project.id;
      this.tab = "projects";
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("ccl:brain-open", {
          detail: { prompt, projectId: String(scaffold.project.id) },
        }));
      }, 0);
    } catch {
      this.pendingPrompt = prompt;
      this.tab = "tasks";
    }
  }

  private setTab(t: DashTab) {
    if (this.tab === t) return;
    this.tab = t;
  }

  private openWorkspaceArea(tab: WorkspaceTab, section?: WorkspaceSection) {
    this.workspaceInitialTab = tab;
    this.workspaceInitialSection = section ?? "";
    this.tab = "workspace";
  }

  private mountDashboardView() {
    const host = this.querySelector("#dashboard-view-host");
    if (!(host instanceof HTMLElement)) return;

    const tenantId = this.tenant?.id ?? "";
    let view: HTMLElement;

    switch (this.tab) {
      case "home": {
        const el = document.createElement("ccl-dashboard") as unknown as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "tasks": {
        const el = document.createElement("ccl-tasks") as unknown as HTMLElement & { tenantId?: string; openTaskPrompt?: string };
        el.tenantId = tenantId;
        if (this.pendingPrompt) { el.openTaskPrompt = this.pendingPrompt; this.pendingPrompt = ""; }
        view = el;
        break;
      }
      case "projects": {
        const el = document.createElement("ccl-projects") as unknown as HTMLElement & { tenantId?: string; selectedProjectId?: string; openCreate?: boolean };
        el.tenantId = tenantId;
        if (this.selectedProjectId) { el.selectedProjectId = this.selectedProjectId; this.selectedProjectId = ""; }
        if (this.openProjectCreate) { el.openCreate = true; this.openProjectCreate = false; }
        view = el;
        break;
      }
      case "claws": {
        const el = document.createElement("ccl-claws") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "skills": {
        const el = document.createElement("ccl-skills") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "workspace": {
        const el = document.createElement("ccl-workspace") as HTMLElement & {
          tenant?: TenantSummary | null;
          initialTab?: WorkspaceTab;
          initialSection?: string;
        };
        el.tenant = this.tenant;
        el.initialTab = this.workspaceInitialTab;
        el.initialSection = this.workspaceInitialSection;
        view = el;
        break;
      }
      case "billing": {
        const el = document.createElement("ccl-workspace") as HTMLElement & {
          tenant?: TenantSummary | null;
          initialTab?: WorkspaceTab;
          initialSection?: string;
        };
        el.tenant = this.tenant;
        el.initialTab = "settings";
        el.initialSection = "billing";
        view = el;
        break;
      }
      case "logs": {
        const el = document.createElement("ccl-logs") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "agents": {
        const el = document.createElement("ccl-agents") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "chats": {
        const el = document.createElement("ccl-chats") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "code-editor": {
        const el = document.createElement("ccl-code-editor") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "content": {
        const el = document.createElement("ccl-content") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "debug": {
        const el = document.createElement("ccl-debug") as HTMLElement & { tenantId?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
      case "pricing": {
        const el = document.createElement("ccl-pricing") as HTMLElement & { tenantId?: string; currentPlan?: string };
        el.tenantId = tenantId;
        view = el;
        break;
      }
    }

    host.replaceChildren(view);
  }

  // ---------------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------------

  private loadTheme() {
    const saved = localStorage.getItem("ccl-theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.theme = saved ?? (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = this.theme;
    this.navCollapsed = localStorage.getItem("ccl-nav-collapsed") === "1";
  }

  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = this.theme;
    localStorage.setItem("ccl-theme", this.theme);
    this.requestUpdate();
  }

  private toggleNav() {
    this.navCollapsed = !this.navCollapsed;
    localStorage.setItem("ccl-nav-collapsed", this.navCollapsed ? "1" : "0");
  }

  // ---------------------------------------------------------------------------
  // Nav icons (inline SVG)
  // ---------------------------------------------------------------------------

  private svgIcon(name: string) {
    const paths: Record<string, string> = {
      home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
      projects: `<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>`,
      tasks: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
      claws: `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>`,
      skills: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
      workspace: `<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>`,
      logs: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
      billing: `<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>`,
      settings: `<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>`,
      admin: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      sun: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>`,
      moon: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
      logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
      agents: `<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>`,
      panelLeft: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>`,
      chevronsLeft: `<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>`,
      chevronsRight: `<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>`,
      "code-editor": `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
      content: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>`,
      pricing: `<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>`,
      debug: `<path d="M9 3h6l1 2h3a1 1 0 0 1 1 1v3h-2V7h-2.2l-1-2H10.2l-1 2H7v2H5V6a1 1 0 0 1 1-1h3l1-2zm-1 7h8a4 4 0 0 1 4 4v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-2a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2a2 2 0 0 0-2-2H8zm2 3h1v2h-1v-2zm3 0h1v2h-1v-2z"/>`,
    };
    return `<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${paths[name] ?? ""}</svg>`;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  override render() {
    if (this.termsGateRequired && !!getWebToken() && !!this.user) {
      return html`
        ${this.renderTermsGate()}
        ${this.renderGlobalFooter()}
      `;
    }

    const page = this.appState === "loading"
      ? this.renderLoading()
      : this.appState === "landing"
        ? this.renderLanding()
        : this.appState === "auth"
          ? this.renderAuth()
          : this.appState === "workspace-picker"
            ? this.renderWorkspacePicker()
            : this.appState === "admin"
              ? this.renderAdmin()
              : this.renderDashboard();

    return html`
      ${page}
      ${this.renderGlobalFooter()}
      ${this.renderLegalModal()}
    `;
  }

  private renderTermsGate() {
    const terms = this.legalTerms;
    return html`
      <div class="auth-shell" style="padding-bottom:80px">
        <div class="auth-card" style="width:min(900px,94vw)">
          <div class="auth-title" style="margin-bottom:8px">Terms update required</div>
          <div class="auth-sub" style="margin-bottom:14px">
            You must accept the latest Terms of Use to continue.
            ${terms ? html`Current version: <strong>${terms.version}</strong>` : ""}
          </div>
          <div class="field" style="margin:0">
            <label class="label">${terms?.title ?? "Terms of Use"}</label>
            <textarea class="textarea" style="min-height:320px" readonly>${terms?.content ?? "Loading terms…"}</textarea>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:12px">
            <button class="btn btn-primary" @click=${this.acceptCurrentTerms} ?disabled=${this.acceptingTerms || !terms}>
              ${this.acceptingTerms ? "Accepting…" : "Accept Terms and Continue"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderGlobalFooter() {
    const termsVersion = this.legalTerms?.version ?? "—";
    return html`
      <footer
        class="global-footer"
        style="position:fixed;left:0;right:0;bottom:0;z-index:70;border-top:1px solid var(--border,#d1d5db);background:var(--chrome-strong,rgba(18,20,26,0.98));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)"
      >
        <div
          class="global-footer-inner"
          style="max-width:1200px;margin:0 auto;min-height:44px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--muted,#6b7280);font-size:12px"
        >
          <span>App v${__APP_VERSION__} · Terms v${termsVersion}</span>
          <span class="global-footer-links" style="display:inline-flex;align-items:center;gap:12px">
            <a href="/terms" style="color:var(--text);text-decoration:none" @click=${(e: Event) => { e.preventDefault(); this.openLegalModal("terms"); }}>Terms of Use</a>
            <a href="/privacy" style="color:var(--text);text-decoration:none" @click=${(e: Event) => { e.preventDefault(); this.openLegalModal("privacy"); }}>Privacy Policy</a>
          </span>
        </div>
      </footer>
    `;
  }

  private renderLegalModal() {
    if (!this.legalModalType) return html``;
    const doc = this.legalModalType === "terms" ? this.legalTerms : this.legalPrivacy;
    const title = this.legalModalType === "terms" ? "Terms of Use" : "Privacy Policy";
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => {
        if (e.target === e.currentTarget) this.closeLegalModal();
      }}>
        <div class="modal" style="max-width:920px">
          <div class="modal-title">${title} ${doc?.version ? html`· v${doc.version}` : ""}</div>
          <div class="modal-sub">Published ${doc?.publishedAt ? new Date(doc.publishedAt).toLocaleString() : "—"}</div>
          <textarea class="textarea" style="min-height:420px;margin-top:12px" readonly>${doc?.content ?? "Loading…"}</textarea>
          <div class="modal-footer">
            <button class="btn btn-primary" @click=${this.closeLegalModal}>Close</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderLoading() {
    return html`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`;
  }

  private renderLanding() {
    return html`
      <div class="landing">
        <!-- Nav -->
        <header class="landing-nav">
          <div class="landing-nav-inner">
            <a class="landing-logo" href="/">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fac94883aaa0849cc897eb61793256164%2Fc284d818569a472aa80fdbee574db744?format=webp&width=64&height=64" alt="" onerror="this.style.display='none'">
              CoderClawLink
            </a>
            <div class="landing-nav-right">
              <a href="#features" class="btn btn-ghost btn-sm" @click=${(e: Event) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); }}>Features</a>
              <a href="#pricing" class="btn btn-ghost btn-sm" @click=${(e: Event) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}>Pricing</a>
              <a href="https://github.com/SeanHogg/coderClawLink" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">GitHub</a>
              <a href="https://discord.gg/xMKpFdqd" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">Discord</a>
              <button class="btn btn-ghost btn-sm" @click=${() => { this.appState = "auth"; }}>Sign in</button>
              <button class="btn btn-primary btn-sm" @click=${() => { this.appState = "auth"; }}>Get Started Free</button>
              <button class="btn btn-ghost btn-icon" @click=${() => this.toggleTheme()} title="Toggle theme">
                <span .innerHTML=${this.svgIcon(this.theme === "dark" ? "sun" : "moon")}></span>
              </button>
            </div>
          </div>
        </header>

        <!-- Hero -->
        <section class="landing-hero">
          <div class="landing-hero-inner">
            <span class="landing-badge">Open Source · MIT License · Free to self-host</span>
            <h1 class="landing-title">Replace Jira with an<br>AI-Native Workflow Mesh</h1>
            <p class="landing-sub">
              CoderClawLink connects your self-healing AI agents (Claws) to projects, tasks, and human reviewers —
              with real-time execution streaming, a skills marketplace, RBAC, and a full compliance-grade audit trail.
              Runs on Cloudflare Workers. Zero cold start. Your data, your infra.
            </p>
            <div class="landing-ctas">
              <button class="btn btn-primary btn-lg" @click=${() => { this.appState = "auth"; }}>Start for free →</button>
              <a href="https://github.com/SeanHogg/coderClawLink" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">View on GitHub</a>
            </div>
            <p class="landing-note">No credit card required · 14-day Pro trial on signup · MIT licensed</p>
          </div>
          <div class="landing-mesh" aria-hidden="true">
            <div class="mesh-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fac94883aaa0849cc897eb61793256164%2Fc284d818569a472aa80fdbee574db744?format=webp&width=200&height=300" alt="" onerror="this.style.display='none'">
            </div>
            <div class="mesh-node mesh-node-1">🤖<span>claw-01</span></div>
            <div class="mesh-node mesh-node-2">🤖<span>claw-02</span></div>
            <div class="mesh-node mesh-node-3">🤖<span>claw-03</span></div>
            <div class="mesh-line mesh-line-1"></div>
            <div class="mesh-line mesh-line-2"></div>
            <div class="mesh-line mesh-line-3"></div>
          </div>
        </section>

        <!-- Quick Start -->
        <section class="landing-section" style="padding-top:0;">
          <div class="landing-section-inner">
            <ccl-quickstart></ccl-quickstart>
          </div>
        </section>

        <!-- Platform stats -->
        <section class="landing-section landing-section-alt">
          <div class="landing-section-inner">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center">
              ${[
                ["∞", "Claws on Pro"],
                ["10+", "Agent roles"],
                ["30+", "API endpoints"],
                ["MIT", "Open source"],
                ["0ms", "Cold start (CF Workers)"],
                ["GDPR", "Privacy tooling"],
              ].map(([stat, label]) => html`
                <div style="padding:20px 12px">
                  <div style="font-size:clamp(28px,5vw,40px);font-weight:800;color:var(--accent,#6366f1);margin-bottom:6px">${stat}</div>
                  <div style="font-size:13px;color:var(--muted)">${label}</div>
                </div>
              `)}
            </div>
          </div>
        </section>

        <!-- Features grid -->
        <section class="landing-section" id="features">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Everything your AI engineering team needs</h2>
            <p class="landing-section-sub">CoderClawLink replaces your project management tool, LLM proxy, skills registry, and audit log in a single Cloudflare Worker.</p>
            <div class="landing-grid-4">
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🤖</div>
                <h3>Multi-Agent Orchestration</h3>
                <p>Register unlimited AI agents. Each declares skills; the runtime routes tasks to the most capable claw. Claw-to-claw delegation with correlation IDs for dependent workflows.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🔄</div>
                <h3>Self-Healing Execution</h3>
                <p>Execution lifecycle tracked as a formal state machine (PENDING→RUNNING→COMPLETED). Real-time WebSocket streaming eliminates polling. Failed tasks auto-escalate to human review.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">👥</div>
                <h3>Human-in-the-Loop</h3>
                <p>Agents request approval before destructive actions. Approval gates are notified in real time via WebSocket relay. Humans stay in control — no surprise side-effects.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🧩</div>
                <h3>Skills Marketplace</h3>
                <p>Browse, publish, and install reusable agent skills. Assign at tenant level (all claws) or scoped to individual claws. Full-text search, categories, versioning, likes, downloads.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">💬</div>
                <h3>Persistent Chat History</h3>
                <p>Every claw session conversation is persisted and queryable through the portal. Browse full interaction history, filter by claw and session, view message sequences.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🧠</div>
                <h3>Brain AI Assistant</h3>
                <p>Ask the in-portal AI assistant to create projects, break down tasks, or query claw status. Conversation history persists per tenant so context carries across sessions.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">📋</div>
                <h3>Spec-Driven Planning</h3>
                <p>The /spec command in coderClaw pushes structured PRDs + architecture specs to the portal. Each spec links to a workflow DAG; per-task states are visible in real time.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🔐</div>
                <h3>RBAC + Compliance</h3>
                <p>Four-role RBAC (VIEWER→OWNER), TOTP MFA with encrypted secrets + recovery codes, immutable audit trail, GDPR/CCPA privacy request handling, versioned legal documents.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">💻</div>
                <h3>Browser Code Editor</h3>
                <p>Browse and view claw file-system directories directly in the portal. 30+ supported file types. No local IDE required for code review or inspection.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">⚡</div>
                <h3>coderClawLLM Proxy</h3>
                <p>OpenAI-compatible LLM proxy with free and pro model pools, automatic failover, and tenant-aware billing. Drop api.coderclaw.ai/llm/v1 into any OpenAI SDK.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🏠</div>
                <h3>Self-Hosted &amp; Private</h3>
                <p>Runs on Cloudflare Workers (zero cold start, globally distributed) or Docker. MIT licensed. Your Postgres database, your data. Air-gapped deployments supported on Enterprise.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🔌</div>
                <h3>CI/CD Integration</h3>
                <p>Execution callbacks let CI runners report progress and attach code-change telemetry. Trigger agents on PR events, push events, or scheduled jobs via the REST API.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- vs Jira comparison -->
        <section class="landing-section landing-section-alt">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">CoderClawLink vs traditional project management</h2>
            <p class="landing-section-sub">Built for AI-native teams from the ground up — not a plugin bolted onto a ticket tracker.</p>
            <div style="overflow-x:auto">
              <table style="width:100%;border-collapse:collapse;font-size:13px;min-width:560px">
                <thead>
                  <tr>
                    <th style="text-align:left;padding:10px 14px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border)">Feature</th>
                    <th style="text-align:center;padding:10px 14px;color:var(--accent);font-weight:700;border-bottom:2px solid var(--accent)">CoderClawLink</th>
                    <th style="text-align:center;padding:10px 14px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border)">Jira</th>
                    <th style="text-align:center;padding:10px 14px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border)">Linear</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
                    ["AI agent registration & routing",  "✅", "❌", "❌"],
                    ["Real-time WebSocket execution stream", "✅", "❌", "❌"],
                    ["Human-in-the-loop approval gates", "✅", "❌", "❌"],
                    ["Spec-driven workflow DAG",         "✅", "❌", "❌"],
                    ["Built-in LLM proxy (OpenAI-compat)", "✅", "❌", "❌"],
                    ["Skills marketplace",               "✅", "❌", "❌"],
                    ["Immutable compliance audit trail", "✅", "⚠️ add-on", "❌"],
                    ["TOTP MFA + GDPR tooling",          "✅", "✅", "⚠️"],
                    ["Self-hosted (open source)",        "✅ MIT", "❌ Cloud", "❌ Cloud"],
                    ["Price",                            "Free / $29 / seat", "$8.15 / user", "$8 / user"],
                  ].map(([f, ccl, jira, linear], i) => html`
                    <tr style="background:${i % 2 === 0 ? "transparent" : "var(--surface-2)"}">
                      <td style="padding:9px 14px;border-bottom:1px solid var(--border)">${f}</td>
                      <td style="text-align:center;padding:9px 14px;border-bottom:1px solid var(--border);font-weight:600;color:var(--accent)">${ccl}</td>
                      <td style="text-align:center;padding:9px 14px;border-bottom:1px solid var(--border);color:var(--muted)">${jira}</td>
                      <td style="text-align:center;padding:9px 14px;border-bottom:1px solid var(--border);color:var(--muted)">${linear}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Steps -->
        <section class="landing-section">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Up and running in three steps</h2>
            <div class="landing-grid-3">
              <div class="landing-step-card">
                <div class="landing-step-num">01</div>
                <h3>Create your account</h3>
                <p>Sign up with your email. Create a workspace for your team or project in seconds. 14-day Pro trial, no credit card required.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">02</div>
                <h3>Register your claws</h3>
                <p>Add each CoderClaw instance to your mesh. Paste the generated API key into your claw config — it connects automatically over WebSocket.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">03</div>
                <h3>Assign skills &amp; orchestrate</h3>
                <p>Browse the skills marketplace, assign capabilities to your workspace or individual claws, and let agents handle the rest.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing section -->
        <section class="landing-section landing-section-alt" id="pricing">
          <div class="landing-section-inner">
            <ccl-pricing></ccl-pricing>
          </div>
        </section>

        <!-- Final CTA -->
        <section class="landing-cta-section">
          <div class="landing-section-inner" style="text-align:center">
            <h2 style="font-size:clamp(24px,4vw,36px);font-weight:700;margin:0 0 12px">Ready to build your AI engineering mesh?</h2>
            <p style="color:var(--muted);margin:0 0 8px">Free to start. No credit card required. MIT licensed, self-hostable.</p>
            <p style="color:var(--accent);font-weight:600;font-size:15px;margin:0 0 28px">14-day Pro trial on every signup — no credit card needed.</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
              <button class="btn btn-primary btn-lg" @click=${() => { this.appState = "auth"; }}>Start 14-day free trial →</button>
              <a href="mailto:sales@coderclaw.ai?subject=Enterprise inquiry" class="btn btn-secondary btn-lg">Talk to sales</a>
              <a href="https://discord.gg/xMKpFdqd" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">Join Discord</a>
              <a href="https://github.com/SeanHogg/coderClawLink" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">View source</a>
            </div>
          </div>
        </section>

        <!-- Scroll to top -->
        <button
          class="scroll-to-top ${this.showScrollTop ? "visible" : ""}"
          @click=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>

      </div>
    `;
  }

  private renderAuth() {
    return html`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
        @close=${() => { this.appState = "landing"; }}
      ></ccl-auth>`;
  }

  private renderWorkspacePicker() {
    return html`
      <div>
        ${this.user?.isSuperadmin ? html`
          <div style="position:fixed;top:12px;right:12px;z-index:100">
            <button
              class="btn btn-ghost btn-sm"
              style="display:flex;align-items:center;gap:6px;background:var(--surface-2);border:1px solid var(--border)"
              @click=${() => { this.appState = "admin"; }}
              title="Platform Admin"
            >
              <span .innerHTML=${this.svgIcon("admin")}></span>
              Platform Admin
            </button>
          </div>
        ` : ""}
        <ccl-workspace-picker
          .tenants=${this.tenantList}
          .user=${this.user}
          @select-tenant=${this.handleSelectTenant}
          @create-tenant=${this.handleCreateTenant}
          @sign-out=${this.handleSignOut}
        ></ccl-workspace-picker>
      </div>`;
  }

  private renderAdmin() {
    return html`<ccl-admin .initialTab=${"security"}></ccl-admin>`;
  }

  private renderDashboard() {
    const c = this.navCollapsed;

    const mainItems: Array<{ id: DashTab; label: string; icon: string }> = [
      { id: "home",     label: "Dashboard", icon: "home"     },
      { id: "projects", label: "Projects",  icon: "projects" },
      { id: "tasks",    label: "Tasks",     icon: "tasks"    },
    ];
    const meshItems: Array<{ id: DashTab; label: string; icon: string }> = [
      { id: "claws",  label: "Claws",  icon: "claws"  },
      { id: "skills", label: "Skills", icon: "skills" },
      { id: "agents", label: "Agents", icon: "agents" },
      { id: "chats",  label: "Chats",  icon: "logs"   },
    ];
    const buildItems: Array<{ id: DashTab; label: string; icon: string }> = [
      { id: "code-editor", label: "Code Editor",      icon: "code-editor" },
      { id: "content",     label: "Content Manager", icon: "content"     },
      { id: "pricing",     label: "Pricing",          icon: "pricing"     },
    ];
    const systemItems: Array<
      { id: DashTab; label: string; icon: string; workspaceTab?: WorkspaceTab; workspaceSection?: WorkspaceSection }
    > = [
      { id: "workspace", label: "Security", icon: "settings", workspaceTab: "security", workspaceSection: "security" },
      { id: "workspace", label: "Settings", icon: "settings", workspaceTab: "settings", workspaceSection: "settings" },
      { id: "workspace", label: "Billing", icon: "billing", workspaceTab: "settings", workspaceSection: "billing" },
      { id: "workspace", label: "Consumption", icon: "tasks", workspaceTab: "settings", workspaceSection: "consumption" },
      { id: "workspace", label: "Tenant & Workspace", icon: "workspace", workspaceTab: "settings", workspaceSection: "details" },
      { id: "logs", label: "Logs", icon: "logs" },
      { id: "debug", label: "Debug", icon: "debug" },
    ];

    const navBtn = (item: { id: DashTab; label: string; icon: string; workspaceTab?: WorkspaceTab; workspaceSection?: WorkspaceSection }) => html`
      <button
        class="nav-item ${
          item.id === "workspace"
            ? (this.tab === "workspace" && this.workspaceInitialTab === (item.workspaceTab ?? "settings") && this.workspaceInitialSection === (item.workspaceSection ?? "")
                ? "active"
                : "")
            : this.tab === item.id
              ? "active"
              : ""
        }"
        title="${item.label}"
        @click=${() => {
          if (item.id === "workspace") {
            this.openWorkspaceArea(item.workspaceTab ?? "settings", item.workspaceSection);
            return;
          }
          this.setTab(item.id);
        }}
      >
        <span .innerHTML=${this.svgIcon(item.icon)}></span>
        <span class="nav-item-label">${item.label}</span>
      </button>
    `;

    return html`
      <div class="shell ${c ? "nav-collapsed" : ""}">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              ${c ? "" : html`<span class="brand-name">CoderClawLink</span><span class="brand-badge">BETA</span>`}
            </div>
          </div>
          <div class="topbar-right">
                <button
                  class="btn btn-ghost btn-sm"
                  style="display:flex;align-items:center;gap:6px"
                  @click=${() => {
                    window.dispatchEvent(new CustomEvent("ccl:brain-open"));
                  }}
                  title="Brain"
                >
                  🧠 Brain
                </button>
            ${this.user?.isSuperadmin ? html`
              <button
                class="btn btn-ghost btn-sm"
                style="display:flex;align-items:center;gap:6px;color:var(--warning,#f59e0b)"
                @click=${() => { this.appState = "admin"; }}
                title="Platform Admin"
              >
                <span .innerHTML=${this.svgIcon("admin")}></span>
                Admin
              </button>
            ` : ""}
            <button
              class="tenant-chip"
              @click=${this.handleSwitchWorkspace}
              title="Switch workspace"
            >
              ${this.tenant?.name ?? "Workspace"}
              <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon" @click=${() => this.toggleTheme()} title="Toggle theme">
              <span .innerHTML=${this.svgIcon(this.theme === "dark" ? "sun" : "moon")}></span>
            </button>
            <button class="btn btn-ghost btn-icon" @click=${this.handleSignOut} title="Sign out">
              <span .innerHTML=${this.svgIcon("logout")}></span>
            </button>
          </div>
        </header>

        <!-- Sidebar nav -->
        <nav class="nav ${c ? "collapsed" : ""}">
          <div class="nav-main">
            <div class="nav-section">
              ${mainItems.map(navBtn)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">Mesh</div>
            <div class="nav-section">
              ${meshItems.map(navBtn)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">Build</div>
            <div class="nav-section">
              ${buildItems.map(navBtn)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">System</div>
            <div class="nav-section">
              ${systemItems.map(navBtn)}
            </div>
          </div>

          <!-- Footer -->
          <div class="nav-footer">
            <button
              class="nav-item"
              title="${c ? "Expand sidebar" : "Collapse sidebar"}"
              @click=${() => this.toggleNav()}
            >
              <span .innerHTML=${this.svgIcon(c ? "chevronsRight" : "chevronsLeft")}></span>
              <span class="nav-item-label">Minimize sidebar</span>
            </button>
          </div>
        </nav>

        <!-- Content -->
        <main class="content">
          <div id="dashboard-view-host"></div>
              <ccl-brain .tenantId=${this.tenant?.id ?? ""} .page=${this.tab} .launcher=${"none"}></ccl-brain>
        </main>

      </div>
    `;
  }

  static override styles = css``;
}

declare global {
  interface HTMLElementTagNameMap { "ccl-app": CclApp; }
}
