import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getTenantToken } from "../../api.js";

const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";

async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTenantToken() ?? ""}`, ...(opts.headers ?? {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  return res.json();
}

interface Agent {
  id: string;
  name: string;
  type: "claude" | "openai" | "ollama" | "http";
  endpoint?: string;
  isActive: boolean;
  createdAt: string;
}

const AGENT_TYPES = ["claude", "openai", "ollama", "http"] as const;

@customElement("ccl-claw-agents")
export class CclClawAgents extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private agents: Agent[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private form = { name: "", type: "claude", endpoint: "", apiKey: "" };
  @state() private saving = false;

  override connectedCallback() { super.connectedCallback(); this.load(); }

  private async load() {
    this.loading = true;
    try { this.agents = await apiFetch("/api/agents"); }
    catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async toggleActive(a: Agent) {
    try {
      await apiFetch(`/api/agents/${a.id}`, { method: "PATCH", body: JSON.stringify({ isActive: !a.isActive }) });
      this.agents = this.agents.map(ag => ag.id === a.id ? { ...ag, isActive: !ag.isActive } : ag);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async remove(a: Agent) {
    if (!confirm(`Delete agent "${a.name}"?`)) return;
    try {
      await apiFetch(`/api/agents/${a.id}`, { method: "DELETE" });
      this.agents = this.agents.filter(ag => ag.id !== a.id);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      const created = await apiFetch<Agent>("/api/agents", { method: "POST", body: JSON.stringify(this.form) });
      this.agents = [created, ...this.agents];
      this.showModal = false;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.saving = false; }
  }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Agents</div>
          <button class="btn btn-primary btn-sm" @click=${() => { this.showModal = true; }}>Add agent</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.agents.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No agents</div><div class="empty-state-sub">Add an AI agent to this claw</div></div>`
            : this.agents.map(a => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${a.name}</div>
                    <div style="font-size:12px;color:var(--muted)">${a.type}${a.endpoint ? ` · ${a.endpoint}` : ""}</div>
                  </div>
                  <span class="badge ${a.isActive ? "badge-green" : "badge-gray"}">${a.isActive ? "active" : "inactive"}</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${() => this.toggleActive(a)}>
                    ${a.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button class="btn btn-danger btn-sm" @click=${() => this.remove(a)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal ? html`
          <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
            <div class="modal">
              <div class="modal-title">Add agent</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${(e: InputEvent) => { this.form = { ...this.form, name: (e.target as HTMLInputElement).value }; }}></div>
                <div class="field"><label class="label">Type</label>
                  <select class="select" @change=${(e: Event) => { this.form = { ...this.form, type: (e.target as HTMLSelectElement).value }; }}>
                    ${AGENT_TYPES.map(t => html`<option value=${t}>${t}</option>`)}
                  </select></div>
                <div class="field"><label class="label">Endpoint <span class="label-hint">(optional)</span></label>
                  <input class="input" placeholder="https://…" .value=${this.form.endpoint} @input=${(e: InputEvent) => { this.form = { ...this.form, endpoint: (e.target as HTMLInputElement).value }; }}></div>
                <div class="field"><label class="label">API Key <span class="label-hint">(optional)</span></label>
                  <input class="input" type="password" .value=${this.form.apiKey} @input=${(e: InputEvent) => { this.form = { ...this.form, apiKey: (e.target as HTMLInputElement).value }; }}></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving ? "Saving…" : "Add agent"}</button>
                </div>
              </form>
            </div>
          </div>` : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-agents": CclClawAgents; } }
