/**
 * Content Manager view – Builder.io-inspired headless CMS.
 *
 * Lets teams create, manage and target reusable markdown content blocks
 * (pages, templates, snippets).  Content is stored in localStorage for
 * zero-backend operation; an AI-powered "Generate" action uses Brain/LLM
 * to draft content from a natural-language prompt.
 *
 * Features:
 *  • Create / edit / delete content blocks with title, type, body (Markdown)
 *  • Preview rendered Markdown
 *  • A/B variant toggle per block (Builder.io A/B Testing feature)
 *  • Content targeting via audience tags
 *  • Role-based visibility: blocks can be marked as draft or published
 */
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { llm } from "../api.js";

export type ContentType = "page" | "template" | "snippet";
export type ContentStatus = "draft" | "published";

export interface ContentVariant {
  id: string;
  label: string;
  body: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  body: string;
  /** Optional A/B variant for this block */
  variant?: ContentVariant | null;
  /** Audience tags for targeting (e.g. "free", "pro", "mobile") */
  tags: string[];
  /** Whether this block has been shared to the marketplace */
  sharedToMarketplace?: boolean;
  image?: string;
  likes?: number;
  downloads?: number;
  createdAt: string;
  updatedAt: string;
}

function storageKey(tenantId: string) {
  return `ccl-content-${tenantId || "default"}`;
}

function loadBlocks(tenantId: string): ContentBlock[] {
  try {
    const raw = localStorage.getItem(storageKey(tenantId));
    return raw ? (JSON.parse(raw) as ContentBlock[]) : [];
  } catch {
    return [];
  }
}

function saveBlocks(tenantId: string, blocks: ContentBlock[]) {
  localStorage.setItem(storageKey(tenantId), JSON.stringify(blocks));
}

function renderMarkdownSafe(text: string): string {
  const raw = marked.parse(text, { gfm: true, breaks: true });
  const html = typeof raw === "string" ? raw : "";
  return DOMPurify.sanitize(html);
}

