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
 *
 * Chat persistence:
 *   - Complete chat.message events are buffered in-memory (last 100 per session)
 *   - Each complete message is asynchronously persisted to Postgres via the
 *     main API endpoint (fire-and-forget, best-effort)
 *   - New browser clients receive the in-memory history replay immediately
 */

interface BufferedMessage {
  role: string;
  content: string;
  metadata?: string;
  seq: number;
}

export class ClawRelayDO implements DurableObject {
  // Required brand for DurableObjectNamespace<T> generic constraint
  declare readonly "__DURABLE_OBJECT_BRAND": never;

  private upstreamSocket: WebSocket | null = null;
  private clientSockets: Set<WebSocket> = new Set();
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  // --- Chat persistence state (in-memory, lives as long as DO is alive) ---
  private clawId: number | null = null;
  private clawApiKey: string | null = null;
  private currentSessionKey = "default";
  private msgSeq = 0;
  /** Circular buffer of last 100 messages for history replay on reconnect */
  private msgBuffer: BufferedMessage[] = [];
  private readonly MSG_BUFFER_MAX = 100;

  constructor(private state: DurableObjectState, private env: unknown) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const role = url.searchParams.get("role"); // "upstream" | "client"

    if (request.headers.get("Upgrade") !== "websocket") {
      if (request.method === "POST" && url.pathname.endsWith("/dispatch")) {
        let payload: unknown = null;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (this.upstreamSocket?.readyState !== WebSocket.OPEN) {
          return new Response(JSON.stringify({ ok: false, delivered: false, error: "claw_offline" }), {
            status: 409,
            headers: { "Content-Type": "application/json" },
          });
        }

        this.upstreamSocket.send(JSON.stringify(payload));
        return new Response(JSON.stringify({ ok: true, delivered: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Expected WebSocket upgrade", { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();
    server.accept();

    if (role === "upstream") {
      this.extractClawMeta(url);
      this.attachUpstream(server);
    } else {
      this.attachClient(server);
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  // ---------------------------------------------------------------------------
  // Upstream (CoderClaw instance)
  // ---------------------------------------------------------------------------

  /** Extract claw ID and API key from the upstream connect URL. */
  private extractClawMeta(url: URL) {
    const match = url.pathname.match(/\/api\/claws\/(\d+)\//);
    if (match) this.clawId = Number(match[1]);
    const key = url.searchParams.get("key");
    if (key) this.clawApiKey = key;
  }

  private attachUpstream(ws: WebSocket) {
    // Close any existing upstream connection
    if (this.upstreamSocket) {
      try { this.upstreamSocket.close(1001, "replaced"); } catch { /* ignore */ }
    }
    this.upstreamSocket = ws;
    this.schedulePings();

    ws.addEventListener("message", (ev) => {
      const data = ev.data as string;
      // Broadcast every upstream message to all connected clients
      this.broadcast(data);
      // Persist complete messages (not deltas) to Postgres
      this.handleUpstreamMessage(data);
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

    // Replay buffered history so the browser sees recent messages immediately
    if (this.msgBuffer.length > 0) {
      ws.send(JSON.stringify({ type: "chat.history", messages: this.msgBuffer }));
    }

    ws.addEventListener("message", (ev) => {
      const data = ev.data as string;
      // Forward client messages to the upstream claw
      if (this.upstreamSocket?.readyState === WebSocket.OPEN) {
        this.upstreamSocket.send(data);
        // Track the session key so we can associate persisted messages
        this.handleClientMessage(data);
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
  // Chat message handling
  // ---------------------------------------------------------------------------

  /** Track session key from outgoing client messages. */
  private handleClientMessage(data: string) {
    try {
      const msg = JSON.parse(data) as { type?: string; session?: string };
      if (msg.type === "session.new") {
        // New session — reset buffer and seq but keep tracking
        this.msgBuffer = [];
        this.msgSeq = 0;
      }
      if (msg.session) {
        this.currentSessionKey = msg.session;
      }
    } catch { /* ignore non-JSON */ }
  }

  /** Persist complete chat messages from upstream. Deltas are skipped. */
  private handleUpstreamMessage(data: string) {
    try {
      const msg = JSON.parse(data) as { type?: string; role?: string; text?: string };
      if (msg.type !== "chat.message" || !msg.role || typeof msg.text !== "string") return;

      this.msgSeq++;
      const buffered: BufferedMessage = {
        role:    msg.role,
        content: msg.text,
        seq:     this.msgSeq,
      };

      // Add to circular buffer
      this.msgBuffer.push(buffered);
      if (this.msgBuffer.length > this.MSG_BUFFER_MAX) {
        this.msgBuffer.shift();
      }

      // Async persist to Postgres — fire and forget
      void this.persistMessage(buffered);
    } catch { /* ignore non-JSON or non-message events */ }
  }

  /** POST a single message to the main API for Postgres persistence. */
  private async persistMessage(msg: BufferedMessage) {
    if (!this.clawId || !this.clawApiKey) return;

    // Determine the base URL: prefer SELF_URL binding, fall back to production URL
    const env = this.env as Partial<{ SELF_URL: string }>;
    const baseUrl = env.SELF_URL ?? "https://api.coderclaw.ai";

    try {
      await fetch(
        `${baseUrl}/api/claws/${this.clawId}/messages?key=${encodeURIComponent(this.clawApiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionKey: this.currentSessionKey,
            messages: [msg],
          }),
        },
      );
    } catch { /* best-effort; do not crash the relay */ }
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
