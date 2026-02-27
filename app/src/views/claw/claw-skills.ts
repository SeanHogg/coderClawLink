import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { skillAssignments, marketplace, type Skill, type SkillAssignment } from "../../api.js";

@customElement("ccl-claw-skills")
export class CclClawSkills extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private assigned: SkillAssignment[] = [];
  @state() private available: Skill[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private saving = false;

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const [assigned, avail] = await Promise.all([
        this.loadAssigned(),
        marketplace.list().catch(() => [] as Skill[]),
      ]);
      this.assigned = assigned;
      this.available = avail;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async loadAssigned(): Promise<SkillAssignment[]> {
    try {
      const { getTenantToken } = await import("../../api.js");
      const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";
      const res = await fetch(`${BASE}/api/skill-assignments/claws/${this.clawId}`, {
        headers: { Authorization: `Bearer ${getTenantToken() ?? ""}` },
      });
      if (!res.ok) return [];
      return res.json();
    } catch { return []; }
  }

  private async assign(slug: string) {
    this.saving = true;
    try {
      await skillAssignments.assignClaw(this.clawId, slug);
      this.assigned = await this.loadAssigned();
      this.showModal = false;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.saving = false; }
  }

  private async unassign(slug: string) {
    try {
      const { getTenantToken } = await import("../../api.js");
      const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";
      await fetch(`${BASE}/api/skill-assignments/claws/${this.clawId}/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getTenantToken() ?? ""}` },
      });
      this.assigned = this.assigned.filter(a => a.slug !== slug);
    } catch (e) { this.error = (e as Error).message; }
  }

  private assignedSlugs() { return new Set(this.assigned.map(a => a.slug)); }

  override render() {
    const slugs = this.assignedSlugs();
    const unassigned = this.available.filter(s => !slugs.has(s.slug));
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Skills</div>
          <button class="btn btn-primary btn-sm" @click=${() => { this.showModal = true; }}>Assign skill</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.assigned.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Assign skills to give this claw extra capabilities</div></div>`
            : this.assigned.map(a => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${a.name}</div>
                    <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${a.slug}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${() => this.unassign(a.slug)}>Unassign</button>
                </div>
              </div>
            `)}

        ${this.showModal ? html`
          <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
            <div class="modal" style="max-width:500px">
              <div class="modal-title">Assign skill</div>
              <div class="modal-sub">Add a skill from the marketplace to this claw</div>
              ${unassigned.length === 0
                ? html`<div style="color:var(--muted);font-size:13px;padding:16px 0">All available skills are already assigned</div>`
                : html`<div style="display:grid;gap:8px;max-height:360px;overflow-y:auto">
                    ${unassigned.map(s => html`
                      <div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" @click=${() => this.assign(s.slug)}>
                        ${s.icon ? html`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">` : html`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                        <div>
                          <div style="font-size:13px;font-weight:600;color:var(--text-strong)">${s.name}</div>
                          <div style="font-size:11px;color:var(--muted)">${s.description ?? s.slug}</div>
                        </div>
                        <button class="btn btn-primary btn-sm" style="margin-left:auto" ?disabled=${this.saving}>Assign</button>
                      </div>
                    `)}
                  </div>`}
              <div class="modal-footer">
                <button class="btn btn-ghost" @click=${() => this.showModal = false}>Close</button>
              </div>
            </div>
          </div>` : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-skills": CclClawSkills; } }
