import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./claw/chat.js";
import "./claw/instances.js";
import "./claw/workspace.js";
import "./claw/claw-logs.js";
import "./execution-timeline.js";
import {
  llm,
  projects as projectsApi,
  tasks as tasksApi,
  claws as clawsApi,
  tenants,
  type Project,
  type Task,
  type Claw,
  type SourceControlIntegration,
  type SourceControlProvider,
  type TaskPriority,
  type TaskStatus,
} from "../api.js";
import { renderTaskKanban } from "../components/task-kanban.js";

const STATUSES: TaskStatus[] = ["todo", "in_progress", "in_review", "done", "blocked"];
const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
  blocked: "Blocked",
};

type WorkspaceTab = "details" | "board" | "tasks" | "prds" | "brain" | "chat" | "instances" | "workspace" | "logs" | "timeline";
type BrainRole = "user" | "assistant";

type ProjectBrainAction =
  | {
      type: "create_task";
      title: string;
      description?: string;
      priority?: TaskPriority;
      status?: TaskStatus;
      dueDate?: string;
      assignedClawId?: string;
      assignedClawName?: string;
    }
  | {
      type: "assign_task";
      taskId?: string;
      taskKey?: string;
      taskTitle?: string;
      assignedClawId?: string;
      assignedClawName?: string;
    }
  | {
      type: "save_prd";
      title?: string;
      content: string;
    }
  | {
      type: "set_project_details";
      description?: string;
      rootWorkingDirectory?: string;
    };

interface BrainMessage {
  id: string;
  role: BrainRole;
  text: string;
}

interface BrainActionState {
  action: ProjectBrainAction;
  status: "idle" | "running" | "done" | "error";
  result?: string;
}

