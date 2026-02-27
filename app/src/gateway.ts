/** WebSocket gateway client for CoderClawLink.
 *
 * Connects to the CoderClawLink relay at /api/claws/:id/ws, which bridges
 * browser sessions to the CoderClaw instance.  The wire protocol is identical
 * to the CoderClaw gateway protocol so CoderClaw's existing server-side code
 * requires no changes.
 */

export type GatewayEvent =
  | { type: "connected" }
  | { type: "disconnected"; code: number; reason: string }
  | { type: "claw_offline" }
  | { type: "message"; data: unknown };

export type GatewayEventHandler = (ev: GatewayEvent) => void;

export interface GatewayOptions {
  url: string;                  // wss://…/api/claws/:id/ws
  onEvent: GatewayEventHandler;
  clientName?: string;
}

const RECONNECT_DELAYS = [800, 1500, 3000, 5000, 10000, 15000];

export class ClawGateway {
  private ws: WebSocket | null = null;
  private attempt = 0;
  private destroyed = false;
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private opts: GatewayOptions) {
    this.connect();
  }

  private connect() {
    if (this.destroyed) return;
    this.ws = new WebSocket(this.opts.url);

    this.ws.addEventListener("open", () => {
      this.attempt = 0;
      this.schedulePings();
      this.opts.onEvent({ type: "connected" });
    });

    this.ws.addEventListener("message", (ev) => {
      let data: unknown;
      try { data = JSON.parse(ev.data as string); } catch { data = ev.data; }
      if (
        data && typeof data === "object" &&
        (data as { type?: string }).type === "claw_offline"
      ) {
        this.opts.onEvent({ type: "claw_offline" });
        return;
      }
      this.opts.onEvent({ type: "message", data });
    });

    this.ws.addEventListener("close", (ev) => {
      this.clearPings();
      if (this.destroyed) return;
      this.opts.onEvent({ type: "disconnected", code: ev.code, reason: ev.reason });
      this.scheduleReconnect();
    });

    this.ws.addEventListener("error", () => {
      // error always followed by close
    });
  }

  /** Send a JSON message to the CoderClaw instance. */
  send(msg: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  /** Tear down the connection permanently. */
  destroy() {
    this.destroyed = true;
    this.clearPings();
    this.ws?.close(1000, "destroyed");
    this.ws = null;
  }

  get readyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }

  private schedulePings() {
    this.clearPings();
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30_000);
  }

  private clearPings() {
    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect() {
    const delay = RECONNECT_DELAYS[Math.min(this.attempt, RECONNECT_DELAYS.length - 1)];
    this.attempt++;
    setTimeout(() => this.connect(), delay);
  }
}
