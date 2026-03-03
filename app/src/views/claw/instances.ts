import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";

type PresenceEntry = {
  key?: string;
  host?: string;
  ip?: string;
  mode?: string;
  version?: string;
  platform?: string;
  deviceFamily?: string;
  modelIdentifier?: string;
  lastInputSeconds?: number | null;
  reason?: string | null;
  roles?: string[];
  scopes?: string[];
  lastSeenAt?: string;
  updatedAt?: string;
};

@customElement("ccl-claw-instances")
export class CclClawInstances extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private connState: "connecting" | "connected" | "offline" | "disconnected" = "connecting";
  @state() private entries: PresenceEntry[] = [];
  @state() private loading = true;

  private gw: ClawGateway | null = null;

  override updated(changed: Map<string, unknown>) {
    if (changed.has("wsUrl") && this.wsUrl) {
      this.gw?.destroy();
      this.connect();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.gw?.destroy();
  }

  private connect() {
    this.connState = "connecting";
    this.loading = true;
    this.gw = new ClawGateway({
      url: this.wsUrl,
      onEvent: (ev: GatewayEvent) => {
        if (ev.type === "connected") {
          this.connState = "connected";
          this.gw?.send({ type: "presence.subscribe" });
          return;
        }
        if (ev.type === "claw_online") {
          this.connState = "connected";
          this.gw?.send({ type: "presence.subscribe" });
          return;
        }
        if (ev.type === "claw_offline") { this.connState = "offline"; return; }
        if (ev.type === "disconnected") { this.connState = "disconnected"; return; }
        if (ev.type !== "message") return;

        const msg = ev.data as { type?: string; entries?: PresenceEntry[] };
        if (msg.type === "presence.snapshot") {
          this.entries = Array.isArray(msg.entries) ? msg.entries : [];
          this.loading = false;
        }
      },
    });
  }

  private rowMeta(entry: PresenceEntry): string {
    const host = entry.host ?? "unknown";
    const ip = entry.ip ? ` (${entry.ip})` : "";
    const mode = entry.mode ?? "unknown";
    return `${host}${ip} ${mode}`.trim();
  }

  private ageLabel(entry: PresenceEntry): string {
    const value = entry.lastSeenAt ?? entry.updatedAt;
    if (!value) return "just now";
    const ms = Date.now() - Date.parse(value);
    if (!Number.isFinite(ms) || ms < 60_000) return "just now";
    const mins = Math.floor(ms / 60_000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    return `${hours}h ago`;
  }

  override render() {
    return html`
      <div style="padding:12px 16px;display:flex;flex-direction:column;height:100%">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-shrink:0">
          <span class="dot ${this.connState === "connected" ? "dot-green" : this.connState === "offline" ? "dot-red" : "dot-gray"}"></span>
          <span style="font-size:12px;color:var(--muted)">${this.connState}</span>
          <div style="flex:1"></div>
          <button class="btn btn-ghost btn-sm" @click=${() => this.gw?.send({ type: "presence.subscribe" })}>Refresh</button>
        </div>

        <div class="log-wrap" style="flex:1;overflow-y:auto;height:0">
          ${this.loading
            ? html`<div style="color:var(--muted);font-size:12px">Loading instances…</div>`
            : this.entries.length === 0
              ? html`<div style="color:var(--muted);font-size:12px">No instances reported yet.</div>`
              : this.entries.map((entry) => html`
                <div class="list-item" style="padding:12px;margin-bottom:8px;border:1px solid var(--border);border-radius:10px">
                  <div style="display:flex;justify-content:space-between;gap:12px">
                    <div>
                      <div style="font-weight:600;font-size:13px">${entry.key ?? entry.host ?? "unknown"}</div>
                      <div style="font-size:12px;color:var(--muted)">${this.rowMeta(entry)}</div>
                      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
                        ${entry.mode ? html`<span class="badge badge-gray">${entry.mode}</span>` : ""}
                        ${entry.roles?.map((role) => html`<span class="badge badge-gray">${role}</span>`) ?? ""}
                        ${entry.scopes?.length ? html`<span class="badge badge-gray">scopes: ${entry.scopes.join(", ")}</span>` : ""}
                        ${entry.platform ? html`<span class="badge badge-gray">${entry.platform}</span>` : ""}
                        ${entry.deviceFamily ? html`<span class="badge badge-gray">${entry.deviceFamily}</span>` : ""}
                        ${entry.version ? html`<span class="badge badge-gray">${entry.version}</span>` : ""}
                      </div>
                    </div>
                    <div style="font-size:12px;color:var(--muted);text-align:right;min-width:110px">
                      <div>${this.ageLabel(entry)}</div>
                      <div>Last input ${entry.lastInputSeconds != null ? `${entry.lastInputSeconds}s ago` : "n/a"}</div>
                      <div>Reason ${entry.reason ?? ""}</div>
                    </div>
                  </div>
                </div>
              `)}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-instances": CclClawInstances; } }
