import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  claws as clawsApi,
  workflows as workflowsApi,
  type ToolAuditEvent,
  type Workflow,
  type WorkflowTask,
} from "../api.js";

/** One visual track in the swimlane view. */
interface Track {
  label: string;
  kind: "execution" | "workflow-task" | "tool";
  startMs: number;
  endMs: number;
  status: string;
  detail?: string;
}

@customElement("ccl-execution-timeline")
export class CclExecutionTimeline extends LitElement {
  override createRenderRoot() { return this; }

  /** Claw ID to load tool audit events from. */
  @property() clawId = "";
  /** Optional run ID to scope tool events. */
  @property() runId = "";
  /** Optional session key to scope tool events. */
  @property() sessionKey = "";

  @state() private events: ToolAuditEvent[] = [];
  @state() private wfList: Workflow[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private viewMode: "timeline" | "list" | "graph" = "timeline";
  @state() private categoryFilter: string = ""; // filter string for event categories

  override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("clawId") || changed.has("runId") || changed.has("sessionKey")) {
      void this.load();
    }
  }

  private async load() {
    if (!this.clawId) return;
    this.loading = true;
    this.error = "";
    try {
      const [evts, wfs] = await Promise.all([
        clawsApi.toolAuditEvents(this.clawId, {
          runId:      this.runId      || undefined,
          sessionKey: this.sessionKey || undefined,
          limit: 200,
        }),
        workflowsApi.list({ clawId: this.clawId }).catch(() => [] as Workflow[]),
      ]);
      this.events = evts;
      this.wfList = wfs;
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to load timeline";
    } finally {
      this.loading = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Build tracks from raw data
  // ---------------------------------------------------------------------------

  private buildTracks(): Track[] {
    const tracks: Track[] = [];

    // Tool audit events → one track per tool call
    for (const ev of this.events) {
      if (this.categoryFilter && !(ev.category ?? "").includes(this.categoryFilter)) continue;
      const startMs = new Date(ev.ts).getTime();
      const endMs   = startMs + (ev.durationMs ?? 0);
      tracks.push({
        label:   ev.category ? `${ev.toolName} (${ev.category})` : ev.toolName,
        kind:    "tool",
        startMs,
        endMs,
        status:  "completed",
        detail:  ev.args ? this.truncate(ev.args, 120) : undefined,
      });
    }

    // Workflow tasks → one track per task
    for (const wf of this.wfList) {
      if (!wf.tasks) continue;
      for (const t of wf.tasks) {
        const startMs = t.startedAt   ? new Date(t.startedAt).getTime()   : new Date(t.createdAt).getTime();
        const endMs   = t.completedAt ? new Date(t.completedAt).getTime() : startMs + 1;
        tracks.push({
          label:   `${t.agentRole}: ${this.truncate(t.description, 60)}`,
          kind:    "workflow-task",
          startMs,
          endMs,
          status:  t.status,
          detail:  t.output ? this.truncate(t.output, 120) : undefined,
        });
      }
    }

    return tracks.sort((a, b) => a.startMs - b.startMs);
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private truncate(s: unknown, n: number) {
    const str = typeof s === "string" ? s : JSON.stringify(s) ?? "";
    return str.length > n ? str.slice(0, n) + "…" : str;
  }

  private statusColor(s: string) {
    const map: Record<string, string> = {
      completed: "var(--green,#22c55e)",
      running:   "var(--blue,#3b82f6)",
      failed:    "var(--red,#ef4444)",
      cancelled: "var(--muted,#6b7280)",
      pending:   "var(--muted,#6b7280)",
      tool:      "var(--accent,#6366f1)",
    };
    return map[s] ?? map.tool;
  }

  private kindColor(t: Track) {
    if (t.kind === "tool")          return "var(--accent,#6366f1)";
    if (t.kind === "workflow-task") return this.statusColor(t.status);
    return this.statusColor(t.status);
  }

  private fmtTime(ms: number) {
    return new Date(ms).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  private fmtDuration(ms: number) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  private renderTimelineView(tracks: Track[]) {
    const showFilter = html`<div style="margin-bottom:8px">
      <label>Category filter: <input .value=${this.categoryFilter} @input=${(e: any) => { this.categoryFilter = e.target.value; }} placeholder="e.g. thinking" /></label>
    </div>`;

    if (tracks.length === 0) {
      return html`${showFilter}<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-title">No timeline events</div><div class="empty-state-sub">Tool audit events and workflow tasks will appear here once the claw runs.</div></div>`;
    }

    const minMs   = Math.min(...tracks.map(t => t.startMs));
    const maxMs   = Math.max(...tracks.map(t => t.endMs || t.startMs + 1));
    const totalMs = Math.max(maxMs - minMs, 1);

    const ROW_H   = 28;
    const LABEL_W = 200;
    const BAR_W   = 560;
    const PAD     = 8;
    const totalH  = tracks.length * (ROW_H + 4) + PAD * 2;

    // Tick marks (5 ticks)
    const ticks = Array.from({ length: 6 }, (_, i) => ({
      pct: i / 5,
      ms:  minMs + (totalMs * i) / 5,
    }));

    return html`
      ${showFilter}
      <div style="overflow-x:auto">
        <svg width="${LABEL_W + BAR_W + PAD * 2}" height="${totalH + 24}"
             style="font-family:var(--font-mono,'monospace');display:block">

          <!-- Tick labels -->
          ${ticks.map(tk => svg`
            <line x1="${LABEL_W + tk.pct * BAR_W}" y1="0"
                  x2="${LABEL_W + tk.pct * BAR_W}" y2="${totalH}"
                  stroke="var(--border,#374151)" stroke-width="1" stroke-dasharray="4 4"/>
            <text x="${LABEL_W + tk.pct * BAR_W}" y="${totalH + 16}"
                  font-size="9" fill="var(--muted,#6b7280)" text-anchor="middle">${this.fmtTime(tk.ms)}</text>
          `)}

          <!-- Tracks -->
          ${tracks.map((t, i) => {
            const y      = PAD + i * (ROW_H + 4);
            const barX   = LABEL_W + ((t.startMs - minMs) / totalMs) * BAR_W;
            const barW   = Math.max(((t.endMs - t.startMs) / totalMs) * BAR_W, 4);
            const color  = this.kindColor(t);
            return svg`
              <text x="${LABEL_W - 6}" y="${y + ROW_H / 2 + 4}"
                    font-size="11" fill="var(--text,#e5e7eb)" text-anchor="end"
                    style="font-family:inherit">
                ${this.truncate(t.label, 26)}
              </text>
              <rect x="${barX}" y="${y}" width="${barW}" height="${ROW_H}"
                    rx="4" fill="${color}" opacity="0.85">
                <title>${t.label}&#10;${this.fmtTime(t.startMs)} → ${this.fmtTime(t.endMs)}&#10;Duration: ${this.fmtDuration(t.endMs - t.startMs)}${t.detail ? `&#10;${t.detail}` : ""}</title>
              </rect>
              <text x="${barX + barW + 4}" y="${y + ROW_H / 2 + 4}"
                    font-size="10" fill="var(--muted,#6b7280)">
                ${this.fmtDuration(t.endMs - t.startMs)}
              </text>
            `;
          })}
        </svg>
      </div>
    `;
  }

  private renderListView(tracks: Track[]) {
    if (tracks.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No events</div></div>`;
    }
    return html`
      <div style="display:grid;gap:4px">
        ${tracks.map(t => html`
          <div class="card" style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px">
            <span style="width:8px;height:8px;border-radius:50%;background:${this.kindColor(t)};margin-top:5px;flex-shrink:0"></span>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:500;color:var(--text-strong)">${t.label}</div>
              <div style="font-size:11px;color:var(--muted);margin-top:2px">
                ${this.fmtTime(t.startMs)}
                ${t.endMs > t.startMs ? html` → ${this.fmtTime(t.endMs)} (${this.fmtDuration(t.endMs - t.startMs)})` : ""}
              </div>
              ${t.detail ? html`<div style="font-size:11px;color:var(--muted);margin-top:4px;font-family:var(--font-mono)">${t.detail}</div>` : ""}
            </div>
            <span class="badge ${t.status === "completed" ? "badge-green" : t.status === "failed" ? "badge-red" : t.status === "running" ? "badge-blue" : "badge-gray"}" style="flex-shrink:0">${t.status}</span>
          </div>
        `)}
      </div>
    `;
  }

  private renderGraphView(tracks: Track[]) {
    if (tracks.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">🔗</div><div class="empty-state-title">No graph data</div></div>`;
    }

    // Build a simple dependency graph for workflow tasks
    const wfTasks: WorkflowTask[] = this.wfList.flatMap(wf => wf.tasks ?? []);
    if (wfTasks.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">🔗</div><div class="empty-state-title">No workflow graph data</div><div class="empty-state-sub">Register a workflow with tasks to see the dependency graph.</div></div>`;
    }

    const NODE_W = 160;
    const NODE_H = 48;
    const COLS   = 3;
    const GAP_X  = 40;
    const GAP_Y  = 32;
    const PAD    = 20;

    const svgW = COLS * (NODE_W + GAP_X) + PAD * 2;
    const rows = Math.ceil(wfTasks.length / COLS);
    const svgH = rows * (NODE_H + GAP_Y) + PAD * 2;

    const pos = (i: number) => ({
      x: PAD + (i % COLS) * (NODE_W + GAP_X),
      y: PAD + Math.floor(i / COLS) * (NODE_H + GAP_Y),
    });

    const idToIndex = new Map(wfTasks.map((t, i) => [t.id, i]));

    return html`
      <div style="overflow:auto">
        <svg width="${svgW}" height="${svgH}" style="display:block">
          <!-- Dependency edges -->
          ${wfTasks.flatMap((t, i) => {
            const deps: string[] = t.dependsOn ? JSON.parse(t.dependsOn) as string[] : [];
            return deps.map(depId => {
              const fromIdx = idToIndex.get(depId);
              if (fromIdx === undefined) return svg``;
              const from = pos(fromIdx);
              const to   = pos(i);
              const x1 = from.x + NODE_W;
              const y1 = from.y + NODE_H / 2;
              const x2 = to.x;
              const y2 = to.y + NODE_H / 2;
              const cx = (x1 + x2) / 2;
              return svg`
                <path d="M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}"
                      stroke="var(--border,#374151)" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
              `;
            });
          })}

          <!-- Arrow marker -->
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--border,#374151)"/>
            </marker>
          </defs>

          <!-- Task nodes -->
          ${wfTasks.map((t, i) => {
            const { x, y } = pos(i);
            const color = this.statusColor(t.status);
            return svg`
              <rect x="${x}" y="${y}" width="${NODE_W}" height="${NODE_H}"
                    rx="8" fill="var(--surface,#1f2937)" stroke="${color}" stroke-width="2"/>
              <text x="${x + NODE_W / 2}" y="${y + 18}" font-size="10"
                    fill="${color}" text-anchor="middle" font-weight="600">
                ${this.truncate(t.agentRole, 20)}
              </text>
              <text x="${x + NODE_W / 2}" y="${y + 32}" font-size="9"
                    fill="var(--muted,#6b7280)" text-anchor="middle">
                ${this.truncate(t.description, 24)}
              </text>
            `;
          })}
        </svg>
      </div>
    `;
  }

  override render() {
    const tracks = this.buildTracks();

    return html`
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div style="display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            ${(["timeline", "list", "graph"] as const).map(m => html`
              <button class="btn ${this.viewMode === m ? "btn-primary" : "btn-ghost"}"
                style="border-radius:0;border:none;padding:4px 12px;font-size:12px"
                @click=${() => { this.viewMode = m; }}>
                ${{ timeline: "⏱ Timeline", list: "☰ List", graph: "🔗 Graph" }[m]}
              </button>
            `)}
          </div>
          <span style="font-size:12px;color:var(--muted)">${tracks.length} event${tracks.length !== 1 ? "s" : ""}</span>
          <div style="flex:1"></div>
          <button class="btn btn-secondary" style="font-size:12px" @click=${this.load}
            ?disabled=${this.loading}>${this.loading ? "Loading…" : "Refresh"}</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        ${this.loading
          ? html`<div style="color:var(--muted);font-size:13px">Loading timeline…</div>`
          : this.viewMode === "timeline"
            ? this.renderTimelineView(tracks)
            : this.viewMode === "list"
              ? this.renderListView(tracks)
              : this.renderGraphView(tracks)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ccl-execution-timeline": CclExecutionTimeline;
  }
}
