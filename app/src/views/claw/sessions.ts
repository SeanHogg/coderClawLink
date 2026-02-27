import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getTenantToken } from "../../api.js";

const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";

async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTenantToken() ?? ""}`, ...(opts.headers ?? {}) },
  });
  if (res.status === 404 || res.status === 204) return null;
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

interface Session { id: string; name?: string; messageCount?: number; createdAt: string; updatedAt?: string; }

@customElement("ccl-claw-sessions")
export class CclClawSessions extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private sessions: Session[] = [];
  @state() private loading = true;
  @state() private error = "";

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const data = await apiFetch<Session[]>(`/api/claws/${this.clawId}/sessions`);
      this.sessions = data ?? [];
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async remove(s: Session) {
    if (!confirm("Delete this session?")) return;
    try {
      await apiFetch(`/api/claws/${this.clawId}/sessions/${s.id}`, { method: "DELETE" });
      this.sessions = this.sessions.filter(ss => ss.id !== s.id);
    } catch (e) { this.error = (e as Error).message; }
  }

  private fmt(d: string) { return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Sessions</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.sessions.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No sessions</div><div class="empty-state-sub">Sessions appear here once the claw connects and starts chatting</div></div>`
            : this.sessions.map(s => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${s.name ?? s.id}</div>
                    <div style="font-size:11px;color:var(--muted)">${this.fmt(s.createdAt)}${s.messageCount != null ? ` · ${s.messageCount} messages` : ""}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${() => this.remove(s)}>Delete</button>
                </div>
              </div>
            `)}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-sessions": CclClawSessions; } }
