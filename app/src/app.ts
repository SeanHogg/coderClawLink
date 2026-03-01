import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";

import {
  auth, tenants, clearSession,
  getWebToken, getTenantToken, getTenantId, getUser,
  setWebToken, setTenantToken, setTenantId, setUser,
  type TenantSummary, type UserInfo,
} from "./api.js";

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

type AppState = "loading" | "landing" | "auth" | "workspace-picker" | "dashboard" | "admin";
type DashTab = "home" | "projects" | "tasks" | "claws" | "skills" | "workspace" | "logs";

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

  override connectedCallback() {
    super.connectedCallback();
    this.loadTheme();
    this.bootstrap();
    window.addEventListener("ccl:unauthorized", this.handleUnauthorized);
    window.addEventListener("ccl:exit-admin", this.handleExitAdmin);
    window.addEventListener("ccl:impersonate", this.handleImpersonate as EventListener);
    window.addEventListener("ccl:open-project", this.handleOpenProject as EventListener);
    window.addEventListener("ccl:new-project", this.handleNewProject);
    window.addEventListener("ccl:navigate", this.handleNavigate as EventListener);
    window.addEventListener("ccl:dashboard-prompt", this.handleDashboardPrompt as EventListener);
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
    this.appState = "landing";
  };

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

    const tenantToken = getTenantToken();
    const tenantId = getTenantId();
    this.user = getUser();

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

  private handleNavigate = (e: CustomEvent<{ tab: DashTab }>) => {
    this.tab = e.detail.tab;
  };

  private handleDashboardPrompt = (e: CustomEvent<{ prompt: string }>) => {
    this.pendingPrompt = e.detail.prompt;
    this.tab = "tasks";
  };

  private setTab(t: DashTab) {
    if (this.tab === t) return;
    this.tab = t;
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
        const el = document.createElement("ccl-workspace") as HTMLElement & { tenant?: TenantSummary | null };
        el.tenant = this.tenant;
        view = el;
        break;
      }
      case "logs": {
        const el = document.createElement("ccl-logs") as HTMLElement & { tenantId?: string };
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
  }

  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = this.theme;
    localStorage.setItem("ccl-theme", this.theme);
    this.requestUpdate();
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
      workspace: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      logs: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
      admin: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      sun: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>`,
      moon: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
      logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
    };
    return `<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${paths[name] ?? ""}</svg>`;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  override render() {
    if (this.appState === "loading")          return this.renderLoading();
    if (this.appState === "landing")          return this.renderLanding();
    if (this.appState === "auth")             return this.renderAuth();
    if (this.appState === "workspace-picker") return this.renderWorkspacePicker();
    if (this.appState === "admin")            return this.renderAdmin();
    return this.renderDashboard();
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
              <button class="btn btn-ghost btn-sm" @click=${() => { this.appState = "auth"; }}>Sign in</button>
              <button class="btn btn-primary btn-sm" @click=${() => { this.appState = "auth"; }}>Get Started</button>
              <button class="btn btn-ghost btn-icon" @click=${() => this.toggleTheme()} title="Toggle theme">
                <span .innerHTML=${this.svgIcon(this.theme === "dark" ? "sun" : "moon")}></span>
              </button>
            </div>
          </div>
        </header>

        <!-- Hero -->
        <section class="landing-hero">
          <div class="landing-hero-inner">
            <span class="landing-badge">Now in Beta</span>
            <h1 class="landing-title">Your AI Coding Mesh,<br> Unified</h1>
            <p class="landing-sub">Register your CoderClaw instances, assign skills from the marketplace, and orchestrate intelligent workflows across your entire development environment.</p>
            <div class="landing-ctas">
              <button class="btn btn-primary btn-lg" @click=${() => { this.appState = "auth"; }}>Get Started Free</button>
              <button class="btn btn-ghost btn-lg" @click=${() => { this.appState = "auth"; }}>Sign In →</button>
            </div>
            <p class="landing-note">No credit card required. Free to get started.</p>
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

        <section class="landing-section" style="padding-top:0;">
          <div class="landing-section-inner">
            <ccl-quickstart></ccl-quickstart>
          </div>
        </section>

        <!-- Features -->
        <section class="landing-section">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Everything you need to orchestrate your mesh</h2>
            <p class="landing-section-sub">CoderClawLink connects your CoderClaw agents into a unified, skill-aware coding mesh.</p>
            <div class="landing-grid-4">
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🤖</div>
                <h3>CoderClaw Mesh</h3>
                <p>Register any number of CoderClaw instances to your workspace. Each claw gets a unique API key and joins your intelligent mesh automatically.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🧩</div>
                <h3>Skills Marketplace</h3>
                <p>Browse and assign capabilities from the marketplace. Target your entire workspace or individual claws for precision orchestration.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">📋</div>
                <h3>Projects &amp; Tasks</h3>
                <p>Organize work into projects with kanban-style task management. Track progress across your entire coding mesh in real time.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🏢</div>
                <h3>Multi-Tenant Workspaces</h3>
                <p>Create isolated workspaces for different teams or repos. Invite collaborators, manage roles, and keep everything neatly separated.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Steps -->
        <section class="landing-section landing-section-alt">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Up and running in three steps</h2>
            <div class="landing-grid-3">
              <div class="landing-step-card">
                <div class="landing-step-num">01</div>
                <h3>Create your account</h3>
                <p>Sign up with your email. Create a workspace for your team or project in seconds.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">02</div>
                <h3>Register your claws</h3>
                <p>Add each CoderClaw instance to your mesh. Paste the generated API key into your claw config and it connects automatically.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">03</div>
                <h3>Assign skills &amp; orchestrate</h3>
                <p>Browse the skills marketplace, assign capabilities to your workspace or individual claws, and start building.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="landing-cta-section">
          <div class="landing-section-inner" style="text-align:center">
            <h2 style="font-size:clamp(24px,4vw,36px);font-weight:700;margin:0 0 12px">Ready to build your mesh?</h2>
            <p style="color:var(--muted);margin:0 0 28px">Create your free account and register your first CoderClaw in minutes.</p>
            <button class="btn btn-primary btn-lg" @click=${() => { this.appState = "auth"; }}>Start for free →</button>
          </div>
        </section>

        <!-- Footer -->
        <footer class="landing-footer">
          <span>© 2026 CoderClaw · <a href="https://coderclaw.ai" target="_blank" rel="noopener">coderclaw.ai</a></span>
        </footer>
      </div>
    `;
  }

  private renderAuth() {
    return html`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
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
    return html`<ccl-admin></ccl-admin>`;
  }

  private renderDashboard() {
    const navItems: Array<{ id: DashTab; label: string; icon: string }> = [
      { id: "home",      label: "Dashboard", icon: "home"      },
      { id: "projects",  label: "Projects",  icon: "projects"  },
      { id: "tasks",     label: "Tasks",     icon: "tasks"     },
      { id: "claws",     label: "Claws",     icon: "claws"     },
      { id: "skills",    label: "Skills",    icon: "skills"    },
      { id: "workspace", label: "Workspace", icon: "workspace" },
      { id: "logs",      label: "Logs",      icon: "logs"      },
    ];

    return html`
      <div class="shell">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              <span class="brand-name">CoderClawLink</span>
              <span class="brand-badge">BETA</span>
            </div>
          </div>
          <div class="topbar-right">
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
            <button
              class="btn btn-ghost btn-icon"
              @click=${() => this.toggleTheme()}
              title="Toggle theme"
            >
              <span .innerHTML=${this.svgIcon(this.theme === "dark" ? "sun" : "moon")}></span>
            </button>
            <button
              class="btn btn-ghost btn-icon"
              @click=${this.handleSignOut}
              title="Sign out"
            >
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </header>

        <!-- Sidebar nav -->
        <nav class="nav">
          <div class="nav-section">
            ${navItems.map(item => html`
              <button
                class="nav-item ${this.tab === item.id ? "active" : ""}"
                @click=${() => this.setTab(item.id)}
              >
                <span .innerHTML=${this.svgIcon(item.icon)}></span>
                ${item.label}
              </button>
            `)}
          </div>
        </nav>

        <!-- Content -->
        <main class="content">
          <div id="dashboard-view-host"></div>
        </main>

        <ccl-brain .tenantId=${this.tenant?.id ?? ""} .page=${this.tab}></ccl-brain>
      </div>
    `;
  }

  static override styles = css``;
}

declare global {
  interface HTMLElementTagNameMap { "ccl-app": CclApp; }
}
