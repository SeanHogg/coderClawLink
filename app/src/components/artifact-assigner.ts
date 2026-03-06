/**
 * <ccl-artifact-assigner> — reusable component for assigning an artifact
 * (skill, persona, or content) to a scope (claw, project, or task).
 *
 * Usage:
 *   <ccl-artifact-assigner
 *     artifactType="skill"
 *     artifactSlug="git-commit-message"
 *     artifactName="Git Commit Message"
 *   ></ccl-artifact-assigner>
 *
 * Opens a compact dropdown to select scope and entity, then calls the
 * unified artifact assignment API.
 */
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  artifactAssignments,
  claws,
  projects,
  tasks,
  getTenantId,
  type ArtifactType,
  type AssignmentScope,
  type Claw,
  type Project,
  type Task,
  type ArtifactAssignment,
} from "../api.js";

@customElement("ccl-artifact-assigner")
export class CclArtifactAssigner extends LitElement {
  override createRenderRoot() { return this; }

  @property() artifactType: ArtifactType = "skill";
  @property() artifactSlug = "";
  @property() artifactName = "";

  @state() private open = false;
  @state() private scope: AssignmentScope = "claw";
  @state() private clawsList: Claw[] = [];
  @state() private projectsList: Project[] = [];
  @state() private tasksList: Task[] = [];
  @state() private selectedId = "";
  @state() private loading = false;
  @state() private saving = false;
  @state() private error = "";
  @state() private success = "";

  // Current assignments for this artifact
  @state() private assignments: ArtifactAssignment[] = [];
  @state() private assignmentsLoaded = false;

  private async toggle() {
    this.open = !this.open;
    if (this.open && !this.assignmentsLoaded) {
      await this.loadEntities();
      await this.loadAssignments();
    }
  }

