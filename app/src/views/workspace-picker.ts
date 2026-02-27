import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { type TenantSummary, type UserInfo } from "../api.js";

@customElement("ccl-workspace-picker")
export class CclWorkspacePicker extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Array }) tenants: TenantSummary[] = [];
  @property({ type: Object }) user: UserInfo | null = null;

  @state() private showCreate = false;
  @state() private newName = "";
  @state() private creating = false;
  @state() private error = "";

  private selectTenant(t: TenantSummary) {
    this.dispatchEvent(new CustomEvent("select-tenant", { detail: t, bubbles: true, composed: true }));
  }

  private async createTenant(e: Event) {
    e.preventDefault();
    if (!this.newName.trim()) return;
    this.creating = true;
    this.error = "";
    try {
      this.dispatchEvent(new CustomEvent("create-tenant", {
        detail: { name: this.newName.trim() },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      this.error = (err as Error).message;
      this.creating = false;
    }
  }

  private signOut() {
    this.dispatchEvent(new CustomEvent("sign-out", { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="workspace-picker">
        <div style="width:100%;max-width:560px">
          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
            <div>
              <div style="font-size:22px;font-weight:700;letter-spacing:-0.035em;color:var(--text-strong)">
                Choose a workspace
              </div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">
                ${this.user?.email ?? ""}
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" @click=${this.signOut}>Sign out</button>
          </div>

          <!-- Tenant list -->
          <div class="workspace-list">
            ${this.tenants.length === 0
              ? html`<div style="text-align:center;color:var(--muted);padding:32px 0;font-size:14px">
                  No workspaces yet — create your first one below.
                </div>`
              : this.tenants.map(t => html`
                <div class="workspace-card" @click=${() => this.selectTenant(t)}>
                  <div class="workspace-avatar">${t.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div class="workspace-name">${t.name}</div>
                    <div class="workspace-role">${t.role} · ${t.status}</div>
                  </div>
                  <div class="workspace-arrow">
                    <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              `)}
          </div>

          <!-- Create new workspace -->
          <div style="margin-top:20px">
            ${this.showCreate
              ? html`
                <div class="card">
                  <div class="card-title" style="margin-bottom:16px">New workspace</div>
                  ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
                  <form @submit=${this.createTenant} style="display:grid;gap:12px">
                    <div class="field">
                      <label class="label">Workspace name</label>
                      <input
                        class="input"
                        placeholder="e.g. Acme Corp"
                        .value=${this.newName}
                        @input=${(e: InputEvent) => { this.newName = (e.target as HTMLInputElement).value; }}
                        required
                      >
                    </div>
                    <div style="display:flex;gap:8px">
                      <button class="btn btn-primary" type="submit" ?disabled=${this.creating}>
                        ${this.creating ? "Creating…" : "Create workspace"}
                      </button>
                      <button class="btn btn-ghost" type="button" @click=${() => { this.showCreate = false; this.error = ""; }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `
              : html`
                <button
                  class="btn btn-secondary btn-full"
                  @click=${() => { this.showCreate = true; }}
                  style="border-style:dashed"
                >
                  <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create new workspace
                </button>
              `}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-workspace-picker": CclWorkspacePicker; }
}
