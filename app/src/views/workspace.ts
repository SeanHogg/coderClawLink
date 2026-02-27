import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tenants, type Tenant, type TenantSummary } from "../api.js";

const ROLES = ["owner", "manager", "developer", "viewer"];

@customElement("ccl-workspace")
export class CclWorkspace extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Object }) tenant: TenantSummary | null = null;

  @state() private detail: Tenant | null = null;
  @state() private loading = true;
  @state() private error = "";
  @state() private tab: "members" | "settings" = "members";

  // Invite
  @state() private showInvite = false;
  @state() private inviteEmail = "";
  @state() private inviteRole = "developer";
  @state() private inviting = false;

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("tenant") && this.tenant) this.load(); }

  private async load() {
    if (!this.tenant) return;
    this.loading = true;
    try { this.detail = await tenants.get(this.tenant.id); }
    catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async invite(e: Event) {
    e.preventDefault();
    if (!this.tenant || !this.inviteEmail) return;
    this.inviting = true;
    try {
      await tenants.inviteMember(this.tenant.id, this.inviteEmail, this.inviteRole);
      await this.load();
      this.showInvite = false;
      this.inviteEmail = "";
    } catch (ex) { this.error = (ex as Error).message; }
    finally { this.inviting = false; }
  }

  private async removeMember(userId: string) {
    if (!this.tenant || !confirm("Remove this member?")) return;
    try {
      await tenants.removeMember(this.tenant.id, userId);
      await this.load();
    } catch (e) { this.error = (e as Error).message; }
  }

  private roleBadge(r: string) {
    const map: Record<string, string> = { owner: "badge-red", manager: "badge-yellow", developer: "badge-blue", viewer: "badge-gray" };
    return html`<span class="badge ${map[r] ?? "badge-gray"}">${r}</span>`;
  }

  override render() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">${this.tenant?.name ?? "Workspace"}</div>
          <div class="page-sub">Manage members and settings</div>
        </div>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab === "members" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "members"; }}>Members</button>
        <button class="btn ${this.tab === "settings" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "settings"; }}>Settings</button>
      </div>

      ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.tab === "members" ? this.renderMembers()
        : this.renderSettings()}
    `;
  }

  private renderMembers() {
    const members = this.detail?.members ?? [];
    return html`
      <div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
          <button class="btn btn-primary" @click=${() => { this.showInvite = true; }}>Invite member</button>
        </div>

        ${members.length === 0
          ? html`<div class="empty-state"><div class="empty-state-title">No members yet</div></div>`
          : html`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead>
                <tbody>
                  ${members.map(m => html`
                    <tr>
                      <td style="font-weight:500">${m.email}</td>
                      <td>${this.roleBadge(m.role)}</td>
                      <td style="font-size:12px;color:var(--muted)">${new Date(m.joinedAt).toLocaleDateString()}</td>
                      <td>
                        ${m.role !== "owner"
                          ? html`<button class="btn btn-danger btn-sm" @click=${() => this.removeMember(m.userId)}>Remove</button>`
                          : ""}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.showInvite ? html`
          <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showInvite = false; }}>
            <div class="modal">
              <div class="modal-title">Invite member</div>
              <form @submit=${this.invite} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Email</label>
                  <input class="input" type="email" required .value=${this.inviteEmail}
                    @input=${(e: InputEvent) => { this.inviteEmail = (e.target as HTMLInputElement).value; }}></div>
                <div class="field"><label class="label">Role</label>
                  <select class="select" @change=${(e: Event) => { this.inviteRole = (e.target as HTMLSelectElement).value; }}>
                    ${ROLES.filter(r => r !== "owner").map(r => html`<option value=${r}>${r}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${() => this.showInvite = false}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting ? "Inviting…" : "Send invite"}</button>
                </div>
              </form>
            </div>
          </div>` : ""}
      </div>
    `;
  }

  private renderSettings() {
    return html`
      <div class="card" style="max-width:480px">
        <div class="card-title" style="margin-bottom:16px">Workspace details</div>
        <div style="display:grid;gap:10px">
          ${[
            ["Name",   this.tenant?.name ?? "—"],
            ["Slug",   this.tenant?.slug ?? "—"],
            ["Status", this.tenant?.status ?? "—"],
            ["Your role", this.tenant?.role ?? "—"],
          ].map(([label, val]) => html`
            <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--muted)">${label}</span>
              <span style="color:var(--text-strong);font-weight:500">${val}</span>
            </div>`)}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-workspace": CclWorkspace; } }
