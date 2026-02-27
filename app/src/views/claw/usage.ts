import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { executions, type Execution } from "../../api.js";

type TimeFilter = "today" | "week" | "month" | "all";

@customElement("ccl-claw-usage")
export class CclClawUsage extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private items: Execution[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private timeFilter: TimeFilter = "week";

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try { this.items = await executions.list({ clawId: this.clawId }); }
    catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private filtered(): Execution[] {
    const now = Date.now();
    const cutoffs: Record<TimeFilter, number> = {
      today: 86400000, week: 604800000, month: 2592000000, all: Infinity,
    };
    const cutoff = cutoffs[this.timeFilter];
    return this.items.filter(e => now - new Date(e.createdAt).getTime() < cutoff);
  }

  private stats(items: Execution[]) {
    const total = items.length;
    const completed = items.filter(e => e.status === "completed").length;
    const failed = items.filter(e => e.status === "failed").length;
    const running = items.filter(e => e.status === "running").length;
    return { total, completed, failed, running };
  }

  private duration(e: Execution): string {
    if (!e.startedAt || !e.completedAt) return "—";
    const ms = new Date(e.completedAt).getTime() - new Date(e.startedAt).getTime();
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  }

  private fmt(d: string) { return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }

  override render() {
    const items = this.filtered();
    const s = this.stats(items);
    const statusColor: Record<string, string> = { completed: "badge-green", failed: "badge-red", running: "badge-blue", pending: "badge-gray", cancelled: "badge-gray" };

    return html`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${(["today", "week", "month", "all"] as TimeFilter[]).map(f => html`
              <button class="btn btn-sm ${this.timeFilter === f ? "btn-primary" : "btn-ghost"}" @click=${() => { this.timeFilter = f; }}>
                ${f}
              </button>
            `)}
          </div>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        <div class="stat-grid">
          ${[
            ["Total", s.total],
            ["Completed", s.completed],
            ["Failed", s.failed],
            ["Running", s.running],
          ].map(([label, val]) => html`
            <div class="stat-card">
              <div class="stat-value">${val}</div>
              <div class="stat-label">${label}</div>
            </div>
          `)}
        </div>

        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : items.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`
            : html`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${items.slice().reverse().map(e => html`
                      <tr>
                        <td style="font-size:12px;font-family:var(--mono)">${e.taskId}</td>
                        <td><span class="badge ${statusColor[e.status] ?? "badge-gray"}">${e.status}</span></td>
                        <td style="font-size:12px;color:var(--muted)">${this.duration(e)}</td>
                        <td style="font-size:12px;color:var(--muted)">${this.fmt(e.createdAt)}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>`}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-usage": CclClawUsage; } }
