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

interface Node { id: string; name?: string; capabilities?: string[]; connectedAt?: string; lastSeenAt?: string; status: "connected" | "disconnected"; }

@customElement("ccl-claw-nodes")
export class CclClawNodes extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private nodes: Node[] = [];
  @state() private loading = true;
  @state() private error = "";

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const data = await apiFetch<Node[]>(`/api/claws/${this.clawId}/nodes`);
      this.nodes = data ?? [];
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async unpair(node: Node) {
    if (!confirm(`Unpair node "${node.name ?? node.id}"?`)) return;
    try {
      await apiFetch(`/api/claws/${this.clawId}/nodes/${node.id}`, { method: "DELETE" });
      this.nodes = this.nodes.filter(n => n.id !== node.id);
    } catch (e) { this.error = (e as Error).message; }
  }

  private fmt(d?: string) { return d ? new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"; }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Paired Nodes</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.nodes.length === 0
            ? html`<div class="empty-state"><div class="empty-state-icon">🖥️</div><div class="empty-state-title">No nodes paired</div><div class="empty-state-sub">Pair a device to extend this claw's capabilities</div></div>`
            : this.nodes.map(n => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${n.name ?? n.id}</div>
                    <div style="font-size:11px;color:var(--muted)">Last seen: ${this.fmt(n.lastSeenAt)}</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span class="dot ${n.status === "connected" ? "dot-green" : "dot-gray"}"></span>
                    <span style="font-size:12px;color:var(--muted)">${n.status}</span>
                  </div>
                </div>
                ${n.capabilities?.length ? html`
                  <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                    ${n.capabilities.map(c => html`<span class="badge badge-gray">${c}</span>`)}
                  </div>` : ""}
                <button class="btn btn-danger btn-sm" @click=${() => this.unpair(n)}>Unpair</button>
              </div>
            `)}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-nodes": CclClawNodes; } }
