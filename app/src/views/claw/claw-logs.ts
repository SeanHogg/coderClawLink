import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";

type LogLevel = "error" | "warn" | "info" | "debug" | "all";

interface LogLine {
  ts: string;
  level: string;
  msg: string;
}

@customElement("ccl-claw-logs")
export class CclClawLogs extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private lines: LogLine[] = [];
  @state() private level: LogLevel = "all";
  @state() private connState = "connecting";
  @state() private autoScroll = true;

  private gw: ClawGateway | null = null;
  private logEnd: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    if (this.wsUrl) this.connect();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.gw?.destroy();
  }

  override updated(c: Map<string, unknown>) {
    if (c.has("wsUrl") && this.wsUrl) { this.gw?.destroy(); this.connect(); }
    if (this.autoScroll) this.logEnd?.scrollIntoView();
  }

  private connect() {
    this.connState = "connecting";
    this.gw = new ClawGateway({
      url: this.wsUrl,
      onEvent: (ev: GatewayEvent) => {
        if (ev.type === "connected")    { this.connState = "connected"; this.gw?.send({ type: "logs.subscribe" }); return; }
        if (ev.type === "disconnected") { this.connState = "disconnected"; return; }
        if (ev.type === "claw_offline") { this.connState = "offline"; return; }
        if (ev.type !== "message") return;
        const msg = ev.data as { type: string; level?: string; message?: string; ts?: string };
        if (msg.type === "log") {
          this.lines = [...this.lines.slice(-2000), { ts: msg.ts ?? new Date().toISOString(), level: msg.level ?? "info", msg: msg.message ?? "" }];
        }
      },
    });
  }

  private filtered() {
    if (this.level === "all") return this.lines;
    return this.lines.filter(l => l.level === this.level);
  }

  private levelClass(l: string) {
    const map: Record<string, string> = { error: "log-line-error", warn: "log-line-warn", info: "log-line-info" };
    return map[l] ?? "";
  }

  private clear() { this.lines = []; }

  override render() {
    const lines = this.filtered();
    return html`
      <div style="padding:12px 16px;display:flex;flex-direction:column;height:100%">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-shrink:0">
          <span class="dot ${this.connState === "connected" ? "dot-green" : this.connState === "offline" ? "dot-red" : "dot-gray"}"></span>
          <span style="font-size:12px;color:var(--muted)">${this.connState}</span>
          <div style="flex:1"></div>
          <select class="select" style="height:28px;padding:3px 8px;font-size:12px;width:100px"
            @change=${(e: Event) => { this.level = (e.target as HTMLSelectElement).value as LogLevel; }}>
            <option value="all">all</option>
            <option value="error">error</option>
            <option value="warn">warn</option>
            <option value="info">info</option>
            <option value="debug">debug</option>
          </select>
          <label style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--muted);cursor:pointer">
            <input type="checkbox" .checked=${this.autoScroll} @change=${(e: Event) => { this.autoScroll = (e.target as HTMLInputElement).checked; }}> Auto-scroll
          </label>
          <button class="btn btn-ghost btn-sm" @click=${this.clear}>Clear</button>
        </div>

        <div class="log-wrap" style="flex:1;overflow-y:auto;height:0">
          ${lines.length === 0
            ? html`<div style="color:var(--muted);font-size:12px">Waiting for log output…</div>`
            : lines.map(l => html`
              <div class="log-line ${this.levelClass(l.level)}">
                <span style="opacity:0.5;margin-right:8px">${l.ts.slice(11, 19)}</span>
                <span style="min-width:40px;display:inline-block;margin-right:8px;text-transform:uppercase;font-size:10px;opacity:0.7">${l.level}</span>
                ${l.msg}
              </div>
            `)}
          <div style="height:1px" .ref=${(el: HTMLElement | null) => { this.logEnd = el; }}></div>
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-logs": CclClawLogs; } }
