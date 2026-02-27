import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { projects as projectsApi, type Project } from "../api.js";

@customElement("ccl-projects")
export class CclProjects extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private items: Project[] = [];
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

  private openCreate() {
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

  private async remove(p: Project) {
    if (!confirm(`Delete project "${p.name}"? This cannot be undone.`)) return;
    try {
      await projectsApi.remove(p.id);
      this.items = this.items.filter(i => i.id !== p.id);
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private statusBadge(s: string) {
    const map: Record<string, string> = {
      active: "badge-green", completed: "badge-blue",
      archived: "badge-gray", on_hold: "badge-yellow",
    };
    return html`<span class="badge ${map[s] ?? "badge-gray"}">${s.replace("_", " ")}</span>`;
  }

  override render() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreate}>
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
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreate}>Create project</button>
            </div>`
          : html`
            <div class="grid grid-3">
              ${this.items.map(p => html`
                <div class="card" style="cursor:default">
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
                    <button class="btn btn-ghost btn-sm" @click=${() => this.openEdit(p)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${() => this.remove(p)}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

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
