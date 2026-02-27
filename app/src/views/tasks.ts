import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  tasks as tasksApi, projects as projectsApi, claws as clawsApi,
  type Task, type TaskStatus, type TaskPriority, type Project, type Claw, type Execution,
} from "../api.js";

type ViewMode = "kanban" | "list" | "gantt";

const STATUSES: TaskStatus[] = ["todo", "in_progress", "in_review", "done", "blocked"];
const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do", in_progress: "In Progress", in_review: "In Review",
  done: "Done", blocked: "Blocked",
};
const PRIORITIES: TaskPriority[] = ["low", "medium", "high", "critical"];

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  low: "badge-gray", medium: "badge-blue", high: "badge-yellow", critical: "badge-red",
};

@customElement("ccl-tasks")
export class CclTasks extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private items: Task[] = [];
  @state() private projects: Project[] = [];
  @state() private claws: Claw[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private view: ViewMode = "kanban";
  @state() private filterStatus = "";
  @state() private filterProject = "";
  @state() private filterPriority = "";
  @state() private search = "";
  @state() private showArchived = false;

  // Modal
  @state() private showModal = false;
  @state() private editTarget: Task | null = null;
  @state() private form: Partial<Task> = {};
  @state() private saving = false;

  // Task drawer
  @state() private drawerTask: Task | null = null;
  @state() private drawerExecutions: Execution[] = [];
  @state() private drawerTab: "detail" | "executions" = "detail";
  @state() private running = false;

  // Drag
  @state() private dragTaskId = "";

  override connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    this.loading = true;
    try {
      [this.items, this.projects, this.claws] = await Promise.all([
        tasksApi.list({ archived: this.showArchived }),
        projectsApi.list(),
        clawsApi.list(),
      ]);
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private get filtered(): Task[] {
    return this.items.filter(t => {
      if (this.filterStatus && t.status !== this.filterStatus) return false;
      if (this.filterProject && t.projectId !== this.filterProject) return false;
      if (this.filterPriority && t.priority !== this.filterPriority) return false;
      if (this.search && !t.title.toLowerCase().includes(this.search.toLowerCase())) return false;
      return true;
    });
  }

  private tasksForStatus(s: TaskStatus) {
    return this.filtered.filter(t => t.status === s);
  }

  // ---------------------------------------------------------------------------
  // CRUD
  // ---------------------------------------------------------------------------

  private openCreate() {
    this.editTarget = null;
    this.form = { status: "todo", priority: "medium" };
    this.showModal = true;
  }

  private openEdit(t: Task, e?: Event) {
    e?.stopPropagation();
    this.editTarget = t;
    this.form = { ...t };
    this.showModal = true;
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      if (this.editTarget) {
        const updated = await tasksApi.update(this.editTarget.id, this.form);
        this.items = this.items.map(i => i.id === updated.id ? updated : i);
        if (this.drawerTask?.id === updated.id) this.drawerTask = updated;
      } else {
        const created = await tasksApi.create(this.form);
        this.items = [created, ...this.items];
      }
      this.showModal = false;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.saving = false;
    }
  }

  private async remove(t: Task, e: Event) {
    e.stopPropagation();
    if (!confirm(`Delete "${t.title}"?`)) return;
    await tasksApi.remove(t.id);
    this.items = this.items.filter(i => i.id !== t.id);
    if (this.drawerTask?.id === t.id) this.drawerTask = null;
  }

  private async patchStatus(id: string, status: TaskStatus) {
    const updated = await tasksApi.update(id, { status });
    this.items = this.items.map(i => i.id === id ? updated : i);
    if (this.drawerTask?.id === id) this.drawerTask = updated;
  }

  private async runTask(t: Task, e: Event) {
    e.stopPropagation();
    this.running = true;
    try {
      const exec = await tasksApi.run(t.id);
      const updated = await tasksApi.update(t.id, { status: "in_progress" });
      this.items = this.items.map(i => i.id === updated.id ? updated : i);
      if (this.drawerTask?.id === t.id) {
        this.drawerTask = updated;
        this.drawerExecutions = [exec, ...this.drawerExecutions];
      }
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.running = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Drawer
  // ---------------------------------------------------------------------------

  private async openDrawer(t: Task) {
    this.drawerTask = t;
    this.drawerTab = "detail";
    try {
      this.drawerExecutions = await tasksApi.executions(t.id);
    } catch { this.drawerExecutions = []; }
  }

  private closeDrawer() { this.drawerTask = null; }

  // ---------------------------------------------------------------------------
  // Drag & Drop (kanban)
  // ---------------------------------------------------------------------------

  private dragStart(id: string) { this.dragTaskId = id; }
  private dragOver(e: DragEvent) { e.preventDefault(); }
  private async drop(e: DragEvent, status: TaskStatus) {
    e.preventDefault();
    if (this.dragTaskId) {
      await this.patchStatus(this.dragTaskId, status);
      this.dragTaskId = "";
    }
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private projectName(id?: string) {
    return id ? (this.projects.find(p => p.id === id)?.name ?? id) : "—";
  }

  private clawName(id?: string) {
    return id ? (this.claws.find(c => c.id === id)?.name ?? id) : "Unassigned";
  }

  private priorityBadge(p: TaskPriority) {
    return html`<span class="badge ${PRIORITY_COLOR[p]}">${p}</span>`;
  }

  private statusBadge(s: TaskStatus) {
    const map: Record<TaskStatus, string> = {
      todo: "badge-gray", in_progress: "badge-blue",
      in_review: "badge-yellow", done: "badge-green", blocked: "badge-red",
    };
    return html`<span class="badge ${map[s]}">${STATUS_LABELS[s]}</span>`;
  }

  private formatDate(d?: string) {
    if (!d) return "";
    return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  override render() {
    return html`
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="page-title">Tasks</div>
          <div class="page-sub">${this.filtered.length} task${this.filtered.length !== 1 ? "s" : ""}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <!-- View toggle -->
          <div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
            ${(["kanban", "list", "gantt"] as ViewMode[]).map(v => html`
              <button
                class="btn btn-ghost btn-sm"
                style="border-radius:0;${this.view === v ? "background:var(--accent-subtle);color:var(--accent);" : ""}"
                @click=${() => { this.view = v; }}
                title="${v}"
              >${v}</button>
            `)}
          </div>
          <button class="btn btn-primary" @click=${this.openCreate}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New task
          </button>
        </div>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <!-- Filters -->
      <div class="filters" style="margin-bottom:16px">
        <input class="input" style="max-width:200px;height:32px;padding:4px 10px"
          placeholder="Search…" .value=${this.search}
          @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${(e: Event) => { this.filterStatus = (e.target as HTMLSelectElement).value; }}>
          <option value="">All statuses</option>
          ${STATUSES.map(s => html`<option value=${s}>${STATUS_LABELS[s]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${(e: Event) => { this.filterProject = (e.target as HTMLSelectElement).value; }}>
          <option value="">All projects</option>
          ${this.projects.map(p => html`<option value=${p.id}>${p.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${(e: Event) => { this.filterPriority = (e.target as HTMLSelectElement).value; }}>
          <option value="">All priorities</option>
          ${PRIORITIES.map(p => html`<option value=${p}>${p}</option>`)}
        </select>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);cursor:pointer">
          <input type="checkbox" .checked=${this.showArchived}
            @change=${async (e: Event) => { this.showArchived = (e.target as HTMLInputElement).checked; await this.load(); }}>
          Archived
        </label>
      </div>

      ${this.loading
        ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.view === "kanban" ? this.renderKanban()
        : this.view === "list"   ? this.renderList()
        :                          this.renderGantt()}

      ${this.showModal ? this.renderModal() : ""}
      ${this.drawerTask ? this.renderDrawer() : ""}
    `;
  }

  // ---------------------------------------------------------------------------
  // Kanban
  // ---------------------------------------------------------------------------

  private renderKanban() {
    return html`
      <div class="kanban">
        ${STATUSES.map(s => html`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${(e: DragEvent) => this.drop(e, s)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${STATUS_LABELS[s]}</div>
              <div class="kanban-col-count">${this.tasksForStatus(s).length}</div>
            </div>
            <div class="kanban-col-body">
              ${this.tasksForStatus(s).map(t => html`
                <div class="task-card"
                  draggable="true"
                  @dragstart=${() => this.dragStart(t.id)}
                  @click=${() => this.openDrawer(t)}>
                  <div class="task-card-title">${t.title}</div>
                  <div class="task-card-meta">
                    <span class="task-key">${t.key}</span>
                    ${this.priorityBadge(t.priority)}
                    ${t.assignedClawId
                      ? html`<span style="font-size:11px;color:var(--muted)">${this.clawName(t.assignedClawId)}</span>`
                      : ""}
                    ${t.dueDate ? html`<span style="font-size:11px;color:var(--muted);margin-left:auto">${this.formatDate(t.dueDate)}</span>` : ""}
                  </div>
                </div>
              `)}
              <button
                class="btn btn-ghost btn-sm"
                style="border-style:dashed;width:100%;margin-top:4px"
                @click=${() => { this.form = { status: s, priority: "medium" }; this.editTarget = null; this.showModal = true; }}>
                + Add task
              </button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // List
  // ---------------------------------------------------------------------------

  private renderList() {
    const items = this.filtered;
    if (items.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-title">No tasks found</div></div>`;
    }
    return html`
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Project</th>
              <th>Claw</th>
              <th>Due</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items.map(t => html`
              <tr style="cursor:pointer" @click=${() => this.openDrawer(t)}>
                <td>
                  <div style="font-weight:500;color:var(--text-strong)">${t.title}</div>
                  <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.key}</div>
                </td>
                <td>${this.statusBadge(t.status)}</td>
                <td>${this.priorityBadge(t.priority)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.projectName(t.projectId)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.clawName(t.assignedClawId)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.formatDate(t.dueDate)}</td>
                <td>
                  <div style="display:flex;gap:4px" @click=${(e: Event) => e.stopPropagation()}>
                    <button class="btn btn-ghost btn-sm" @click=${(e: Event) => this.openEdit(t, e)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${(e: Event) => this.remove(t, e)}>Delete</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Gantt
  // ---------------------------------------------------------------------------

  private renderGantt() {
    const withDates = this.filtered.filter(t => t.dueDate || t.createdAt);
    if (withDates.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;
    }

    // Build month headers
    const dates = withDates.map(t => new Date(t.dueDate ?? t.createdAt));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    minDate.setDate(1);
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(0);

    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / 86400000) + 1;
    const dayW = 24; // px per day
    const totalW = totalDays * dayW;

    const months: Array<{ label: string; left: number; width: number }> = [];
    const cur = new Date(minDate);
    while (cur <= maxDate) {
      const start = Math.floor((cur.getTime() - minDate.getTime()) / 86400000);
      const daysInMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
      months.push({
        label: cur.toLocaleDateString(undefined, { month: "short", year: "2-digit" }),
        left: start * dayW,
        width: daysInMonth * dayW,
      });
      cur.setMonth(cur.getMonth() + 1);
      cur.setDate(1);
    }

    const today = new Date();
    const todayLeft = Math.floor((today.getTime() - minDate.getTime()) / 86400000) * dayW;

    return html`
      <div style="overflow-x:auto">
        <div style="min-width:${totalW + 200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${months.map(m => html`
              <div style="min-width:${m.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${m.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${todayLeft >= 0 && todayLeft <= totalW ? html`
              <div style="position:absolute;left:${200 + todayLeft}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            ` : ""}

            ${withDates.map(t => {
              const start = new Date(t.createdAt);
              const end = new Date(t.dueDate ?? t.createdAt);
              const startX = Math.floor((start.getTime() - minDate.getTime()) / 86400000);
              const widthDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
              const statusColors: Record<string, string> = {
                done: "var(--ok)", in_progress: "var(--accent)", blocked: "var(--danger)",
                in_review: "var(--warn)", todo: "var(--muted)",
              };
              return html`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${t.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${startX * dayW}px;
                        width:${widthDays * dayW}px;
                        background:${statusColors[t.status] ?? "var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${() => this.openDrawer(t)}
                      title="${t.title}"
                    >
                      ${t.key}
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------------

  private renderModal() {
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
        <div class="modal" style="max-width:540px">
          <div class="modal-title">${this.editTarget ? "Edit task" : "New task"}</div>
          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
          <form @submit=${this.save} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="What needs to be done?" .value=${this.form.title ?? ""}
                @input=${(e: InputEvent) => { this.form = { ...this.form, title: (e.target as HTMLInputElement).value }; }} required>
            </div>
            <div class="field">
              <label class="label">Description <span class="label-hint">(optional)</span></label>
              <textarea class="textarea" placeholder="Additional context…" .value=${this.form.description ?? ""}
                @input=${(e: InputEvent) => { this.form = { ...this.form, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Status</label>
                <select class="select" .value=${this.form.status ?? "todo"}
                  @change=${(e: Event) => { this.form = { ...this.form, status: (e.target as HTMLSelectElement).value as TaskStatus }; }}>
                  ${STATUSES.map(s => html`<option value=${s}>${STATUS_LABELS[s]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority ?? "medium"}
                  @change=${(e: Event) => { this.form = { ...this.form, priority: (e.target as HTMLSelectElement).value as TaskPriority }; }}>
                  ${PRIORITIES.map(p => html`<option value=${p}>${p}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Project</label>
                <select class="select" .value=${this.form.projectId ?? ""}
                  @change=${(e: Event) => { this.form = { ...this.form, projectId: (e.target as HTMLSelectElement).value || undefined }; }}>
                  <option value="">No project</option>
                  ${this.projects.map(p => html`<option value=${p.id}>${p.name}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Assign to Claw</label>
                <select class="select" .value=${this.form.assignedClawId ?? ""}
                  @change=${(e: Event) => { this.form = { ...this.form, assignedClawId: (e.target as HTMLSelectElement).value || undefined }; }}>
                  <option value="">Unassigned</option>
                  ${this.claws.map(c => html`<option value=${c.id}>${c.name}</option>`)}
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Due date <span class="label-hint">(optional)</span></label>
              <input class="input" type="date" .value=${this.form.dueDate?.split("T")[0] ?? ""}
                @change=${(e: Event) => { this.form = { ...this.form, dueDate: (e.target as HTMLInputElement).value || undefined }; }}>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving ? "Saving…" : this.editTarget ? "Save changes" : "Create task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Drawer
  // ---------------------------------------------------------------------------

  private renderDrawer() {
    const t = this.drawerTask!;
    return html`
      <div class="panel-overlay" @click=${this.closeDrawer}></div>
      <div class="panel-drawer" style="--panel-width:480px">
        <div class="panel-header">
          <div>
            <div class="panel-title">${t.title}</div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.key}</div>
          </div>
          <button class="panel-close" @click=${this.closeDrawer}>
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="panel-tabs">
          ${(["detail", "executions"] as const).map(tab => html`
            <button class="panel-tab ${this.drawerTab === tab ? "active" : ""}"
              @click=${() => { this.drawerTab = tab; }}>${tab}</button>
          `)}
        </div>
        <div class="panel-body" style="padding:20px">
          ${this.drawerTab === "detail" ? this.renderDrawerDetail(t) : this.renderDrawerExecutions(t)}
        </div>
      </div>
    `;
  }

  private renderDrawerDetail(t: Task) {
    return html`
      <div style="display:grid;gap:16px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${this.statusBadge(t.status)}
          ${this.priorityBadge(t.priority)}
        </div>

        ${t.description ? html`
          <div class="card">
            <div class="card-title" style="margin-bottom:8px">Description</div>
            <div style="font-size:13px;color:var(--text);line-height:1.6;white-space:pre-wrap">${t.description}</div>
          </div>` : ""}

        <div class="card">
          <div class="card-title" style="margin-bottom:12px">Details</div>
          <div style="display:grid;gap:10px">
            ${[
              ["Project",  this.projectName(t.projectId)],
              ["Assigned", this.clawName(t.assignedClawId)],
              ["Due date", this.formatDate(t.dueDate) || "None"],
              ["Created",  this.formatDate(t.createdAt)],
            ].map(([label, val]) => html`
              <div style="display:flex;justify-content:space-between;font-size:13px">
                <span style="color:var(--muted)">${label}</span>
                <span style="color:var(--text)">${val}</span>
              </div>`)}
          </div>
        </div>

        <!-- Change status -->
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Move to</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${STATUSES.filter(s => s !== t.status).map(s => html`
              <button class="btn btn-secondary btn-sm"
                @click=${() => this.patchStatus(t.id, s)}>${STATUS_LABELS[s]}</button>
            `)}
          </div>
        </div>

        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" ?disabled=${this.running} @click=${(e: Event) => this.runTask(t, e)}>
            ${this.running ? "Running…" : "Run task"}
          </button>
          <button class="btn btn-secondary" @click=${(e: Event) => this.openEdit(t, e)}>Edit</button>
          <button class="btn btn-danger" @click=${(e: Event) => this.remove(t, e)}>Delete</button>
        </div>
      </div>
    `;
  }

  private renderDrawerExecutions(t: Task) {
    if (this.drawerExecutions.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-title">No executions yet</div></div>`;
    }
    const statusColor: Record<string, string> = {
      completed: "badge-green", failed: "badge-red",
      running: "badge-blue", pending: "badge-gray", cancelled: "badge-gray",
    };
    return html`
      <div style="display:grid;gap:10px">
        ${this.drawerExecutions.map(ex => html`
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="badge ${statusColor[ex.status] ?? "badge-gray"}">${ex.status}</span>
              <span style="font-size:11px;color:var(--muted)">${this.formatDate(ex.createdAt)}</span>
            </div>
            ${ex.result ? html`
              <div class="log-wrap" style="max-height:120px;overflow-y:auto;font-size:11px">${ex.result}</div>
            ` : ""}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-tasks": CclTasks; }
}
