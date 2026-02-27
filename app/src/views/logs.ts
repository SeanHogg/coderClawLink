import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { executions, tasks as tasksApi, type Execution, type Task } from "../api.js";

@customElement("ccl-logs")
export class CclLogs extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private items: Execution[] = [];
  @state() private tasks: Task[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private filterTask = "";
  @state() private filterStatus = "";

  override connectedCallback() { super.connectedCallback(); this.load(); }

  private async load() {
    this.loading = true;
    try {
      [this.items, this.tasks] = await Promise.all([
        executions.list(),
        tasksApi.list().catch(() => [] as Task[]),
      ]);
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private filtered() {
    return this.items.filter(e => {
      if (this.filterTask && e.taskId !== this.filterTask) return false;
      if (this.filterStatus && e.status !== this.filterStatus) return false;
      return true;
    });
  }

  private taskTitle(id: string) {
    return this.tasks.find(t => t.id === id)?.title ?? id;
  }

  private statusColor(s: string) {
    const map: Record<string, string> = { completed: "badge-green", failed: "badge-red", running: "badge-blue", pending: "badge-gray", cancelled: "badge-gray" };
    return map[s] ?? "badge-gray";
  }

  private duration(e: Execution) {
    if (!e.startedAt || !e.completedAt) return "—";
    const ms = new Date(e.completedAt).getTime() - new Date(e.startedAt).getTime();
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  }

  private fmt(d: string) {
    return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  @state() private expanded: string | null = null;

  override render() {
    const items = this.filtered();
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Execution Logs</div>
          <div class="page-sub">${items.length} execution${items.length !== 1 ? "s" : ""}</div>
        </div>
        <button class="btn btn-secondary" @click=${this.load}>Refresh</button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div class="filters" style="margin-bottom:16px">
        <select class="select" style="max-width:220px;height:32px;padding:4px 10px"
          @change=${(e: Event) => { this.filterTask = (e.target as HTMLSelectElement).value; }}>
          <option value="">All tasks</option>
          ${this.tasks.map(t => html`<option value=${t.id}>${t.title}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${(e: Event) => { this.filterStatus = (e.target as HTMLSelectElement).value; }}>
          <option value="">All statuses</option>
          ${["pending", "running", "completed", "failed", "cancelled"].map(s => html`<option value=${s}>${s}</option>`)}
        </select>
      </div>

      ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : items.length === 0
          ? html`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No executions found</div></div>`
          : html`
            <div style="display:grid;gap:8px">
              ${items.slice().reverse().map(e => html`
                <div class="card" style="cursor:pointer" @click=${() => { this.expanded = this.expanded === e.id ? null : e.id; }}>
                  <div style="display:flex;align-items:center;gap:12px">
                    <span class="badge ${this.statusColor(e.status)}">${e.status}</span>
                    <span style="font-size:13px;font-weight:500;color:var(--text-strong);flex:1">${this.taskTitle(e.taskId)}</span>
                    <span style="font-size:12px;color:var(--muted)">${this.duration(e)}</span>
                    <span style="font-size:12px;color:var(--muted)">${this.fmt(e.createdAt)}</span>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:var(--muted);fill:none;stroke-width:2">
                      <polyline points="${this.expanded === e.id ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}"/>
                    </svg>
                  </div>
                  ${this.expanded === e.id && e.result ? html`
                    <div class="log-wrap" style="margin-top:12px;max-height:200px;overflow-y:auto;font-size:11px">
                      ${e.result}
                    </div>` : ""}
                </div>
              `)}
            </div>`}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-logs": CclLogs; } }
