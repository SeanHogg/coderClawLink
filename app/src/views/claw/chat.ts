import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";
import { chats as chatsApi, claws as clawsApi } from "../../api.js";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  thinking?: string;
  streaming?: boolean;
  optimistic?: boolean;
}

interface ToolCall {
  id: string;
  name: string;
  input?: string;
  result?: string;
  expanded: boolean;
}

interface SessionRow {
  key: string;
  label?: string;
  derivedTitle?: string;
  updatedAt?: number | null;
  kind?: string;
}

@customElement("ccl-claw-chat")
export class CclClawChat extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";
  @property() initialSessionKey = "";

  @state() private messages: ChatMessage[] = [];
  @state() private tools: ToolCall[] = [];
  @state() private input = "";
  @state() private connState: "connecting" | "connected" | "offline" | "disconnected" = "connecting";
  @state() private session = "";
  @state() private sessions: SessionRow[] = [];
  @state() private sessionsLoading = false;
  @state() private sessionBusy = false;
  @state() private showThinking = false;
  @state() private streaming = false;

  private gw: ClawGateway | null = null;
  private msgEndRef: Ref<HTMLDivElement> = createRef();
  private messagesRef: Ref<HTMLDivElement> = createRef();
  private sessionRefreshTimer: ReturnType<typeof setTimeout> | null = null;
  private historySyncTimer: ReturnType<typeof setTimeout> | null = null;
  private initialHistoryRequested = false;
  private historyLoading = false;
  private historyLoadedForSession = "";
  private pendingRpc = new Map<string, {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    timeout: ReturnType<typeof setTimeout>;
  }>();

  override connectedCallback() {
    super.connectedCallback();
    try {
      this.showThinking = localStorage.getItem("ccl-chat-show-thinking") === "1";
    } catch {
      this.showThinking = false;
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.sessionRefreshTimer !== null) {
      clearTimeout(this.sessionRefreshTimer);
      this.sessionRefreshTimer = null;
    }
    if (this.historySyncTimer !== null) {
      clearTimeout(this.historySyncTimer);
      this.historySyncTimer = null;
    }
    this.rejectPendingRpc("chat closed");
    this.gw?.destroy();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("wsUrl") && this.wsUrl) {
      this.gw?.destroy();
      this.connect();
    }
    if (changed.has("initialSessionKey") && this.initialSessionKey.trim().length > 0) {
      const next = this.initialSessionKey.trim();
      if (next !== this.session) {
        this.session = next;
        this.messages = [];
        this.tools = [];
        this.streaming = false;
        this.historyLoadedForSession = "";
        this.initialHistoryRequested = true;
        void this.loadSessionHistory();
      }
    }
    this.scrollToBottom();
  }

  private connect() {
    console.debug("[ccl-chat] ui.connect", {
      clawId: this.clawId,
      wsUrl: this.wsUrl,
      session: this.session,
    });
    this.connState = "connecting";
    this.messages = [];
    this.tools = [];
    this.sessions = [];
    this.session = "";
    this.initialHistoryRequested = false;
    this.historyLoading = false;
    this.historyLoadedForSession = "";
    this.gw = new ClawGateway({
      url: this.wsUrl,
      onEvent: (ev: GatewayEvent) => {
        console.debug("[ccl-chat] ui.gateway.event", ev);
        this.handleGwEvent(ev);
        // Load Postgres history once we know the relay is reachable
        if (ev.type === "connected" && !this.initialHistoryRequested) {
          this.initialHistoryRequested = true;
          void this.loadSessionHistory();
        }
      },
    });
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
    if (!cleaned) {
      return session.key;
    }
    return `${session.key} — ${cleaned}`;
  }

  private scheduleSessionRefresh() {
    if (this.sessionRefreshTimer !== null) {
      return;
    }
    this.sessionRefreshTimer = setTimeout(() => {
      this.sessionRefreshTimer = null;
      void this.refreshSessions();
    }, 1200);
  }

  private scheduleHistorySync() {
    if (this.historySyncTimer !== null) {
      return;
    }
    this.historySyncTimer = setTimeout(() => {
      this.historySyncTimer = null;
      void this.loadSessionHistory(true);
    }, 1500);
  }

  private normalizeSessionKey(key: string | null | undefined): string {
    const raw = (key ?? "").trim();
    if (!raw) return "main";
    if (raw === "default") return "main";
    if (raw === "agent:main:main") return "main";
    return raw;
  }

  private sessionMatches(a: string | null | undefined, b: string | null | undefined): boolean {
    return this.normalizeSessionKey(a) === this.normalizeSessionKey(b);
  }

  private renderMarkdown(text: string) {
    const raw = marked.parse(text, { gfm: true, breaks: true });
    const htmlString = typeof raw === "string" ? raw : "";
    const clean = DOMPurify.sanitize(htmlString);
    return html`<div class="md-content">${unsafeHTML(clean)}</div>`;
  }

  private pickInitialSession(rows: SessionRow[]): string {
    const preferred = rows.find((row) => row.key === "main")
      ?? rows.find((row) => row.key === "agent:main:main")
      ?? rows[0];
    return preferred?.key ?? "main";
  }

  private async refreshSessions() {
    if (!this.gw || this.connState !== "connected") {
      if (!this.session) this.session = "main";
      return;
    }
    this.sessionsLoading = true;
    try {
      const result = await this.callRpc("sessions.list", {
        includeGlobal: false,
        includeUnknown: false,
        includeDerivedTitles: true,
        limit: 200,
      }) as { sessions?: SessionRow[] };
      const rows = Array.isArray(result?.sessions) ? result.sessions : [];
      this.sessions = rows;

      if (!this.session || !rows.some((row) => this.sessionMatches(row.key, this.session))) {
        this.session = this.pickInitialSession(rows);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message !== "chat closed" && message !== "gateway disconnected" && message !== "claw offline") {
        console.warn("[ccl-chat] ui.sessions.error", err);
      }
      if (!this.session) this.session = "main";
    } finally {
      this.sessionsLoading = false;
    }
  }

  private makeNewSessionKey(): string {
    const selected = this.session.trim();
    const parsed = selected.match(/^agent:([^:]+):/);
    const agentId = parsed?.[1] || "main";
    return `agent:${agentId}:${Date.now().toString(36)}`;
  }

  private handleGwEvent(ev: GatewayEvent) {
    if (ev.type === "connected")    { this.connState = "connected"; return; }
    if (ev.type === "claw_online")  { this.connState = "connected"; return; }
    if (ev.type === "claw_offline") { this.connState = "offline"; this.rejectPendingRpc("claw offline"); return; }
    if (ev.type === "disconnected") { this.connState = "disconnected"; this.rejectPendingRpc("gateway disconnected"); return; }
    if (ev.type !== "message") return;

    const msg = ev.data as {
      type: string;
      role?: string;
      text?: string;
      delta?: string;
      toolName?: string;
      toolInput?: string;
      toolResult?: string;
      toolCallId?: string;
      ephemeral?: boolean;
      session?: string;
      requestId?: string;
      result?: unknown;
      error?: string;
      messages?: Array<{ role: string; content: string; seq: number }>;
    };

    if ((msg.type === "rpc.result" || msg.type === "rpc.error") && msg.requestId) {
      const pending = this.pendingRpc.get(msg.requestId);
      if (!pending) return;
      this.pendingRpc.delete(msg.requestId);
      clearTimeout(pending.timeout);
      if (msg.type === "rpc.error") {
        pending.reject(new Error(msg.error ?? "RPC failed"));
      } else {
        pending.resolve(msg.result);
      }
      return;
    }

    switch (msg.type) {
      case "chat.history": {
        // Replay buffered history from the relay DO on (re)connect
        if (Array.isArray(msg.messages) && this.messages.length === 0) {
          this.messages = msg.messages.map(m => ({
            id: crypto.randomUUID(),
            role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
            text: m.content,
          }));
        }
        return;
      }
      case "chat.message": {
        this.scheduleSessionRefresh();
        this.scheduleHistorySync();
        if (msg.session && this.session && !this.sessionMatches(msg.session, this.session)) {
          return;
        }
        if (msg.role === "user") {
          const nextText = msg.text ?? "";
          const last = this.messages.at(-1);
          if (last?.role === "user" && last.optimistic && last.text === nextText) {
            this.messages = [...this.messages.slice(0, -1), { ...last, optimistic: false }];
          } else {
            this.messages = [...this.messages, { id: crypto.randomUUID(), role: "user", text: nextText, optimistic: msg.ephemeral === true }];
          }
        } else {
          const last = this.messages.at(-1);
          if (last?.role === "assistant" && !last.streaming && (last.text ?? "") === (msg.text ?? "")) {
            this.streaming = false;
            break;
          }
          if (last?.role === "assistant" && last.streaming) {
            this.messages = [...this.messages.slice(0, -1), { ...last, text: msg.text ?? "", streaming: false }];
          } else {
            this.messages = [...this.messages, { id: crypto.randomUUID(), role: "assistant", text: msg.text ?? "" }];
          }
          this.streaming = false;
        }
        break;
      }
      case "chat.delta": {
        this.scheduleSessionRefresh();
        this.scheduleHistorySync();
        if (msg.session && this.session && !this.sessionMatches(msg.session, this.session)) {
          return;
        }
        const last = this.messages.at(-1);
        if (last?.role === "assistant" && last.streaming) {
          this.messages = [...this.messages.slice(0, -1), { ...last, text: last.text + (msg.delta ?? "") }];
        } else {
          this.messages = [...this.messages, { id: crypto.randomUUID(), role: "assistant", text: msg.delta ?? "", streaming: true }];
          this.streaming = true;
        }
        break;
      }
      case "tool.start": {
        this.scheduleSessionRefresh();
        if (msg.session && this.session && !this.sessionMatches(msg.session, this.session)) {
          return;
        }
        this.tools = [...this.tools, { id: msg.toolCallId ?? crypto.randomUUID(), name: msg.toolName ?? "tool", input: msg.toolInput, expanded: false }];
        break;
      }
      case "tool.result": {
        this.scheduleSessionRefresh();
        this.scheduleHistorySync();
        if (msg.session && this.session && !this.sessionMatches(msg.session, this.session)) {
          return;
        }
        this.tools = this.tools.map(t => t.id === msg.toolCallId ? { ...t, result: msg.toolResult } : t);
        break;
      }
      case "chat.abort":
        this.streaming = false;
        break;
    }
  }

  private send() {
    const text = this.input.trim();
    if (!text || this.connState !== "connected") return;
    const outgoingSession = this.normalizeSessionKey(this.session);
    console.debug("[ccl-chat] ui.send", {
      session: outgoingSession,
      textLength: text.length,
      connState: this.connState,
      readyState: this.gw?.readyState,
    });
    const delivered = this.gw?.send({ type: "chat", message: text, session: outgoingSession }) ?? false;
    if (!delivered) {
      console.warn("[ccl-chat] ui.send.not-delivered", {
        connState: this.connState,
        readyState: this.gw?.readyState,
      });
      this.messages = [
        ...this.messages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Message was not sent because the relay connection is not ready. Please wait for reconnect and try again.",
        },
      ];
      this.connState = "disconnected";
      return;
    }
    this.messages = [
      ...this.messages,
      {
        id: crypto.randomUUID(),
        role: "user",
        text,
        optimistic: true,
      },
    ];
    this.input = "";
  }

  private abort() {
    console.debug("[ccl-chat] ui.abort", { session: this.session });
    this.gw?.send({ type: "chat.abort" });
    this.streaming = false;
  }

  private newChat() {
    console.debug("[ccl-chat] ui.newChat", { previousSession: this.session });
    const next = this.makeNewSessionKey();
    this.session = next;
    this.messages = [];
    this.tools = [];
    this.streaming = false;
    this.historyLoadedForSession = "";
    this.initialHistoryRequested = true;
    if (!this.sessions.some((s) => s.key === next)) {
      this.sessions = [{ key: next, updatedAt: Date.now(), kind: "direct" }, ...this.sessions];
    }
  }

  private async resetSession() {
    if (!this.session) return;
    this.sessionBusy = true;
    try {
      await this.callRpc("sessions.reset", { key: this.session, reason: "new" });
      this.messages = [];
      this.tools = [];
      this.streaming = false;
      this.historyLoadedForSession = "";
      this.initialHistoryRequested = true;
      await this.refreshSessions();
    } catch (err) {
      console.warn("[ccl-chat] ui.session.reset.error", err);
    } finally {
      this.sessionBusy = false;
    }
  }

  private async deleteSession() {
    if (!this.session) return;
    if (!confirm(`Delete session ${this.session}?`)) return;
    this.sessionBusy = true;
    try {
      await this.callRpc("sessions.delete", { key: this.session });
      this.messages = [];
      this.tools = [];
      this.streaming = false;
      this.historyLoadedForSession = "";
      this.initialHistoryRequested = true;
      await this.refreshSessions();
      if (!this.session) {
        this.session = this.pickInitialSession(this.sessions);
      }
      await this.loadSessionHistory();
    } catch (err) {
      console.warn("[ccl-chat] ui.session.delete.error", err);
    } finally {
      this.sessionBusy = false;
    }
  }

  private async loadSessionHistory(force = false) {
    if (this.historyLoading) return;
    if (!this.clawId) return;
    if (!this.session) {
      await this.refreshSessions();
    }
    if (!this.session) return;
    if (!force && this.historyLoadedForSession === this.session && this.messages.length > 0) {
      return;
    }
    this.historyLoading = true;
    console.debug("[ccl-chat] ui.history.load", {
      clawId: this.clawId,
      session: this.session,
    });
    try {
      await this.refreshSessions();
      const msgs = await clawsApi.sessionMessages(this.clawId, this.session, 50);
      console.debug("[ccl-chat] ui.history.loaded", {
        session: this.session,
        count: msgs.length,
      });
      this.historyLoadedForSession = this.session;
      if (msgs.length > 0 && !this.streaming) {
        this.messages = msgs.map(m => ({
          id: crypto.randomUUID(),
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          text: m.content,
        }));
        if (!force) {
          return;
        }
      }

      if (msgs.length === 0 && this.messages.length === 0 && this.session === "main") {
        const clawNum = Number(this.clawId);
        if (Number.isFinite(clawNum)) {
          const sessions = await chatsApi.list({ limit: 50 });
          const latest = sessions
            .filter(s => s.clawId === clawNum)
            .sort((a, b) => Date.parse(b.lastMsgAt ?? b.startedAt) - Date.parse(a.lastMsgAt ?? a.startedAt))[0];

          if (latest && latest.sessionKey && latest.sessionKey !== this.session) {
            console.debug("[ccl-chat] ui.history.fallback-session", {
              from: this.session,
              to: latest.sessionKey,
            });
            this.session = latest.sessionKey;
            const fallbackMsgs = await clawsApi.sessionMessages(this.clawId, this.session, 50);
            if (fallbackMsgs.length > 0) {
              this.messages = fallbackMsgs.map(m => ({
                id: crypto.randomUUID(),
                role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
                text: m.content,
              }));
            }
          }
        }
      }
      if (msgs.length === 0 && this.messages.length === 0 && this.session === "agent:main:main") {
        const fallbackMsgs = await clawsApi.sessionMessages(this.clawId, "main", 50);
        if (fallbackMsgs.length > 0) {
          this.session = "main";
          this.historyLoadedForSession = this.session;
          this.messages = fallbackMsgs.map(m => ({
            id: crypto.randomUUID(),
            role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
            text: m.content,
          }));
        }
      }
    } catch (err) {
      console.warn("[ccl-chat] ui.history.error", err);
      /* best-effort */
    } finally {
      this.historyLoading = false;
      this.initialHistoryRequested = true;
    }
  }

  private scrollToBottom() {
    const messagesEl = this.messagesRef.value;
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return;
    }
    this.msgEndRef.value?.scrollIntoView({ behavior: "auto", block: "end" });
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  private connDot() {
    const map = { connected: "dot-green", connecting: "dot-yellow", offline: "dot-red", disconnected: "dot-gray" };
    return html`<span class="dot ${map[this.connState]}"></span> ${this.connState}`;
  }

  private toggleThinking() {
    this.showThinking = !this.showThinking;
    try {
      localStorage.setItem("ccl-chat-show-thinking", this.showThinking ? "1" : "0");
    } catch {
      // ignore storage failures
    }
  }

  override render() {
    return html`
      <div class="chat-shell" style="height:100%">
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border);flex-shrink:0">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)">${this.connDot()}</div>
          <span style="font-size:11px;color:var(--muted);font-family:var(--mono);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title=${this.session || ""}>
            ${this.session || "(no session)"}
          </span>
          <div style="flex:1"></div>
          <select
            class="select"
            style="width:360px;height:28px;padding:3px 8px;font-size:12px"
            .value=${this.session}
            @change=${(e: Event) => {
              this.session = (e.target as HTMLSelectElement).value;
              this.messages = [];
              this.tools = [];
              this.streaming = false;
              this.historyLoadedForSession = "";
              this.initialHistoryRequested = true;
              void this.loadSessionHistory();
            }}
          >
            ${this.sessions.length === 0
              ? html`<option value="${this.session || "main"}">${this.session || "main"}</option>`
              : this.sessions.map((s) => html`
                  <option value=${s.key} title=${this.sessionLabel(s)}>${this.sessionLabel(s)}</option>
                `)}
          </select>
          <button class="btn btn-ghost btn-sm" type="button" @click=${() => this.refreshSessions()} ?disabled=${this.sessionsLoading}>
            ${this.sessionsLoading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            class="btn btn-ghost btn-sm ${this.showThinking ? "active" : ""}"
            type="button"
            aria-pressed=${this.showThinking}
            title="Toggle assistant thinking/working output"
            @click=${() => this.toggleThinking()}
          >
            🧠
          </button>
          <button class="btn btn-ghost btn-sm" type="button" @click=${() => this.newChat()}>New chat</button>
          <button class="btn btn-ghost btn-sm" type="button" @click=${() => this.resetSession()} ?disabled=${this.sessionBusy || !this.session}>Reset</button>
          <button class="btn btn-danger btn-sm" type="button" @click=${() => this.deleteSession()} ?disabled=${this.sessionBusy || !this.session}>Delete</button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px" ${ref(this.messagesRef)}>
          ${this.connState === "offline" ? html`
            <div class="empty-state">
              <div class="empty-state-icon">🔌</div>
              <div class="empty-state-title">Claw is offline</div>
              <div class="empty-state-sub">Waiting for the CoderClaw instance to connect</div>
            </div>` : ""}

          ${this.messages.length === 0 && this.connState !== "offline" ? html`
            <div class="empty-state" style="margin-top:32px">
              <div class="empty-state-icon">💬</div>
              <div class="empty-state-title">Start a conversation</div>
              <div class="empty-state-sub">Send a message to the claw</div>
            </div>` : ""}

          ${this.messages.map(m => html`
            <div class="msg ${m.role === "user" ? "msg-user" : ""}">
              <div class="msg-bubble ${m.role === "user" ? "msg-bubble-user" : "msg-bubble-assistant"}">
                ${this.renderMarkdown(m.text)}${m.streaming ? html`<span class="cursor-blink"></span>` : ""}
              </div>
              <div class="msg-meta">${m.role}</div>
            </div>
          `)}

          ${this.showThinking && this.tools.length > 0 ? html`
            <div style="display:flex;flex-direction:column;gap:6px">
              ${this.tools.map(t => html`
                <div class="card" style="font-size:12px">
                  <div style="display:flex;align-items:center;gap:8px;cursor:pointer"
                    @click=${() => { this.tools = this.tools.map(tt => tt.id === t.id ? { ...tt, expanded: !tt.expanded } : tt); }}>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="${t.expanded ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}"/></svg>
                    <span style="font-family:var(--mono);color:var(--accent)">${t.name}</span>
                    ${t.result ? html`<span class="badge badge-green" style="margin-left:auto">done</span>` : html`<span class="badge badge-yellow" style="margin-left:auto">running</span>`}
                  </div>
                  ${t.expanded && t.input ? html`<pre class="log-wrap" style="margin-top:8px;font-size:11px;max-height:100px;overflow:auto">${t.input}</pre>` : ""}
                  ${t.expanded && t.result ? html`<pre class="log-wrap" style="margin-top:6px;font-size:11px;max-height:100px;overflow:auto;border-color:var(--ok)">${t.result}</pre>` : ""}
                </div>
              `)}
            </div>` : ""}

          <div style="height:1px" ${ref(this.msgEndRef)}></div>
        </div>

        <!-- Input -->
        <div class="chat-input-row" style="flex-shrink:0">
          <textarea
            class="chat-textarea"
            placeholder="${this.connState === "connected" ? "Message the claw…" : "Waiting for connection…"}"
            rows="2"
            .value=${this.input}
            ?disabled=${this.connState !== "connected"}
            @input=${(e: InputEvent) => { this.input = (e.target as HTMLTextAreaElement).value; }}
            @keydown=${(e: KeyboardEvent) => this.onKeydown(e)}
          ></textarea>
          ${this.streaming
            ? html`<button class="btn btn-danger" type="button" @click=${() => this.abort()}>Stop</button>`
            : html`<button class="btn btn-primary" type="button" @click=${() => this.send()} ?disabled=${!this.input.trim() || this.connState !== "connected" || (this.gw?.readyState ?? WebSocket.CLOSED) !== WebSocket.OPEN}>Send</button>`}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-chat": CclClawChat; } }
