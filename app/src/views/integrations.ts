import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { claws as clawsApi, tasks as tasksApi, tenants as tenantsApi, type Task, type Claw, type Tenant, type SourceControlIntegration } from "../api.js";

@customElement("ccl-integrations")
export class CclIntegrations extends LitElement {
  override createRenderRoot() { return this; }
  @property() tenantId = "";
  @state() private integrations: SourceControlIntegration[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private name = "";
  @state() private provider: string = "github";
  @state() private account = "";
  @state() private hostUrl = "";

  override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private async load() {
    if (!this.tenantId) return;
    this.loading = true;
    try {
      this.integrations = await tenantsApi.sourceControlIntegrations(this.tenantId);
    } catch (e: unknown) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private async add() {
    try {
      await tenantsApi.createSourceControlIntegration(this.tenantId, {
        provider: this.provider as any,
        name: this.name,
        accountIdentifier: this.account,
        hostUrl: this.hostUrl || undefined,
      });
      this.name = this.account = this.hostUrl = "";
      await this.load();
    } catch (e: unknown) {
      this.error = (e as Error).message;
    }
  }

  render() {
    return html`
      <div class="page-header">
        <div><div class="page-title">Integrations</div><div class="page-sub">Manage source control connections</div></div>
      </div>
      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
      <div style="margin-bottom:16px">
        <h3>Add new integration</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <select class="select" .value=${this.provider} @change=${(e: any)=>this.provider=e.target.value}>
            <option value="github">GitHub</option>
            <option value="bitbucket">Bitbucket</option>
          </select>
          <input class="input" placeholder="Name" .value=${this.name} @input=${(e:any)=>this.name=e.target.value}/>
          <input class="input" placeholder="Account ID" .value=${this.account} @input=${(e:any)=>this.account=e.target.value}/>
          <input class="input" placeholder="Host URL (optional)" .value=${this.hostUrl} @input=${(e:any)=>this.hostUrl=e.target.value}/>
          <button class="btn btn-primary" @click=${this.add}>Add</button>
        </div>
      </div>
      ${this.loading ? html`<div>Loading…</div>` : html`
        <table class="table">
          <thead><tr><th>Name</th><th>Provider</th><th>Account</th><th>Host</th><th>Active</th></tr></thead>
          <tbody>
            ${this.integrations.map(i => html`<tr>
              <td>${i.name}</td><td>${i.provider}</td><td>${i.accountIdentifier}</td><td>${i.hostUrl||"—"}</td><td>${i.isActive ? "Yes" : "No"}</td>
            </tr>`) }
          </tbody>
        </table>
      `}
    `;
  }
}
