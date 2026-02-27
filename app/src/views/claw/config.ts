import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getTenantToken } from "../../api.js";

const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";

async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTenantToken() ?? ""}`, ...(opts.headers ?? {}) },
  });
  if (res.status === 404) return {} as T;
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  return res.json();
}

@customElement("ccl-claw-config")
export class CclClawConfig extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private config: Record<string, string> = {};
  @state() private loading = true;
  @state() private error = "";
  @state() private editing = false;
  @state() private draft: Record<string, string> = {};
  @state() private saving = false;
  @state() private newKey = "";
  @state() private newVal = "";

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const data = await apiFetch<Record<string, string>>(`/api/claws/${this.clawId}/config`);
      this.config = data ?? {};
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private startEdit() { this.draft = { ...this.config }; this.editing = true; }
  private cancel() { this.editing = false; this.draft = {}; }

  private async save() {
    this.saving = true;
    try {
      await apiFetch(`/api/claws/${this.clawId}/config`, { method: "PATCH", body: JSON.stringify(this.draft) });
      this.config = { ...this.draft };
      this.editing = false;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.saving = false; }
  }

  private addField() {
    if (!this.newKey.trim()) return;
    this.draft = { ...this.draft, [this.newKey.trim()]: this.newVal };
    this.newKey = ""; this.newVal = "";
  }

  private removeField(k: string) { const d = { ...this.draft }; delete d[k]; this.draft = d; }

  override render() {
    const entries = Object.entries(this.editing ? this.draft : this.config);
    return html`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Configuration</div>
          ${!this.editing
            ? html`<button class="btn btn-secondary btn-sm" @click=${this.startEdit}>Edit</button>`
            : html`<div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" @click=${this.cancel}>Cancel</button>
                <button class="btn btn-primary btn-sm" ?disabled=${this.saving} @click=${this.save}>${this.saving ? "Saving…" : "Save"}</button>
              </div>`}
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>` : ""}

        ${entries.length === 0 && !this.loading
          ? html`<div class="empty-state"><div class="empty-state-title">No configuration</div><div class="empty-state-sub">${this.editing ? "Add key-value pairs below" : "Click Edit to add configuration"}</div></div>`
          : html`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Key</th><th>Value</th>${this.editing ? html`<th></th>` : ""}</tr></thead>
                <tbody>
                  ${entries.map(([k, v]) => html`
                    <tr>
                      <td><code style="font-family:var(--mono);font-size:12px">${k}</code></td>
                      <td>${this.editing
                        ? html`<input class="input" style="height:28px;padding:3px 8px" .value=${v}
                            @input=${(e: InputEvent) => { this.draft = { ...this.draft, [k]: (e.target as HTMLInputElement).value }; }}>`
                        : html`<span style="font-family:var(--mono);font-size:12px">${v}</span>`}
                      </td>
                      ${this.editing ? html`<td><button class="btn btn-danger btn-sm" @click=${() => this.removeField(k)}>Remove</button></td>` : ""}
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.editing ? html`
          <div class="card">
            <div class="card-title" style="margin-bottom:10px">Add field</div>
            <div style="display:flex;gap:8px">
              <input class="input" placeholder="key" .value=${this.newKey}
                @input=${(e: InputEvent) => { this.newKey = (e.target as HTMLInputElement).value; }}>
              <input class="input" placeholder="value" .value=${this.newVal}
                @input=${(e: InputEvent) => { this.newVal = (e.target as HTMLInputElement).value; }}>
              <button class="btn btn-secondary btn-sm" @click=${this.addField}>Add</button>
            </div>
          </div>` : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-config": CclClawConfig; } }
