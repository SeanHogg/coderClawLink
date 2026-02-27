/**
 * ClawRelayDO — Cloudflare Durable Object that acts as a WebSocket relay
 * between a CoderClaw instance (upstream) and one or more browser clients.
 *
 * One DO instance per registered claw (keyed by claw id).
 *
 * Lifecycle:
 *   1. CoderClaw connects to /api/claws/:id/upstream (claw API key auth)
 *      → stored as upstreamSocket
 *   2. Browser clients connect to /api/claws/:id/ws (tenant JWT auth)
 *      → added to clientSockets set
 *   3. Messages from CoderClaw → broadcast to all clientSockets
 *   4. Messages from any client → forwarded to upstreamSocket
 *   5. When CoderClaw disconnects → send { type:"claw_offline" } to clients
 */
export class ClawRelayDO implements DurableObject {
  private upstreamSocket: WebSocket | null = null;
  private clientSockets: Set<WebSocket> = new Set();
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private state: DurableObjectState, private env: unknown) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const role = url.searchParams.get("role"); // "upstream" | "client"

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket upgrade", { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();
    server.accept();

    if (role === "upstream") {
      this.attachUpstream(server);
    } else {
      this.attachClient(server);
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  // ---------------------------------------------------------------------------
  // Upstream (CoderClaw instance)
  // ---------------------------------------------------------------------------

  private attachUpstream(ws: WebSocket) {
    // Close any existing upstream connection
    if (this.upstreamSocket) {
      try { this.upstreamSocket.close(1001, "replaced"); } catch { /* ignore */ }
    }
    this.upstreamSocket = ws;
    this.schedulePings();

    ws.addEventListener("message", (ev) => {
      // Broadcast every upstream message to all connected clients
      this.broadcast(ev.data as string);
    });

    ws.addEventListener("close", () => {
      if (this.upstreamSocket === ws) {
        this.upstreamSocket = null;
        this.clearPings();
        // Notify all clients that the claw went offline
        this.broadcast(JSON.stringify({ type: "claw_offline" }));
      }
    });

    ws.addEventListener("error", () => { /* close follows */ });

    // Tell the claw it is connected
    ws.send(JSON.stringify({ type: "relay_connected" }));

    // Notify any waiting clients that the claw is now online
    this.broadcast(JSON.stringify({ type: "claw_online" }));
  }

  // ---------------------------------------------------------------------------
  // Clients (browser sessions)
  // ---------------------------------------------------------------------------

  private attachClient(ws: WebSocket) {
    this.clientSockets.add(ws);

    // Immediately tell the client whether the claw is connected
    if (this.upstreamSocket === null) {
      ws.send(JSON.stringify({ type: "claw_offline" }));
    } else {
      ws.send(JSON.stringify({ type: "claw_online" }));
    }

    ws.addEventListener("message", (ev) => {
      // Forward client messages to the upstream claw
      if (this.upstreamSocket?.readyState === WebSocket.OPEN) {
        this.upstreamSocket.send(ev.data as string);
      } else {
        ws.send(JSON.stringify({ type: "claw_offline" }));
      }
    });

    ws.addEventListener("close", () => {
      this.clientSockets.delete(ws);
    });

    ws.addEventListener("error", () => { /* close follows */ });
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private broadcast(data: string) {
    const dead: WebSocket[] = [];
    for (const ws of this.clientSockets) {
      try {
        ws.send(data);
      } catch {
        dead.push(ws);
      }
    }
    for (const ws of dead) this.clientSockets.delete(ws);
  }

  private schedulePings() {
    this.clearPings();
    this.pingInterval = setInterval(() => {
      if (this.upstreamSocket?.readyState === WebSocket.OPEN) {
        this.upstreamSocket.send(JSON.stringify({ type: "ping" }));
      }
    }, 30_000);
  }

  private clearPings() {
    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
