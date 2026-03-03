import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";

interface SessionRow {
  key: string;
  label?: string;
  derivedTitle?: string;
  updatedAt?: number | null;
  kind?: string;
}

@customElement("ccl-claw-sessions")
export class CclClawSessions extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private sessions: SessionRow[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private connState: "connecting" | "connected" | "offline" | "disconnected" = "connecting";

  private gw: ClawGateway | null = null;
  private pendingRpc = new Map<string, {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    timeout: ReturnType<typeof setTimeout>;
  }>();

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.rejectPendingRpc("sessions view closed");
    this.gw?.destroy();
    this.gw = null;
  }

  override updated(c: Map<string, unknown>) {
    if (c.has("wsUrl") && this.wsUrl) {
      this.connect();
    }
    if (c.has("clawId") && this.clawId && this.connState === "connected") {
      void this.load();
    }
  }

  private connect() {
    this.gw?.destroy();
    this.gw = null;
    this.rejectPendingRpc("gateway reconnected");
    this.connState = "connecting";

    this.gw = new ClawGateway({
      url: this.wsUrl,
      onEvent: (ev: GatewayEvent) => {
        if (ev.type === "connected") {
          this.connState = "connected";
          void this.load();
          return;
        }
        if (ev.type === "claw_online") {
          this.connState = "connected";
          return;
        }
        if (ev.type === "claw_offline") {
          this.connState = "offline";
          this.rejectPendingRpc("claw offline");
          return;
        }
        if (ev.type === "disconnected") {
          this.connState = "disconnected";
          this.rejectPendingRpc("gateway disconnected");
          return;
        }
        if (ev.type !== "message") return;
        this.handleMessage(ev.data);
      },
    });
  }

  private handleMessage(data: unknown) {
    if (!data || typeof data !== "object") return;
    const msg = data as {
      type?: string;
      requestId?: string;
      result?: unknown;
      error?: string;
    };
    if ((msg.type !== "rpc.result" && msg.type !== "rpc.error") || !msg.requestId) return;
    const pending = this.pendingRpc.get(msg.requestId);
    if (!pending) return;

    this.pendingRpc.delete(msg.requestId);
    clearTimeout(pending.timeout);
    if (msg.type === "rpc.error") {
      pending.reject(new Error(msg.error ?? "RPC failed"));
      return;
    }
    pending.resolve(msg.result);
  }

  private rejectPendingRpc(reason: string) {
    for (const pending of this.pendingRpc.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error(reason));
    }
    this.pendingRpc.clear();
  }

  private callRpc(method: string, params: Record<string, unknown>): Promise<unknown> {
    const requestId = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRpc.delete(requestId);
        reject(new Error(`RPC timeout for ${method}`));
      }, 20_000);

      this.pendingRpc.set(requestId, { resolve, reject, timeout });
      const sent = this.gw?.send({ type: "rpc.call", requestId, method, params }) ?? false;
      if (!sent) {
        clearTimeout(timeout);
        this.pendingRpc.delete(requestId);
        reject(new Error("Gateway not connected"));
      }
    });
  }

  private sessionLabel(session: SessionRow): string {
    const title = session.derivedTitle?.trim() || session.label?.trim() || "";
    const cleaned = title.replace(/^Conversation info \(untrusted metadata\):\s*/i, "").trim();
    return cleaned || session.key;
  }

  private async load() {
    if (!this.gw || this.connState !== "connected") {
      this.loading = false;
      return;
    }
    this.loading = true;
    this.error = "";
    try {
      const result = await this.callRpc("sessions.list", {
        includeGlobal: false,
        includeUnknown: false,
        includeDerivedTitles: true,
        limit: 200,
      }) as { sessions?: SessionRow[] };
      this.sessions = Array.isArray(result?.sessions) ? result.sessions : [];
    } catch (e) {
      const message = (e as Error).message ?? String(e);
      if (message !== "sessions view closed" && message !== "gateway disconnected" && message !== "claw offline") {
        this.error = message;
      }
    }
    finally { this.loading = false; }
  }

  private async removeSession(s: SessionRow) {
    if (!confirm("Delete this session?")) return;
    try {
      await this.callRpc("sessions.delete", { key: s.key });
      this.sessions = this.sessions.filter(ss => ss.key !== s.key);
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private fmt(ts: number | null | undefined) {
    if (!ts || !Number.isFinite(ts)) return "—";
    return new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Sessions</div>
            <div style="font-size:12px;color:var(--muted)">${this.connState === "connected" ? "Connected" : this.connState}</div>
          </div>
          <button class="btn btn-secondary btn-sm" @click=${() => this.load()} ?disabled=${this.loading || this.connState !== "connected"}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.connState !== "connected"
            ? html`<div style="color:var(--muted);font-size:13px">Waiting for connection…</div>`
          : this.sessions.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No sessions</div><div class="empty-state-sub">Sessions appear here once the claw connects and starts chatting</div></div>`
            : this.sessions.map(s => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title" style="font-family:var(--mono)">${s.key}</div>
                    <div style="font-size:11px;color:var(--muted)">${this.sessionLabel(s)} · ${this.fmt(s.updatedAt)}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${() => this.removeSession(s)}>Delete</button>
                </div>
              </div>
            `)}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-sessions": CclClawSessions; } }
