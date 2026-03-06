/**
 * Brain Storm — full-page brainstorming hub.
 * ChatGPT-like layout: sidebar of chats + main chat area + optional project filter.
 * Uses server-persisted brain chats via the brain API namespace.
 */
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { renderMarkdown } from "./shared/markdown.js";
import {
  brain,
  llm,
  projects as projectsApi,
  type BrainChat,
  type BrainMessage,
  type Project,
} from "../api.js";

@customElement("ccl-brainstorm")
export class CclBrainstorm extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  // Chat list
  @state() private chatList: BrainChat[] = [];
  @state() private loadingList = false;

  // Active chat
  @state() private activeChat: BrainChat | null = null;
  @state() private messages: BrainMessage[] = [];
  @state() private loadingMessages = false;

  // Compose
  @state() private input = "";
  @state() private sending = false;

  // Project filter
  @state() private projectList: Project[] = [];
  @state() private filterProjectId: string | null = null;

  // Rename
  @state() private renamingChatId: number | null = null;
  @state() private renameValue = "";

  // Error / success feedback
  @state() private error = "";
  @state() private successMsg = "";

  // Search
  @state() private searchQuery = "";

  // Delete confirmation
  @state() private confirmDeleteId: number | null = null;

  // Mobile: show chat panel instead of sidebar
  @state() private mobileShowChat = false;

  // File attachments
  @state() private pendingAttachments: Array<{ key: string; name: string; type: string }> = [];
  @state() private uploading = false;

  // Feedback state – tracks feedback per message id
  @state() private feedbackMap: Record<number, "up" | "down"> = {};

  // Sources panel
  @state() private sourcesOpen = false;
  @state() private sourcesMessageId: number | null = null;

  // Copy confirmation
  @state() private copiedMessageId: number | null = null;

  // Create project inline
  @state() private showNewProject = false;
  @state() private newProjectName = "";
  @state() private creatingProject = false;

  // PRD generation
  @state() private generatingPrd = false;

  private msgEnd: HTMLElement | null = null;

  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------
  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener("ccl:chats-changed", this.onChatsChanged);
    void this.init();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("ccl:chats-changed", this.onChatsChanged);
  }

  private onChatsChanged = () => { void this.loadChats(); };

  private async init() {
    await Promise.all([this.loadChats(), this.loadProjects()]);
  }

  // -----------------------------------------------------------------------
  // Data loading
  // -----------------------------------------------------------------------
  private async loadChats() {
    this.loadingList = true;
    this.error = "";
    try {
      this.chatList = await brain.listChats(
        this.filterProjectId != null ? { projectId: this.filterProjectId } : undefined,
      );
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load chats";
    } finally {
      this.loadingList = false;
    }
  }

  private async loadProjects() {
    try {
      this.projectList = await projectsApi.list();
    } catch { /* ignore — filter just won't show projects */ }
  }

  private async selectChat(chat: BrainChat) {
    if (this.activeChat?.id === chat.id) return;
    this.activeChat = chat;
    this.mobileShowChat = true;
    this.messages = [];
    this.loadingMessages = true;
    try {
      this.messages = await brain.getMessages(chat.id);
      this.loadFeedbackFromMessages();
      this.scrollToBottom();
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load messages";
    } finally {
      this.loadingMessages = false;
    }
  }

  // -----------------------------------------------------------------------
  // Chat CRUD
  // -----------------------------------------------------------------------
  private async createNewChat() {
    try {
      const chat = await brain.createChat({
        title: "New chat",
        projectId: this.filterProjectId != null ? Number(this.filterProjectId) : null,
      });
      this.chatList = [chat, ...this.chatList];
      await this.selectChat(chat);
      window.dispatchEvent(new Event("ccl:chats-changed"));
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to create chat";
    }
  }

  private async deleteChat(id: number) {
    try {
      await brain.deleteChat(id);
      this.chatList = this.chatList.filter(c => c.id !== id);
      if (this.activeChat?.id === id) {
        this.activeChat = null;
        this.messages = [];
      }
      window.dispatchEvent(new Event("ccl:chats-changed"));
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to delete chat";
    }
  }

  private startRename(chat: BrainChat) {
    this.renamingChatId = chat.id;
    this.renameValue = chat.title;
  }

  private async commitRename(chatId: number) {
    const title = this.renameValue.trim();
    if (!title) { this.renamingChatId = null; return; }
    try {
      const updated = await brain.updateChat(chatId, { title });
      this.chatList = this.chatList.map(c => c.id === chatId ? { ...c, title: updated.title } : c);
      if (this.activeChat?.id === chatId) this.activeChat = { ...this.activeChat!, title: updated.title };
    } catch { /* swallow */ }
    this.renamingChatId = null;
  }

  private async moveToProject(chatId: number, projectId: string | null) {
    try {
      const updated = await brain.updateChat(chatId, { projectId: projectId != null ? Number(projectId) : null });
      this.chatList = this.chatList.map(c => c.id === chatId ? { ...c, projectId: updated.projectId } : c);
      if (this.activeChat?.id === chatId) this.activeChat = { ...this.activeChat!, projectId: updated.projectId };
    } catch { /* swallow */ }
  }

  // -----------------------------------------------------------------------
  // File upload
  // -----------------------------------------------------------------------
  private async handleFileSelect(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    try {
      const result = await brain.upload(file);
      this.pendingAttachments = [...this.pendingAttachments, { key: result.key, name: result.name, type: result.type }];
    } catch (err) {
      this.error = (err as Error).message ?? "Upload failed";
      setTimeout(() => { this.error = ""; }, 3000);
    } finally {
      this.uploading = false;
      (e.target as HTMLInputElement).value = "";
    }
  }

  private removePendingAttachment(key: string) {
    this.pendingAttachments = this.pendingAttachments.filter(a => a.key !== key);
  }

  // -----------------------------------------------------------------------
  // Send / LLM interaction
  // -----------------------------------------------------------------------
  private async send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    // Auto-create chat if none selected
    if (!this.activeChat) {
      await this.createNewChat();
      if (!this.activeChat) return;
    }

    this.input = "";
    this.sending = true;
    const attachments = [...this.pendingAttachments];
    this.pendingAttachments = [];

    try {
      // Build message content — include attachment references if any
      let content = text;
      if (attachments.length > 0) {
        const refs = attachments.map(a => `[Attached: ${a.name}](${brain.uploadUrl(a.key)})`).join("\n");
        content = `${text}\n\n${refs}`;
      }
      const metadata = attachments.length > 0 ? JSON.stringify({ attachments }) : undefined;

      // 1. Persist user message to server
      const [userMsg] = await brain.sendMessages(this.activeChat!.id, [
        { role: "user", content, metadata },
      ]);
      this.messages = [...this.messages, userMsg];
      this.scrollToBottom();

      // 2. Build conversation for LLM — send full history (up to 80 messages)
      const history = this.messages.slice(-80).map(m => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));
      const systemPrompt = [
        "You are Brain, the AI assistant inside CoderClawLink.",
        "You are helping the user brainstorm and plan.",
        "Be concise, actionable, and concrete. Use markdown formatting.",
      ].join("\n");

      const llmMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
      ];

      // Inject project memory if chat is linked to a project
      if (this.activeChat?.projectId) {
        try {
          const mem = await brain.getProjectMemory(this.activeChat.projectId);
          if (mem?.consolidatedSummary) {
            llmMessages.push({ role: "system", content: `Project memory context:\n${mem.consolidatedSummary}` });
          }
        } catch { /* non-critical — proceed without memory */ }
      }

      llmMessages.push(...history);

      // 3. Get LLM response
      const response = await llm.chat(llmMessages, { temperature: 0.3, maxTokens: 4096 });
      const reply = response.choices?.[0]?.message?.content?.trim() ?? "I could not generate a response.";

      // 4. Persist assistant message
      const [assistantMsg] = await brain.sendMessages(this.activeChat!.id, [
        { role: "assistant", content: reply },
      ]);
      this.messages = [...this.messages, assistantMsg];
      this.scrollToBottom();

      // 5. Auto-title the chat if it's still "New chat" and this is the first exchange
      if (this.activeChat!.title === "New chat" && this.messages.length <= 3) {
        void this.autoTitle(text);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Show error inline as a synthetic local message (not persisted)
      this.messages = [...this.messages, {
        id: -1, role: "assistant", content: `Error: ${msg}`,
        metadata: null, seq: 0, createdAt: new Date().toISOString(),
      }];
    } finally {
      this.sending = false;
    }
  }

  private async autoTitle(firstMessage: string) {
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
    } catch { /* swallow — title is nice-to-have */ }
  }

  // -----------------------------------------------------------------------
  // Summarization & Memory
  // -----------------------------------------------------------------------
  private async summarizeChat(chatId: number) {
    try {
      const result = await brain.summarize(chatId);
      if (result.summary) {
        this.successMsg = "Chat summarized successfully.";
        setTimeout(() => { if (this.successMsg === "Chat summarized successfully.") this.successMsg = ""; }, 3000);
      }
    } catch (e) {
      this.error = (e as Error).message ?? "Summarization failed";
    }
  }

  private async consolidateProjectMemory(projectId: number) {
    try {
      const result = await brain.consolidateProjectMemory(projectId);
      if (result.consolidatedSummary) {
        this.successMsg = "Project memory consolidated.";
        setTimeout(() => { if (this.successMsg === "Project memory consolidated.") this.successMsg = ""; }, 3000);
        // Auto-sync to connected claws
        brain.syncProjectMemoryToClaws(projectId).catch(() => { /* best-effort */ });
      } else {
        this.error = result.reason ?? "Nothing to consolidate";
        setTimeout(() => { this.error = ""; }, 3000);
      }
    } catch (e) {
      this.error = (e as Error).message ?? "Consolidation failed";
    }
  }

  // -----------------------------------------------------------------------
  // Message actions — copy, feedback, sources
  // -----------------------------------------------------------------------

  private async copyMessage(msg: BrainMessage) {
    try {
      // Try to copy rendered HTML as rich text + plain text fallback
      const raw = (await import("marked")).marked.parse(msg.content, { gfm: true, breaks: true });
      const htmlString = typeof raw === "string" ? raw : "";
      const blob = new Blob([htmlString], { type: "text/html" });
      const textBlob = new Blob([msg.content], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob, "text/plain": textBlob }),
      ]);
    } catch {
      // Fallback: plain text copy
      await navigator.clipboard.writeText(msg.content).catch(() => {});
    }
    this.copiedMessageId = msg.id;
    setTimeout(() => { if (this.copiedMessageId === msg.id) this.copiedMessageId = null; }, 2000);
  }

  private async submitFeedback(msg: BrainMessage, value: "up" | "down") {
    const current = this.feedbackMap[msg.id];
    const newValue = current === value ? null : value;
    // Optimistic update
    if (newValue) {
      this.feedbackMap = { ...this.feedbackMap, [msg.id]: newValue };
    } else {
      const copy = { ...this.feedbackMap };
      delete copy[msg.id];
      this.feedbackMap = copy;
    }
    try {
      await brain.setMessageFeedback(msg.id, newValue);
    } catch { /* swallow — feedback is best-effort */ }
  }

  /** Extract URLs from message content for the sources panel. */
  private extractSources(content: string): Array<{ url: string; title: string; host: string }> {
    const urls: Array<{ url: string; title: string; host: string }> = [];
    const seen = new Set<string>();
    // Match markdown links [title](url) and plain URLs
    const mdLinkRe = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let m: RegExpExecArray | null;
    while ((m = mdLinkRe.exec(content)) !== null) {
      const url = m[2];
      if (!seen.has(url)) {
        seen.add(url);
        try {
          const host = new URL(url).hostname;
          urls.push({ url, title: m[1], host });
        } catch { /* skip invalid URLs */ }
      }
    }
    // Also match bare URLs not inside markdown links
    const bareRe = /(?<!\()(https?:\/\/[^\s)<>]+)/g;
    while ((m = bareRe.exec(content)) !== null) {
      const url = m[1];
      if (!seen.has(url)) {
        seen.add(url);
        try {
          const host = new URL(url).hostname;
          urls.push({ url, title: host, host });
        } catch { /* skip invalid URLs */ }
      }
    }
    return urls;
  }

  private openSources(msgId: number) {
    this.sourcesMessageId = msgId;
    this.sourcesOpen = true;
  }

  private closeSources() {
    this.sourcesOpen = false;
    this.sourcesMessageId = null;
  }

  /** Load feedback state from message metadata when messages are loaded. */
  private loadFeedbackFromMessages() {
    const map: Record<number, "up" | "down"> = {};
    for (const msg of this.messages) {
      if (msg.metadata) {
        try {
          const meta = JSON.parse(msg.metadata);
          if (meta.feedback === "up" || meta.feedback === "down") {
            map[msg.id] = meta.feedback;
          }
        } catch { /* ignore malformed metadata */ }
      }
    }
    this.feedbackMap = map;
  }

  // -----------------------------------------------------------------------
  // Project + PRD from chat
  // -----------------------------------------------------------------------

  private async createProjectAndAssign() {
    const name = this.newProjectName.trim();
    if (!name || !this.activeChat || this.creatingProject) return;
    this.creatingProject = true;
    try {
      const project = await projectsApi.create({ name });
      this.projectList = [...this.projectList, project];
      await this.moveToProject(this.activeChat.id, String(project.id));
      this.showNewProject = false;
      this.newProjectName = "";
      this.successMsg = `Project "${name}" created and linked.`;
      setTimeout(() => { if (this.successMsg.includes(name)) this.successMsg = ""; }, 3000);
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to create project";
      setTimeout(() => { this.error = ""; }, 3000);
    } finally {
      this.creatingProject = false;
    }
  }

  private async generatePrdFromChat() {
    if (!this.activeChat?.projectId || this.generatingPrd) return;
    this.generatingPrd = true;
    try {
      const projectName = this.projectName(this.activeChat.projectId);
      const chatHistory = this.messages
        .filter(m => m.id > 0)
        .map(m => `**${m.role === "user" ? "User" : "Brain"}:** ${m.content}`)
        .join("\n\n");

      const response = await llm.chat([
        { role: "system", content: "You are a senior product manager. Generate a comprehensive PRD (Product Requirements Document) in markdown based on the brainstorming conversation provided. Include: Overview, Goals & Objectives, User Stories, Functional Requirements, Non-Functional Requirements, Success Metrics, and Timeline. Be thorough and actionable." },
        { role: "user", content: `Generate a PRD for project \"${projectName}\" based on this brainstorming session:\n\n${chatHistory}` },
      ], { temperature: 0.3, maxTokens: 4096 });

      const prd = response.choices?.[0]?.message?.content?.trim() ?? "Could not generate PRD.";

      // Persist as assistant message with PRD metadata
      const [savedMsg] = await brain.sendMessages(this.activeChat.id, [
        { role: "assistant", content: prd, metadata: JSON.stringify({ type: "prd", projectId: this.activeChat.projectId }) },
      ]);
      this.messages = [...this.messages, savedMsg];
      this.scrollToBottom();

      this.successMsg = "PRD generated and saved to this chat.";
      setTimeout(() => { if (this.successMsg.includes("PRD")) this.successMsg = ""; }, 4000);
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to generate PRD";
      setTimeout(() => { this.error = ""; }, 3000);
    } finally {
      this.generatingPrd = false;
    }
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------
  private scrollToBottom() {
    requestAnimationFrame(() => {
      this.msgEnd = this.querySelector("#brainstorm-msg-end") as HTMLElement;
      this.msgEnd?.scrollIntoView({ behavior: "smooth" });
    });
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void this.send();
    }
  }

  private formatTime(ts: string) {
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  private projectName(id: number | null): string {
    if (id == null) return "";
    return this.projectList.find(p => String(p.id) === String(id))?.name ?? `#${id}`;
  }

  private get filteredChatList(): BrainChat[] {
    if (!this.searchQuery.trim()) return this.chatList;
    const q = this.searchQuery.toLowerCase();
    return this.chatList.filter(c => c.title.toLowerCase().includes(q));
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  override render() {
    return html`
      <div class="bs-shell ${this.mobileShowChat ? "bs-show-chat" : ""}">

        <!-- Sidebar -->
        <div class="bs-sidebar">

          <!-- Sidebar header -->
          <div class="bs-sidebar-header">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div style="font-weight:600;font-size:15px;color:var(--text-strong);">Brain Storm</div>
              <button class="btn btn-primary btn-sm" @click=${() => { void this.createNewChat(); this.mobileShowChat = true; }}>+ New</button>
            </div>

            <!-- Project filter -->
            <select
              style="width:100%;padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:12px;"
              @change=${(e: Event) => {
                const val = (e.target as HTMLSelectElement).value;
                this.filterProjectId = val === "" ? null : val;
                void this.loadChats();
              }}
            >
              <option value="">All projects</option>
              <option value="none">No project</option>
              ${this.projectList.map(p => html`
                <option value=${p.id} ?selected=${this.filterProjectId === String(p.id)}>${p.name}</option>
              `)}
            </select>
            ${this.filterProjectId && this.filterProjectId !== "none" ? html`
              <button
                class="btn btn-secondary btn-sm"
                style="font-size:11px;"
                @click=${() => void this.consolidateProjectMemory(Number(this.filterProjectId))}
              >Consolidate project memory</button>
            ` : nothing}

            <!-- Search -->
            <input
              type="text"
              placeholder="Search chats…"
              .value=${this.searchQuery}
              @input=${(e: Event) => { this.searchQuery = (e.target as HTMLInputElement).value; }}
              style="width:100%;padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:12px;"
            />
          </div>

          <!-- Chat list -->
          <div class="bs-chat-list">
            ${this.loadingList ? html`<div style="padding:12px;font-size:13px;color:var(--muted);">Loading…</div>` : ""}
            ${!this.loadingList && this.filteredChatList.length === 0 ? html`
              <div style="padding:12px;font-size:13px;color:var(--muted);text-align:center;">
                ${this.searchQuery ? "No matching chats." : html`No chats yet.<br>Click <strong>+ New</strong> to start brainstorming.`}
              </div>
            ` : ""}
            ${this.filteredChatList.map(chat => html`
              <div
                class="bs-chat-item ${this.activeChat?.id === chat.id ? "active" : ""}"
                @click=${() => void this.selectChat(chat)}
              >
                ${this.renamingChatId === chat.id
                  ? html`
                    <input
                      type="text"
                      .value=${this.renameValue}
                      @input=${(e: Event) => { this.renameValue = (e.target as HTMLInputElement).value; }}
                      @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.commitRename(chat.id); if (e.key === "Escape") this.renamingChatId = null; }}
                      @blur=${() => void this.commitRename(chat.id)}
                      @click=${(e: Event) => e.stopPropagation()}
                      style="width:100%;padding:2px 6px;border:1px solid var(--accent);border-radius:4px;background:var(--bg);color:var(--text);font-size:13px;"
                    />
                  `
                  : html`
                    <div style="font-size:13px;font-weight:500;color:var(--text-strong);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${chat.title}</div>
                    <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
                      ${chat.projectId ? html`<span class="badge badge-blue" style="font-size:10px;">${this.projectName(chat.projectId)}</span>` : ""}
                      <span style="font-size:11px;color:var(--muted);margin-left:auto;">${this.formatTime(chat.updatedAt)}</span>
                    </div>
                  `}
                ${this.activeChat?.id === chat.id ? html`
                  <div style="display:flex;gap:4px;margin-top:4px;" @click=${(e: Event) => e.stopPropagation()}>
                    <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 6px;" @click=${() => this.startRename(chat)}>Rename</button>
                    <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 6px;" @click=${() => void this.summarizeChat(chat.id)} title="Summarize chat into memory">Summarize</button>
                    <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 6px;color:var(--danger,#f44);" @click=${() => { this.confirmDeleteId = chat.id; }}>Delete</button>
                  </div>
                  <div class="bs-project-actions" @click=${(e: Event) => e.stopPropagation()}>
                    ${chat.projectId
                      ? html`
                        <button class="btn btn-ghost btn-sm bs-prd-btn" @click=${() => void this.generatePrdFromChat()} ?disabled=${this.generatingPrd} title="Generate PRD from this conversation">
                          ${this.generatingPrd ? "Generating…" : "📄 Generate PRD"}
                        </button>
                      `
                      : html`
                        <select
                          class="bs-project-select"
                          @change=${(e: Event) => {
                            const val = (e.target as HTMLSelectElement).value;
                            if (val === "__new__") {
                              this.showNewProject = true;
                              (e.target as HTMLSelectElement).value = "";
                            } else if (val) {
                              void this.moveToProject(chat.id, val);
                            }
                          }}
                        >
                          <option value="">Add to project…</option>
                          ${this.projectList.map(p => html`<option value=${p.id}>${p.name}</option>`)}
                          <option value="__new__">+ Create new project…</option>
                        </select>
                      `}
                  </div>
                ` : nothing}
              </div>
            `)}
          </div>
        </div>

        <!-- Main chat area -->
        <div class="bs-main">
          ${this.error ? html`<div class="error-banner" style="margin:8px 12px 0 12px;font-size:13px;">${this.error}</div>` : ""}
          ${this.successMsg ? html`<div class="success-banner" style="margin:8px 12px 0 12px;font-size:13px;padding:8px 12px;border-radius:6px;background:var(--success-bg,rgba(34,197,94,0.1));color:var(--success,#22c55e);border:1px solid var(--success,#22c55e);">${this.successMsg}</div>` : ""}

          ${!this.activeChat ? html`
            <div class="bs-empty">
              <div style="font-size:40px;">🧠</div>
              <div style="font-size:16px;font-weight:500;">Brain Storm</div>
              <div style="font-size:13px;">Select a chat or start a new one to begin brainstorming.</div>
              <button class="btn btn-primary" @click=${() => void this.createNewChat()}>Start new chat</button>
            </div>
          ` : html`
            <!-- Chat header -->
            <div class="bs-chat-header">
              <button class="btn btn-ghost btn-sm bs-back-btn" @click=${() => { this.mobileShowChat = false; }}>← Back</button>
              <div style="font-weight:600;font-size:15px;color:var(--text-strong);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${this.activeChat.title}
              </div>
              ${this.activeChat.projectId ? html`<span class="badge badge-blue">${this.projectName(this.activeChat.projectId)}</span>` : ""}
              <select
                class="bs-project-select"
                @change=${(e: Event) => {
                  const val = (e.target as HTMLSelectElement).value;
                  if (val === "__new__") {
                    this.showNewProject = true;
                    (e.target as HTMLSelectElement).value = this.activeChat?.projectId ? String(this.activeChat.projectId) : "";
                  } else {
                    void this.moveToProject(this.activeChat!.id, val === "" ? null : val);
                  }
                }}
              >
                <option value="" ?selected=${!this.activeChat.projectId}>No project</option>
                ${this.projectList.map(p => html`
                  <option value=${p.id} ?selected=${this.activeChat?.projectId === Number(p.id)}>${p.name}</option>
                `)}
                <option value="__new__">+ Create new project…</option>
              </select>
              ${this.activeChat.projectId ? html`
                <button class="btn btn-secondary btn-sm" @click=${() => void this.generatePrdFromChat()} ?disabled=${this.generatingPrd} title="Generate PRD from this conversation">
                  ${this.generatingPrd ? "Generating…" : "📄 PRD"}
                </button>
              ` : html`
                <button class="btn btn-secondary btn-sm" @click=${() => { this.showNewProject = true; }}>+ Project</button>
              `}
            </div>

            <!-- Create project inline form -->
            ${this.showNewProject ? html`
              <div class="bs-create-project-bar">
                <input
                  type="text"
                  class="input"
                  style="flex:1;font-size:13px;padding:6px 10px;"
                  placeholder="New project name…"
                  .value=${this.newProjectName}
                  @input=${(e: Event) => { this.newProjectName = (e.target as HTMLInputElement).value; }}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.createProjectAndAssign(); if (e.key === "Escape") { this.showNewProject = false; this.newProjectName = ""; } }}
                />
                <button class="btn btn-primary btn-sm" @click=${() => void this.createProjectAndAssign()} ?disabled=${this.creatingProject || !this.newProjectName.trim()}>  
                  ${this.creatingProject ? "Creating…" : "Create & Link"}
                </button>
                <button class="btn btn-ghost btn-sm" @click=${() => { this.showNewProject = false; this.newProjectName = ""; }}>Cancel</button>
              </div>
            ` : nothing}

            <!-- Messages -->
            <div class="bs-messages">
              ${this.loadingMessages ? html`<div style="color:var(--muted);font-size:13px;">Loading messages…</div>` : ""}
              ${this.messages.map(msg => {
                const isUser = msg.role === "user";
                const sources = !isUser ? this.extractSources(msg.content) : [];
                const feedback = this.feedbackMap[msg.id] ?? null;
                return html`
                  <div class="bs-msg-wrapper ${isUser ? "bs-msg-wrapper-user" : ""}">
                    <div class="bs-msg ${isUser ? "bs-msg-user" : ""}">
                      <div class="bs-avatar" style="background:${isUser ? "var(--accent,#6366f1)" : "var(--panel-strong,#1a1d25)"};color:${isUser ? "#fff" : "var(--text)"};">
                        ${isUser ? "U" : "🧠"}
                      </div>
                      <div class="bs-bubble ${isUser ? "bs-bubble-user" : "bs-bubble-ai"} md-bubble">
                        ${renderMarkdown(msg.content)}
                      </div>
                    </div>
                    ${!isUser && msg.id > 0 ? html`
                      <div class="bs-msg-actions">
                        <button class="bs-msg-action ${this.copiedMessageId === msg.id ? "active" : ""}" @click=${() => void this.copyMessage(msg)} title="Copy">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          ${this.copiedMessageId === msg.id ? "Copied!" : "Copy"}
                        </button>
                        <button class="bs-msg-action ${feedback === "up" ? "active" : ""}" @click=${() => void this.submitFeedback(msg, "up")} title="Good response">
                          <svg viewBox="0 0 24 24" fill="${feedback === "up" ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        </button>
                        <button class="bs-msg-action ${feedback === "down" ? "active" : ""}" @click=${() => void this.submitFeedback(msg, "down")} title="Bad response">
                          <svg viewBox="0 0 24 24" fill="${feedback === "down" ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                        </button>
                        ${sources.length > 0 ? html`
                          <button class="bs-msg-action" @click=${() => this.openSources(msg.id)} title="View sources">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            Sources
                          </button>
                        ` : nothing}
                      </div>
                    ` : nothing}
                  </div>
                `;
              })}
              ${this.sending ? html`
                <div class="bs-msg">
                  <div class="bs-avatar" style="background:var(--panel-strong,#1a1d25);">🧠</div>
                  <div class="bs-bubble bs-bubble-ai" style="color:var(--muted);">Thinking…</div>
                </div>
              ` : ""}
              <div id="brainstorm-msg-end"></div>
            </div>

            <!-- Input area -->
            <div class="bs-input-area">
              ${this.pendingAttachments.length > 0 ? html`
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                  ${this.pendingAttachments.map(a => html`
                    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;background:var(--accent-bg,rgba(99,102,241,0.1));font-size:11px;color:var(--text);">
                      📎 ${a.name}
                      <button style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:14px;padding:0;" @click=${() => this.removePendingAttachment(a.key)}>&times;</button>
                    </span>
                  `)}
                </div>
              ` : nothing}
              <div style="display:flex;gap:8px;align-items:flex-end;">
                <label style="cursor:pointer;display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:10px;border:1px solid var(--border);background:var(--bg);flex-shrink:0;${this.uploading ? "opacity:0.5;pointer-events:none;" : ""}">
                  <span style="font-size:18px;">📎</span>
                  <input type="file" style="display:none;" @change=${this.handleFileSelect} accept="image/*,.pdf,.txt,.md,.csv,.json" />
                </label>
                <textarea
                  style="flex:1;resize:none;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:14px;min-height:42px;max-height:120px;font-family:inherit;"
                  placeholder="Message Brain…"
                  .value=${this.input}
                  @input=${(e: Event) => { this.input = (e.target as HTMLTextAreaElement).value; }}
                  @keydown=${this.onKeydown}
                  ?disabled=${this.sending}
                ></textarea>
                <button
                  class="btn btn-primary"
                  style="height:42px;padding:0 16px;"
                  @click=${() => void this.send()}
                  ?disabled=${this.sending || !this.input.trim()}
                >${this.sending ? "…" : "Send"}</button>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Delete confirmation modal -->
      ${this.confirmDeleteId != null ? html`
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;" @click=${() => { this.confirmDeleteId = null; }}>
          <div style="background:var(--bg,#1a1a1a);border:1px solid var(--border);border-radius:12px;padding:24px;max-width:380px;width:90%;" @click=${(e: Event) => e.stopPropagation()}>
            <div style="font-size:16px;font-weight:600;color:var(--text-strong);margin-bottom:8px;">Delete chat?</div>
            <div style="font-size:14px;color:var(--muted);margin-bottom:20px;">This will permanently archive this chat. You won't be able to access it again.</div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <button class="btn btn-ghost" @click=${() => { this.confirmDeleteId = null; }}>Cancel</button>
              <button class="btn" style="background:var(--danger,#ef4444);color:#fff;" @click=${async () => { const id = this.confirmDeleteId!; this.confirmDeleteId = null; await this.deleteChat(id); }}>Delete</button>
            </div>
          </div>
        </div>
      ` : nothing}

      <!-- Sources side panel -->
      ${this.sourcesOpen && this.sourcesMessageId != null ? (() => {
        const msg = this.messages.find(m => m.id === this.sourcesMessageId);
        const sources = msg ? this.extractSources(msg.content) : [];
        return html`
          <div class="bs-sources-overlay">
            <div class="bs-sources-backdrop" @click=${() => this.closeSources()}></div>
            <div class="bs-sources-panel">
              <div class="bs-sources-header">
                <span>Sources</span>
                <button class="btn btn-ghost btn-sm" @click=${() => this.closeSources()}>✕</button>
              </div>
              <div class="bs-sources-body">
                ${sources.length === 0 ? html`<div style="color:var(--muted);font-size:13px;">No sources found in this message.</div>` : ""}
                ${sources.map(s => html`
                  <div class="bs-source-item">
                    <div class="bs-source-icon">🔗</div>
                    <div class="bs-source-info">
                      <a class="bs-source-title" href=${s.url} target="_blank" rel="noopener">${s.title}</a>
                      <div class="bs-source-url">${s.host}</div>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          </div>
        `;
      })() : nothing}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-brainstorm": CclBrainstorm; } }
