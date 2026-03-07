import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { tasks as tasksApi, type Task } from "../api.js";

@customElement("ccl-next-task")
export class CclNextTask extends LitElement {
  override createRenderRoot() { return this; }

  @state() private task: Task | null = null;
  @state() private loading = false;
  @state() private error = "";

  override connectedCallback() {
    super.connectedCallback();
    // do not auto-load; require user action
  }

  private async load() {
    this.loading = true;
    this.error = "";
    try {
      const t = await tasksApi.next();
      this.task = t;
    } catch (e: unknown) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="page-header">
        <div><div class="page-title">Next Queued Task</div><div class="page-sub">Fetch the highest-priority ready task from the queue</div></div>
      </div>
      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
      <button class="btn btn-primary" @click=${this.load} ?disabled=${this.loading}>
        ${this.loading ? "Loading…" : "Fetch next task"}
      </button>
      ${this.task
        ? html`<pre style="white-space:pre-wrap;word-break:break-word;margin-top:12px">${JSON.stringify(this.task, null, 2)}</pre>`
        : html`<div style="margin-top:12px;color:var(--muted)">No task loaded</div>`}
    `;
  }
}
