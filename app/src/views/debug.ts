import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { claws as clawsApi, type Claw } from "../api.js";
import { ClawGateway, type GatewayEvent } from "../gateway.js";

@customElement("ccl-debug")
export class CclDebug extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private clawList: Claw[] = [];
  @state() private selectedClawId = "";
  @state() private loading = true;
  @state() private error = "";
  @state() private connState = "disconnected";
  @state() private refreshing = false;

  @state() private statusSnapshot: unknown = null;
  @state() private healthSnapshot: unknown = null;

  @state() private rpcMethod = "system-presence";
  @state() private rpcParams = "{}";
  @state() private rpcOutput = "";
  @state() private rpcRunning = false;

  private gw: ClawGateway | null = null;
  private pendingRpc = new Map<string, {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    timeout: ReturnType<typeof setTimeout>;
  }>();

  override connectedCallback() {
    super.connectedCallback();
    void this.loadClaws();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupGateway();
    this.rejectPendingRpc("debug view closed");
  }

  private async loadClaws() {
    this.loading = true;
    this.error = "";
    try {
      this.clawList = await clawsApi.list();
      if (!this.clawList.length) {
        this.selectedClawId = "";
        this.cleanupGateway();
        this.statusSnapshot = null;
        this.healthSnapshot = null;
        return;
      }
      if (!this.selectedClawId || !this.clawList.some((c) => c.id === this.selectedClawId)) {
        const firstConnected = this.clawList.find((c) => Boolean(c.connectedAt));
        this.selectedClawId = firstConnected?.id ?? this.clawList[0].id;
      }
      this.connectGateway();
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to load claws";
    } finally {
      this.loading = false;
    }
  }

  private cleanupGateway() {
    this.gw?.destroy();
    this.gw = null;
    this.connState = "disconnected";
  }

  private rejectPendingRpc(reason: string) {
    for (const pending of this.pendingRpc.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error(reason));
    }
    this.pendingRpc.clear();
  }

  private connectGateway() {
    if (!this.selectedClawId) return;
    this.cleanupGateway();
    this.rejectPendingRpc("gateway reconnected");
    this.connState = "connecting";

    this.gw = new ClawGateway({
      url: clawsApi.wsUrl(this.selectedClawId),
      onEvent: (ev: GatewayEvent) => {
        if (ev.type === "connected") {
          this.connState = "connected";
          void this.refreshSnapshots();
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
    if (msg.type !== "rpc.result" && msg.type !== "rpc.error") return;
    if (!msg.requestId) return;

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

  private callRpc(method: string, params: Record<string, unknown>): Promise<unknown> {
    const rpcMethod = method.trim();
    if (!rpcMethod) {
      return Promise.reject(new Error("Method is required"));
    }
    if (!this.gw) {
      return Promise.reject(new Error("No gateway connection"));
    }

    const requestId = crypto.randomUUID();

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRpc.delete(requestId);
        reject(new Error(`RPC timeout for ${rpcMethod}`));
      }, 20_000);

      this.pendingRpc.set(requestId, { resolve, reject, timeout });
      const sent = this.gw?.send({
        type: "rpc.call",
        requestId,
        method: rpcMethod,
        params,
      });
      if (!sent) {
        clearTimeout(timeout);
        this.pendingRpc.delete(requestId);
        reject(new Error("Gateway not connected"));
      }
    });
  }

  private async refreshSnapshots() {
    if (!this.selectedClawId) return;
    this.refreshing = true;
    this.error = "";
    try {
      const [status, health] = await Promise.all([
        this.callRpc("status", {}),
        this.callRpc("health", {}),
      ]);
      this.statusSnapshot = status;
      this.healthSnapshot = health;
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to refresh snapshots";
    } finally {
      this.refreshing = false;
    }
  }

  private pretty(value: unknown): string {
    try {
      return JSON.stringify(value ?? {}, null, 2);
    } catch {
      return String(value ?? "");
    }
  }

  private async runManualRpc() {
    this.rpcRunning = true;
    this.error = "";
    try {
      const parsed = this.rpcParams.trim() ? JSON.parse(this.rpcParams) : {};
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Params must be a JSON object");
      }
      const result = await this.callRpc(this.rpcMethod, parsed as Record<string, unknown>);
      this.rpcOutput = this.pretty(result);
    } catch (e: unknown) {
      this.rpcOutput = "";
      this.error = (e as Error).message ?? "RPC failed";
    } finally {
      this.rpcRunning = false;
    }
  }

  override render() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Debug</div>
          <div class="page-sub">Tenant-level gateway snapshots, events, and manual RPC calls.</div>
        </div>
        <button class="btn btn-secondary" @click=${this.loadClaws} ?disabled=${this.loading}>
          ${this.loading ? "Loading…" : "Refresh Claws"}
        </button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div class="card" style="display:flex;align-items:flex-end;gap:12px;margin-bottom:12px;flex-wrap:wrap">
        <div class="field" style="margin:0;min-width:280px;max-width:420px;flex:1">
          <label class="label">Claw</label>
          <select
            class="select"
            .value=${this.selectedClawId}
            @change=${(e: Event) => {
              this.selectedClawId = (e.target as HTMLSelectElement).value;
              this.connectGateway();
            }}
          >
            ${this.clawList.map((claw) => html`
              <option value=${claw.id}>${claw.name} (${claw.id})</option>
            `)}
          </select>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="dot ${this.connState === "connected" ? "dot-green" : this.connState === "offline" ? "dot-red" : "dot-gray"}"></span>
          <span style="font-size:12px;color:var(--muted)">${this.connState}</span>
        </div>
        <button class="btn btn-secondary" @click=${this.refreshSnapshots} ?disabled=${this.refreshing || !this.selectedClawId}>
          ${this.refreshing ? "Refreshing…" : "Refresh Snapshots"}
        </button>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px;align-items:start">
        <div class="card">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">Snapshots</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Status</div>
          <pre class="log-wrap" style="margin:0 0 10px 0;max-height:240px;overflow:auto">${this.pretty(this.statusSnapshot)}</pre>
          <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Health</div>
          <pre class="log-wrap" style="margin:0;max-height:240px;overflow:auto">${this.pretty(this.healthSnapshot)}</pre>
        </div>

        <div class="card">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">Manual RPC</div>
          <div class="field" style="margin-bottom:10px">
            <label class="label">Method</label>
            <input
              class="input"
              .value=${this.rpcMethod}
              @input=${(e: Event) => { this.rpcMethod = (e.target as HTMLInputElement).value; }}
              placeholder="system-presence"
            >
          </div>
          <div class="field" style="margin-bottom:10px">
            <label class="label">Params (JSON)</label>
            <textarea
              class="textarea"
              style="min-height:160px"
              .value=${this.rpcParams}
              @input=${(e: Event) => { this.rpcParams = (e.target as HTMLTextAreaElement).value; }}
            ></textarea>
          </div>
          <button class="btn btn-primary" @click=${this.runManualRpc} ?disabled=${this.rpcRunning || !this.selectedClawId}>
            ${this.rpcRunning ? "Calling…" : "Call"}
          </button>

          <div style="font-size:12px;color:var(--muted);margin:12px 0 8px">Result</div>
          <pre class="log-wrap" style="margin:0;max-height:280px;overflow:auto">${this.rpcOutput || "(no result)"}</pre>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ccl-debug": CclDebug;
  }
}