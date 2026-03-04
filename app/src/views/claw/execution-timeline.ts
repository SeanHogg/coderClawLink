import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { executions as executionsApi, type ExecutionLogEvent } from "../../api.js";

/**
 * Renders a visual execution timeline.
 *
 * Usage:
 *   <ccl-execution-timeline execution-id="42"></ccl-execution-timeline>
 *
 * When `executionId` is set, the component fetches all log events for that
 * execution and renders them in chronological order as a vertical timeline.
 */
@customElement("ccl-execution-timeline")
export class CclExecutionTimeline extends LitElement {
  override createRenderRoot() { return this; }

  @property({ attribute: "execution-id" }) executionId = "";

  @state() private events: ExecutionLogEvent[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private expanded = new Set<number>();

  override updated(changed: Map<string, unknown>) {
    if (changed.has("executionId") && this.executionId) {
      void this.load();
    }
  }

  private async load() {
    if (!this.executionId) return;
    this.loading = true;
    this.error = "";
    try {
      this.events = await executionsApi.events(this.executionId);
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private toggle(id: number) {
    const next = new Set(this.expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expanded = next;
  }

  private eventIcon(type: string): string {
    const map: Record<string, string> = {
      agent_start:    "▶",
      agent_end:      "■",
      tool_call:      "⚙",
      tool_result:    "✓",
      subagent_start: "↘",
      subagent_end:   "↗",
      message:        "💬",
      checkpoint:     "📌",
      error:          "✗",
    };
    return map[type] ?? "•";
  }

  private eventColor(type: string): string {
    const map: Record<string, string> = {
      agent_start:    "#22c55e",
      agent_end:      "#6b7280",
      tool_call:      "#3b82f6",
      tool_result:    "#06b6d4",
      subagent_start: "#a855f7",
      subagent_end:   "#8b5cf6",
      message:        "#f59e0b",
      checkpoint:     "#10b981",
      error:          "#ef4444",
    };
    return map[type] ?? "var(--muted)";
  }

  private formatTs(ts: string): string {
    return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 });
  }

  private formatDuration(ms?: number): string {
    if (ms == null) return "";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }

  private pretty(json?: string): string {
    if (!json) return "";
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      return json;
    }
  }

  /** Compute elapsed-ms offsets so we can draw a proportional time axis. */
  private get timeRange(): { start: number; end: number; totalMs: number } {
    if (this.events.length === 0) return { start: 0, end: 0, totalMs: 0 };
    const times = this.events.map(e => new Date(e.ts).getTime());
    const start = Math.min(...times);
    const end = Math.max(...times);
    return { start, end, totalMs: Math.max(end - start, 1) };
  }

  override render() {
    if (!this.executionId) {
      return html`<div style="color:var(--muted);font-size:13px;padding:12px">Select an execution to view its timeline.</div>`;
    }

    if (this.loading) {
      return html`<div style="color:var(--muted);font-size:13px;padding:12px">Loading timeline…</div>`;
    }

    if (this.error) {
      return html`<div class="error-banner">${this.error}</div>`;
    }

    if (this.events.length === 0) {
      return html`
        <div class="empty-state" style="padding:24px 0">
          <div class="empty-state-icon">🕐</div>
          <div class="empty-state-title">No timeline events yet</div>
          <div class="empty-state-sub">The claw runtime posts structured events here as it works through the task. Start the execution to see activity.</div>
        </div>
      `;
    }

    const { start, totalMs } = this.timeRange;
    const topLevelEvents = this.events.filter(e => !e.parentEventId);

    return html`
      <div style="padding:4px 0">
        <!-- Mini progress bar showing relative event distribution -->
        <div style="position:relative;height:6px;background:var(--surface-2,#1a1a1a);border-radius:3px;overflow:hidden;margin-bottom:16px">
          ${this.events.map(e => {
            const pct = ((new Date(e.ts).getTime() - start) / totalMs) * 100;
            return html`<div style="position:absolute;left:${pct}%;width:2px;height:100%;background:${this.eventColor(e.eventType)};border-radius:1px"></div>`;
          })}
        </div>

        <!-- Timeline rows -->
        <div style="display:flex;flex-direction:column;gap:0">
          ${topLevelEvents.map((e, i) => this.renderEvent(e, i === topLevelEvents.length - 1, 0))}
        </div>

        <!-- Summary footer -->
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border);font-size:11px;color:var(--muted);display:flex;gap:16px;flex-wrap:wrap">
          <span>${this.events.length} event${this.events.length !== 1 ? "s" : ""}</span>
          <span>Span ${this.formatDuration(totalMs)}</span>
          ${this.events.filter(e => e.eventType === "error").length > 0
            ? html`<span style="color:#ef4444">${this.events.filter(e => e.eventType === "error").length} error${this.events.filter(e => e.eventType === "error").length !== 1 ? "s" : ""}</span>`
            : ""}
          ${this.events.filter(e => e.eventType === "tool_call").length > 0
            ? html`<span>${this.events.filter(e => e.eventType === "tool_call").length} tool call${this.events.filter(e => e.eventType === "tool_call").length !== 1 ? "s" : ""}</span>`
            : ""}
        </div>
      </div>
    `;
  }

  private renderEvent(e: ExecutionLogEvent, isLast: boolean, depth: number): unknown {
    const children = this.events.filter(c => c.parentEventId === e.id);
    const isOpen = this.expanded.has(e.id);
    const hasDetail = Boolean(e.detail);
    const hasChildren = children.length > 0;
    const canExpand = hasDetail || hasChildren;

    const indent = depth * 20;

    return html`
      <div style="display:flex;gap:0;position:relative">
        <!-- Vertical connector line -->
        <div style="flex-shrink:0;width:${20 + indent}px;display:flex;flex-direction:column;align-items:center">
          <div style="width:2px;flex:1;background:${isLast && !hasChildren ? "transparent" : "var(--border)"}"></div>
        </div>

        <div style="flex:1;padding-bottom:8px">
          <!-- Event row -->
          <div
            style="display:flex;align-items:flex-start;gap:8px;cursor:${canExpand ? "pointer" : "default"};padding:6px 8px;border-radius:6px;transition:background 0.1s"
            @click=${canExpand ? () => this.toggle(e.id) : undefined}
            @mouseover=${canExpand ? (ev: Event) => { (ev.currentTarget as HTMLElement).style.background = "var(--surface-2,rgba(255,255,255,0.04))"; } : undefined}
            @mouseout=${canExpand ? (ev: Event) => { (ev.currentTarget as HTMLElement).style.background = "transparent"; } : undefined}
          >
            <!-- Icon dot -->
            <div style="
              flex-shrink:0;width:24px;height:24px;border-radius:50%;
              background:${this.eventColor(e.eventType)}22;
              border:2px solid ${this.eventColor(e.eventType)};
              display:flex;align-items:center;justify-content:center;
              font-size:11px;margin-top:1px
            ">${this.eventIcon(e.eventType)}</div>

            <!-- Content -->
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:11px;font-weight:600;color:${this.eventColor(e.eventType)};text-transform:uppercase;letter-spacing:0.04em">${e.eventType.replace(/_/g, " ")}</span>
                ${e.agentRole ? html`<span style="font-size:11px;color:var(--muted);background:var(--surface-2,rgba(255,255,255,0.06));padding:1px 6px;border-radius:10px">${e.agentRole}</span>` : ""}
                ${e.label ? html`<span style="font-size:12px;color:var(--text-strong,#fff);font-weight:500">${e.label}</span>` : ""}
                <div style="flex:1"></div>
                ${e.durationMs != null ? html`<span style="font-size:11px;color:var(--muted)">${this.formatDuration(e.durationMs)}</span>` : ""}
                <span style="font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums">${this.formatTs(e.ts)}</span>
                ${canExpand ? html`
                  <svg viewBox="0 0 24 24" style="width:10px;height:10px;stroke:var(--muted);fill:none;stroke-width:2.5;flex-shrink:0">
                    <polyline points="${isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}"/>
                  </svg>` : ""}
              </div>
            </div>
          </div>

          <!-- Expanded detail -->
          ${isOpen && hasDetail ? html`
            <div style="margin:4px 0 4px 32px">
              <pre class="log-wrap" style="margin:0;font-size:11px;max-height:200px;overflow:auto">${this.pretty(e.detail)}</pre>
            </div>` : ""}

          <!-- Child events -->
          ${isOpen && hasChildren ? html`
            <div style="margin-left:32px;border-left:2px solid var(--border);padding-left:8px">
              ${children.map((c, i) => this.renderEvent(c, i === children.length - 1, depth + 1))}
            </div>` : ""}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ccl-execution-timeline": CclExecutionTimeline;
  }
}