  private async loadEntities() {
    this.loading = true;
    try {
      const [c, p, t] = await Promise.all([
        claws.list().catch(() => [] as Claw[]),
        projects.list().catch(() => [] as Project[]),
        tasks.list().catch(() => [] as Task[]),
      ]);
      this.clawsList = c;
      this.projectsList = p;
      this.tasksList = t;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private async loadAssignments() {
    const tenantId = getTenantId();
    if (!tenantId) return;
    try {
      const all: ArtifactAssignment[] = [];
      // Query all scopes for this artifact
      for (const scope of ["claw", "project", "task"] as AssignmentScope[]) {
        const entities = scope === "claw" ? this.clawsList
          : scope === "project" ? this.projectsList
          : this.tasksList;
        for (const entity of entities) {
          const id = Number((entity as { id: string | number }).id);
          try {
            const asgn = await artifactAssignments.list(scope, id, this.artifactType);
            all.push(...asgn.filter(a => a.artifactSlug === this.artifactSlug));
          } catch { /* ignore per-entity failures */ }
        }
      }
      this.assignments = all;
      this.assignmentsLoaded = true;
    } catch {
      // non-critical
    }
  }

  private scopeEntities() {
    switch (this.scope) {
      case "claw":    return this.clawsList.map(c => ({ id: String(c.id), label: c.name }));
      case "project": return this.projectsList.map(p => ({ id: String(p.id), label: p.name }));
      case "task":    return this.tasksList.map(t => ({ id: String(t.id), label: `${t.key}: ${t.title}` }));
      default:        return [];
    }
  }

  private async assign() {
    if (!this.selectedId) return;
    this.saving = true;
    this.error = "";
    this.success = "";
    try {
      await artifactAssignments.assign(
        this.artifactType,
        this.artifactSlug,
        this.scope,
        Number(this.selectedId),
      );
      this.success = `Assigned to ${this.scope}`;
      this.selectedId = "";
      // Refresh assignments
      this.assignmentsLoaded = false;
      await this.loadAssignments();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.saving = false;
    }
  }

  private async unassign(scope: AssignmentScope, scopeId: number) {
    try {
      await artifactAssignments.unassign(this.artifactType, this.artifactSlug, scope, scopeId);
      this.assignments = this.assignments.filter(
        a => !(a.scope === scope && a.scopeId === scopeId),
      );
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private scopeLabel(scope: AssignmentScope, scopeId: number): string {
    switch (scope) {
      case "claw":    return this.clawsList.find(c => Number(c.id) === scopeId)?.name ?? `Claw #${scopeId}`;
      case "project": return this.projectsList.find(p => Number(p.id) === scopeId)?.name ?? `Project #${scopeId}`;
      case "task": {
        const t = this.tasksList.find(t => Number(t.id) === scopeId);
        return t ? `${t.key}: ${t.title}` : `Task #${scopeId}`;
      }
      default: return `${scope} #${scopeId}`;
    }
  }

  override render() {
    return html`
      <div style="position:relative;display:inline-block">
        <button
          class="btn btn-secondary btn-sm"
          @click=${() => this.toggle()}
          title="Assign to claw, project, or task"
        >📌 Assign</button>

        ${this.open ? html`
          <div style="position:absolute;top:100%;left:0;z-index:100;margin-top:4px;background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:12px;min-width:320px;box-shadow:0 8px 24px rgba(0,0,0,0.4)">
            <div style="font-size:13px;font-weight:600;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
              <span>Assign "${this.artifactName || this.artifactSlug}"</span>
              <button class="btn btn-secondary btn-sm" style="padding:2px 6px;font-size:11px" @click=${() => { this.open = false; }}>✕</button>
            </div>

            ${this.error ? html`<div style="color:var(--danger,#ff4444);font-size:11px;margin-bottom:8px">${this.error}</div>` : nothing}
            ${this.success ? html`<div style="color:var(--success,#44ff44);font-size:11px;margin-bottom:8px">${this.success}</div>` : nothing}

            ${this.loading ? html`<div style="color:var(--muted);font-size:12px">Loading…</div>` : html`
              <div style="display:flex;gap:6px;margin-bottom:8px">
                ${(["claw", "project", "task"] as AssignmentScope[]).map(s => html`
                  <button
                    class="btn btn-sm ${this.scope === s ? "btn-primary" : "btn-secondary"}"
                    @click=${() => { this.scope = s; this.selectedId = ""; }}
                  >${s.charAt(0).toUpperCase() + s.slice(1)}</button>
                `)}
              </div>

              <div style="display:flex;gap:6px;align-items:center">
                <select class="input" style="flex:1;font-size:12px;padding:4px 8px"
                  .value=${this.selectedId}
                  @change=${(e: Event) => { this.selectedId = (e.target as HTMLSelectElement).value; }}
                >
                  <option value="">Select ${this.scope}…</option>
                  ${this.scopeEntities().map(e => html`
                    <option value=${e.id}>${e.label}</option>
                  `)}
                </select>
                <button
                  class="btn btn-primary btn-sm"
                  ?disabled=${!this.selectedId || this.saving}
                  @click=${() => this.assign()}
                >${this.saving ? "…" : "Assign"}</button>
              </div>

              ${this.assignments.length ? html`
                <div style="margin-top:10px;border-top:1px solid var(--border,#333);padding-top:8px">
                  <div style="font-size:11px;color:var(--muted);margin-bottom:4px">Current assignments</div>
                  ${this.assignments.map(a => html`
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;font-size:12px">
                      <span>
                        <span class="badge badge-gray" style="font-size:10px">${a.scope}</span>
                        ${this.scopeLabel(a.scope, a.scopeId)}
                      </span>
                      <button class="btn btn-danger btn-sm" style="padding:1px 6px;font-size:10px"
                        @click=${() => this.unassign(a.scope, a.scopeId)}
                      >✕</button>
                    </div>
                  `)}
                </div>
              ` : nothing}
            `}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ccl-artifact-assigner": CclArtifactAssigner;
  }
}
