import { LitElement, html, css } from "lit";
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
import "./views/projects.js";
import "./views/tasks.js";
import "./views/claws.js";
import "./views/skills.js";
import "./views/workspace.js";
import "./views/logs.js";

type AppState = "loading" | "auth" | "workspace-picker" | "dashboard";
type DashTab = "projects" | "tasks" | "claws" | "skills" | "workspace" | "logs";

@customElement("ccl-app")
export class CclApp extends LitElement {
  // Disable shadow DOM so global CSS applies
  override createRenderRoot() { return this; }

  @state() private appState: AppState = "loading";
  @state() private tab: DashTab = "tasks";
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
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("ccl:unauthorized", this.handleUnauthorized);
  }

  private handleUnauthorized = () => {
    clearSession();
    this.user = null;
    this.tenant = null;
    this.appState = "auth";
  };

  private async bootstrap() {
    const webToken = getWebToken();
    if (!webToken) { this.appState = "auth"; return; }

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
      this.appState = this.tenantList.length > 0 ? "workspace-picker" : "workspace-picker";
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
    this.appState = "auth";
  }

  private handleSwitchWorkspace() {
    this.appState = "workspace-picker";
  }

  private setTab(t: DashTab) { this.tab = t; }

  // ---------------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------------

  private loadTheme() {
    const saved = localStorage.getItem("ccl-theme") as "dark" | "light" | null;
    this.theme = saved ?? "dark";
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

  private icon(name: string) {
    const paths: Record<string, string> = {
      projects: `<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>`,
      tasks: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
      claws: `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>`,
      skills: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
      workspace: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      logs: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
      sun: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
      moon: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
      menu: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`,
      chevron: `<polyline points="15 18 9 12 15 6"/>`,
      logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
    };
    return html`<svg viewBox="0 0 24 24">${html([`<svg viewBox="0 0 24 24">${paths[name] ?? ""}</svg>`] as unknown as TemplateStringsArray)}</svg>`;
  }

  private svgIcon(name: string) {
    const paths: Record<string, string> = {
      projects: `<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>`,
      tasks: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
      claws: `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>`,
      skills: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
      workspace: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      logs: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
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
    if (this.appState === "loading") return this.renderLoading();
    if (this.appState === "auth")   return this.renderAuth();
    if (this.appState === "workspace-picker") return this.renderWorkspacePicker();
    return this.renderDashboard();
  }

  private renderLoading() {
    return html`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`;
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
      <ccl-workspace-picker
        .tenants=${this.tenantList}
        .user=${this.user}
        @select-tenant=${this.handleSelectTenant}
        @create-tenant=${this.handleCreateTenant}
        @sign-out=${this.handleSignOut}
      ></ccl-workspace-picker>`;
  }

  private renderDashboard() {
    const navItems: Array<{ id: DashTab; label: string; icon: string }> = [
      { id: "tasks",     label: "Tasks",     icon: "tasks"     },
      { id: "projects",  label: "Projects",  icon: "projects"  },
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
              <img class="brand-logo" src="/logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              <span class="brand-name">CoderClawLink</span>
              <span class="brand-badge">BETA</span>
            </div>
          </div>
          <div class="topbar-right">
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
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round">
                ${this.theme === "dark"
                  ? html`<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`
                  : html`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`}
              </svg>
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
          ${this.renderTabContent()}
        </main>
      </div>
    `;
  }

  private renderTabContent() {
    const tenantId = this.tenant?.id ?? "";
    switch (this.tab) {
      case "tasks":
        return html`<ccl-tasks .tenantId=${tenantId}></ccl-tasks>`;
      case "projects":
        return html`<ccl-projects .tenantId=${tenantId}></ccl-projects>`;
      case "claws":
        return html`<ccl-claws .tenantId=${tenantId}></ccl-claws>`;
      case "skills":
        return html`<ccl-skills .tenantId=${tenantId}></ccl-skills>`;
      case "workspace":
        return html`<ccl-workspace .tenant=${this.tenant}></ccl-workspace>`;
      case "logs":
        return html`<ccl-logs .tenantId=${tenantId}></ccl-logs>`;
    }
  }

  static override styles = css``;
}

declare global {
  interface HTMLElementTagNameMap { "ccl-app": CclApp; }
}
