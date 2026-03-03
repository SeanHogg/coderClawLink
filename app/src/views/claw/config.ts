import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";

interface ConfigSnapshot {
  exists?: boolean;
  valid?: boolean;
  hash?: string;
  raw?: string | null;
  config?: Record<string, unknown>;
}

@customElement("ccl-claw-config")
export class CclClawConfig extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private loading = true;
  @state() private error = "";
  @state() private editing = false;
  @state() private saving = false;
  @state() private connState: "connecting" | "connected" | "offline" | "disconnected" = "connecting";

  @state() private snapshot: ConfigSnapshot | null = null;
  @state() private draftRaw = "";

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
    this.rejectPendingRpc("config view closed");
    this.gw?.destroy();
    this.gw = null;
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("wsUrl") && this.wsUrl) {
      this.connect();
    }
    if (changed.has("clawId") && this.clawId && this.connState === "connected") {
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

  private currentRaw(): string {
    if (typeof this.snapshot?.raw === "string") {
      return this.snapshot.raw;
    }
    if (this.snapshot?.config && typeof this.snapshot.config === "object") {
      return JSON.stringify(this.snapshot.config, null, 2);
    }
    return "{}";
  }

  private async load() {
    if (!this.gw || this.connState !== "connected") return;
    this.loading = true;
    this.error = "";
    try {
      const result = await this.callRpc("config.get", {}) as ConfigSnapshot;
      this.snapshot = result ?? {};
      if (!this.editing) {
        this.draftRaw = this.currentRaw();
      }
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to load config";
    } finally {
      this.loading = false;
    }
  }

  private startEdit() {
    this.draftRaw = this.currentRaw();
    this.editing = true;
  }

  private cancel() {
    this.editing = false;
    this.draftRaw = this.currentRaw();
  }

  private async save() {
    this.saving = true;
    this.error = "";
    try {
      if (this.snapshot?.exists && !this.snapshot.hash) {
        throw new Error("config base hash unavailable; refresh and retry");
      }
      await this.callRpc("config.apply", {
        raw: this.draftRaw,
        ...(this.snapshot?.hash ? { baseHash: this.snapshot.hash } : {}),
      });
      this.editing = false;
      await this.load();
    } catch (e: unknown) {
      this.error = (e as Error).message ?? "Failed to save config";
    } finally {
      this.saving = false;
    }
  }

  private prettyConfig(): string {
    if (this.snapshot?.config && typeof this.snapshot.config === "object") {
      return JSON.stringify(this.snapshot.config, null, 2);
    }
    return "{}";
  }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Configuration</div>
            <div style="font-size:12px;color:var(--muted)">
              ${this.connState === "connected" ? "Connected" : this.connState}
            </div>
          </div>
          ${!this.editing
            ? html`<div style="display:flex;gap:6px">
                <button class="btn btn-secondary btn-sm" @click=${() => this.load()} ?disabled=${this.loading}>Refresh</button>
                <button class="btn btn-secondary btn-sm" @click=${this.startEdit} ?disabled=${this.loading || this.connState !== "connected"}>Edit</button>
              </div>`
            : html`<div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" @click=${this.cancel}>Cancel</button>
                <button class="btn btn-primary btn-sm" ?disabled=${this.saving} @click=${this.save}>${this.saving ? "Saving…" : "Save"}</button>
              </div>`}
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>` : ""}

        ${!this.loading && !this.editing
          ? html`
              <div class="card" style="display:grid;gap:8px">
                <div style="font-size:12px;color:var(--muted)">
                  ${this.snapshot?.exists ? `Hash: ${this.snapshot.hash ?? "(none)"}` : "No config file found"}
                </div>
                <pre class="log-wrap" style="margin:0;max-height:420px;overflow:auto">${this.prettyConfig()}</pre>
              </div>
            `
          : ""}

        ${this.editing
          ? html`
              <div class="card" style="display:grid;gap:8px">
                <div style="font-size:12px;color:var(--muted)">
                  Edit raw JSON5 config. Sensitive values stay redacted.
                </div>
                <textarea
                  class="textarea"
                  style="min-height:420px;font-family:var(--mono)"
                  .value=${this.draftRaw}
                  @input=${(e: InputEvent) => { this.draftRaw = (e.target as HTMLTextAreaElement).value; }}
                ></textarea>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-config": CclClawConfig; } }
