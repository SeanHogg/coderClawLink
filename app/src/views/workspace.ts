import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getTenantToken,
  tenants,
  llm,
  type Tenant,
  type TenantSummary,
  type TenantSubscription,
  type TenantLlmUsage,
} from "../api.js";

const ROLES = ["owner", "manager", "developer", "viewer"];

@customElement("ccl-workspace")
export class CclWorkspace extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Object }) tenant: TenantSummary | null = null;

  @state() private detail: Tenant | null = null;
  @state() private loading = true;
  @state() private error = "";
  @state() private tab: "members" | "settings" = "members";
  @state() private subscription: TenantSubscription | null = null;
  @state() private usage: TenantLlmUsage | null = null;
  @state() private usageDays = 30;
  @state() private updatingPlan = false;
  @state() private billingCycle: "monthly" | "yearly" = "monthly";
  @state() private billingEmail = "";
  @state() private billingBrand = "visa";
  @state() private billingLast4 = "";
  @state() private showTenantToken = false;
  @state() private copiedTenantToken = false;
  @state() private copiedPluginEnv = false;
  @state() private downloadedPluginEnv = false;

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
    try {
      const [detail, subscription, usage] = await Promise.all([
        tenants.get(this.tenant.id),
        tenants.subscription(this.tenant.id),
        llm.usage(this.usageDays),
      ]);
      this.detail = detail;
      this.subscription = subscription;
      this.usage = usage;
      this.billingEmail = subscription.billingEmail ?? "";
      this.billingBrand = subscription.billingPaymentBrand ?? "visa";
      this.billingLast4 = subscription.billingPaymentLast4 ?? "";
      this.billingCycle = subscription.billingCycle ?? "monthly";
    }
    catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private canManageBilling() {
    const role = this.tenant?.role?.toLowerCase();
    return role === "owner" || role === "manager";
  }

  private async changePlanToPro(e: Event) {
    e.preventDefault();
    if (!this.tenant || !this.canManageBilling()) return;
    this.updatingPlan = true;
    try {
      await tenants.upgradeToPro(this.tenant.id, {
        billingCycle: this.billingCycle,
        billingEmail: this.billingEmail,
        billingPaymentBrand: this.billingBrand,
        billingPaymentLast4: this.billingLast4,
      });
      await this.load();
    } catch (err) {
      this.error = (err as Error).message;
    } finally {
      this.updatingPlan = false;
    }
  }

  private async changePlanToFree() {
    if (!this.tenant || !this.canManageBilling()) return;
    this.updatingPlan = true;
    try {
      await tenants.downgradeToFree(this.tenant.id);
      await this.load();
    } catch (err) {
      this.error = (err as Error).message;
    } finally {
      this.updatingPlan = false;
    }
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

  private async copyTenantToken() {
    const token = getTenantToken();
    if (!token) {
      this.error = "No tenant token found for current workspace session.";
      return;
    }
    try {
      await navigator.clipboard.writeText(token);
      this.copiedTenantToken = true;
      setTimeout(() => {
        this.copiedTenantToken = false;
      }, 2000);
    } catch (err) {
      this.error = (err as Error).message;
    }
  }

  private buildPluginEnvTemplate() {
    const tenantToken = getTenantToken() ?? "";
    const apiUrl = ((window as unknown as { API_URL?: string }).API_URL ?? "https://api.coderclaw.ai").replace(/\/+$/, "");
    const clawName = `openclaw-${(this.tenant?.slug ?? "node").replace(/[^a-z0-9-]/gi, "-")}`;
    return [
      `CODERCLAW_LINK_URL=${apiUrl}`,
      `CODERCLAW_LINK_TENANT_TOKEN=${tenantToken}`,
      `CODERCLAW_LINK_CLAW_NAME=${clawName}`,
      "CODERCLAW_LINK_CLAW_ID=",
      "CODERCLAW_LINK_API_KEY=",
      "OPENCLAW_EXEC_COMMAND=",
      "OPENCLAW_MAX_CONCURRENT_TASKS=1",
      "OPENCLAW_EXEC_TIMEOUT_MS=900000",
      "OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json",
      "OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env",
    ].join("\n");
  }

  private async copyPluginEnvTemplate() {
    const tenantToken = getTenantToken();
    if (!tenantToken) {
      this.error = "No tenant token found for current workspace session.";
      return;
    }
    try {
      await navigator.clipboard.writeText(this.buildPluginEnvTemplate());
      this.copiedPluginEnv = true;
      setTimeout(() => {
        this.copiedPluginEnv = false;
      }, 2000);
    } catch (err) {
      this.error = (err as Error).message;
    }
  }

  private downloadPluginEnvTemplate() {
    const tenantToken = getTenantToken();
    if (!tenantToken) {
      this.error = "No tenant token found for current workspace session.";
      return;
    }

    try {
      const content = this.buildPluginEnvTemplate();
      const blob = new Blob([`${content}\n`], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "coderclawlink.env";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      this.downloadedPluginEnv = true;
      setTimeout(() => {
        this.downloadedPluginEnv = false;
      }, 2000);
    } catch (err) {
      this.error = (err as Error).message;
    }
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
    const tenantToken = getTenantToken() ?? "";
    const sub = this.subscription;
    const usage = this.usage;
    const canManageBilling = this.canManageBilling();
    return html`
      <div style="display:grid;gap:16px;max-width:680px">
        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">coderClawLLM Plan</div>
          ${sub ? html`
            <div style="display:grid;gap:10px;margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Current plan</span>
                <span style="color:var(--text-strong);font-weight:600">${sub.effectivePlan === "pro" ? "Pro" : "Free"}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Configured plan</span>
                <span style="color:var(--text-strong);font-weight:500">${sub.plan}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Billing status</span>
                <span style="color:var(--text-strong);font-weight:500">${sub.billingStatus}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Pro pricing</span>
                <span style="color:var(--text-strong);font-weight:500">$${sub.pricing.pro.monthly}/mo or $${sub.pricing.pro.yearly}/yr</span>
              </div>
            </div>

            ${canManageBilling ? html`
              <form @submit=${this.changePlanToPro} style="display:grid;gap:10px;margin-bottom:10px">
                <div style="font-size:12px;color:var(--muted)">Upgrade to Pro requires billing info. If billing is not active, workspace usage automatically falls back to Free.</div>
                <div class="field">
                  <label class="label">Billing cycle</label>
                  <select class="select" .value=${this.billingCycle} @change=${(e: Event) => { this.billingCycle = (e.target as HTMLSelectElement).value as "monthly" | "yearly"; }}>
                    <option value="monthly">Monthly ($${sub.pricing.pro.monthly})</option>
                    <option value="yearly">Yearly ($${sub.pricing.pro.yearly})</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label">Billing email</label>
                  <input class="input" type="email" required .value=${this.billingEmail} @input=${(e: InputEvent) => { this.billingEmail = (e.target as HTMLInputElement).value; }} />
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="field">
                    <label class="label">Card brand</label>
                    <input class="input" required .value=${this.billingBrand} @input=${(e: InputEvent) => { this.billingBrand = (e.target as HTMLInputElement).value; }} />
                  </div>
                  <div class="field">
                    <label class="label">Card last 4</label>
                    <input class="input" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required .value=${this.billingLast4} @input=${(e: InputEvent) => { this.billingLast4 = (e.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, 4); }} />
                  </div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <button class="btn btn-primary btn-sm" type="submit" ?disabled=${this.updatingPlan}>${this.updatingPlan ? "Updating…" : "Activate Pro"}</button>
                  <button class="btn btn-secondary btn-sm" type="button" @click=${this.changePlanToFree} ?disabled=${this.updatingPlan}>Switch to Free</button>
                </div>
              </form>
            ` : html`<div style="font-size:12px;color:var(--muted)">Only owner/manager can change billing or plan.</div>`}
          ` : html`<div style="color:var(--muted);font-size:13px">Loading subscription…</div>`}
        </div>

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:8px">coderClawLLM Consumption</div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
            <label style="font-size:12px;color:var(--muted)">Window</label>
            <select class="select" style="max-width:130px" @change=${(e: Event) => { this.usageDays = Number((e.target as HTMLSelectElement).value); void this.load(); }}>
              ${[7, 14, 30, 60, 90].map((days) => html`<option value="${days}" ?selected=${this.usageDays === days}>${days} days</option>`) }
            </select>
          </div>
          ${usage ? html`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px">
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Workspace requests</div>
                <div style="font-size:18px;font-weight:600">${usage.totals.requests.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Workspace tokens</div>
                <div style="font-size:18px;font-weight:600">${usage.totals.totalTokens.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Your requests</div>
                <div style="font-size:18px;font-weight:600">${usage.mine.requests.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Your tokens</div>
                <div style="font-size:18px;font-weight:600">${usage.mine.totalTokens.toLocaleString()}</div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--muted)">Top model: ${usage.byModel[0]?.model ?? "—"} · Product: ${usage.byModel[0]?.llmProduct ?? "coderClawLLM"}</div>
          ` : html`<div style="color:var(--muted);font-size:13px">Loading usage…</div>`}
        </div>

        <div class="card" style="max-width:680px">
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

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:8px">Tenant token (advanced)</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">
            This token grants tenant-scoped API access for your current workspace session. Share only with trusted tooling.
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
            <button class="btn btn-secondary btn-sm" @click=${() => { this.showTenantToken = !this.showTenantToken; }}>
              ${this.showTenantToken ? "Hide token" : "Show token"}
            </button>
            <button class="btn btn-primary btn-sm" @click=${this.copyTenantToken} ?disabled=${!tenantToken}>
              ${this.copiedTenantToken ? "Copied!" : "Copy token"}
            </button>
            <button class="btn btn-secondary btn-sm" @click=${this.copyPluginEnvTemplate} ?disabled=${!tenantToken}>
              ${this.copiedPluginEnv ? "Env copied!" : "Copy plugin env file"}
            </button>
            <button class="btn btn-secondary btn-sm" @click=${this.downloadPluginEnvTemplate} ?disabled=${!tenantToken}>
              ${this.downloadedPluginEnv ? "Downloaded!" : "Download .env file"}
            </button>
          </div>
          ${this.showTenantToken
            ? html`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${tenantToken || "No tenant token found"}</textarea>`
            : html`<div style="font-size:12px;color:var(--muted);font-family:var(--mono)">${tenantToken ? "••••••••••••••••••••••••••••" : "No tenant token found"}</div>`}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-workspace": CclWorkspace; } }
