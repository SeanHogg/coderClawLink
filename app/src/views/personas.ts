import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { artifactAssignments, marketplaceStats, claws, type ArtifactAssignment, type ArtifactStats } from "../api.js";
import "../components/artifact-assigner.js";

export interface Persona {
  name: string;
  description: string;
  voice: string;
  perspective: string;
  decisionStyle: string;
  outputPrefix: string;
  capabilities: string[];
  source: "builtin" | "clawhub" | "project-local" | "user-global" | "clawlink-assigned";
  active?: boolean;
  tags?: string[];
  author?: string;
  version?: string;
  image?: string;
  likes?: number;
  downloads?: number;
}

/** User-created personas stored in localStorage until backend is ready */
export interface UserPersona {
  id: string;
  name: string;
  slug: string;
  description: string;
  voice: string;
  perspective: string;
  decisionStyle: string;
  outputPrefix: string;
  capabilities: string[];
  tags: string[];
  shared: boolean;
  image?: string;
  likes: number;
  downloads: number;
  createdAt: string;
}

function userPersonasKey(tenantId: string) { return `ccl-user-personas-${tenantId || "default"}`; }
function loadUserPersonas(tenantId: string): UserPersona[] {
  try { return JSON.parse(localStorage.getItem(userPersonasKey(tenantId)) || "[]"); } catch { return []; }
}
function saveUserPersonas(tenantId: string, personas: UserPersona[]) {
  localStorage.setItem(userPersonasKey(tenantId), JSON.stringify(personas));
}

/** Built-in personas shipped with coderClaw core */
const BUILTIN_PERSONAS: Persona[] = [
  {
    name: "code-creator",
    description: "Implements features and writes production-quality code. Handles file creation, refactoring, and code generation tasks.",
    voice: "pragmatic and quality-driven",
    perspective: "views every task through the lens of shipping clean, maintainable code",
    decisionStyle: "ship it, but ship it right",
    outputPrefix: "CODE:",
    capabilities: ["Feature implementation", "Code generation", "File creation", "Refactoring"],
    source: "builtin",
    tags: ["core", "coding", "implementation"],
    author: "coderClaw",
    likes: 42,
    downloads: 128,
  },
  {
    name: "code-reviewer",
    description: "Provides thorough code reviews focusing on correctness, performance, security, and maintainability.",
    voice: "critical yet constructive",
    perspective: "all code is a future maintenance burden",
    decisionStyle: "thorough: surface all issues, ranked by severity",
    outputPrefix: "REVIEW:",
    capabilities: ["Code review", "Security analysis", "Performance audit", "Standards enforcement"],
    source: "builtin",
    tags: ["core", "review", "quality"],
    author: "coderClaw",
    likes: 38,
    downloads: 97,
  },
  {
    name: "test-generator",
    description: "Creates comprehensive test suites covering unit, integration, and edge case scenarios.",
    voice: "systematic and exhaustive",
    perspective: "untested code is broken code waiting to be discovered",
    decisionStyle: "coverage-first: edge cases before happy paths",
    outputPrefix: "TESTS:",
    capabilities: ["Unit testing", "Integration testing", "Edge case coverage", "Test fixtures"],
    source: "builtin",
    tags: ["core", "testing", "quality"],
    author: "coderClaw",
    likes: 31,
    downloads: 85,
  },
  {
    name: "bug-analyzer",
    description: "Investigates bugs using structured hypothesis-driven debugging. Traces root causes and proposes targeted fixes.",
    voice: "investigative and precise",
    perspective: "every bug has a root cause — find the cause, not a workaround",
    decisionStyle: "evidence-driven: hypothesis → test → verify",
    outputPrefix: "BUG-FIX:",
    capabilities: ["Root cause analysis", "Debugging", "Log analysis", "Regression identification"],
    source: "builtin",
    tags: ["core", "debugging", "analysis"],
    author: "coderClaw",
    likes: 27,
    downloads: 74,
  },
  {
    name: "refactor-agent",
    description: "Performs safe, incremental refactoring. Improves structure while keeping tests green and behaviour unchanged.",
    voice: "disciplined and incremental",
    perspective: "good architecture emerges from disciplined, small improvements",
    decisionStyle: "safe: one refactor at a time, tests green first",
    outputPrefix: "REFACTOR:",
    capabilities: ["Code restructuring", "Pattern extraction", "Dead code removal", "Dependency cleanup"],
    source: "builtin",
    tags: ["core", "refactoring", "architecture"],
    author: "coderClaw",
    likes: 19,
    downloads: 52,
  },
  {
    name: "documentation-agent",
    description: "Writes clear, audience-aware documentation. Generates READMEs, API docs, guides, and inline comments.",
    voice: "clear, concise, audience-aware",
    perspective: "documentation is the first UI of any project",
    decisionStyle: "reader-first: if a newcomer can't understand it, rewrite it",
    outputPrefix: "DOCS:",
    capabilities: ["README generation", "API documentation", "Code comments", "User guides"],
    source: "builtin",
    tags: ["core", "documentation", "communication"],
    author: "coderClaw",
    likes: 22,
    downloads: 63,
  },
  {
    name: "architecture-advisor",
    description: "Provides strategic architectural guidance. Evaluates trade-offs and recommends patterns suited to project scale.",
    voice: "strategic and pragmatic",
    perspective: "every architectural choice is a trade-off with downstream consequences",
    decisionStyle: "trade-off oriented: always show the cost of each option",
    outputPrefix: "ARCH:",
    capabilities: ["System design", "Pattern selection", "Scalability planning", "Tech debt assessment"],
    source: "builtin",
    tags: ["core", "architecture", "strategy"],
    author: "coderClaw",
    likes: 35,
    downloads: 91,
  },
];

