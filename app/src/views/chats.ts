/**
 * Tenant-level Chats history view.
 * Lists all chat sessions across all claws for this tenant.
 * Clicking a session loads its full message thread on the right.
 */
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { chats, claws, type ChatSession } from "../api.js";
import "./claw/chat.js";

@customElement("ccl-chats")
export class CclChatsView extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private sessions: ChatSession[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private selectedSession: ChatSession | null = null;

  override connectedCallback() {
    super.connectedCallback();
    void this.loadSessions();
  }

  private async loadSessions() {
    this.loading = true;
    this.error = "";
    try {
      this.sessions = await chats.list({ limit: 100 });
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load chat sessions";
    } finally {
      this.loading = false;
    }
  }

  private async selectSession(s: ChatSession) {
    this.selectedSession = s;
  }

  private formatTime(ts: string | null | undefined) {
    if (!ts) return "—";
    return new Date(ts).toLocaleString();
  }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:16px;min-height:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:18px;font-weight:600;color:var(--text-strong)">Chats</div>
            <div style="font-size:13px;color:var(--muted);margin-top:2px">All chat sessions across claws in this workspace</div>
          </div>
          <button class="btn btn-secondary btn-sm" @click=${() => void this.loadSessions()} ?disabled=${this.loading}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        ${this.loading
          ? html`<div class="empty-state">Loading…</div>`
          : this.sessions.length === 0
            ? html`
                <div class="empty-state">
                  <div class="empty-state-title">No chat sessions yet</div>
                  <div class="empty-state-sub">Chat history will appear here once claws start receiving messages</div>
                </div>`
            : html`
                <div style="display:grid;grid-template-columns:minmax(260px,360px) 1fr;gap:12px;height:clamp(420px,calc(100dvh - 250px),760px);overflow:hidden;">
                  <!-- Session list -->
                  <div class="card" style="overflow:auto;min-height:0;">
                    <div class="card-title" style="margin-bottom:8px;">Sessions</div>
                    <div style="display:grid;gap:4px;">
                      ${this.sessions.map(s => html`
                        <button
                          class="btn btn-ghost btn-sm"
                          style="justify-content:flex-start;flex-direction:column;align-items:flex-start;padding:8px 10px;border:1px solid ${this.selectedSession?.id === s.id ? "var(--accent)" : "var(--border)"};"
                          @click=${() => void this.selectSession(s)}
                        >
                          <div style="display:flex;width:100%;align-items:center;gap:6px;">
                            <span style="font-family:var(--mono);font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.sessionKey}</span>
                            <span class="badge badge-gray" style="font-size:10px;flex-shrink:0">${s.msgCount} msgs</span>
                          </div>
                          <div style="display:flex;width:100%;gap:4px;margin-top:3px;font-size:11px;color:var(--muted);">
                            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.clawName ?? `claw ${s.clawId}`}</span>
                            <span>${s.lastMsgAt ? new Date(s.lastMsgAt).toLocaleString() : "—"}</span>
                          </div>
                        </button>
                      `)}
                    </div>
                  </div>

                  <!-- Message thread -->
                  <div class="card" style="overflow:hidden;display:flex;flex-direction:column;min-height:0;">
                    ${this.selectedSession
                      ? html`
                          <div class="card-title" style="margin-bottom:8px;flex-shrink:0;">
                            <span style="font-family:var(--mono)">${this.selectedSession.sessionKey}</span>
                            <span style="font-size:11px;color:var(--muted);font-weight:400;margin-left:8px">${this.selectedSession.clawName ?? ""} · started ${this.formatTime(this.selectedSession.startedAt)}</span>
                          </div>
                          <div style="flex:1;min-height:0;border:1px solid var(--border);border-radius:8px;overflow:hidden">
                            <ccl-claw-chat
                              .clawId=${String(this.selectedSession.clawId)}
                              .wsUrl=${claws.wsUrl(String(this.selectedSession.clawId))}
                              .initialSessionKey=${this.selectedSession.sessionKey}
                            ></ccl-claw-chat>
                          </div>
                        `
                      : html`<div style="font-size:13px;color:var(--muted)">Select a session to view its messages.</div>`}
                  </div>
                </div>
              `}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-chats": CclChatsView; } }
