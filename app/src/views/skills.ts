import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { marketplace, skillAssignments, type Skill, type SkillAssignment } from "../api.js";

@customElement("ccl-skills")
export class CclSkills extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private available: Skill[] = [];
  @state() private assigned: SkillAssignment[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private search = "";
  @state() private tab: "marketplace" | "assigned" = "assigned";

  override connectedCallback() { super.connectedCallback(); this.load(); }

  private async load() {
    this.loading = true;
    try {
      const [avail, asgn] = await Promise.all([
        marketplace.list().catch(() => [] as Skill[]),
        skillAssignments.listTenant().catch(() => [] as SkillAssignment[]),
      ]);
      this.available = avail;
      this.assigned = asgn;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async assign(slug: string) {
    try {
      await skillAssignments.assignTenant(slug);
      this.assigned = await skillAssignments.listTenant();
    } catch (e) { this.error = (e as Error).message; }
  }

  private async unassign(slug: string) {
    try {
      await skillAssignments.unassignTenant(slug);
      this.assigned = this.assigned.filter(a => a.slug !== slug);
    } catch (e) { this.error = (e as Error).message; }
  }

  private assignedSlugs() { return new Set(this.assigned.map(a => a.slug)); }

  private filteredAvailable() {
    const q = this.search.toLowerCase();
    return this.available.filter(s =>
      !q || s.name.toLowerCase().includes(q) || (s.description ?? "").toLowerCase().includes(q)
    );
  }

  override render() {
    const slugs = this.assignedSlugs();
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Skills</div>
          <div class="page-sub">Extend your claws with marketplace skills</div>
        </div>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab === "assigned" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "assigned"; }}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab === "marketplace" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "marketplace"; }}>
          Marketplace (${this.available.length})
        </button>
      </div>

      ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.tab === "assigned"
          ? this.renderAssigned()
          : this.renderMarketplace(slugs)}
    `;
  }

  private renderAssigned() {
    if (this.assigned.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">✨</div><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Browse the marketplace to add skills to your workspace</div><button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.tab = "marketplace"; }}>Browse marketplace</button></div>`;
    }
    return html`
      <div class="grid grid-3">
        ${this.assigned.map(a => html`
          <div class="card">
            <div class="card-header">
              <div class="card-title">${a.name}</div>
              <button class="btn btn-danger btn-sm" @click=${() => this.unassign(a.slug)}>Remove</button>
            </div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${a.slug}</div>
          </div>
        `)}
      </div>
    `;
  }

  private renderMarketplace(assigned: Set<string>) {
    const items = this.filteredAvailable();
    return html`
      <div>
        <input class="input" style="max-width:300px;margin-bottom:16px" placeholder="Search skills…"
          .value=${this.search} @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}>

        ${items.length === 0
          ? html`<div class="empty-state"><div class="empty-state-title">No skills found</div></div>`
          : html`
            <div class="grid grid-3">
              ${items.map(s => html`
                <div class="card">
                  <div class="card-header">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${s.icon ? html`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">` : html`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                      <div>
                        <div class="card-title">${s.name}</div>
                        ${s.category ? html`<span class="badge badge-gray" style="font-size:10px">${s.category}</span>` : ""}
                      </div>
                    </div>
                  </div>
                  ${s.description ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">${s.description}</div>` : ""}
                  ${assigned.has(s.slug)
                    ? html`<button class="btn btn-danger btn-sm" @click=${() => this.unassign(s.slug)}>Remove</button>`
                    : html`<button class="btn btn-primary btn-sm" @click=${() => this.assign(s.slug)}>Add to workspace</button>`}
                </div>
              `)}
            </div>`}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-skills": CclSkills; } }
