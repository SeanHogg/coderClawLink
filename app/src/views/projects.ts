import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { projects as projectsApi, type Project } from "../api.js";

@customElement("ccl-projects")
export class CclProjects extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";
  /** Pre-select a project to open its detail view (passed from dashboard or app). */
  @property() selectedProjectId = "";
  /** When true, open the create modal on mount (passed from dashboard). */
  @property({ type: Boolean }) openCreate = false;

  @state() private items: Project[] = [];
  @state() private selectedProject: Project | null = null;
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private editTarget: Project | null = null;
  @state() private form = { name: "", description: "" };
  @state() private saving = false;

  override connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("openCreate") && this.openCreate) {
      this.openCreateModal();
    }
    if (changed.has("selectedProjectId") && this.selectedProjectId && this.items.length > 0) {
      this.selectProject(this.selectedProjectId);
    }
    // Also handle when items load after selectedProjectId was already set
    if (changed.has("items") && this.selectedProjectId && !this.selectedProject) {
      this.selectProject(this.selectedProjectId);
    }
  }

  private selectProject(id: string) {
    const found = this.items.find(p => String(p.id) === id) ?? null;
    this.selectedProject = found;
    if (found) this.mountTasks(found);
  }

  private async load() {
    this.loading = true;
    try {
      this.items = await projectsApi.list();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private openCreateModal() {
    this.editTarget = null;
    this.form = { name: "", description: "" };
    this.showModal = true;
  }

  private openEdit(p: Project) {
    this.editTarget = p;
    this.form = { name: p.name, description: p.description ?? "" };
    this.showModal = true;
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      if (this.editTarget) {
        const updated = await projectsApi.update(this.editTarget.id, this.form);
        this.items = this.items.map(i => i.id === updated.id ? updated : i);
        if (this.selectedProject?.id === updated.id) this.selectedProject = updated;
      } else {
        const created = await projectsApi.create(this.form);
        this.items = [created, ...this.items];
      }
      this.showModal = false;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.saving = false;
    }
  }

  private async removeProject(p?: Project | null) {
    if (!p?.id) return;
    if (!confirm(`Delete project "${p.name ?? "this project"}"? This cannot be undone.`)) return;
    try {
      await projectsApi.remove(p.id);
      this.items = this.items.filter(i => i.id !== p.id);
      if (this.selectedProject?.id === p.id) this.selectedProject = null;
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private mountTasks(project: Project) {
    // Defer so the DOM has rendered the tasks host
    requestAnimationFrame(() => {
      const host = this.querySelector("#project-tasks-host");
      if (!host) return;
      const el = document.createElement("ccl-tasks") as HTMLElement & { tenantId: string; projectId: string };
      el.tenantId = this.tenantId;
      el.projectId = String(project.id);
      host.replaceChildren(el);
    });
  }

  private statusBadge(s: string) {
    const map: Record<string, string> = {
      active: "badge-green", completed: "badge-blue",
      archived: "badge-gray", on_hold: "badge-yellow",
    };
    return html`<span class="badge ${map[s] ?? "badge-gray"}">${s.replace("_", " ")}</span>`;
  }

  override render() {
    if (this.selectedProject) return this.renderDetail(this.selectedProject);
    return this.renderList();
  }

  private renderList() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreateModal}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New project
        </button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      ${this.loading
        ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.items.length === 0
          ? html`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreateModal}>Create project</button>
            </div>`
          : html`
            <div class="grid grid-3">
              ${this.items.map(p => html`
                <div class="card" style="cursor:pointer;transition:border-color .15s"
                  @click=${() => { this.selectedProject = p; this.mountTasks(p); }}
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
                    ? html`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">${p.description}</div>`
                    : ""}
                  <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                    ${p.taskCount != null
                      ? html`<span style="font-size:12px;color:var(--muted)">${p.taskCount} task${p.taskCount !== 1 ? "s" : ""}</span>`
                      : ""}
                    <div style="flex:1"></div>
                    <button class="btn btn-ghost btn-sm" @click=${(e: Event) => { e.stopPropagation(); this.openEdit(p); }}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${(e: Event) => { e.stopPropagation(); this.removeProject(p); }}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal ? this.renderModal() : ""}
    `;
  }

  private renderDetail(p: Project) {
    return html`
      <!-- Back breadcrumb -->
      <div style="margin-bottom:20px">
        <button class="btn btn-ghost btn-sm"
          style="display:inline-flex;align-items:center;gap:6px;color:var(--muted)"
          @click=${() => { this.selectedProject = null; }}>
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="15 18 9 12 15 6"/></svg>
          Projects
        </button>
      </div>

      <!-- Project header -->
      <div class="page-header" style="margin-bottom:24px">
        <div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="page-title">${p.name}</div>
            ${this.statusBadge(p.status)}
          </div>
          <div style="font-size:12px;font-family:var(--mono);color:var(--muted);margin-top:2px">${p.key}</div>
          ${p.description
            ? html`<div style="font-size:13px;color:var(--muted);margin-top:6px;line-height:1.5">${p.description}</div>`
            : ""}
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" @click=${() => this.openEdit(p)}>Edit project</button>
          <button class="btn btn-danger btn-sm" @click=${() => this.removeProject(p)}>Delete</button>
        </div>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <!-- Tasks host — populated imperatively via mountTasks() -->
      <div id="project-tasks-host"></div>

      ${this.showModal ? this.renderModal() : ""}
    `;
  }

  private renderModal() {
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
        <div class="modal">
          <div class="modal-title">${this.editTarget ? "Edit project" : "New project"}</div>
          <div class="modal-sub">Projects group related tasks together</div>
          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
          <form @submit=${this.save} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Name</label>
              <input class="input" placeholder="Project name" .value=${this.form.name}
                @input=${(e: InputEvent) => { this.form = { ...this.form, name: (e.target as HTMLInputElement).value }; }} required>
            </div>
            <div class="field">
              <label class="label">Description <span class="label-hint">(optional)</span></label>
              <textarea class="textarea" placeholder="What is this project about?"
                .value=${this.form.description}
                @input=${(e: InputEvent) => { this.form = { ...this.form, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving ? "Saving…" : this.editTarget ? "Save changes" : "Create project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-projects": CclProjects; }
}
