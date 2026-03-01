import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { claws as clawsApi, projects as projectsApi, type Project } from "../../api.js";

@customElement("ccl-claw-projects")
export class CclClawProjects extends LitElement {
  override createRenderRoot() { return this; }

  static override properties = {
    clawId: { type: String },
    loading: { state: true },
    saving: { state: true },
    error: { state: true },
    associated: { state: true },
    allProjects: { state: true },
  };

  clawId = "";
  private loading = true;
  private saving = false;
  private error = "";
  private associated: Project[] = [];
  private allProjects: Project[] = [];

  override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("clawId") && this.clawId) void this.load();
  }

  private async load() {
    if (!this.clawId) return;
    this.loading = true;
    this.error = "";
    try {
      const [associated, allProjects] = await Promise.all([
        clawsApi.projects(this.clawId),
        projectsApi.list(),
      ]);
      this.associated = associated;
      this.allProjects = allProjects;
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load project associations";
    } finally {
      this.loading = false;
    }
  }

  private async associate(projectId: string) {
    this.saving = true;
    try {
      await clawsApi.associateProject(this.clawId, projectId);
      await this.load();
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to associate project";
    } finally {
      this.saving = false;
    }
  }

  private async unassociate(projectId: string) {
    this.saving = true;
    try {
      await clawsApi.unassociateProject(this.clawId, projectId);
      await this.load();
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to remove project association";
    } finally {
      this.saving = false;
    }
  }

  override render() {
    const associatedIds = new Set(this.associated.map((p) => p.id));
    const available = this.allProjects.filter((p) => !associatedIds.has(p.id));

    return html`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Associated Projects</div>
          <button class="btn btn-secondary btn-sm" @click=${() => void this.load()} ?disabled=${this.loading || this.saving}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div class="empty-state">Loading…</div>` : ""}

        ${!this.loading && this.associated.length === 0
          ? html`<div class="empty-state"><div class="empty-state-title">No projects linked</div><div class="empty-state-sub">Associate a project to route workspace context for this claw.</div></div>`
          : html`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Name</th><th>Key</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    ${this.associated.map((p) => html`
                      <tr>
                        <td>${p.name}</td>
                        <td style="font-family:var(--mono);font-size:12px">${p.key}</td>
                        <td>${p.status}</td>
                        <td>
                          <button class="btn btn-danger btn-sm" @click=${() => void this.unassociate(p.id)} ?disabled=${this.saving}>Remove</button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            `}

        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Add Project Association</div>
          ${available.length === 0
            ? html`<div style="font-size:13px;color:var(--muted)">All tenant projects are already associated.</div>`
            : html`
                <div style="display:grid;gap:8px;">
                  ${available.map((p) => html`
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--border);border-radius:8px;padding:10px 12px;">
                      <div>
                        <div style="font-size:13px;font-weight:600;">${p.name}</div>
                        <div style="font-size:12px;color:var(--muted)">${p.key}</div>
                      </div>
                      <button class="btn btn-primary btn-sm" @click=${() => void this.associate(p.id)} ?disabled=${this.saving}>Associate</button>
                    </div>
                  `)}
                </div>
              `}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-projects": CclClawProjects; } }