@customElement("ccl-projects")
export class CclProjects extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";
  @property() selectedProjectId = "";
  @property({ type: Boolean }) openCreate = false;

  @state() private items: Project[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private editTarget: Project | null = null;
  @state() private form = { name: "", description: "", rootWorkingDirectory: "" };
  @state() private saving = false;

  @state() private panelOpen = false;
  @state() private activeProject: Project | null = null;
  @state() private workspaceLoading = false;
  @state() private workspaceTab: WorkspaceTab = "details";
  @state() private projectTasks: Task[] = [];
  @state() private projectClaws: Claw[] = [];
  @state() private taskForm = {
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    status: "todo" as TaskStatus,
    assignedClawId: "",
    dueDate: "",
  };
  @state() private taskSaving = false;
  @state() private sourceControlIntegrations: SourceControlIntegration[] = [];
  @state() private sourceControlLoading = false;
  @state() private sourceControlSaving = false;
  @state() private integrationSaving = false;
  @state() private sourceControlForm = {
    integrationId: "",
    repoFullName: "",
    repoUrl: "",
  };
  @state() private integrationForm: {
    provider: SourceControlProvider;
    name: string;
    accountIdentifier: string;
    hostUrl: string;
  } = {
    provider: "github",
    name: "",
    accountIdentifier: "",
    hostUrl: "",
  };

  @state() private prdTitle = "Project PRD";
  @state() private prdMarkdown = "";
  @state() private prdUpdatedAt = "";

  @state() private brainInput = "";
  @state() private brainSending = false;
  @state() private brainMessages: BrainMessage[] = [];
  @state() private brainActions: BrainActionState[] = [];
  @state() private dragTaskId = "";
  @state() private activeProjectClawId = "";

  override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("openCreate") && this.openCreate) {
      this.openCreateProject();
    }

    if (this.items.length > 0 && changed.has("selectedProjectId") && this.selectedProjectId) {
      const selected = this.items.find((item) => String(item.id) === this.selectedProjectId);
      if (selected) void this.openWorkspace(selected);
    }

    if (this.items.length > 0 && changed.has("items") && this.selectedProjectId && !this.panelOpen) {
      const selected = this.items.find((item) => String(item.id) === this.selectedProjectId);
      if (selected) void this.openWorkspace(selected);
    }
  }

  private async load() {
    this.loading = true;
    try {
      this.items = await projectsApi.list();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private openCreateProject() {
    this.editTarget = null;
    this.form = { name: "", description: "", rootWorkingDirectory: "" };
    this.showModal = true;
  }

  private openEdit(p: Project) {
    this.editTarget = p;
    this.form = {
      name: p.name,
      description: p.description ?? "",
      rootWorkingDirectory: p.rootWorkingDirectory ?? "",
    };
    this.showModal = true;
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      if (this.editTarget) {
        const updated = await projectsApi.update(this.editTarget.id, this.form);
        this.items = this.items.map(i => i.id === updated.id ? updated : i);
        if (this.activeProject?.id === updated.id) this.activeProject = updated;
      } else {
        const created = await projectsApi.create(this.form);
        this.items = [created, ...this.items];
      }
      this.showModal = false;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.saving = false;
    }
  }

  private async removeProject(p?: Project | null) {
    if (!p?.id) return;
    if (!confirm(`Delete project "${p.name ?? "this project"}"? This cannot be undone.`)) return;
    try {
      await projectsApi.remove(p.id);
      this.items = this.items.filter(i => i.id !== p.id);
      if (this.activeProject?.id === p.id) this.closeWorkspace();
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private projectTaskList() {
    if (!this.activeProject) return [];
    return this.projectTasks.filter((task) => String(task.projectId ?? "") === String(this.activeProject?.id));
  }

  private statusBadge(s: TaskStatus | string) {
    const map: Record<string, string> = {
      todo: "badge-gray",
      in_progress: "badge-blue",
      in_review: "badge-yellow",
      done: "badge-green",
      blocked: "badge-red",
      active: "badge-green",
      completed: "badge-blue",
      archived: "badge-gray",
      on_hold: "badge-yellow",
    };
    const label = STATUS_LABELS[s as TaskStatus] ?? s.replace("_", " ");
    return html`<span class="badge ${map[s] ?? "badge-gray"}">${label}</span>`;
  }

  private clawName(id?: string) {
    return id ? (this.projectClaws.find((claw) => claw.id === id)?.name ?? id) : "Unassigned";
  }

  private priorityBadge(p: TaskPriority) {
    const map: Record<TaskPriority, string> = {
      low: "badge-gray",
      medium: "badge-blue",
      high: "badge-yellow",
      critical: "badge-red",
    };
    return html`<span class="badge ${map[p]}">${p}</span>`;
  }

  private formatDate(d?: string) {
    if (!d) return "";
    return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  private renderMarkdown(text: string) {
    const raw = marked.parse(text, { gfm: true, breaks: true });
    const htmlString = typeof raw === "string" ? raw : "";
    const clean = DOMPurify.sanitize(htmlString);
    return html`<div class="md-content">${unsafeHTML(clean)}</div>`;
  }

  private syncSourceControlForm(project: Project) {
    this.sourceControlForm = {
      integrationId: project.sourceControlIntegrationId == null ? "" : String(project.sourceControlIntegrationId),
      repoFullName: project.sourceControlRepoFullName ?? "",
      repoUrl: project.sourceControlRepoUrl ?? "",
    };
  }

  private async openWorkspace(project: Project) {
    this.panelOpen = true;
    this.workspaceTab = "details";
    this.activeProject = project;
    this.syncSourceControlForm(project);
    this.selectedProjectId = String(project.id);
    await this.loadWorkspace();

    if (!project.rootWorkingDirectory && this.brainMessages.length === 0) {
      this.workspaceTab = "brain";
      this.brainMessages = [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "To onboard this project, I need the project root path where `.coderClaw` should live. Reply with the path and I will save it to project details.",
        },
      ];
    }
  }

  private closeWorkspace() {
    this.panelOpen = false;
    this.activeProject = null;
    this.selectedProjectId = "";
    this.dragTaskId = "";
    this.projectTasks = [];
    this.projectClaws = [];
    this.sourceControlIntegrations = [];
    this.workspaceTab = "details";
    this.activeProjectClawId = "";
  }

  private async loadWorkspace() {
    if (!this.activeProject) return;
    this.workspaceLoading = true;
    try {
      const [tasks, claws, integrations] = await Promise.all([
        tasksApi.list(),
        projectsApi.listClaws(String(this.activeProject.id)),
        this.tenantId ? tenants.listSourceControlIntegrations(this.tenantId) : Promise.resolve([]),
      ]);
      this.projectTasks = tasks.filter((task) => String(task.projectId ?? "") === String(this.activeProject?.id));
      this.projectClaws = claws;
      // Default to first associated claw; let <ccl-claw-chat> report live connection state
      if (!this.activeProjectClawId && claws.length > 0) {
        this.activeProjectClawId = String(claws[0].id);
      }
      this.sourceControlIntegrations = integrations;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.workspaceLoading = false;
    }
  }

  private async reassignTask(task: Task, clawId: string) {
    try {
      const updated = await tasksApi.update(task.id, { assignedClawId: clawId || "" });
      this.projectTasks = this.projectTasks.map((item) => (item.id === task.id ? updated : item));
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private async patchTaskStatus(taskId: string, status: TaskStatus) {
    try {
      const updated = await tasksApi.update(taskId, { status });
      this.projectTasks = this.projectTasks.map((item) => (item.id === taskId ? updated : item));
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private dragStart(taskId: string) {
    this.dragTaskId = taskId;
  }

  private dragOver(e: DragEvent) {
    e.preventDefault();
  }

  private async drop(e: DragEvent, status: TaskStatus) {
    e.preventDefault();
    if (!this.dragTaskId) {
      return;
    }
    const dragged = this.projectTasks.find((task) => task.id === this.dragTaskId);
    const draggedTaskId = this.dragTaskId;
    this.dragTaskId = "";
    if (!dragged || dragged.status === status) {
      return;
    }
    await this.patchTaskStatus(draggedTaskId, status);
  }

  private async createTask() {
    if (!this.activeProject || !this.taskForm.title.trim() || this.taskSaving) return;
    this.taskSaving = true;
    try {
      const created = await tasksApi.create({
        projectId: String(this.activeProject.id),
        title: this.taskForm.title.trim(),
        description: this.taskForm.description || undefined,
        priority: this.taskForm.priority,
        status: this.taskForm.status,
        assignedClawId: this.taskForm.assignedClawId || undefined,
        dueDate: this.taskForm.dueDate || undefined,
      });
      this.projectTasks = [created, ...this.projectTasks];
      this.taskForm = {
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        assignedClawId: "",
        dueDate: "",
      };
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.taskSaving = false;
    }
  }

  private async saveSourceControlAssignment() {
    if (!this.activeProject || this.sourceControlSaving) return;
    this.sourceControlSaving = true;
    try {
      const integrationId = this.sourceControlForm.integrationId
        ? Number(this.sourceControlForm.integrationId)
        : null;

      const updated = await projectsApi.update(this.activeProject.id, {
        sourceControlIntegrationId: integrationId,
        sourceControlRepoFullName: this.sourceControlForm.repoFullName.trim() || null,
        sourceControlRepoUrl: this.sourceControlForm.repoUrl.trim() || null,
      });

      this.activeProject = updated;
      this.items = this.items.map((item) => (item.id === updated.id ? updated : item));
      this.syncSourceControlForm(updated);
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.sourceControlSaving = false;
    }
  }

  private async createIntegrationFromProject() {
    if (!this.tenantId || this.integrationSaving) return;
    if (!this.integrationForm.name.trim() || !this.integrationForm.accountIdentifier.trim()) return;
    this.integrationSaving = true;
    try {
      await tenants.createSourceControlIntegration(this.tenantId, {
        provider: this.integrationForm.provider,
        name: this.integrationForm.name.trim(),
        accountIdentifier: this.integrationForm.accountIdentifier.trim(),
        hostUrl: this.integrationForm.hostUrl.trim() || null,
      });
      this.integrationForm = {
        provider: this.integrationForm.provider,
        name: "",
        accountIdentifier: "",
        hostUrl: "",
      };
      this.sourceControlLoading = true;
      this.sourceControlIntegrations = await tenants.listSourceControlIntegrations(this.tenantId);
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.sourceControlLoading = false;
      this.integrationSaving = false;
    }
  }

  private async toggleIntegrationActive(integration: SourceControlIntegration) {
    if (!this.tenantId) return;
    try {
      const updated = await tenants.updateSourceControlIntegration(this.tenantId, integration.id, {
        isActive: !integration.isActive,
      });
      this.sourceControlIntegrations = this.sourceControlIntegrations.map((item) => (
        item.id === updated.id ? updated : item
      ));
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private async deleteIntegrationFromProject(integration: SourceControlIntegration) {
    if (!this.tenantId) return;
    if (!confirm(`Delete integration "${integration.name}"?`)) return;
    try {
      await tenants.deleteSourceControlIntegration(this.tenantId, integration.id);
      this.sourceControlIntegrations = this.sourceControlIntegrations.filter((item) => item.id !== integration.id);

      if (String(integration.id) === this.sourceControlForm.integrationId) {
        this.sourceControlForm = { integrationId: "", repoFullName: "", repoUrl: "" };
      }
    } catch (e) {
      this.error = (e as Error).message;
    }
  }

  private projectBrainContext() {
    return {
      project: this.activeProject
        ? {
            id: this.activeProject.id,
            key: this.activeProject.key,
            name: this.activeProject.name,
            status: this.activeProject.status,
            description: this.activeProject.description ?? "",
            rootWorkingDirectory: this.activeProject.rootWorkingDirectory ?? "",
          }
        : null,
      tasks: this.projectTaskList().map((task) => ({
        id: task.id,
        key: task.key,
        title: task.title,
        status: task.status,
        priority: task.priority,
        assignedClawId: task.assignedClawId ?? null,
      })),
      claws: this.projectClaws.map((claw) => ({ id: claw.id, name: claw.name, status: claw.status })),
    };
  }

  private parseBrainActions(text: string): ProjectBrainAction[] {
    const match = text.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);
    if (!match) return [];
    try {
      const parsed = JSON.parse(match[1]) as { actions?: ProjectBrainAction[] };
      if (!Array.isArray(parsed.actions)) return [];
      return parsed.actions.filter((action) => (
        action &&
        typeof action === "object" &&
        (action.type === "create_task" || action.type === "assign_task" || action.type === "save_prd" || action.type === "set_project_details")
      ));
    } catch {
      return [];
    }
  }

  private stripBrainActions(text: string): string {
    return text.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi, "").trim();
  }

  private brainMessagesPayload() {
    const systemPrompt = [
      "You are Brain helping inside a project workspace.",
      "Respond in markdown.",
      "When useful, include machine-readable actions in <ccl-actions>{\"actions\":[...]}</ccl-actions>.",
      "Allowed actions:",
      "- create_task: { type, title, description?, priority?, status?, dueDate?, assignedClawId?, assignedClawName? }",
      "- assign_task: { type, taskId?, taskKey?, taskTitle?, assignedClawId?, assignedClawName? }",
      "- save_prd: { type, title?, content }",
      "- set_project_details: { type, description?, rootWorkingDirectory? }",
      "If rootWorkingDirectory is missing, ask for it and include set_project_details action once user provides it.",
      "Keep output concise and execution oriented.",
    ].join("\n");

    return [
      { role: "system" as const, content: systemPrompt },
      { role: "system" as const, content: `Project context JSON:\n${JSON.stringify(this.projectBrainContext())}` },
      ...this.brainMessages.slice(-14).map((message) => ({ role: message.role, content: message.text })),
    ];
  }

  private quickBrainPrompt(kind: "describe" | "prd" | "tasks") {
    if (!this.activeProject) return;
    if (kind === "describe") {
      this.brainInput = `Summarize project ${this.activeProject.name} and current task health.`;
      return;
    }
    if (kind === "prd") {
      this.brainInput = `Draft a complete PRD for ${this.activeProject.name} and include a save_prd action.`;
      return;
    }
    this.brainInput = `Create an execution-ready task plan for ${this.activeProject.name} with create_task actions and assignee suggestions.`;
  }

  private async sendBrain() {
    const text = this.brainInput.trim();
    if (!text || this.brainSending || !this.activeProject) return;

    this.brainMessages = [...this.brainMessages, { id: crypto.randomUUID(), role: "user", text }];
    this.brainInput = "";
    this.brainSending = true;

    try {
      const response = await llm.chat(this.brainMessagesPayload(), { temperature: 0.25, maxTokens: 1800 });
      const content = response.choices?.[0]?.message?.content?.trim() ?? "I could not generate a response.";
      const actions = this.parseBrainActions(content);
      if (actions.length) {
        this.brainActions = actions.map((action) => ({ action, status: "idle" }));
      }
      const cleanContent = this.stripBrainActions(content) || "Done.";
      this.brainMessages = [...this.brainMessages, { id: crypto.randomUUID(), role: "assistant", text: cleanContent }];
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      this.brainMessages = [...this.brainMessages, { id: crypto.randomUUID(), role: "assistant", text: `Error: ${message}` }];
    } finally {
      this.brainSending = false;
    }
  }

  private resolveClaw(action: { assignedClawId?: string; assignedClawName?: string }) {
    if (action.assignedClawId) {
      const byId = this.projectClaws.find((claw) => claw.id === action.assignedClawId);
      if (byId) return byId;
    }
    if (action.assignedClawName) {
      const byName = this.projectClaws.find((claw) => claw.name.toLowerCase() === action.assignedClawName?.toLowerCase());
      if (byName) return byName;
    }
    return null;
  }

  private async applyBrainAction(index: number) {
    const entry = this.brainActions[index];
    if (!entry || entry.status === "running" || !this.activeProject) return;

    this.brainActions = this.brainActions.map((action, i) => (i === index ? { ...action, status: "running", result: undefined } : action));

    try {
      if (entry.action.type === "set_project_details") {
        const updated = await projectsApi.update(this.activeProject.id, {
          description: entry.action.description ?? this.activeProject.description,
          rootWorkingDirectory: entry.action.rootWorkingDirectory ?? this.activeProject.rootWorkingDirectory,
        });
        this.activeProject = updated;
        this.items = this.items.map((item) => (item.id === updated.id ? updated : item));
        this.brainActions = this.brainActions.map((action, i) => (i === index ? { ...action, status: "done", result: "Updated project details" } : action));
        return;
      }

      if (entry.action.type === "save_prd") {
        this.prdTitle = entry.action.title?.trim() || "Project PRD";
        this.prdMarkdown = entry.action.content;
        this.prdUpdatedAt = new Date().toISOString();
        this.brainActions = this.brainActions.map((action, i) => (i === index ? { ...action, status: "done", result: "Saved PRD draft" } : action));
        return;
      }

      if (entry.action.type === "create_task") {
        const claw = this.resolveClaw(entry.action);
        const created = await tasksApi.create({
          projectId: String(this.activeProject.id),
          title: entry.action.title,
          description: entry.action.description,
          priority: entry.action.priority ?? "medium",
          status: entry.action.status ?? "todo",
          dueDate: entry.action.dueDate,
          assignedClawId: claw?.id,
        });
        this.projectTasks = [created, ...this.projectTasks];
        this.brainActions = this.brainActions.map((action, i) => (i === index ? { ...action, status: "done", result: `Created task ${created.key}` } : action));
        return;
      }

      const action = entry.action;
      const task = this.projectTaskList().find((item) => (
        (action.taskId && item.id === action.taskId) ||
        (action.taskKey && item.key.toLowerCase() === action.taskKey.toLowerCase()) ||
        (action.taskTitle && item.title.toLowerCase() === action.taskTitle.toLowerCase())
      ));

      if (!task) {
        throw new Error("Task not found in this project for assignment");
      }

      const claw = this.resolveClaw(action);
      if (!claw) {
        throw new Error("Target claw not found for assignment");
      }

      const updated = await tasksApi.update(task.id, { assignedClawId: claw.id });
      this.projectTasks = this.projectTasks.map((item) => (item.id === updated.id ? updated : item));
      this.brainActions = this.brainActions.map((item, i) => (i === index ? { ...item, status: "done", result: `Assigned ${updated.key} → ${claw.name}` } : item));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      this.brainActions = this.brainActions.map((action, i) => (i === index ? { ...action, status: "error", result: message } : action));
    }
  }

  private async applyAllBrainActions() {
    for (let i = 0; i < this.brainActions.length; i++) {
      if (this.brainActions[i]?.status === "idle" || this.brainActions[i]?.status === "error") {
        await this.applyBrainAction(i);
      }
    }
  }

  private clearBrain() {
    this.brainInput = "";
    this.brainMessages = [];
    this.brainActions = [];
  }

  override render() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreateProject}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New project
        </button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      ${this.loading
        ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.items.length === 0
          ? html`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreateProject}>Create project</button>
            </div>`
          : html`
            <div class="grid grid-3">
              ${this.items.map(p => html`
                <div class="card" style="cursor:pointer;transition:border-color .15s"
                  @click=${() => void this.openWorkspace(p)}
                  @mouseenter=${(e: Event) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                  @mouseleave=${(e: Event) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                  <div class="card-header">
                    <div>
                      <div class="card-title">${p.name}</div>
                      <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${p.key}</div>
                    </div>
                    ${this.statusBadge(p.status)}
                  </div>
                  ${p.description
                    ? html`<div
                        title=${p.description}
                        style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;"
                      >${p.description}</div>`
                    : ""}
                  <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                    ${p.taskCount != null
                      ? html`<span style="font-size:12px;color:var(--muted)">${p.taskCount} task${p.taskCount !== 1 ? "s" : ""}</span>`
                      : ""}
                    <div style="flex:1"></div>
                    <button class="btn btn-ghost btn-sm" @click=${(e: Event) => { e.stopPropagation(); this.openEdit(p); }}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${(e: Event) => { e.stopPropagation(); void this.removeProject(p); }}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal ? this.renderModal() : ""}
      ${this.panelOpen && this.activeProject ? this.renderWorkspacePanel() : ""}
    `;
  }

  private renderWorkspacePanel() {
    const project = this.activeProject!;
    const tasks = this.projectTaskList();

    return html`
      <div class="panel-overlay" @click=${() => this.closeWorkspace()}></div>
      <div class="panel-drawer" style="--panel-width:min(1100px,96vw)">
        <div class="panel-header">
          <div>
            <div class="panel-title">${project.name}</div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${project.key}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            ${this.statusBadge(project.status)}
            <button class="panel-close" @click=${() => this.closeWorkspace()}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div class="panel-tabs">
          ${([
            ["details", "Project details"],
            ["board", "Task board"],
            ["tasks", "Tasks"],
            ["prds", "PRDs"],
            ["brain", "Brain"],
            ["chat", "Chat"],
            ["instances", "Instances"],
            ["workspace", "Workspace"],
            ["logs", "Logs"],
            ["timeline", "Timeline"],
          ] as Array<[WorkspaceTab, string]>).map(([tab, label]) => html`
            <button class="panel-tab ${this.workspaceTab === tab ? "active" : ""}" @click=${() => { this.workspaceTab = tab; }}>${label}</button>
          `)}
        </div>

        <div class="panel-body" style="padding:18px">
          ${this.workspaceLoading
            ? html`<div style="color:var(--muted);font-size:13px">Loading workspace…</div>`
            : this.workspaceTab === "details"
              ? this.renderProjectDetails(project, tasks)
              : this.workspaceTab === "board"
                ? this.renderTaskBoard(tasks)
                : this.workspaceTab === "tasks"
                  ? this.renderTasksTab(tasks)
                  : this.workspaceTab === "prds"
                    ? this.renderPrdsTab()
                    : this.workspaceTab === "chat"
                      ? this.renderClawTab("chat")
                      : this.workspaceTab === "instances"
                        ? this.renderClawTab("instances")
                      : this.workspaceTab === "workspace"
                        ? this.renderClawTab("workspace")
                        : this.workspaceTab === "logs"
                          ? this.renderClawTab("logs")
                          : this.workspaceTab === "timeline"
                            ? this.renderTimelineTab()
                            : this.renderBrainTab()}
        </div>
      </div>
    `;
  }

  private renderClawTab(tab: "chat" | "instances" | "workspace" | "logs") {
    const claw = this.projectClaws.find((item) => String(item.id) === this.activeProjectClawId) ?? this.projectClaws[0] ?? null;
    if (!claw) {
      return html`
        <div class="empty-state" style="margin-top:24px">
          <div class="empty-state-title">No claws assigned</div>
          <div class="empty-state-sub">Assign a claw to this project to use ${tab}.</div>
        </div>
      `;
    }

    if (!this.activeProjectClawId) {
      this.activeProjectClawId = String(claw.id);
    }

    const wsUrl = clawsApi.wsUrl(claw.id);

    return html`
      <div style="display:flex;flex-direction:column;gap:12px;height:calc(100dvh - 260px);min-height:460px;max-height:calc(100dvh - 260px)">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-size:12px;color:var(--muted)">Active claw</span>
          <select
            class="select"
            style="min-width:220px"
            .value=${String(claw.id)}
            @change=${(e: Event) => { this.activeProjectClawId = (e.target as HTMLSelectElement).value; }}
          >
            ${this.projectClaws.map((item) => html`<option value=${String(item.id)}>${item.name}</option>`)}
          </select>
        </div>

        <div class="card" style="padding:0;flex:1 1 auto;min-height:320px;overflow:hidden;display:flex;flex-direction:column">
          ${tab === "chat" ? html`<ccl-claw-chat .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-chat>` : ""}
          ${tab === "instances" ? html`<ccl-claw-instances .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-instances>` : ""}
          ${tab === "workspace" ? html`<ccl-claw-workspace .clawId=${claw.id}></ccl-claw-workspace>` : ""}
          ${tab === "logs" ? html`<ccl-claw-logs .clawId=${claw.id} .wsUrl=${wsUrl}></ccl-claw-logs>` : ""}
        </div>
      </div>
    `;
  }

  private renderTimelineTab() {
    const claw = this.projectClaws.find((item) => String(item.id) === this.activeProjectClawId) ?? this.projectClaws[0] ?? null;
    if (!claw) {
      return html`
        <div class="empty-state" style="margin-top:24px">
          <div class="empty-state-title">No claws assigned</div>
          <div class="empty-state-sub">Assign a claw to this project to view its execution timeline.</div>
        </div>
      `;
    }
    return html`<ccl-execution-timeline clawId=${String(claw.id)}></ccl-execution-timeline>`;
  }

  private renderProjectDetails(project: Project, tasks: Task[]) {
    const openCount = tasks.filter((task) => task.status !== "done").length;
    const selectedIntegration = this.sourceControlIntegrations.find((integration) => (
      String(integration.id) === this.sourceControlForm.integrationId
    ));
    return html`
      <div class="grid grid-2">
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Overview</div>
          <div style="font-size:13px;line-height:1.6;color:var(--text);max-height:260px;overflow:auto;padding-right:4px">
            ${project.description || "No project description yet."}
          </div>
          <div style="display:grid;gap:8px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Project key</span><span>${project.key}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Status</span><span>${project.status.replace("_", " ")}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;gap:12px"><span style="color:var(--muted)">Root path</span><span class="truncate" title=${project.rootWorkingDirectory ?? ""}>${project.rootWorkingDirectory ?? "Not set"}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Tasks</span><span>${tasks.length}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Open tasks</span><span>${openCount}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;gap:12px"><span style="color:var(--muted)">Repo</span><span class="truncate" title=${project.sourceControlRepoFullName ?? ""}>${project.sourceControlRepoFullName ?? "Not assigned"}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Workspace actions</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" @click=${() => { this.workspaceTab = "tasks"; }}>Create task</button>
            <button class="btn btn-secondary btn-sm" @click=${() => { this.workspaceTab = "brain"; this.quickBrainPrompt("tasks"); }}>Plan with Brain</button>
            <button class="btn btn-secondary btn-sm" @click=${() => { this.workspaceTab = "brain"; this.quickBrainPrompt("prd"); }}>Draft PRD</button>
            <button class="btn btn-ghost btn-sm" @click=${() => this.openEdit(project)}>Edit project</button>
          </div>
          <div style="margin-top:12px;font-size:12px;color:var(--muted)">Use Brain to generate PRDs and executable task actions for this project.</div>
        </div>

        <div class="card" style="grid-column:1 / -1">
          <div class="card-title" style="margin-bottom:10px">Source control</div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end">
            <div class="field" style="margin:0">
              <label class="label">Integration</label>
              <select class="select" .value=${this.sourceControlForm.integrationId} @change=${(e: Event) => {
                this.sourceControlForm = { ...this.sourceControlForm, integrationId: (e.target as HTMLSelectElement).value };
              }}>
                <option value="">No integration (clear assignment)</option>
                ${this.sourceControlIntegrations
                  .filter((integration) => integration.isActive || String(integration.id) === this.sourceControlForm.integrationId)
                  .map((integration) => html`<option value=${integration.id}>${integration.name} · ${integration.provider} · ${integration.accountIdentifier}</option>`)}
              </select>
            </div>

            <div class="field" style="margin:0">
              <label class="label">Repository</label>
              <input class="input" placeholder="owner/repo" .value=${this.sourceControlForm.repoFullName}
                @input=${(e: InputEvent) => { this.sourceControlForm = { ...this.sourceControlForm, repoFullName: (e.target as HTMLInputElement).value }; }}>
            </div>

            <div class="field" style="margin:0">
              <label class="label">Repo URL <span class="label-hint">(optional)</span></label>
              <input class="input" placeholder=${selectedIntegration?.provider === "bitbucket" ? "https://bitbucket.org/owner/repo" : "https://github.com/owner/repo"}
                .value=${this.sourceControlForm.repoUrl}
                @input=${(e: InputEvent) => { this.sourceControlForm = { ...this.sourceControlForm, repoUrl: (e.target as HTMLInputElement).value }; }}>
            </div>

            <button class="btn btn-primary btn-sm" @click=${() => void this.saveSourceControlAssignment()} ?disabled=${this.sourceControlSaving || (!!this.sourceControlForm.integrationId && !this.sourceControlForm.repoFullName.trim())}>
              ${this.sourceControlSaving ? "Saving…" : "Save assignment"}
            </button>
          </div>

          <div style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px;display:grid;gap:10px">
            <div style="font-size:12px;color:var(--muted)">Manage workspace integrations from this panel.</div>

            ${this.sourceControlLoading
              ? html`<div style="font-size:12px;color:var(--muted)">Loading integrations…</div>`
              : this.sourceControlIntegrations.length === 0
                ? html`<div style="font-size:12px;color:var(--muted)">No integrations configured yet.</div>`
                : html`
                    <div style="display:grid;gap:8px">
                      ${this.sourceControlIntegrations.map((integration) => html`
                        <div style="border:1px solid var(--border);border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <div style="font-size:12px;color:var(--text-strong);font-weight:600">${integration.name}</div>
                          <span class="badge ${integration.provider === "github" ? "badge-blue" : "badge-yellow"}">${integration.provider}</span>
                          <span class="badge ${integration.isActive ? "badge-green" : "badge-gray"}">${integration.isActive ? "active" : "inactive"}</span>
                          <span style="font-size:11px;color:var(--muted)">${integration.accountIdentifier}</span>
                          <div style="flex:1"></div>
                          <button class="btn btn-ghost btn-sm" @click=${() => void this.toggleIntegrationActive(integration)}>${integration.isActive ? "Deactivate" : "Activate"}</button>
                          <button class="btn btn-danger btn-sm" @click=${() => void this.deleteIntegrationFromProject(integration)}>Delete</button>
                        </div>
                      `)}
                    </div>
                  `}

            <div style="display:grid;grid-template-columns:140px 1fr 1fr 1fr auto;gap:8px;align-items:end">
              <div class="field" style="margin:0">
                <label class="label">Provider</label>
                <select class="select" .value=${this.integrationForm.provider} @change=${(e: Event) => {
                  this.integrationForm = { ...this.integrationForm, provider: (e.target as HTMLSelectElement).value as SourceControlProvider };
                }}>
                  <option value="github">GitHub</option>
                  <option value="bitbucket">Bitbucket</option>
                </select>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Name</label>
                <input class="input" placeholder="Primary GitHub" .value=${this.integrationForm.name}
                  @input=${(e: InputEvent) => { this.integrationForm = { ...this.integrationForm, name: (e.target as HTMLInputElement).value }; }}>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Account / Workspace</label>
                <input class="input" placeholder="acme-org" .value=${this.integrationForm.accountIdentifier}
                  @input=${(e: InputEvent) => { this.integrationForm = { ...this.integrationForm, accountIdentifier: (e.target as HTMLInputElement).value }; }}>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Host URL <span class="label-hint">(optional)</span></label>
                <input class="input" placeholder="https://bitbucket.org" .value=${this.integrationForm.hostUrl}
                  @input=${(e: InputEvent) => { this.integrationForm = { ...this.integrationForm, hostUrl: (e.target as HTMLInputElement).value }; }}>
              </div>
              <button class="btn btn-secondary btn-sm" @click=${() => void this.createIntegrationFromProject()} ?disabled=${this.integrationSaving || !this.integrationForm.name.trim() || !this.integrationForm.accountIdentifier.trim()}>
                ${this.integrationSaving ? "Adding…" : "Add integration"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderTaskBoard(tasks: Task[]) {
    return renderTaskKanban({
      tasks,
      statuses: STATUSES,
      statusLabels: STATUS_LABELS,
      onDragOver: this.dragOver,
      onDrop: (e, status) => this.drop(e, status),
      renderCard: (task) => html`
        <div class="task-card" draggable="true" @dragstart=${() => this.dragStart(task.id)}>
          <div class="task-card-title">${task.title}</div>
          <div class="task-card-meta">
            <span class="task-key">${task.key}</span>
            ${this.priorityBadge(task.priority)}
            <span style="font-size:11px;color:var(--muted)">${this.clawName(task.assignedClawId)}</span>
          </div>
        </div>
      `,
    });
  }

  private renderTasksTab(tasks: Task[]) {
    return html`
      <div class="card" style="margin-bottom:14px">
        <div class="card-title" style="margin-bottom:10px">Create task</div>
        <div class="grid grid-2">
          <div class="field">
            <label class="label">Title</label>
            <input class="input" .value=${this.taskForm.title} @input=${(e: InputEvent) => { this.taskForm = { ...this.taskForm, title: (e.target as HTMLInputElement).value }; }}>
          </div>
          <div class="field">
            <label class="label">Assign claw</label>
            <select class="select" .value=${this.taskForm.assignedClawId} @change=${(e: Event) => { this.taskForm = { ...this.taskForm, assignedClawId: (e.target as HTMLSelectElement).value }; }}>
              <option value="">Unassigned</option>
              ${this.projectClaws.map((claw) => html`<option value=${claw.id}>${claw.name}</option>`) }
            </select>
          </div>
        </div>

        <div class="field" style="margin-top:10px">
          <label class="label">Description</label>
          <textarea class="textarea" .value=${this.taskForm.description} @input=${(e: InputEvent) => { this.taskForm = { ...this.taskForm, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
        </div>

        <div class="grid grid-3" style="margin-top:10px">
          <div class="field">
            <label class="label">Priority</label>
            <select class="select" .value=${this.taskForm.priority} @change=${(e: Event) => { this.taskForm = { ...this.taskForm, priority: (e.target as HTMLSelectElement).value as TaskPriority }; }}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </div>
          <div class="field">
            <label class="label">Status</label>
            <select class="select" .value=${this.taskForm.status} @change=${(e: Event) => { this.taskForm = { ...this.taskForm, status: (e.target as HTMLSelectElement).value as TaskStatus }; }}>
              ${STATUSES.map((status) => html`<option value=${status}>${STATUS_LABELS[status]}</option>`) }
            </select>
          </div>
          <div class="field">
            <label class="label">Due date</label>
            <input class="input" type="date" .value=${this.taskForm.dueDate} @change=${(e: Event) => { this.taskForm = { ...this.taskForm, dueDate: (e.target as HTMLInputElement).value }; }}>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:10px">
          <button class="btn btn-primary" ?disabled=${this.taskSaving || !this.taskForm.title.trim()} @click=${() => void this.createTask()}>
            ${this.taskSaving ? "Creating…" : "Create task"}
          </button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            ${tasks.map((task) => html`
              <tr>
                <td>
                  <div style="font-weight:500;color:var(--text-strong)">${task.title}</div>
                  <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${task.key}</div>
                </td>
                <td>${this.statusBadge(task.status)}</td>
                <td>${this.priorityBadge(task.priority)}</td>
                <td>
                  <select class="select" style="min-width:150px" .value=${task.assignedClawId ?? ""} @change=${(e: Event) => void this.reassignTask(task, (e.target as HTMLSelectElement).value)}>
                    <option value="">Unassigned</option>
                    ${this.projectClaws.map((claw) => html`<option value=${claw.id}>${claw.name}</option>`) }
                  </select>
                </td>
                <td style="font-size:12px;color:var(--muted)">${this.formatDate(task.dueDate)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderPrdsTab() {
    return html`
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="card-title" style="margin:0">${this.prdTitle}</div>
          <div style="flex:1"></div>
          <button class="btn btn-secondary btn-sm" @click=${() => { this.workspaceTab = "brain"; this.quickBrainPrompt("prd"); }}>Generate with Brain</button>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:6px">
          ${this.prdUpdatedAt ? `Updated ${new Date(this.prdUpdatedAt).toLocaleString()}` : "No PRD saved yet. Use Brain to draft one."}
        </div>
      </div>

      ${this.prdMarkdown
        ? this.renderMarkdown(this.prdMarkdown)
        : html`<div class="empty-state"><div class="empty-state-title">No PRD yet</div><div class="empty-state-sub">Ask Brain to draft and save a PRD for this project.</div></div>`}
    `;
  }

  private renderBrainTab() {
    return html`
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <button class="btn btn-ghost btn-sm" @click=${() => this.quickBrainPrompt("describe")}>Describe project</button>
        <button class="btn btn-ghost btn-sm" @click=${() => this.quickBrainPrompt("prd")}>Draft PRD</button>
        <button class="btn btn-ghost btn-sm" @click=${() => this.quickBrainPrompt("tasks")}>Generate tasks</button>
        <button class="btn btn-ghost btn-sm" @click=${() => this.clearBrain()}>New chat</button>
      </div>

      <div class="chat-messages" style="padding:12px 0;max-height:380px;overflow:auto">
        ${this.brainMessages.length === 0
          ? html`<div class="empty-state" style="padding:30px 12px"><div class="empty-state-title">Project Brain ready</div><div class="empty-state-sub">Generate PRDs, tasks, and assignments for this project.</div></div>`
          : this.brainMessages.map((message) => html`
            <div class="msg ${message.role === "user" ? "msg-user" : ""}">
              <div class="msg-bubble ${message.role === "user" ? "msg-bubble-user" : "msg-bubble-assistant"}">
                ${this.renderMarkdown(message.text)}
              </div>
              <div class="msg-meta">${message.role}</div>
            </div>
          `)}
      </div>

      ${this.brainActions.length > 0 ? html`
        <div class="card" style="margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <div class="card-title" style="margin:0">Proposed actions</div>
            <div style="flex:1"></div>
            <button class="btn btn-secondary btn-sm" @click=${() => void this.applyAllBrainActions()}>Apply all</button>
          </div>
          <div style="display:grid;gap:8px">
            ${this.brainActions.map((entry, index) => html`
              <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:10px;display:grid;gap:8px">
                <div style="font-size:12px;color:var(--text)">
                  ${entry.action.type === "create_task"
                    ? `Create task: ${entry.action.title}`
                    : entry.action.type === "assign_task"
                      ? `Assign task: ${entry.action.taskKey ?? entry.action.taskTitle ?? entry.action.taskId ?? "task"}`
                      : entry.action.type === "save_prd"
                        ? `Save PRD: ${entry.action.title ?? "Project PRD"}`
                        : `Update project details${entry.action.rootWorkingDirectory ? ` (${entry.action.rootWorkingDirectory})` : ""}`}
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <button class="btn btn-ghost btn-sm" ?disabled=${entry.status === "running" || entry.status === "done"} @click=${() => void this.applyBrainAction(index)}>
                    ${entry.status === "running" ? "Applying…" : entry.status === "done" ? "Applied" : "Apply"}
                  </button>
                  <span class="badge ${entry.status === "done" ? "badge-green" : entry.status === "error" ? "badge-red" : entry.status === "running" ? "badge-yellow" : "badge-gray"}">${entry.status}</span>
                  ${entry.result ? html`<span style="font-size:11px;color:var(--muted)">${entry.result}</span>` : ""}
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : ""}

      <div class="chat-input-row" style="padding:0;border-top:none">
        <textarea class="chat-textarea" rows="3" placeholder="Ask Brain for project help…" .value=${this.brainInput}
          @input=${(e: InputEvent) => { this.brainInput = (e.target as HTMLTextAreaElement).value; }}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void this.sendBrain();
            }
          }}></textarea>
        <button class="btn btn-primary" ?disabled=${this.brainSending || !this.brainInput.trim()} @click=${() => void this.sendBrain()}>
          ${this.brainSending ? "Thinking…" : "Send"}
        </button>
      </div>
    `;
  }

  private renderModal() {
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
        <div class="modal">
          <div class="modal-title">${this.editTarget ? "Edit project" : "New project"}</div>
          <div class="modal-sub">Projects group related tasks together</div>
          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
          <form @submit=${this.save} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Name</label>
              <input class="input" placeholder="Project name" .value=${this.form.name}
                @input=${(e: InputEvent) => { this.form = { ...this.form, name: (e.target as HTMLInputElement).value }; }} required>
            </div>
            <div class="field">
              <label class="label">Description <span class="label-hint">(optional)</span></label>
              <textarea class="textarea" placeholder="What is this project about?"
                .value=${this.form.description}
                @input=${(e: InputEvent) => { this.form = { ...this.form, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
            </div>
            <div class="field">
              <label class="label">Root working directory <span class="label-hint">(optional)</span></label>
              <input class="input" placeholder="/Users/you/dev/my-repo"
                .value=${this.form.rootWorkingDirectory}
                @input=${(e: InputEvent) => { this.form = { ...this.form, rootWorkingDirectory: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving ? "Saving…" : this.editTarget ? "Save changes" : "Create project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-projects": CclProjects; }
}
