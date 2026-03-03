import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  llm,
  projects as projectsApi,
  tasks as tasksApi,
  claws as clawsApi,
  marketplace,
  type Project,
  type Task,
  type Claw,
  type Skill,
  type TaskPriority,
  type TaskStatus,
} from "../api.js";

type DashboardPage = "projects" | "tasks" | "claws" | "skills" | "workspace" | "billing" | "logs" | "code-editor" | "content";
type BrainRole = "user" | "assistant";

type BrainAction =
  | {
      type: "create_project";
      name: string;
      description?: string;
    }
  | {
      type: "create_task";
      title: string;
      description?: string;
      projectId?: string;
      projectName?: string;
      projectKey?: string;
      priority?: TaskPriority;
      status?: TaskStatus;
      dueDate?: string;
    };

interface BrainMessage {
  id: string;
  role: BrainRole;
  text: string;
}

function brainMemoryKey(tenantId: string) {
  return `ccl-brain-memory-${tenantId || "default"}`;
}

function loadMemory(tenantId: string): BrainMessage[] {
  // Data was already trimmed to 50 messages on save, so no limit needed here.
  try {
    const raw = localStorage.getItem(brainMemoryKey(tenantId));
    return raw ? (JSON.parse(raw) as BrainMessage[]) : [];
  } catch {
    return [];
  }
}

function saveMemory(tenantId: string, messages: BrainMessage[]) {
  // Persist the last 50 messages to keep localStorage lean.
  localStorage.setItem(brainMemoryKey(tenantId), JSON.stringify(messages.slice(-50)));
}

interface ActionState {
  action: BrainAction;
  status: "idle" | "running" | "done" | "error";
  result?: string;
}

