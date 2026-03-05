import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { renderMarkdown } from "./shared/markdown.js";
import {
  brain,
  llm,
  projects as projectsApi,
  tasks as tasksApi,
  claws as clawsApi,
  marketplace,
  type BrainChat,
  type BrainMessage as ServerBrainMessage,
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

/** Local display message — may be a server-persisted message or a transient one */
interface BrainMessage {
  id: string | number;
  role: BrainRole;
  text: string;
}

/** Key used to remember which brain chat was last active per tenant */
function brainActiveChatKey(tenantId: string) {
  return `ccl-brain-active-chat-${tenantId || "default"}`;
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

  // Chat switching
  @state() private chatList: BrainChat[] = [];
  @state() private activeChat: BrainChat | null = null;
  @state() private showChatPicker = false;

  // Chat management (parity with brainstorm)
  @state() private allProjects: Project[] = [];
  @state() private chatFilterProjectId: string | null = null;
  @state() private renamingChatId: number | null = null;
  @state() private renameValue = "";
  @state() private confirmDeleteId: number | null = null;
  @state() private chatSearchQuery = "";

  // File attachments
  @state() private pendingAttachments: Array<{ key: string; name: string; type: string }> = [];
  @state() private uploading = false;

  private msgEnd: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener("ccl:brain-open", this.handleBrainOpen as EventListener);
    window.addEventListener("ccl:chats-changed", this.onChatsChanged);
    void this.loadBrainChats();
    void this.loadAllProjects();
    void this.refreshContext();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("ccl:brain-open", this.handleBrainOpen as EventListener);
    window.removeEventListener("ccl:chats-changed", this.onChatsChanged);
    // Auto-summarize if the chat has enough messages
    void this.autoSummarizeIfNeeded();
  }

  /** Fire-and-forget summarization when chat has >= 6 messages */
  private async autoSummarizeIfNeeded() {
    if (this.activeChat && this.messages.length >= 6) {
      try { await brain.summarize(this.activeChat.id); } catch { /* swallow */ }
    }
  }

  private onChatsChanged = () => { void this.loadBrainChats(); };

  override updated(changed: Map<string, unknown>) {
    if (changed.has("tenantId")) {
      void this.loadBrainChats();
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

  // -----------------------------------------------------------------------
  // Server-persisted chat management
  // -----------------------------------------------------------------------
  private async loadBrainChats() {
    try {
      this.chatList = await brain.listChats({ limit: 30 });
      // Restore last active chat
      const savedId = localStorage.getItem(brainActiveChatKey(this.tenantId));
      const saved = savedId ? this.chatList.find(c => c.id === Number(savedId)) : null;
      if (saved) {
        await this.switchChat(saved);
      } else if (this.chatList.length > 0) {
        await this.switchChat(this.chatList[0]);
      } else {
        this.activeChat = null;
        this.messages = [];
      }
    } catch {
      // Fall back to empty state — server may be unreachable
      this.chatList = [];
      this.activeChat = null;
      this.messages = [];
    }
  }

  private async switchChat(chat: BrainChat) {
    // Auto-summarize the previous chat if it had enough messages
    void this.autoSummarizeIfNeeded();
    this.activeChat = chat;
    this.actions = [];
    this.showChatPicker = false;
    localStorage.setItem(brainActiveChatKey(this.tenantId), String(chat.id));
    try {
      const serverMsgs = await brain.getMessages(chat.id);
      this.messages = serverMsgs.map(m => ({
        id: m.id,
        role: m.role as BrainRole,
        text: m.content,
      }));
    } catch {
      this.messages = [];
    }
  }

  private async newServerChat() {
    try {
      const chat = await brain.createChat({
        title: "New chat",
        projectId: this.chatFilterProjectId != null ? Number(this.chatFilterProjectId) : null,
      });
      this.chatList = [chat, ...this.chatList];
      await this.switchChat(chat);
      window.dispatchEvent(new Event("ccl:chats-changed"));
    } catch { /* swallow */ }
  }

  private async loadAllProjects() {
    try {
      this.allProjects = await projectsApi.list();
    } catch { /* ignore */ }
  }

  private async loadFilteredChats() {
    try {
      this.chatList = await brain.listChats(
        this.chatFilterProjectId != null ? { projectId: this.chatFilterProjectId } : { limit: 30 },
      );
    } catch { /* swallow */ }
  }

  private async deleteBrainChat(id: number) {
    try {
      await brain.deleteChat(id);
      this.chatList = this.chatList.filter(c => c.id !== id);
      if (this.activeChat?.id === id) {
        this.activeChat = null;
        this.messages = [];
        this.actions = [];
      }
      window.dispatchEvent(new Event("ccl:chats-changed"));
    } catch { /* swallow */ }
  }

  private startChatRename(chat: BrainChat) {
    this.renamingChatId = chat.id;
    this.renameValue = chat.title;
  }

  private async commitChatRename(chatId: number) {
    const title = this.renameValue.trim();
    if (!title) { this.renamingChatId = null; return; }
    try {
      const updated = await brain.updateChat(chatId, { title });
      this.chatList = this.chatList.map(c => c.id === chatId ? { ...c, title: updated.title } : c);
      if (this.activeChat?.id === chatId) this.activeChat = { ...this.activeChat!, title: updated.title };
    } catch { /* swallow */ }
    this.renamingChatId = null;
  }

  private async moveChatToProject(chatId: number, projectId: string | null) {
    try {
      const updated = await brain.updateChat(chatId, { projectId: projectId != null ? Number(projectId) : null });
      this.chatList = this.chatList.map(c => c.id === chatId ? { ...c, projectId: updated.projectId } : c);
      if (this.activeChat?.id === chatId) this.activeChat = { ...this.activeChat!, projectId: updated.projectId };
    } catch { /* swallow */ }
  }

  private async summarizeBrainChat(chatId: number) {
    try {
      await brain.summarize(chatId);
    } catch { /* swallow */ }
  }

  private chatProjectName(id: number | null): string {
    if (id == null) return "";
    return this.allProjects.find(p => String(p.id) === String(id))?.name ?? `#${id}`;
  }

  private get filteredChatList(): BrainChat[] {
    if (!this.chatSearchQuery.trim()) return this.chatList;
    const q = this.chatSearchQuery.toLowerCase();
    return this.chatList.filter(c => c.title.toLowerCase().includes(q));
  }

  private async handleFileSelect(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    try {
      const result = await brain.upload(file);
      this.pendingAttachments = [...this.pendingAttachments, { key: result.key, name: result.name, type: result.type }];
    } catch { /* swallow */ }
    finally {
      this.uploading = false;
      (e.target as HTMLInputElement).value = "";
    }
  }

  private removePendingAttachment(key: string) {
    this.pendingAttachments = this.pendingAttachments.filter(a => a.key !== key);
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

    const msgs: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Page context JSON:\n${JSON.stringify(this.context)}` },
    ];
    return { msgs, conversation };
  }

  private async send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    // Auto-create a server chat if none exists
    if (!this.activeChat) {
      await this.newServerChat();
      if (!this.activeChat) return;
    }

    // Build user message with optional attachment references
    const attachments = [...this.pendingAttachments];
    this.pendingAttachments = [];
    let content = text;
    if (attachments.length > 0) {
      const refs = attachments.map(a => `[Attached: ${a.name}](${brain.uploadUrl(a.key)})`).join("\n");
      content = `${text}\n\n${refs}`;
    }

    const userMsg: BrainMessage = { id: crypto.randomUUID(), role: "user", text: content };
    this.messages = [...this.messages, userMsg];
    this.input = "";
    this.sending = true;

    try {
      // Persist user message to server
      const metadata = attachments.length > 0 ? JSON.stringify({ attachments }) : undefined;
      brain.sendMessages(this.activeChat!.id, [{ role: "user", content, metadata }]).catch(() => { /* persistence best-effort */ });

      // Build LLM messages with optional project memory
      const { msgs, conversation } = this.toChatMessages();
      if (this.activeChat?.projectId) {
        try {
          const mem = await brain.getProjectMemory(this.activeChat.projectId);
          if (mem?.consolidatedSummary) {
            msgs.push({ role: "system", content: `Project memory context:\n${mem.consolidatedSummary}` });
          }
        } catch { /* non-critical */ }
      }
      msgs.push(...conversation);

      const response = await llm.chat(msgs, { temperature: 0.25, maxTokens: 1400 });
      const reply = response.choices?.[0]?.message?.content?.trim() ?? "I could not generate a response.";
      const foundActions = this.parseActions(reply);
      if (foundActions.length) {
        this.actions = foundActions.map((action) => ({ action, status: "idle" }));
      }
      const assistantText = this.stripActions(reply) || "Done.";
      this.messages = [
        ...this.messages,
        { id: crypto.randomUUID(), role: "assistant", text: assistantText },
      ];
      // Persist assistant message to server
      brain.sendMessages(this.activeChat!.id, [{ role: "assistant", content: assistantText }]).catch(() => { /* persistence best-effort */ });

      // Auto-title the chat if it's still "New chat"
      if (this.activeChat!.title === "New chat" && this.messages.length <= 3) {
        void this.autoTitleChat(text);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.messages = [...this.messages, { id: crypto.randomUUID(), role: "assistant", text: `Error: ${msg}` }];
    } finally {
      this.sending = false;
    }
  }

  private async autoTitleChat(firstMessage: string) {
    try {
      const response = await llm.chat([
        { role: "system", content: "Generate a short (4-7 word) title for a chat that starts with the following message. Return only the title, nothing else." },
        { role: "user", content: firstMessage },
      ], { temperature: 0.5, maxTokens: 30 });
      const title = response.choices?.[0]?.message?.content?.trim();
      if (title && this.activeChat) {
        const updated = await brain.updateChat(this.activeChat.id, { title });
        this.chatList = this.chatList.map(c => c.id === this.activeChat!.id ? { ...c, title: updated.title } : c);
        this.activeChat = { ...this.activeChat, title: updated.title };
      }
    } catch { /* swallow — nice-to-have */ }
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
    void this.newServerChat();
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
          <div style="flex:1;min-width:0;">
            <div class="brain-title" style="display:flex;align-items:center;gap:6px;">
              Brain
            </div>
            <div class="brain-sub">${this.pageLabel()} · ${this.loadingContext ? "refreshing context…" : this.contextSummary || "no context"}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn btn-ghost btn-sm" @click=${() => void this.refreshContext()}>Refresh</button>
            <button class="btn btn-ghost btn-sm" @click=${this.clearChat}>New chat</button>
            <button class="panel-close" @click=${() => { this.open = false; }}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Active chat bar — always visible, toggles the chat management panel -->
        <div
          style="padding:8px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;cursor:pointer;background:${this.showChatPicker ? "var(--accent-bg,rgba(99,102,241,0.08))" : "transparent"};"
          @click=${() => { this.showChatPicker = !this.showChatPicker; }}
        >
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;flex-shrink:0;transition:transform 0.15s;${this.showChatPicker ? "transform:rotate(90deg);" : ""}"><polyline points="9 18 15 12 9 6"/></svg>
          <span style="font-size:13px;font-weight:500;color:var(--text-strong);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            ${this.activeChat ? this.activeChat.title : "No active chat"}
          </span>
          ${this.activeChat?.projectId ? html`<span class="badge badge-blue" style="font-size:10px;">${this.chatProjectName(this.activeChat.projectId)}</span>` : ""}
          <span style="font-size:11px;color:var(--muted);">${this.chatList.length} chat${this.chatList.length !== 1 ? "s" : ""}</span>
        </div>

        <!-- Chat picker panel -->
        ${this.showChatPicker ? html`
          <div style="border-bottom:1px solid var(--border);background:var(--bg-muted,#191919);max-height:340px;display:flex;flex-direction:column;">
            <!-- Filter -->
            <div style="padding:8px 12px;border-bottom:1px solid var(--border);display:flex;flex-direction:column;gap:6px;">
              <select
                style="width:100%;padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:12px;"
                @change=${(e: Event) => {
                  const val = (e.target as HTMLSelectElement).value;
                  this.chatFilterProjectId = val === "" ? null : val;
                  void this.loadFilteredChats();
                }}
              >
                <option value="">All projects</option>
                <option value="none">No project</option>
                ${this.allProjects.map(p => html`
                  <option value=${p.id} ?selected=${this.chatFilterProjectId === String(p.id)}>${p.name}</option>
                `)}
              </select>
              <input
                type="text"
                placeholder="Search chats\u2026"
                .value=${this.chatSearchQuery}
                @input=${(e: Event) => { this.chatSearchQuery = (e.target as HTMLInputElement).value; }}
                style="width:100%;padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:12px;"
              />
            </div>
            <!-- Chat list -->
            <div style="flex:1;overflow:auto;padding:6px;">
              ${this.filteredChatList.length === 0 ? html`
                <div style="padding:12px;font-size:12px;color:var(--muted);text-align:center;">${this.chatSearchQuery ? "No matching chats." : "No chats yet."}</div>
              ` : ""}
              ${this.filteredChatList.map(c => html`
                <div
                  style="padding:6px 8px;border-radius:6px;margin-bottom:2px;cursor:pointer;border:1px solid ${this.activeChat?.id === c.id ? "var(--accent)" : "transparent"};background:${this.activeChat?.id === c.id ? "var(--accent-bg,rgba(99,102,241,0.08))" : "transparent"};"
                  @click=${() => void this.switchChat(c)}
                >
                  ${this.renamingChatId === c.id
                    ? html`
                      <input
                        type="text"
                        .value=${this.renameValue}
                        @input=${(e: Event) => { this.renameValue = (e.target as HTMLInputElement).value; }}
                        @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.commitChatRename(c.id); if (e.key === "Escape") this.renamingChatId = null; }}
                        @blur=${() => void this.commitChatRename(c.id)}
                        @click=${(e: Event) => e.stopPropagation()}
                        style="width:100%;padding:2px 6px;border:1px solid var(--accent);border-radius:4px;background:var(--bg);color:var(--text);font-size:12px;"
                      />
                    `
                    : html`
                      <div style="font-size:12px;font-weight:500;color:var(--text-strong);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.title}</div>
                      <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                        ${c.projectId ? html`<span class="badge badge-blue" style="font-size:9px;">${this.chatProjectName(c.projectId)}</span>` : ""}
                        <span style="font-size:10px;color:var(--muted);margin-left:auto;">${new Date(c.updatedAt).toLocaleDateString()}</span>
                      </div>
                    `}
                  ${this.activeChat?.id === c.id ? html`
                    <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;" @click=${(e: Event) => e.stopPropagation()}>
                      <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 5px;" @click=${() => this.startChatRename(c)}>Rename</button>
                      <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 5px;" @click=${() => void this.summarizeBrainChat(c.id)} title="Summarize">Summarize</button>
                      <select
                        style="padding:1px 4px;border-radius:4px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:10px;"
                        @click=${(e: Event) => e.stopPropagation()}
                        @change=${(e: Event) => {
                          const val = (e.target as HTMLSelectElement).value;
                          void this.moveChatToProject(c.id, val === "" ? null : val);
                        }}
                      >
                        <option value="" ?selected=${!c.projectId}>No project</option>
                        ${this.allProjects.map(p => html`
                          <option value=${p.id} ?selected=${c.projectId === Number(p.id)}>${p.name}</option>
                        `)}
                      </select>
                      <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 5px;color:var(--danger,#f44);" @click=${() => { this.confirmDeleteId = c.id; }}>Delete</button>
                    </div>
                  ` : nothing}
                </div>
              `)}
            </div>
          </div>
        ` : nothing}

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
              <div class="msg-bubble ${m.role === "user" ? "msg-bubble-user" : "msg-bubble-assistant"}">${renderMarkdown(m.text)}</div>
              <div class="msg-meta">${m.role}</div>
            </div>
          `)}

          ${this.actions.length > 0 ? html`
            <div class="card" style="margin-top:8px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div class="card-title" style="margin:0">Proposed actions</div>
                <div style="flex:1"></div>
              </div>
              ${this.actions.map((a, i) => html`
                <div class="flex-row" style="padding:8px 0;border-top:1px solid var(--border)">
                  <div style="flex:1">
                    <div style="font-weight:500;font-size:13px;">${a.action.type}: ${(a.action as any).name ?? (a.action as any).title}</div>
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
          ` : ""}

          <div style="height:1px" .ref=${(el: HTMLElement | null) => { this.msgEnd = el; }}></div>
        </div>

        <div class="chat-input-row" style="padding:12px 16px;flex-shrink:0">
          ${this.pendingAttachments.length > 0 ? html`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${this.pendingAttachments.map(a => html`
                <span style="display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border-radius:4px;background:var(--accent-bg,rgba(99,102,241,0.1));font-size:10px;color:var(--text);">
                  📎 ${a.name}
                  <button style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;padding:0;" @click=${() => this.removePendingAttachment(a.key)}>&times;</button>
                </span>
              `)}
            </div>
          ` : nothing}
          <div style="display:flex;gap:6px;align-items:flex-end;">
            <label style="cursor:pointer;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:var(--bg);flex-shrink:0;${this.uploading ? "opacity:0.5;pointer-events:none;" : ""}">
              <span style="font-size:14px;">📎</span>
              <input type="file" style="display:none;" @change=${this.handleFileSelect} accept="image/*,.pdf,.txt,.md,.csv,.json" />
            </label>
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
        </div>
      </aside>

      <!-- Delete confirmation modal -->
      ${this.confirmDeleteId != null ? html`
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10001;display:flex;align-items:center;justify-content:center;" @click=${() => { this.confirmDeleteId = null; }}>
          <div style="background:var(--bg,#1a1a1a);border:1px solid var(--border);border-radius:12px;padding:24px;max-width:380px;width:90%;" @click=${(e: Event) => e.stopPropagation()}>
            <div style="font-size:16px;font-weight:600;color:var(--text-strong);margin-bottom:8px;">Delete chat?</div>
            <div style="font-size:14px;color:var(--muted);margin-bottom:20px;">This will permanently archive this chat. You won't be able to access it again.</div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <button class="btn btn-ghost" @click=${() => { this.confirmDeleteId = null; }}>Cancel</button>
              <button class="btn" style="background:var(--danger,#ef4444);color:#fff;" @click=${async () => { const id = this.confirmDeleteId!; this.confirmDeleteId = null; await this.deleteBrainChat(id); }}>Delete</button>
            </div>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-brain": CclBrain; }
}
