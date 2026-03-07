import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { projects as projectsApi, type Project } from "../api.js";

@customElement("ccl-governance")
export class CclGovernance extends LitElement {
  override createRenderRoot() { return this; }
  @property() projectId = "";
  @state() private content = "";
  @state() private editing = false;
  @state() private loading = false;
  @state() private error = "";

  override updated(changed: Map<string, unknown>) {
    if (changed.has("projectId") && this.projectId) {
      void this.load();
    }
  }

  private async load() {
    if (!this.projectId) return;
    this.loading = true;
    try {
      const proj = await projectsApi.getById(this.projectId);
      this.content = proj.governance ?? "";
    } catch (e: unknown) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private async save() {
    try {
      await projectsApi.update(this.projectId, { governance: this.content });
      this.editing = false;
    } catch (e: unknown) {
      this.error = (e as Error).message;
    }
  }

  render() {
    return html`
      <div class="page-header">
        <div><div class="page-title">Governance</div><div class="page-sub">Project governance rules and standards</div></div>
      </div>
      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
      ${this.loading ? html`<div>Loading…</div>` : ""}
      ${!this.projectId
        ? html`<div class="empty-state" style="margin-top:24px"><div class="empty-state-title">No project selected</div><div class="empty-state-sub">Select a project to view or edit its governance rules.</div></div>`
        : this.editing
          ? html`<textarea class="textarea" style="width:100%;height:400px" .value=${this.content} @input=${(e:any)=>this.content=e.target.value}></textarea>
                 <div style="margin-top:8px"><button class="btn btn-primary" @click=${this.save}>Save</button>
                 <button class="btn btn-ghost" @click=${()=>this.editing=false}>Cancel</button></div>`
          : html`<pre style="white-space:pre-wrap;word-break:break-word">${this.content || "<none>"}</pre>
                 <button class="btn btn-primary" @click=${()=>this.editing=true}>Edit</button>`}
    `;
  }
}
