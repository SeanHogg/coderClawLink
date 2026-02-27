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

type ChannelType = "discord" | "slack" | "telegram" | "whatsapp" | "signal" | "googlechat" | "nostr";

interface Channel {
  id: string;
  type: ChannelType;
  name?: string;
  status: "connected" | "error" | "stopped" | "pending";
  enabled: boolean;
  config?: Record<string, string>;
}

const CHANNEL_TYPES: ChannelType[] = ["discord", "slack", "telegram", "whatsapp", "signal", "googlechat", "nostr"];

const CHANNEL_FIELDS: Record<ChannelType, Array<{ key: string; label: string; type?: string }>> = {
  discord:    [{ key: "token", label: "Bot Token", type: "password" }, { key: "guildId", label: "Guild ID" }],
  slack:      [{ key: "botToken", label: "Bot Token", type: "password" }, { key: "appToken", label: "App Token", type: "password" }],
  telegram:   [{ key: "token", label: "Bot Token", type: "password" }],
  whatsapp:   [{ key: "phoneNumberId", label: "Phone Number ID" }, { key: "accessToken", label: "Access Token", type: "password" }],
  signal:     [{ key: "phone", label: "Phone Number" }],
  googlechat: [{ key: "serviceAccountKey", label: "Service Account Key (JSON)", type: "password" }],
  nostr:      [{ key: "privateKey", label: "Private Key (nsec)", type: "password" }, { key: "relays", label: "Relay URLs (comma-separated)" }],
};

@customElement("ccl-claw-channels")
export class CclClawChannels extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private channels: Channel[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private selectedType: ChannelType = "discord";
  @state() private form: Record<string, string> = {};
  @state() private saving = false;

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const data = await apiFetch<Channel[]>(`/api/claws/${this.clawId}/channels`);
      this.channels = data ?? [];
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async toggle(ch: Channel) {
    try {
      await apiFetch(`/api/claws/${this.clawId}/channels/${ch.id}`, { method: "PATCH", body: JSON.stringify({ enabled: !ch.enabled }) });
      this.channels = this.channels.map(c => c.id === ch.id ? { ...c, enabled: !c.enabled } : c);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async remove(ch: Channel) {
    if (!confirm(`Delete ${ch.type} channel?`)) return;
    try {
      await apiFetch(`/api/claws/${this.clawId}/channels/${ch.id}`, { method: "DELETE" });
      this.channels = this.channels.filter(c => c.id !== ch.id);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      const created = await apiFetch<Channel>(`/api/claws/${this.clawId}/channels`, {
        method: "POST",
        body: JSON.stringify({ type: this.selectedType, config: this.form }),
      });
      if (created) this.channels = [created, ...this.channels];
      this.showModal = false;
      this.form = {};
    } catch (e) { this.error = (e as Error).message; }
    finally { this.saving = false; }
  }

  private statusDot(s: string) {
    const map: Record<string, string> = { connected: "dot-green", error: "dot-red", stopped: "dot-gray", pending: "dot-yellow" };
    return html`<span class="dot ${map[s] ?? "dot-gray"}"></span>`;
  }

  override render() {
    const fields = CHANNEL_FIELDS[this.selectedType] ?? [];
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Channels</div>
          <button class="btn btn-primary btn-sm" @click=${() => { this.showModal = true; this.form = {}; }}>Add channel</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.channels.length === 0
            ? html`<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No channels</div><div class="empty-state-sub">Connect Discord, Slack, Telegram and more</div></div>`
            : this.channels.map(ch => html`
              <div class="card">
                <div class="card-header">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${this.statusDot(ch.status)}
                    <div>
                      <div class="card-title">${ch.name ?? ch.type}</div>
                      <div style="font-size:11px;color:var(--muted)">${ch.status}</div>
                    </div>
                  </div>
                  <span class="badge ${ch.enabled ? "badge-green" : "badge-gray"}">${ch.enabled ? "enabled" : "disabled"}</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${() => this.toggle(ch)}>${ch.enabled ? "Disable" : "Enable"}</button>
                  <button class="btn btn-danger btn-sm" @click=${() => this.remove(ch)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal ? html`
          <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
            <div class="modal">
              <div class="modal-title">Add channel</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field">
                  <label class="label">Channel type</label>
                  <select class="select" @change=${(e: Event) => { this.selectedType = (e.target as HTMLSelectElement).value as ChannelType; this.form = {}; }}>
                    ${CHANNEL_TYPES.map(t => html`<option value=${t}>${t}</option>`)}
                  </select>
                </div>
                ${fields.map(f => html`
                  <div class="field">
                    <label class="label">${f.label}</label>
                    <input class="input" type=${f.type ?? "text"} .value=${this.form[f.key] ?? ""}
                      @input=${(e: InputEvent) => { this.form = { ...this.form, [f.key]: (e.target as HTMLInputElement).value }; }}>
                  </div>
                `)}
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving ? "Saving…" : "Add channel"}</button>
                </div>
              </form>
            </div>
          </div>` : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-channels": CclClawChannels; } }