@customElement("ccl-personas")
export class CclPersonas extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private tab: "assigned" | "marketplace" | "my-personas" = "assigned";
  @state() private search = "";
  @state() private expanded: string | null = null;
  @state() private loading = true;
  @state() private error = "";

  // Assigned personas from artifact assignment API
  @state() private assigned: ArtifactAssignment[] = [];

  // User-created personas (localStorage)
  @state() private userPersonas: UserPersona[] = [];

  // Marketplace stats (real likes/installs from API)
  @state() private stats: Record<string, ArtifactStats> = {};
  @state() private hasClaws = true;
  @state() private installedSlugs = new Set<string>();

  // Create form
  @state() private createOpen = false;
  @state() private createForm = {
    name: "",
    description: "",
    voice: "",
    perspective: "",
    decisionStyle: "",
    outputPrefix: "",
    capabilities: "",
    tags: "",
    image: "",
  };

  override connectedCallback() {
    super.connectedCallback();
    this.userPersonas = loadUserPersonas(this.tenantId);
    this.load();
  }

  private async load() {
    this.loading = true;
    try {
      const [all, clawList] = await Promise.all([
        artifactAssignments.list("tenant", Number(this.tenantId), "persona").catch(() => [] as ArtifactAssignment[]),
        claws.list().catch(() => []),
      ]);
      this.assigned = all;
      this.hasClaws = clawList.length > 0;
      this.installedSlugs = new Set(all.map(a => a.artifactSlug));

      // Fetch real stats for all marketplace personas
      const allSlugs = BUILTIN_PERSONAS.map(p => p.name);
      if (allSlugs.length > 0) {
        this.stats = await marketplaceStats.getStats("persona", allSlugs).catch(() => ({}));
      }
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async assignPersona(slug: string) {
    try {
      await artifactAssignments.assign("persona", slug, "tenant", this.tenantId);
      this.installedSlugs = new Set([...this.installedSlugs, slug]);
      await this.load();
    } catch (e) { this.error = (e as Error).message; }
  }

  private async unassignPersona(slug: string) {
    try {
      await artifactAssignments.unassign("persona", slug, "tenant", Number(this.tenantId));
      const s = new Set(this.installedSlugs);
      s.delete(slug);
      this.installedSlugs = s;
      this.assigned = this.assigned.filter(a => a.artifactSlug !== slug);
      // Refresh stats
      const updated = await marketplaceStats.getStats("persona", [slug]).catch(() => ({}));
      this.stats = { ...this.stats, ...updated };
    } catch (e) { this.error = (e as Error).message; }
  }

  private assignedSlugs() { return new Set(this.assigned.map(a => a.artifactSlug)); }

  private async toggleLike(slug: string) {
    try {
      const liked = await marketplaceStats.toggleLike("persona", slug);
      const prev = this.stats[slug] ?? { likes: 0, installs: 0, liked: false };
      this.stats = {
        ...this.stats,
        [slug]: { ...prev, liked, likes: liked ? prev.likes + 1 : Math.max(0, prev.likes - 1) },
      };
    } catch (e) { this.error = (e as Error).message; }
  }

  private savePersona() {
    const name = this.createForm.name.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const persona: UserPersona = {
      id: crypto.randomUUID(),
      name,
      slug,
      description: this.createForm.description.trim(),
      voice: this.createForm.voice.trim() || "neutral and helpful",
      perspective: this.createForm.perspective.trim() || "balanced and pragmatic",
      decisionStyle: this.createForm.decisionStyle.trim() || "collaborative",
      outputPrefix: this.createForm.outputPrefix.trim() || `${slug.toUpperCase()}:`,
      capabilities: this.createForm.capabilities.split(",").map(c => c.trim()).filter(Boolean),
      tags: this.createForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      shared: false,
      image: this.createForm.image.trim() || undefined,
      likes: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
    };
    this.userPersonas = [...this.userPersonas, persona];
    saveUserPersonas(this.tenantId, this.userPersonas);
    this.createOpen = false;
    this.createForm = { name: "", description: "", voice: "", perspective: "", decisionStyle: "", outputPrefix: "", capabilities: "", tags: "", image: "" };
    this.tab = "my-personas";
  }

  private deleteUserPersona(id: string) {
    if (!confirm("Delete this persona?")) return;
    this.userPersonas = this.userPersonas.filter((p) => p.id !== id);
    saveUserPersonas(this.tenantId, this.userPersonas);
  }

  private toggleShare(id: string) {
    this.userPersonas = this.userPersonas.map((p) =>
      p.id === id ? { ...p, shared: !p.shared } : p,
    );
    saveUserPersonas(this.tenantId, this.userPersonas);
  }

  private filteredMarketplace(): Persona[] {
    const q = this.search.toLowerCase();
    return BUILTIN_PERSONAS.filter(p =>
      !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.some(t => t.includes(q)),
    );
  }

  private sourceBadge(source: Persona["source"]) {
    const map: Record<string, { label: string; color: string }> = {
      builtin: { label: "Built-in", color: "var(--accent,#6366f1)" },
      clawhub: { label: "ClawHub", color: "#22c55e" },
      "project-local": { label: "Project", color: "#f59e0b" },
      "user-global": { label: "User", color: "#06b6d4" },
      "clawlink-assigned": { label: "Assigned", color: "#ec4899" },
    };
    const m = map[source] ?? { label: source, color: "var(--muted)" };
    return html`<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${m.color};color:#fff;text-transform:uppercase;letter-spacing:.04em">${m.label}</span>`;
  }

  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------

  override render() {
    return html`
      <div class="page-header">
        <div>
          <div class="page-title">Personas</div>
          <div class="page-sub">Agent personas shape identity, tone, and decision-making for every sub-agent in a workflow</div>
        </div>
        <button class="btn btn-primary" @click=${() => { this.createOpen = true; }}>+ Create Persona</button>
      </div>

      ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab === "assigned" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "assigned"; }}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab === "marketplace" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "marketplace"; }}>
          Marketplace (${BUILTIN_PERSONAS.length})
        </button>
        <button class="btn ${this.tab === "my-personas" ? "btn-primary" : "btn-secondary"}" @click=${() => { this.tab = "my-personas"; }}>
          My Personas (${this.userPersonas.length})
        </button>
      </div>

      ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
        : this.tab === "assigned"
          ? this.renderAssigned()
          : this.tab === "my-personas"
            ? this.renderMyPersonas()
            : this.renderMarketplace()}

      ${this.createOpen ? this.renderCreateModal() : ""}
    `;
  }

  // ---------------------------------------------------------------------------
  // Assigned tab
  // ---------------------------------------------------------------------------

  private renderAssigned() {
    if (!this.hasClaws) {
      return html`<div class="empty-state"><div class="empty-state-icon">🔗</div><div class="empty-state-title">No claws registered</div><div class="empty-state-sub">Register a claw (workforce) to start assigning personas</div></div>`;
    }
    if (this.assigned.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">🎭</div><div class="empty-state-title">No personas assigned</div><div class="empty-state-sub">Browse the marketplace to assign personas to your workspace</div><button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.tab = "marketplace"; }}>Browse marketplace</button></div>`;
    }
    return html`
      <div class="grid grid-3">
        ${this.assigned.map(a => {
          const builtin = BUILTIN_PERSONAS.find(b => b.name === a.artifactSlug);
          return html`
            <div class="card">
              <div class="card-header">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:20px">🎭</span>
                  <div>
                    <div class="card-title">${builtin?.name ?? a.artifactSlug}</div>
                    ${builtin ? html`<div style="font-size:11px;color:var(--muted);margin-top:2px">${builtin.description}</div>` : ""}
                  </div>
                </div>
                <div style="display:flex;gap:6px;align-items:center">
                  <ccl-artifact-assigner artifactType="persona" artifactSlug=${a.artifactSlug} artifactName=${a.artifactSlug}></ccl-artifact-assigner>
                  <button class="btn btn-danger btn-sm" @click=${() => this.unassignPersona(a.artifactSlug)}>Remove</button>
                </div>
              </div>
              ${builtin ? html`
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">
                  ${builtin.capabilities.map(c => html`<span class="badge badge-gray">${c}</span>`)}
                </div>
              ` : ""}
              <div style="font-size:11px;color:var(--muted);margin-top:8px">Assigned ${new Date(a.assignedAt).toLocaleDateString()}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Marketplace tab
  // ---------------------------------------------------------------------------

  private renderMarketplace() {
    const assigned = this.assignedSlugs();
    const items = this.filteredMarketplace();
    return html`
      <div>
        <div style="position:sticky;top:0;z-index:10;background:var(--page-bg,var(--bg,#0e0e10));padding:8px 0 16px">
          <input class="input" style="max-width:300px" placeholder="Search personas…"
            .value=${this.search} @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}>
        </div>

        ${items.length === 0
          ? html`<div class="empty-state"><div class="empty-state-title">No personas found</div></div>`
          : html`
            <div class="grid grid-3">
              ${items.map(p => this.renderMarketplaceCard(p, assigned))}
            </div>`}
      </div>
    `;
  }

  private renderMarketplaceCard(p: Persona, assigned: Set<string>) {
    const isOpen = this.expanded === p.name;
    const stat = this.stats[p.name] ?? { likes: 0, installs: 0, liked: false };
    const installed = this.installedSlugs.has(p.name);
    return html`
      <div class="card" style="overflow:hidden;cursor:pointer;transition:border-color .2s;${isOpen ? "border-color:var(--accent,#6366f1)" : ""}">
        ${p.image ? html`<div style="width:100%;height:100px;background:url('${p.image}') center/cover;border-bottom:1px solid var(--border)"></div>` : ""}
        <div style="padding:${p.image ? '12px' : '0'}" @click=${() => { this.expanded = isOpen ? null : p.name; }}>
          <div class="card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">🎭</span>
              <div>
                <div class="card-title">${p.name}</div>
                <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">
                  ${this.sourceBadge(p.source)}
                  ${p.tags?.slice(0, 2).map(t => html`<span class="badge badge-gray">${t}</span>`)}
                </div>
              </div>
            </div>
          </div>
          ${p.description ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin:8px 0">${p.description}</div>` : ""}
          <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin:4px 0 8px">
            <button style="background:none;border:none;cursor:pointer;padding:0;font-size:11px;color:${stat.liked ? '#ef4444' : 'var(--muted)'}" title="${stat.liked ? 'Unlike' : 'Like'}"
              @click=${(e: Event) => { e.stopPropagation(); this.toggleLike(p.name); }}>${stat.liked ? '❤️' : '🤍'} ${stat.likes}</button>
            <span title="Installs">⬇️ ${stat.installs}</span>
            ${p.author ? html`<span>by ${p.author}</span>` : ""}
          </div>

          ${isOpen ? html`
            <div style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px;display:grid;gap:10px">
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px">
                <div style="border:1px solid var(--border);border-radius:8px;padding:8px">
                  <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:3px">Voice</div>
                  <div style="font-size:12px;color:var(--text)">${p.voice}</div>
                </div>
                <div style="border:1px solid var(--border);border-radius:8px;padding:8px">
                  <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:3px">Perspective</div>
                  <div style="font-size:12px;color:var(--text)">${p.perspective}</div>
                </div>
                <div style="border:1px solid var(--border);border-radius:8px;padding:8px">
                  <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:3px">Decision Style</div>
                  <div style="font-size:12px;color:var(--text)">${p.decisionStyle}</div>
                </div>
              </div>
              <div>
                <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Capabilities</div>
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                  ${p.capabilities.map(c => html`<span class="badge badge-gray">${c}</span>`)}
                </div>
              </div>
              <div style="font-size:12px;color:var(--muted)">
                Output prefix: <code style="background:var(--surface-2);padding:1px 6px;border-radius:4px;font-size:11px">${p.outputPrefix}</code>
              </div>
            </div>
          ` : ""}
        </div>
        <div style="display:flex;gap:6px;align-items:center;padding:0 0 4px" @click=${(e: Event) => e.stopPropagation()}>
          ${installed
            ? html`
              <button class="btn btn-danger btn-sm" @click=${() => this.unassignPersona(p.name)}>Uninstall</button>
              <ccl-artifact-assigner artifactType="persona" artifactSlug=${p.name} artifactName=${p.name}></ccl-artifact-assigner>`
            : html`
              <button class="btn btn-primary btn-sm" @click=${() => this.assignPersona(p.name)}>Install</button>
              <ccl-artifact-assigner artifactType="persona" artifactSlug=${p.name} artifactName=${p.name}></ccl-artifact-assigner>`}
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // My Personas tab
  // ---------------------------------------------------------------------------

  private renderMyPersonas() {
    if (this.userPersonas.length === 0) {
      return html`<div class="empty-state"><div class="empty-state-icon">🎭</div><div class="empty-state-title">No custom personas yet</div><div class="empty-state-sub">Create your own persona to shape how your agents think and communicate</div><button class="btn btn-primary" style="margin-top:16px" @click=${() => { this.createOpen = true; }}>Create Persona</button></div>`;
    }
    return html`
      <div class="grid grid-3">
        ${this.userPersonas.map(p => html`
          <div class="card" style="overflow:hidden">
            ${p.image ? html`<div style="width:100%;height:100px;background:url('${p.image}') center/cover;border-bottom:1px solid var(--border)"></div>` : ""}
            <div style="padding:${p.image ? '12px' : '0'}">
              <div class="card-header">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:20px">🎭</span>
                  <div>
                    <div class="card-title">${p.name}</div>
                    <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">
                      ${p.tags.slice(0, 3).map(t => html`<span class="badge badge-gray">${t}</span>`)}
                      ${p.shared ? html`<span class="badge badge-green">Shared</span>` : ""}
                    </div>
                  </div>
                </div>
              </div>
              ${p.description ? html`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin:8px 0">${p.description}</div>` : ""}
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0">
                <div style="font-size:11px;color:var(--muted)"><strong>Voice:</strong> ${p.voice}</div>
                <div style="font-size:11px;color:var(--muted)"><strong>Prefix:</strong> <code style="background:var(--surface-2);padding:0 4px;border-radius:3px">${p.outputPrefix}</code></div>
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin:4px 0 8px">
                <span title="Likes">❤️ ${p.likes}</span>
                <span title="Downloads">⬇️ ${p.downloads}</span>
              </div>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                <button class="btn btn-sm ${p.shared ? "btn-secondary" : "btn-primary"}" @click=${() => this.toggleShare(p.id)}>
                  ${p.shared ? "Unshare" : "Share to Marketplace"}
                </button>
                <button class="btn btn-danger btn-sm" @click=${() => this.deleteUserPersona(p.id)}>Delete</button>
                <ccl-artifact-assigner artifactType="persona" artifactSlug=${p.slug} artifactName=${p.name}></ccl-artifact-assigner>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Create modal
  // ---------------------------------------------------------------------------

  private renderCreateModal() {
    return html`
      <div class="modal-backdrop" @click=${() => { this.createOpen = false; }}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()} style="max-width:540px">
          <div class="modal-header">
            <div class="modal-title">Create Persona</div>
            <button class="btn btn-secondary btn-sm" @click=${() => { this.createOpen = false; }}>✕</button>
          </div>
          <div class="modal-body" style="display:flex;flex-direction:column;gap:14px">
            <div>
              <label class="label">Name *</label>
              <input class="input" placeholder="e.g. security-auditor" .value=${this.createForm.name}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, name: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Description</label>
              <textarea class="input" rows="2" placeholder="What does this persona do?"
                .value=${this.createForm.description}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, description: (e.target as HTMLTextAreaElement).value }; }}></textarea>
            </div>
            <div style="display:flex;gap:12px">
              <div style="flex:1">
                <label class="label">Voice</label>
                <input class="input" placeholder="e.g. cautious and thorough" .value=${this.createForm.voice}
                  @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, voice: (e.target as HTMLInputElement).value }; }}>
              </div>
              <div style="flex:1">
                <label class="label">Output Prefix</label>
                <input class="input" placeholder="e.g. SECURITY:" .value=${this.createForm.outputPrefix}
                  @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, outputPrefix: (e.target as HTMLInputElement).value }; }}>
              </div>
            </div>
            <div>
              <label class="label">Perspective</label>
              <input class="input" placeholder="How this persona views the world" .value=${this.createForm.perspective}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, perspective: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Decision Style</label>
              <input class="input" placeholder="How this persona makes decisions" .value=${this.createForm.decisionStyle}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, decisionStyle: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Capabilities (comma-separated)</label>
              <input class="input" placeholder="e.g. Vulnerability scanning, Threat modeling" .value=${this.createForm.capabilities}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, capabilities: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Tags (comma-separated)</label>
              <input class="input" placeholder="e.g. security, compliance" .value=${this.createForm.tags}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, tags: (e.target as HTMLInputElement).value }; }}>
            </div>
            <div>
              <label class="label">Cover Image URL</label>
              <input class="input" placeholder="https://example.com/image.jpg" .value=${this.createForm.image}
                @input=${(e: InputEvent) => { this.createForm = { ...this.createForm, image: (e.target as HTMLInputElement).value }; }}>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click=${() => { this.createOpen = false; }}>Cancel</button>
            <button class="btn btn-primary" @click=${() => this.savePersona()} ?disabled=${!this.createForm.name.trim()}>Save Persona</button>
          </div>
        </div>
      </div>
    `;
  }
}

export { BUILTIN_PERSONAS };

declare global { interface HTMLElementTagNameMap { "ccl-personas": CclPersonas; } }
