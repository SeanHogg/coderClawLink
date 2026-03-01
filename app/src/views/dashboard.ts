import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { projects as projectsApi, claws as clawsApi, type Project, type Claw } from "../api.js";

@customElement("ccl-dashboard")
export class CclDashboard extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private projects: Project[] = [];
  @state() private claws: Claw[] = [];
  @state() private loading = true;
  @state() private prompt = "";

  override connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    this.loading = true;
    try {
      const [projs, clawList] = await Promise.all([
        projectsApi.list().catch(() => [] as Project[]),
        clawsApi.list().catch(() => [] as Claw[]),
      ]);
      this.projects = projs;
      this.claws = clawList;
    } finally {
      this.loading = false;
    }
  }

  private dispatch(event: string, detail?: Record<string, unknown>) {
    this.dispatchEvent(new CustomEvent(event, { bubbles: true, composed: true, detail: detail ?? {} }));
  }

  private handlePrompt(e: Event) {
    e.preventDefault();
    const p = this.prompt.trim();
    if (!p) return;
    this.dispatch("ccl:dashboard-prompt", { prompt: p });
    this.prompt = "";
  }

  private statusBadge(s: string) {
    const map: Record<string, string> = {
      active: "badge-green", completed: "badge-blue",
      archived: "badge-gray", on_hold: "badge-yellow",
    };
    return html`<span class="badge ${map[s] ?? "badge-gray"}">${s.replace("_", " ")}</span>`;
  }

  override render() {
    const connectedClaws = this.claws.filter(c => c.connectedAt);

    return html`
      <div style="max-width:960px;margin:0 auto;padding:40px 24px">

        <!-- Prompt -->
        <div style="text-align:center;margin-bottom:52px">
          <h1 style="font-size:26px;font-weight:700;color:var(--text-strong);margin:0 0 6px">
            What should we build?
          </h1>
          <p style="color:var(--muted);font-size:14px;margin:0 0 20px">
            Describe a task and CoderClaw will get it done
          </p>
          <form @submit=${this.handlePrompt}
            style="display:flex;gap:10px;max-width:660px;margin:0 auto">
            <input
              class="input"
              style="flex:1;font-size:14px;padding:10px 14px"
              placeholder="Build a budget tracker with Material UI components…"
              .value=${this.prompt}
              @input=${(e: InputEvent) => { this.prompt = (e.target as HTMLInputElement).value; }}
            >
            <button class="btn btn-primary" type="submit" style="white-space:nowrap;padding:10px 18px">
              Send to Claw
            </button>
          </form>
          <div style="margin-top:10px;font-size:12px;color:var(--muted)">
            ${connectedClaws.length > 0
              ? html`${connectedClaws.length} claw${connectedClaws.length !== 1 ? "s" : ""} connected
                  · ${connectedClaws.map(c => c.name).join(", ")}`
              : html`No claws connected —
                  <button class="btn btn-ghost btn-sm"
                    style="font-size:12px;padding:2px 6px"
                    @click=${() => this.dispatch("ccl:navigate", { tab: "claws" })}>
                    set up a claw
                  </button>`}
          </div>
        </div>

        <!-- Projects -->
        <section style="margin-bottom:40px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div style="font-size:15px;font-weight:600;color:var(--text-strong)">Projects</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm"
                @click=${() => this.dispatch("ccl:navigate", { tab: "projects" })}>
                View all
              </button>
              <button class="btn btn-primary btn-sm"
                @click=${() => this.dispatch("ccl:new-project")}>
                <svg viewBox="0 0 24 24" style="width:13px;height:13px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New project
              </button>
            </div>
          </div>

          ${this.loading
            ? html`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`
            : this.projects.length === 0
              ? html`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">📁</div>
                  <div class="empty-state-title">No projects yet</div>
                  <div class="empty-state-sub">Create your first project to start organizing work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${() => this.dispatch("ccl:new-project")}>
                    Create project
                  </button>
                </div>`
              : html`
                <div class="grid grid-3">
                  ${this.projects.map(p => html`
                    <div class="card" style="cursor:pointer;transition:border-color .15s"
                      @click=${() => this.dispatch("ccl:open-project", { projectId: String(p.id) })}
                      @mouseenter=${(e: Event) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                      @mouseleave=${(e: Event) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                      <div class="card-header">
                        <div>
                          <div class="card-title">${p.name}</div>
                          <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${p.key}</div>
                        </div>
                        ${this.statusBadge(p.status)}
                      </div>
                      ${p.description
                        ? html`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:8px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${p.description}</div>`
                        : ""}
                      <div style="font-size:12px;color:var(--muted);margin-top:4px">
                        ${p.taskCount != null ? `${p.taskCount} task${p.taskCount !== 1 ? "s" : ""}` : "No tasks yet"}
                      </div>
                    </div>
                  `)}
                </div>`}
        </section>

        <!-- Claws -->
        <section>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div style="font-size:15px;font-weight:600;color:var(--text-strong)">Claws</div>
            <button class="btn btn-ghost btn-sm"
              @click=${() => this.dispatch("ccl:navigate", { tab: "claws" })}>
              Manage claws
            </button>
          </div>

          ${this.loading
            ? html`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`
            : this.claws.length === 0
              ? html`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">🦀</div>
                  <div class="empty-state-title">No claws registered</div>
                  <div class="empty-state-sub">Register a CoderClaw instance to start delegating work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${() => this.dispatch("ccl:navigate", { tab: "claws" })}>
                    Register a claw
                  </button>
                </div>`
              : html`
                <div class="grid grid-3">
                  ${this.claws.map(c => html`
                    <div class="card">
                      <div class="card-header">
                        <div>
                          <div class="card-title">${c.name}</div>
                          <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${c.slug}</div>
                        </div>
                        <span class="badge ${c.connectedAt ? "badge-green" : "badge-gray"}">
                          ${c.connectedAt ? "online" : "offline"}
                        </span>
                      </div>
                      ${c.lastSeenAt
                        ? html`<div style="font-size:12px;color:var(--muted)">
                            Last seen ${new Date(c.lastSeenAt).toLocaleString()}
                          </div>`
                        : html`<div style="font-size:12px;color:var(--muted)">Never connected</div>`}
                    </div>
                  `)}
                </div>`}
        </section>

      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-dashboard": CclDashboard; } }
