import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClawGateway, type GatewayEvent } from "../../gateway.js";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  thinking?: string;
  streaming?: boolean;
}

interface ToolCall {
  id: string;
  name: string;
  input?: string;
  result?: string;
  expanded: boolean;
}

@customElement("ccl-claw-chat")
export class CclClawChat extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private messages: ChatMessage[] = [];
  @state() private tools: ToolCall[] = [];
  @state() private input = "";
  @state() private connState: "connecting" | "connected" | "offline" | "disconnected" = "connecting";
  @state() private session = "default";
  @state() private streaming = false;

  private gw: ClawGateway | null = null;
  private msgEnd: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    if (this.wsUrl) this.connect();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.gw?.destroy();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("wsUrl") && this.wsUrl) {
      this.gw?.destroy();
      this.connect();
    }
    this.scrollToBottom();
  }

  private connect() {
    this.connState = "connecting";
    this.gw = new ClawGateway({
      url: this.wsUrl,
      onEvent: (ev: GatewayEvent) => this.handleGwEvent(ev),
    });
  }

  private handleGwEvent(ev: GatewayEvent) {
    if (ev.type === "connected")    { this.connState = "connected"; return; }
    if (ev.type === "claw_offline") { this.connState = "offline"; return; }
    if (ev.type === "disconnected") { this.connState = "disconnected"; return; }
    if (ev.type !== "message") return;

    const msg = ev.data as { type: string; role?: string; text?: string; delta?: string; toolName?: string; toolInput?: string; toolResult?: string; toolCallId?: string };

    switch (msg.type) {
      case "chat.message": {
        if (msg.role === "user") {
          this.messages = [...this.messages, { id: crypto.randomUUID(), role: "user", text: msg.text ?? "" }];
        } else {
          const last = this.messages.at(-1);
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
        this.tools = [...this.tools, { id: msg.toolCallId ?? crypto.randomUUID(), name: msg.toolName ?? "tool", input: msg.toolInput, expanded: false }];
        break;
      }
      case "tool.result": {
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
    this.gw?.send({ type: "chat", message: text, session: this.session });
    this.input = "";
  }

  private abort() {
    this.gw?.send({ type: "chat.abort" });
    this.streaming = false;
  }

  private newChat() {
    this.messages = [];
    this.tools = [];
    this.streaming = false;
    this.gw?.send({ type: "session.new" });
  }

  private scrollToBottom() {
    this.msgEnd?.scrollIntoView({ behavior: "smooth" });
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  private connDot() {
    const map = { connected: "dot-green", connecting: "dot-yellow", offline: "dot-red", disconnected: "dot-gray" };
    return html`<span class="dot ${map[this.connState]}"></span> ${this.connState}`;
  }

  override render() {
    return html`
      <div class="chat-shell" style="height:100%">
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border);flex-shrink:0">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)">${this.connDot()}</div>
          <div style="flex:1"></div>
          <input class="input" style="width:140px;height:28px;padding:3px 8px;font-size:12px"
            placeholder="session name" .value=${this.session}
            @input=${(e: InputEvent) => { this.session = (e.target as HTMLInputElement).value; }}>
          <button class="btn btn-ghost btn-sm" @click=${this.newChat}>New chat</button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px">
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
                ${m.text}${m.streaming ? html`<span class="cursor-blink"></span>` : ""}
              </div>
              <div class="msg-meta">${m.role}</div>
            </div>
          `)}

          ${this.tools.length > 0 ? html`
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

          <div style="height:1px" .ref=${(el: HTMLElement | null) => { this.msgEnd = el; }}></div>
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
            @keydown=${this.onKeydown}
          ></textarea>
          ${this.streaming
            ? html`<button class="btn btn-danger" @click=${this.abort}>Stop</button>`
            : html`<button class="btn btn-primary" @click=${this.send} ?disabled=${!this.input.trim() || this.connState !== "connected"}>Send</button>`}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-chat": CclClawChat; } }
