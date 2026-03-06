import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { marketplace, skillAssignments, type Skill, type SkillAssignment } from "../api.js";
import { BUILTIN_SKILLS, type BuiltinSkill } from "./builtin-skills.js";
import "../components/artifact-assigner.js";

/** User-created skills stored in localStorage until backend is ready */
export interface UserSkill {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  version: string;
  shared: boolean;
  image?: string;
  likes: number;
  downloads: number;
  createdAt: string;
}

function userSkillsKey(tenantId: string) { return `ccl-user-skills-${tenantId || "default"}`; }
function loadUserSkills(tenantId: string): UserSkill[] {
  try { return JSON.parse(localStorage.getItem(userSkillsKey(tenantId)) || "[]"); } catch { return []; }
}
function saveUserSkills(tenantId: string, skills: UserSkill[]) {
  localStorage.setItem(userSkillsKey(tenantId), JSON.stringify(skills));
}

@customElement("ccl-skills")
export class CclSkills extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private available: Skill[] = [];
  @state() private assigned: SkillAssignment[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private search = "";
  @state() private tab: "marketplace" | "assigned" | "my-skills" = "assigned";

  // Create skill form
  @state() private createOpen = false;
  @state() private createForm = { name: "", description: "", category: "general", version: "1.0.0", image: "" };
  @state() private userSkills: UserSkill[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.userSkills = loadUserSkills(this.tenantId);
    this.load();
  }

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

  private saveSkill() {
    const name = this.createForm.name.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const skill: UserSkill = {
      id: crypto.randomUUID(),
      name,
      slug,
      description: this.createForm.description.trim(),
      category: this.createForm.category,
      version: this.createForm.version || "1.0.0",
      shared: false,
      image: this.createForm.image.trim() || undefined,
      likes: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
    };
    this.userSkills = [...this.userSkills, skill];
    saveUserSkills(this.tenantId, this.userSkills);
    this.createOpen = false;
    this.createForm = { name: "", description: "", category: "general", version: "1.0.0", image: "" };
    this.tab = "my-skills";
  }

  private deleteUserSkill(id: string) {
    if (!confirm("Delete this skill?")) return;
    this.userSkills = this.userSkills.filter((s) => s.id !== id);
    saveUserSkills(this.tenantId, this.userSkills);
  }

  private toggleShare(id: string) {
    this.userSkills = this.userSkills.map((s) =>
      s.id === id ? { ...s, shared: !s.shared } : s,
    );
    saveUserSkills(this.tenantId, this.userSkills);
  }

  private filteredAvailable(): (Skill & { emoji?: string })[] {
    const q = this.search.toLowerCase();
    const apiSkills = this.available.filter(s =>
      !q || s.name.toLowerCase().includes(q) || (s.description ?? "").toLowerCase().includes(q)
    );
    const apiSlugs = new Set(apiSkills.map(s => s.slug));
    const builtins: (Skill & { emoji?: string })[] = BUILTIN_SKILLS
      .filter(b => !apiSlugs.has(b.slug))
      .filter(b => !q || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q))
      .map(b => ({ slug: b.slug, name: b.name, description: b.description, category: b.category, icon: b.image, emoji: b.emoji }));
    return [...apiSkills, ...builtins];
  }

  override render() {
    const slugs = this.assignedSlugs();
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Skills</div>
          <div class="page-sub">Extend your claws with marketplace skills</div>
        </div>
        <button class="btn btn-primary" @click=${() => { this.createOpen = true; }}>+ Create Skill</button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab === "assigned" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "assigned"; }}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab === "marketplace" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "marketplace"; }}>
          Marketplace (${this.available.length})
        </button>
        <button class="btn ${this.tab === "my-skills" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "my-skills"; }}>
          My Skills (${this.userSkills.length})
        </button>
      </div>

      ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.tab === "assigned"
          ? this.renderAssigned()
          : this.tab === "my-skills"
            ? this.renderMySkills()
            : this.renderMarketplace(slugs)}

      ${this.createOpen ? this.renderCreateModal() : ""}
    `;
  }

  private renderMySkills() {
    if (this.userSkills.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">🛠️</div><div class="empty-state-title">No custom skills yet</div><div class="empty-state-sub">Create your own skill and share it in the marketplace</div><button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.createOpen = true; }}>Create Skill</button></div>`;
    }
    return html`
      <div class="grid grid-3">
        ${this.userSkills.map(s => html`
          <div class="card" style="overflow:hidden">
            ${s.image ? html`<div style="width:100%;height:120px;background:url('${s.image}') center/cover;border-bottom:1px solid var(--border)"></div>` : ""}
            <div style="padding:${s.image ? '12px' : '0'}">
              <div class="card-header">
                <div>
                  <div class="card-title">${s.name}</div>
                  <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap">
                    <span class="badge badge-gray">${s.category}</span>
                    <span class="badge badge-gray">v${s.version}</span>
                    ${s.shared ? html`<span class="badge badge-green">Shared</span>` : ""}
                  </div>
                </div>
              </div>
              ${s.description ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin:8px 0">${s.description}</div>` : ""}
              <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin:8px 0">
                <span title="Likes">❤️ ${s.likes}</span>
                <span title="Downloads">⬇️ ${s.downloads}</span>
              </div>
              <div style="display:flex;gap:6px;margin-top:8px">
                <button class="btn btn-sm ${s.shared ? "btn-secondary" : "btn-primary"}" @click=${() => this.toggleShare(s.id)}>
                  ${s.shared ? "Unshare" : "Share to Marketplace"}
                </button>
                <button class="btn btn-danger btn-sm" @click=${() => this.deleteUserSkill(s.id)}>Delete</button>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private renderCreateModal() {
    return html`
      <div class="modal-backdrop" @click=${() => { this.createOpen = false; }}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()} style="max-width:480px">
          <div class="modal-header">
            <div class="modal-title">Create Skill</div>
            <button class="btn btn-secondary btn-sm" @click=${() => { this.createOpen = false; }}>✕</button>
          </div>
          <div class="modal-body" style="display:flex;flex-direction:column;gap:14px">
            <div>
              <label class="label">Name *</label>
              <input class="input" placeholder="My custom skill" .value=${this.createForm.name}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, name: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Description</label>
              <textarea class="input" rows="3" placeholder="What does this skill do?"
                .value=${this.createForm.description}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
            </div>
            <div style="display:flex;gap:12px">
              <div style="flex:1">
                <label class="label">Category</label>
                <select class="input" .value=${this.createForm.category}
                  @change=${(e: Event) => { this.createForm = { ...this.createForm, category: (e.target as HTMLSelectElement).value }; }}>
                  <option value="general">General</option>
                  <option value="coding">Coding</option>
                  <option value="testing">Testing</option>
                  <option value="devops">DevOps</option>
                  <option value="documentation">Documentation</option>
                  <option value="security">Security</option>
                </select>
              </div>
              <div style="flex:1">
                <label class="label">Version</label>
                <input class="input" placeholder="1.0.0" .value=${this.createForm.version}
                  @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, version: (e.target as HTMLInputElement).value }; }}>
              </div>
            </div>
            <div>
              <label class="label">Cover Image URL</label>
              <input class="input" placeholder="https://example.com/image.jpg" .value=${this.createForm.image}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, image: (e.target as HTMLInputElement).value }; }}>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click=${() => { this.createOpen = false; }}>Cancel</button>
            <button class="btn btn-primary" @click=${() => this.saveSkill()} ?disabled=${!this.createForm.name.trim()}>Save Skill</button>
          </div>
        </div>
      </div>
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
              <div style="display:flex;gap:6px;align-items:center">
                <ccl-artifact-assigner artifactType="skill" artifactSlug=${a.slug} artifactName=${a.name}></ccl-artifact-assigner>
                <button class="btn btn-danger btn-sm" @click=${() => this.unassign(a.slug)}>Remove</button>
              </div>
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
                <div class="card" style="overflow:hidden">
                  ${s.icon ? html`<div style="width:100%;height:100px;background:url('${s.icon}') center/cover;border-bottom:1px solid var(--border)"></div>` : ""}
                  <div style="padding:${s.icon ? '12px' : '0'}">
                    <div class="card-header">
                      <div style="display:flex;align-items:center;gap:10px">
                        <div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">${(s as any).emoji || '✨'}</div>
                        <div>
                          <div class="card-title">${s.name}</div>
                          ${s.category ? html`<span class="badge badge-gray" style="font-size:10px">${s.category}</span>` : ""}
                        </div>
                      </div>
                    </div>
                    ${s.description ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin:8px 0">${s.description}</div>` : ""}
                    <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin:4px 0 8px">
                      <span title="Likes">❤️ ${(s as any).likes ?? 0}</span>
                      <span title="Downloads">⬇️ ${(s as any).downloads ?? 0}</span>
                    </div>
                    ${assigned.has(s.slug)
                      ? html`<div style="display:flex;gap:6px;align-items:center">
                          <button class="btn btn-danger btn-sm" @click=${() => this.unassign(s.slug)}>Remove</button>
                          <ccl-artifact-assigner artifactType="skill" artifactSlug=${s.slug} artifactName=${s.name}></ccl-artifact-assigner>
                        </div>`
                      : html`<div style="display:flex;gap:6px;align-items:center">
                          <button class="btn btn-primary btn-sm" @click=${() => this.assign(s.slug)}>Add to workspace</button>
                          <ccl-artifact-assigner artifactType="skill" artifactSlug=${s.slug} artifactName=${s.name}></ccl-artifact-assigner>
                        </div>`}
                  </div>
                </div>
              `)}
            </div>`}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-skills": CclSkills; } }