@customElement("ccl-brain")
export class CclBrain extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";
  @property() page: DashboardPage = "tasks";
  @property() launcher: "fab" | "header" | "none" = "fab";

  @state() private focusProjectId = "";
  @state() private open = false;
  @state() private loadingContext = false;
  @state() private contextError = "";
  @state() private input = "";
  @state() private sending = false;
  @state() private contextSummary = "";
  @state() private messages: BrainMessage[] = [];
  @state() private actions: ActionState[] = [];
  @state() private projects: Project[] = [];
  @state() private tasks: Task[] = [];
  @state() private claws: Claw[] = [];
  @state() private skills: Skill[] = [];
  @state() private pendingAutoPrompt = "";

  private msgEnd: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener("ccl:brain-open", this.handleBrainOpen as EventListener);
    this.messages = loadMemory(this.tenantId);
    void this.refreshContext();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("ccl:brain-open", this.handleBrainOpen as EventListener);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("tenantId")) {
      this.messages = loadMemory(this.tenantId);
      this.contextError = "";
      void this.refreshContext();
    } else if (changed.has("page") || changed.has("focusProjectId")) {
      this.contextError = "";
      void this.refreshContext();
    }
    if (this.pendingAutoPrompt && this.open && !this.sending) {
      const prompt = this.pendingAutoPrompt;
      this.pendingAutoPrompt = "";
      void this.autoContinueFromPrompt(prompt);
    }
    this.msgEnd?.scrollIntoView({ behavior: "smooth" });
  }

  private handleBrainOpen = (e: CustomEvent<{ prompt?: string; projectId?: string }>) => {
    this.open = true;
    if (e.detail?.projectId) {
      this.focusProjectId = e.detail.projectId;
    }
    if (e.detail?.prompt?.trim()) {
      this.pendingAutoPrompt = e.detail.prompt.trim();
    }
  };

  private async autoContinueFromPrompt(prompt: string) {
    const expanded = `Continue scaffolding the selected project from this request:\n${prompt}\n\nProvide immediate next steps, ask for any missing onboarding details, and propose executable tasks.`;
    this.input = expanded;
    await this.refreshContext();
    await this.send();
  }

  private pageLabel() {
    const labels: Record<DashboardPage, string> = {
      projects: "Projects",
      tasks: "Tasks",
      claws: "Claws",
      skills: "Skills",
      workspace: "Workspace",
      billing: "Billing",
      logs: "Logs",
      "code-editor": "Code Editor",
      content: "Content Manager",
    };
    return labels[this.page] ?? this.page;
  }

  private async refreshContext() {
    this.loadingContext = true;
    this.contextError = "";
    try {
      if (this.page === "projects") {
        const [projects, tasks] = await Promise.all([projectsApi.list(), tasksApi.list()]);
        this.projects = projects;
        this.tasks = tasks;
        const focused = this.focusProjectId
          ? projects.find((project) => String(project.id) === String(this.focusProjectId))
          : null;
        this.contextSummary = focused
          ? `${focused.name} · ${tasks.filter((task) => String(task.projectId ?? "") === String(focused.id)).length} task(s)`
          : `${projects.length} project${projects.length !== 1 ? "s" : ""} in workspace`;
      } else if (this.page === "tasks") {
        const [tasks, projects] = await Promise.all([tasksApi.list(), projectsApi.list()]);
        this.tasks = tasks;
        this.projects = projects;
        const openCount = tasks.filter(t => t.status !== "done").length;
        this.contextSummary = `${tasks.length} tasks · ${openCount} open`;
      } else if (this.page === "claws") {
        this.claws = await clawsApi.list();
        const online = this.claws.filter(c => c.status === "connected").length;
        this.contextSummary = `${this.claws.length} claws · ${online} connected`;
      } else if (this.page === "skills") {
        this.skills = await marketplace.list();
        this.contextSummary = `${this.skills.length} skills available`;
      } else if (this.page === "workspace" || this.page === "billing") {
        this.contextSummary = "Workspace explorer context";
      } else {
        this.contextSummary = "Execution and activity logs context";
      }
    } catch (e) {
      this.contextError = e instanceof Error ? e.message : String(e);
    } finally {
      this.loadingContext = false;
    }
  }

  private quickPrompt(kind: "describe" | "prd" | "tasks") {
    if (kind === "describe") {
      this.input = `Describe the current ${this.pageLabel().toLowerCase()} context and highlight key priorities.`;
      return;
    }
    if (kind === "prd") {
      this.input = "Create a concise product requirements document (PRD) for the most important project in this workspace.";
      return;
    }
    this.input = "Generate an execution-ready task breakdown. Include actionable steps and add <ccl-actions> JSON to create tasks.";
  }

  private buildContextPayload() {
    return {
      page: this.page,
      tenantId: this.tenantId,
      focusProjectId: this.focusProjectId || null,
      summary: this.contextSummary,
      projects: this.projects.slice(0, 40).map((p) => ({ id: p.id, key: p.key, name: p.name, status: p.status, description: p.description ?? "" })),
      tasks: this.tasks.slice(0, 80).map((t) => ({ id: t.id, key: t.key, title: t.title, status: t.status, priority: t.priority, projectId: t.projectId ?? null })),
      claws: this.claws.slice(0, 40).map((c) => ({ id: c.id, name: c.name, status: c.status })),
      skills: this.skills.slice(0, 60).map((s) => ({ id: s.id, slug: s.slug, name: s.name })),
    };
  }

  private parseActions(text: string): BrainAction[] {
    const match = text.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);
    if (!match) return [];
    try {
      const parsed = JSON.parse(match[1]) as { actions?: BrainAction[] };
      if (!Array.isArray(parsed.actions)) return [];
      return parsed.actions.filter((a) => a && typeof a === "object" && (a.type === "create_project" || a.type === "create_task"));
    } catch {
      return [];
    }
  }

  private stripActions(text: string): string {
    return text.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi, "").trim();
  }

  private toChatMessages() {
    const conversation = this.messages.slice(-12).map((m) => ({ role: m.role, content: m.text }));
    const systemPrompt = [
      "You are Brain, the first-class AI assistant inside CoderClawLink.",
      `You are currently helping on the ${this.pageLabel()} page.`,
      "Use the provided page context snapshot to give practical, execution-focused output.",
      "When the user asks to create entities, include machine-readable actions in this exact format:",
      "<ccl-actions>{\"actions\":[...]}</ccl-actions>",
      "Allowed action types:",
      "- create_project: { type, name, description? }",
      "- create_task: { type, title, description?, projectId?, projectName?, projectKey?, priority?, status?, dueDate? }",
      "If no actions are needed, do not output ccl-actions.",
      "Be concise and concrete.",
    ].join("\n");

    return [
      { role: "system" as const, content: systemPrompt },
      { role: "system" as const, content: `Page context JSON:\n${JSON.stringify(this.buildContextPayload())}` },
      ...conversation,
    ];
  }

  private async send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    const userMsg: BrainMessage = { id: crypto.randomUUID(), role: "user", text };
    this.messages = [...this.messages, userMsg];
    this.input = "";
    this.sending = true;

    try {
      const response = await llm.chat(this.toChatMessages(), { temperature: 0.25, maxTokens: 1400 });
      const content = response.choices?.[0]?.message?.content?.trim() ?? "I could not generate a response.";
      const foundActions = this.parseActions(content);
      if (foundActions.length) {
        this.actions = foundActions.map((action) => ({ action, status: "idle" }));
      }
      this.messages = [
        ...this.messages,
        { id: crypto.randomUUID(), role: "assistant", text: this.stripActions(content) || "Done." },
      ];
      saveMemory(this.tenantId, this.messages);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.messages = [...this.messages, { id: crypto.randomUUID(), role: "assistant", text: `Error: ${msg}` }];
    } finally {
      this.sending = false;
    }
  }

  private async applyAction(index: number) {
    const target = this.actions[index];
    if (!target || target.status === "running") return;

    this.actions = this.actions.map((a, i) => (i === index ? { ...a, status: "running", result: undefined } : a));

    try {
      if (target.action.type === "create_project") {
        const created = await projectsApi.create({
          name: target.action.name,
          description: target.action.description,
        });
        this.actions = this.actions.map((a, i) =>
          i === index ? { ...a, status: "done", result: `Created project ${created.key}` } : a,
        );
        await this.refreshContext();
        return;
      }

      const action = target.action;
      const byId = action.projectId
        ? this.projects.find((p) => p.id === action.projectId)
        : null;
      const byKey = action.projectKey
        ? this.projects.find((p) => p.key.toLowerCase() === action.projectKey?.toLowerCase())
        : null;
      const byName = action.projectName
        ? this.projects.find((p) => p.name.toLowerCase() === action.projectName?.toLowerCase())
        : null;
      const project = byId ?? byKey ?? byName ?? null;

      const created = await tasksApi.create({
        title: action.title,
        description: action.description,
        projectId: project?.id,
        priority: action.priority ?? "medium",
        status: action.status ?? "todo",
        dueDate: action.dueDate,
      });

      this.actions = this.actions.map((a, i) =>
        i === index ? { ...a, status: "done", result: `Created task ${created.key}` } : a,
      );
      await this.refreshContext();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.actions = this.actions.map((a, i) => (i === index ? { ...a, status: "error", result: msg } : a));
    }
  }

  private async applyAll() {
    for (let i = 0; i < this.actions.length; i++) {
      if (this.actions[i]?.status === "idle" || this.actions[i]?.status === "error") {
        await this.applyAction(i);
      }
    }
  }

  private clearChat() {
    this.messages = [];
    this.actions = [];
    this.input = "";
    saveMemory(this.tenantId, []);
  }

  private renderMarkdown(text: string) {
    const raw = marked.parse(text, { gfm: true, breaks: true });
    const htmlString = typeof raw === "string" ? raw : "";
    const clean = DOMPurify.sanitize(htmlString);
    return html`<div class="md-content">${unsafeHTML(clean)}</div>`;
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void this.send();
    }
  }

  override render() {
    const launcherClass = this.launcher === "header" ? "brain-fab brain-fab-inline" : "brain-fab";
    return html`
      ${this.launcher === "none" ? "" : html`
        <button class=${launcherClass} @click=${() => { this.open = true; }}>
          <span>🧠</span>
          Brain
        </button>
      `}

      <div class="brain-overlay ${this.open ? "open" : ""}" @click=${() => { this.open = false; }}></div>

      <aside class="brain-drawer ${this.open ? "open" : ""}">
        <div class="brain-header">
          <div>
            <div class="brain-title">Brain</div>
            <div class="brain-sub">${this.pageLabel()} · ${this.loadingContext ? "refreshing context…" : this.contextSummary || "no context"}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn btn-ghost btn-sm" @click=${() => void this.refreshContext()}>Refresh</button>
            <button class="btn btn-ghost btn-sm" @click=${this.clearChat}>New chat</button>
            ${this.messages.length > 0 ? html`<span class="badge badge-blue" title="Memory: ${this.messages.length} messages saved">Memory ✓</span>` : ""}
            <button class="panel-close" @click=${() => { this.open = false; }}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        ${this.contextError ? html`<div class="error-banner" style="margin:12px 16px 0 16px">${this.contextError}</div>` : ""}

        <div style="display:flex;gap:8px;padding:12px 16px 8px 16px;flex-wrap:wrap;border-bottom:1px solid var(--border)">
          <button class="btn btn-ghost btn-sm" @click=${() => this.quickPrompt("describe")}>Describe context</button>
          <button class="btn btn-ghost btn-sm" @click=${() => this.quickPrompt("prd")}>Draft PRD</button>
          <button class="btn btn-ghost btn-sm" @click=${() => this.quickPrompt("tasks")}>Generate tasks</button>
        </div>

        <div class="chat-messages" style="padding:12px 16px;gap:12px">
          ${this.messages.length === 0 ? html`
            <div class="empty-state" style="padding:28px 12px">
              <div class="empty-state-icon">🧠</div>
              <div class="empty-state-title">Brain is ready</div>
              <div class="empty-state-sub">Ask for analysis, PRDs, or execution-ready task plans for this page.</div>
            </div>
          ` : this.messages.map((m) => html`
            <div class="msg ${m.role === "user" ? "msg-user" : ""}">
              <div class="msg-bubble ${m.role === "user" ? "msg-bubble-user" : "msg-bubble-assistant"}">${this.renderMarkdown(m.text)}</div>
              <div class="msg-meta">${m.role}</div>
            </div>
          `)}

          ${this.actions.length > 0 ? html`
            <div class="card" style="margin-top:8px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div class="card-title" style="margin:0">Proposed actions</div>
                <div style="flex:1"></div>
                <button class="btn btn-secondary btn-sm" @click=${() => void this.applyAll()}>Apply all</button>
              </div>

              <div style="display:grid;gap:8px">
                ${this.actions.map((a, i) => html`
                  <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:10px;display:grid;gap:8px">
                    <div style="font-size:12px;color:var(--text)">
                      ${a.action.type === "create_project"
                        ? `Create project: ${a.action.name}`
                        : `Create task: ${a.action.title}`}
                    </div>
                    <div style="display:flex;gap:8px;align-items:center">
                      <button class="btn btn-ghost btn-sm" ?disabled=${a.status === "running" || a.status === "done"} @click=${() => void this.applyAction(i)}>
                        ${a.status === "running" ? "Applying…" : a.status === "done" ? "Applied" : "Apply"}
                      </button>
                      <span class="badge ${a.status === "done" ? "badge-green" : a.status === "error" ? "badge-red" : a.status === "running" ? "badge-yellow" : "badge-gray"}">${a.status}</span>
                      ${a.result ? html`<span style="font-size:11px;color:var(--muted)">${a.result}</span>` : ""}
                    </div>
                  </div>
                `)}
              </div>
            </div>
          ` : ""}

          <div style="height:1px" .ref=${(el: HTMLElement | null) => { this.msgEnd = el; }}></div>
        </div>

        <div class="chat-input-row" style="padding:12px 16px;flex-shrink:0">
          <textarea
            class="chat-textarea"
            rows="2"
            placeholder="Ask Brain about this page…"
            .value=${this.input}
            @input=${(e: InputEvent) => { this.input = (e.target as HTMLTextAreaElement).value; }}
            @keydown=${this.onKeydown}
          ></textarea>
          <button class="btn btn-primary" ?disabled=${this.sending || !this.input.trim()} @click=${() => void this.send()}>
            ${this.sending ? "Thinking…" : "Send"}
          </button>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-brain": CclBrain; }
}