@customElement("ccl-content")
export class CclContent extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private blocks: ContentBlock[] = [];
  @state() private filter: ContentType | "all" = "all";
  @state() private statusFilter: ContentStatus | "all" = "all";
  @state() private search = "";
  @state() private contentTab: "my-content" | "marketplace" = "my-content";
  @state() private marketplaceSearch = "";

  @state() private panelOpen = false;
  @state() private editTarget: ContentBlock | null = null;
  @state() private previewMode = false;
  @state() private activeVariant: "main" | "ab" = "main";

  @state() private form = {
    title: "",
    type: "snippet" as ContentType,
    status: "draft" as ContentStatus,
    body: "",
    tags: "",
    image: "",
    variantEnabled: false,
    variantLabel: "Variant B",
    variantBody: "",
  };

  @state() private generating = false;
  @state() private generatePrompt = "";
  @state() private generateError = "";

  override connectedCallback() {
    super.connectedCallback();
    this.blocks = loadBlocks(this.tenantId);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("tenantId")) {
      this.blocks = loadBlocks(this.tenantId);
    }
  }

  private persist() {
    saveBlocks(this.tenantId, this.blocks);
  }

  // ---------------------------------------------------------------------------
  // CRUD helpers
  // ---------------------------------------------------------------------------

  private openCreate() {
    this.editTarget = null;
    this.form = {
      title: "",
      type: "snippet",
      status: "draft",
      body: "",
      tags: "",
      image: "",
      variantEnabled: false,
      variantLabel: "Variant B",
      variantBody: "",
    };
    this.previewMode = false;
    this.activeVariant = "main";
    this.generatePrompt = "";
    this.generateError = "";
    this.panelOpen = true;
  }

  private openEdit(block: ContentBlock) {
    this.editTarget = block;
    this.form = {
      title: block.title,
      type: block.type,
      status: block.status,
      body: block.body,
      tags: block.tags.join(", "),
      image: block.image || "",
      variantEnabled: block.variant != null,
      variantLabel: block.variant?.label ?? "Variant B",
      variantBody: block.variant?.body ?? "",
    };
    this.previewMode = false;
    this.activeVariant = "main";
    this.generatePrompt = "";
    this.generateError = "";
    this.panelOpen = true;
  }

  private save() {
    const title = this.form.title.trim();
    if (!title) return;
    const tags = this.form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const variant: ContentVariant | null = this.form.variantEnabled
      ? { id: "b", label: this.form.variantLabel || "Variant B", body: this.form.variantBody }
      : null;
    const now = new Date().toISOString();

    if (this.editTarget) {
      this.blocks = this.blocks.map(b =>
        b.id === this.editTarget!.id
          ? { ...b, title, type: this.form.type, status: this.form.status, body: this.form.body, tags, variant, image: this.form.image.trim() || undefined, updatedAt: now }
          : b,
      );
    } else {
      const newBlock: ContentBlock = {
        id: crypto.randomUUID(),
        title,
        type: this.form.type,
        status: this.form.status,
        body: this.form.body,
        tags,
        variant,
        image: this.form.image.trim() || undefined,
        likes: 0,
        downloads: 0,
        createdAt: now,
        updatedAt: now,
      };
      this.blocks = [...this.blocks, newBlock];
    }
    this.persist();
    this.panelOpen = false;
  }

  private deleteBlock(id: string) {
    if (!confirm("Delete this content block?")) return;
    this.blocks = this.blocks.filter(b => b.id !== id);
    this.persist();
  }

  private togglePublish(id: string) {
    this.blocks = this.blocks.map(b =>
      b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published", updatedAt: new Date().toISOString() } : b,
    );
    this.persist();
  }

  private toggleMarketplace(id: string) {
    this.blocks = this.blocks.map(b =>
      b.id === id ? { ...b, sharedToMarketplace: !b.sharedToMarketplace, updatedAt: new Date().toISOString() } : b,
    );
    this.persist();
  }

  private marketplaceContent(): ContentBlock[] {
    const q = this.marketplaceSearch.toLowerCase();
    return this.blocks.filter(b =>
      b.sharedToMarketplace && b.status === "published" &&
      (!q || b.title.toLowerCase().includes(q) || b.body.toLowerCase().includes(q)),
    );
  }

  private async generateContent() {
    const prompt = this.generatePrompt.trim();
    if (!prompt || this.generating) return;
    this.generating = true;
    this.generateError = "";
    try {
      const response = await llm.chat(
        [
          {
            role: "system",
            content: [
              "You are a professional content writer.",
              "Generate well-structured markdown content for the requested topic.",
              `Content type: ${this.form.type}.`,
              "Return only the markdown body — no titles or meta headers.",
            ].join(" "),
          },
          { role: "user", content: prompt },
        ],
        { temperature: 0.6, maxTokens: 1000 },
      );
      const generated = response.choices?.[0]?.message?.content?.trim() ?? "";
      if (this.activeVariant === "ab") {
        this.form = { ...this.form, variantBody: generated };
      } else {
        this.form = { ...this.form, body: generated };
      }
    } catch (e) {
      this.generateError = (e as Error).message;
    } finally {
      this.generating = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  private filtered() {
    const q = this.search.toLowerCase();
    return this.blocks.filter(b => {
      if (this.filter !== "all" && b.type !== this.filter) return false;
      if (this.statusFilter !== "all" && b.status !== this.statusFilter) return false;
      if (q && !b.title.toLowerCase().includes(q) && !b.body.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:18px;font-weight:600;color:var(--text-strong)">Content Manager</div>
            <div style="font-size:13px;color:var(--muted);margin-top:2px">Manage reusable markdown content blocks with A/B variants and audience targeting</div>
          </div>
          ${this.contentTab === "my-content" ? html`
            <button class="btn btn-primary btn-sm" @click=${this.openCreate}>
              <svg viewBox="0 0 24 24" style="width:13px;height:13px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New content
            </button>
          ` : ""}
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:4px;margin-bottom:4px">
          <button class="btn btn-sm ${this.contentTab === "my-content" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.contentTab = "my-content"; }}>My Content (${this.blocks.length})</button>
          <button class="btn btn-sm ${this.contentTab === "marketplace" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.contentTab = "marketplace"; }}>Marketplace (${this.blocks.filter(b => b.sharedToMarketplace).length})</button>
        </div>

        ${this.contentTab === "my-content" ? this.renderMyContent() : this.renderMarketplaceTab()}
      </div>

      ${this.panelOpen ? this.renderPanel() : ""}
    `;
  }

  private renderMyContent() {
    const items = this.filtered();
    return html`
      <!-- Filters -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input class="input" style="max-width:240px;font-size:12px;padding:6px 10px" placeholder="Search…"
          .value=${this.search} @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}>
        ${(["all", "page", "template", "snippet"] as const).map(t => html`
          <button class="btn btn-sm ${this.filter === t ? "btn-primary" : "btn-secondary"}" @click=${() => { this.filter = t; }}>${t === "all" ? "All types" : t}</button>
        `)}
        ${(["all", "published", "draft"] as const).map(s => html`
          <button class="btn btn-sm ${this.statusFilter === s ? "btn-primary" : "btn-secondary"}" @click=${() => { this.statusFilter = s; }}>${s === "all" ? "All status" : s}</button>
        `)}
      </div>

      <!-- Content list -->
      ${items.length === 0
        ? html`
          <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <div class="empty-state-title">No content blocks yet</div>
            <div class="empty-state-sub">Create pages, templates, and snippets to manage your content centrally</div>
            <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreate}>Create content</button>
          </div>`
        : html`
          <div class="grid grid-3">
            ${items.map(b => this.renderCard(b))}
          </div>`}
    `;
  }

  private renderMarketplaceTab() {
    const items = this.marketplaceContent();
    return html`
      <input class="input" style="max-width:300px;font-size:12px;padding:6px 10px" placeholder="Search marketplace content…"
        .value=${this.marketplaceSearch} @input=${(e: InputEvent) => { this.marketplaceSearch = (e.target as HTMLInputElement).value; }}>

      ${items.length === 0
        ? html`
          <div class="empty-state">
            <div class="empty-state-icon">🏪</div>
            <div class="empty-state-title">No marketplace content yet</div>
            <div class="empty-state-sub">Publish your content blocks and share them in the marketplace</div>
            <button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.contentTab = "my-content"; }}>Go to My Content</button>
          </div>`
        : html`
          <div class="grid grid-3">
            ${items.map(b => html`
              <div class="card" style="display:flex;flex-direction:column;gap:10px">
                <div class="card-header">
                  <div style="flex:1;overflow:hidden">
                    <div class="card-title" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${b.title}</div>
                    <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">
                      <span class="badge badge-gray">${b.type}</span>
                      <span class="badge badge-green">Published</span>
                      <span class="badge badge-blue">Marketplace</span>
                      ${b.tags.slice(0, 2).map(t => html`<span class="badge badge-gray">${t}</span>`)}
                    </div>
                  </div>
                </div>
                ${b.body ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical">${b.body.slice(0, 160)}</div>` : ""}
              </div>
            `)}
          </div>`}
    `;
  }

  private renderCard(b: ContentBlock) {
    const preview = b.body.slice(0, 160).trim();
    return html`
      <div class="card" style="display:flex;flex-direction:column;gap:10px;overflow:hidden">
        ${b.image ? html`<div style="width:100%;height:100px;background:url('${b.image}') center/cover;border-bottom:1px solid var(--border);margin:-16px -16px 0;width:calc(100% + 32px)"></div>` : ""}
        <div class="card-header">
          <div style="flex:1;overflow:hidden">
            <div class="card-title" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${b.title}">${b.title}</div>
            <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">
              <span class="badge badge-gray">${b.type}</span>
              <span class="badge ${b.status === "published" ? "badge-green" : "badge-yellow"}">${b.status}</span>
              ${b.variant ? html`<span class="badge badge-blue" title="A/B variant enabled">A/B</span>` : ""}
              ${b.tags.slice(0, 2).map(t => html`<span class="badge badge-gray">${t}</span>`)}
            </div>
          </div>
        </div>
        ${preview ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical">${preview}</div>` : ""}
        <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted)">
          <span title="Likes">❤️ ${b.likes ?? 0}</span>
          <span title="Downloads">⬇️ ${b.downloads ?? 0}</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:auto">
          <button class="btn btn-ghost btn-sm" @click=${() => this.openEdit(b)}>Edit</button>
          <button class="btn btn-ghost btn-sm" @click=${() => this.togglePublish(b.id)}>
            ${b.status === "published" ? "Unpublish" : "Publish"}
          </button>
          ${b.status === "published" ? html`
            <button class="btn btn-sm ${b.sharedToMarketplace ? "btn-secondary" : "btn-primary"}" @click=${() => this.toggleMarketplace(b.id)}>
              ${b.sharedToMarketplace ? "Unshare" : "Share to Marketplace"}
            </button>
          ` : ""}
          <button class="btn btn-danger btn-sm" @click=${() => this.deleteBlock(b.id)}>Delete</button>
        </div>
        <div style="font-size:11px;color:var(--muted)">Updated ${new Date(b.updatedAt).toLocaleString()}</div>
      </div>
    `;
  }

  private renderPanel() {
    const isEdit = this.editTarget !== null;
    const bodyValue = this.activeVariant === "ab" ? this.form.variantBody : this.form.body;
    return html`
      <div class="modal-backdrop" @click=${() => { this.panelOpen = false; }}>
        <div class="modal" style="max-width:780px;width:100%;max-height:90vh;overflow:auto" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">
            <div class="modal-title">${isEdit ? "Edit content" : "New content block"}</div>
            <button class="panel-close" @click=${() => { this.panelOpen = false; }}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div style="display:grid;gap:14px;padding:16px">
            <!-- Title + type + status -->
            <div style="display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:end">
              <div>
                <label class="label">Title</label>
                <input class="input" placeholder="Content title" .value=${this.form.title}
                  @input=${(e: InputEvent) => { this.form = { ...this.form, title: (e.target as HTMLInputElement).value }; }}>
              </div>
              <div>
                <label class="label">Type</label>
                <select class="select" .value=${this.form.type} @change=${(e: Event) => { this.form = { ...this.form, type: (e.target as HTMLSelectElement).value as ContentType }; }}>
                  <option value="snippet">Snippet</option>
                  <option value="page">Page</option>
                  <option value="template">Template</option>
                </select>
              </div>
              <div>
                <label class="label">Status</label>
                <select class="select" .value=${this.form.status} @change=${(e: Event) => { this.form = { ...this.form, status: (e.target as HTMLSelectElement).value as ContentStatus }; }}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <!-- Tags -->
            <div>
              <label class="label">Audience tags <span style="font-weight:400;color:var(--muted)">(comma-separated — e.g. free, pro, mobile)</span></label>
              <input class="input" placeholder="free, pro, mobile" .value=${this.form.tags}
                @input=${(e: InputEvent) => { this.form = { ...this.form, tags: (e.target as HTMLInputElement).value }; }}>
            </div>

            <!-- Cover image -->
            <div>
              <label class="label">Cover Image URL</label>
              <input class="input" placeholder="https://example.com/image.jpg" .value=${this.form.image}
                @input=${(e: InputEvent) => { this.form = { ...this.form, image: (e.target as HTMLInputElement).value }; }}>
            </div>

            <!-- A/B variant toggle -->
            <div style="display:flex;align-items:center;gap:10px">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;color:var(--text)">
                <input type="checkbox" ?checked=${this.form.variantEnabled}
                  @change=${(e: Event) => { this.form = { ...this.form, variantEnabled: (e.target as HTMLInputElement).checked }; }}>
                Enable A/B variant
              </label>
              ${this.form.variantEnabled ? html`
                <input class="input" style="max-width:200px" placeholder="Variant B label"
                  .value=${this.form.variantLabel}
                  @input=${(e: InputEvent) => { this.form = { ...this.form, variantLabel: (e.target as HTMLInputElement).value }; }}>
              ` : ""}
            </div>

            <!-- Body tabs (main / variant B) -->
            ${this.form.variantEnabled ? html`
              <div style="display:flex;gap:4px">
                <button class="btn btn-sm ${this.activeVariant === "main" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.activeVariant = "main"; }}>Main (A)</button>
                <button class="btn btn-sm ${this.activeVariant === "ab" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.activeVariant = "ab"; }}>${this.form.variantLabel || "Variant B"}</button>
              </div>
            ` : ""}

            <!-- AI generate -->
            <div style="display:flex;gap:8px;align-items:flex-end">
              <div style="flex:1">
                <label class="label">Generate with AI</label>
                <input class="input" placeholder="Describe what to generate, e.g. "Onboarding guide for developers""
                  .value=${this.generatePrompt}
                  @input=${(e: InputEvent) => { this.generatePrompt = (e.target as HTMLInputElement).value; }}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.generateContent(); }}>
              </div>
              <button class="btn btn-secondary btn-sm" ?disabled=${this.generating || !this.generatePrompt.trim()} @click=${() => void this.generateContent()}>
                ${this.generating ? "Generating…" : "✨ Generate"}
              </button>
            </div>
            ${this.generateError ? html`<div class="error-banner">${this.generateError}</div>` : ""}

            <!-- Editor / preview toggle -->
            <div style="display:flex;gap:4px">
              <button class="btn btn-sm ${!this.previewMode ? "btn-primary" : "btn-secondary"}" @click=${() => { this.previewMode = false; }}>Edit</button>
              <button class="btn btn-sm ${this.previewMode ? "btn-primary" : "btn-secondary"}" @click=${() => { this.previewMode = true; }}>Preview</button>
            </div>

            <!-- Editor / Preview -->
            ${this.previewMode
              ? html`<div class="card" style="min-height:260px;padding:16px"><div class="md-content">${unsafeHTML(renderMarkdownSafe(bodyValue))}</div></div>`
              : html`
                <textarea
                  class="input"
                  style="font-family:var(--mono);font-size:12px;min-height:260px;resize:vertical;white-space:pre"
                  placeholder="Write Markdown content here…"
                  .value=${bodyValue}
                  @input=${(e: InputEvent) => {
                    const val = (e.target as HTMLTextAreaElement).value;
                    if (this.activeVariant === "ab") {
                      this.form = { ...this.form, variantBody: val };
                    } else {
                      this.form = { ...this.form, body: val };
                    }
                  }}
                ></textarea>
              `}

            <div style="display:flex;justify-content:flex-end;gap:8px">
              <button class="btn btn-secondary" @click=${() => { this.panelOpen = false; }}>Cancel</button>
              <button class="btn btn-primary" @click=${this.save} ?disabled=${!this.form.title.trim()}>
                ${isEdit ? "Save changes" : "Create content"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-content": CclContent; } }
