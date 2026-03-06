import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Persona } from "./personas.js";
import { BUILTIN_PERSONAS } from "./personas.js";
import type { ContentBlock } from "./content.js";
import { BUILTIN_SKILLS, type BuiltinSkill } from "./builtin-skills.js";

type MarketplaceCategory = "all" | "personas" | "skills" | "content";

/** Marketplace listing wrapping a persona, skill, or content with marketplace metadata */
interface MarketplaceListing {
  id: string;
  type: "persona" | "skill" | "content";
  name: string;
  description: string;
  author: string;
  version: string;
  tags: string[];
  installed: boolean;
  downloads: number;
  likes: number;
  image?: string;
  emoji?: string;
  persona?: Persona;
}

/** Convert built-in personas to marketplace listings */
function personasToListings(personas: Persona[]): MarketplaceListing[] {
  return personas.map((p) => ({
    id: `persona:${p.name}`,
    type: "persona" as const,
    name: p.name,
    description: p.description,
    author: "coderClaw",
    version: "1.0.0",
    tags: p.tags ?? [],
    installed: true,
    downloads: 0,
    persona: p,
    likes: p.likes ?? 0,
    image: p.image,
  }));
}

/** Load shared user skills from localStorage */
function loadSharedSkills(tenantId: string): MarketplaceListing[] {
  try {
    const raw = localStorage.getItem(`ccl-user-skills-${tenantId || "default"}`);
    if (!raw) return [];
    const skills = JSON.parse(raw) as Array<{ id: string; name: string; description: string; category: string; version: string; shared: boolean }>;
    return skills
      .filter((s) => s.shared)
      .map((s) => ({
        id: `skill:${s.id}`,
        type: "skill" as const,
        name: s.name,
        description: s.description || "",
        author: "You",
        version: s.version || "1.0.0",
        tags: s.category ? [s.category] : [],
        installed: false,
        downloads: 0,
        likes: 0,
      }));
  } catch { return []; }
}

/** Load shared content from localStorage */
function loadSharedContent(tenantId: string): MarketplaceListing[] {
  try {
    const raw = localStorage.getItem(`ccl-content-${tenantId || "default"}`);
    if (!raw) return [];
    const blocks = JSON.parse(raw) as ContentBlock[];
    return blocks
      .filter((b) => b.sharedToMarketplace && b.status === "published")
      .map((b) => ({
        id: `content:${b.id}`,
        type: "content" as const,
        name: b.title,
        description: b.body.slice(0, 200),
        author: "You",
        version: "1.0.0",
        tags: b.tags ?? [],
        installed: false,
        downloads: b.downloads ?? 0,
        likes: b.likes ?? 0,
        image: b.image,
      }));
  } catch { return []; }
}

/** Convert pre-built coderClaw skills to marketplace listings */
function builtinSkillsToListings(): MarketplaceListing[] {
  return BUILTIN_SKILLS.map((b) => ({
    id: `builtin-skill:${b.slug}`,
    type: "skill" as const,
    name: b.name,
    description: b.description,
    author: b.author || "coderClaw",
    version: b.version || "1.0.0",
    tags: b.tags ?? [],
    installed: false,
    downloads: b.downloads ?? 0,
    likes: b.likes ?? 0,
    image: b.image,
    emoji: b.emoji,
  }));
}

@customElement("ccl-marketplace")
export class CclMarketplace extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private search = "";
  @state() private category: MarketplaceCategory = "all";
  @state() private listings: MarketplaceListing[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.refreshListings();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("tenantId")) this.refreshListings();
  }

  private refreshListings() {
    this.listings = [
      ...personasToListings(BUILTIN_PERSONAS),
      ...builtinSkillsToListings(),
      ...loadSharedSkills(this.tenantId),
      ...loadSharedContent(this.tenantId),
    ];
  }

  private get filtered(): MarketplaceListing[] {
    let items = this.listings;
    if (this.category === "personas") items = items.filter((l) => l.type === "persona");
    if (this.category === "skills") items = items.filter((l) => l.type === "skill");
    if (this.category === "content") items = items.filter((l) => l.type === "content");
    const q = this.search.toLowerCase();
    if (q) {
      items = items.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tags.some((t) => t.includes(q)),
      );
    }
    return items;
  }

  override render() {
    const items = this.filtered;
    const categories: { id: MarketplaceCategory; label: string }[] = [
      { id: "all", label: "All" },
      { id: "personas", label: "Personas" },
      { id: "skills", label: "Skills" },
      { id: "content", label: "Content" },
    ];

    return html`
      <div style="padding:24px;max-width:1100px;margin:0 auto">
        <!-- Hero -->
        <div style="text-align:center;margin-bottom:32px">
          <h1 style="font-size:clamp(24px,4vw,36px);font-weight:800;color:var(--text-strong);margin:0 0 8px">
            🦞 Marketplace
          </h1>
          <p style="color:var(--muted);font-size:14px;max-width:480px;margin:0 auto">
            Browse and install personas, skills, and extensions to supercharge your claws.
          </p>
        </div>

        <!-- Search & filter -->
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:24px">
          <input
            class="input"
            type="search"
            placeholder="Search marketplace…"
            style="flex:1;min-width:200px;max-width:360px"
            .value=${this.search}
            @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}
          />
          <div style="display:flex;gap:4px">
            ${categories.map((c) => html`
              <button
                class="btn btn-sm ${this.category === c.id ? "btn-primary" : "btn-secondary"}"
                @click=${() => { this.category = c.id; }}
              >${c.label}</button>
            `)}
          </div>
        </div>

        <!-- Results -->
        ${items.length === 0
          ? html`<div style="text-align:center;padding:48px 0;color:var(--muted)">No items match your search.</div>`
          : html`
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
              ${items.map((item) => this.renderListing(item))}
            </div>
          `}
      </div>
    `;
  }

  private renderListing(item: MarketplaceListing) {
    const typeColor = item.type === "persona" ? "var(--accent,#6366f1)" : item.type === "content" ? "#f59e0b" : "#22c55e";
    const typeIcon = item.emoji || (item.type === "persona" ? "🎭" : item.type === "content" ? "📝" : "⚡");
    return html`
      <div class="card" style="display:flex;flex-direction:column;gap:12px;overflow:hidden">
        ${item.image ? html`<div style="width:100%;height:120px;background:url('${item.image}') center/cover;border-bottom:1px solid var(--border);margin:-16px -16px 0;width:calc(100% + 32px)"></div>` : ""}
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:24px">${typeIcon}</span>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--text-strong)">${item.name}</div>
              <div style="font-size:11px;color:var(--muted)">by ${item.author} · v${item.version}</div>
            </div>
          </div>
          <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${typeColor};color:#fff;text-transform:uppercase">${item.type}</span>
        </div>

        <div style="font-size:13px;color:var(--muted);line-height:1.5;flex:1">${item.description}</div>

        ${item.tags.length ? html`
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${item.tags.map((t) => html`
              <span style="font-size:10px;padding:2px 6px;border-radius:99px;background:var(--surface-2);color:var(--text);border:1px solid var(--border)">${t}</span>
            `)}
          </div>
        ` : ""}

        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding-top:10px">
          <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted)">
            <span title="Likes">❤️ ${item.likes}</span>
            <span title="Downloads">⬇️ ${item.downloads}</span>
            ${item.installed ? html`<span>✓ Installed</span>` : ""}
          </div>
          <button
            class="btn btn-sm ${item.installed ? "btn-secondary" : "btn-primary"}"
            ?disabled=${item.installed}
          >${item.installed ? "Installed" : "Install"}</button>
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-marketplace": CclMarketplace; } }
