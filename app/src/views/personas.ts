import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
    likes: 35,
    downloads: 91,
  },
];

@customElement("ccl-personas")
export class CclPersonas extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private personas: Persona[] = [...BUILTIN_PERSONAS];
  @state() private search = "";
  @state() private expanded: string | null = null;

  private get filtered(): Persona[] {
    const q = this.search.toLowerCase();
    if (!q) return this.personas;
    return this.personas.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.includes(q)),
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

  override render() {
    const list = this.filtered;

    return html`
      <div style="padding:24px;max-width:1000px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px">
          <div>
            <h1 style="font-size:24px;font-weight:800;color:var(--text-strong);margin:0">Personas</h1>
            <p style="color:var(--muted);font-size:13px;margin:4px 0 0">
              Agent personas shape identity, tone, and decision-making for every sub-agent in a workflow.
            </p>
          </div>
          <input
            class="input"
            type="search"
            placeholder="Search personas…"
            style="max-width:260px"
            .value=${this.search}
            @input=${(e: InputEvent) => { this.search = (e.target as HTMLInputElement).value; }}
          />
        </div>

        ${list.length === 0
          ? html`<div style="text-align:center;padding:48px 0;color:var(--muted);font-size:14px">No personas match your search.</div>`
          : html`
            <div style="display:grid;gap:12px">
              ${list.map((p) => this.renderPersonaCard(p))}
            </div>
          `}
      </div>
    `;
  }

  private renderPersonaCard(p: Persona) {
    const isOpen = this.expanded === p.name;
    return html`
      <div
        class="card"
        style="cursor:pointer;transition:border-color .2s;overflow:hidden;${isOpen ? "border-color:var(--accent,#6366f1)" : ""}"
        @click=${() => { this.expanded = isOpen ? null : p.name; }}
      >
        ${p.image ? html`<div style="width:100%;height:120px;background:url('${p.image}') center/cover;border-bottom:1px solid var(--border)"></div>` : ""}
        <div style="padding:${p.image ? '12px' : '0'}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:20px">🎭</span>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--text-strong)">${p.name}</div>
              <div style="font-size:12px;color:var(--muted);margin-top:2px">${p.description}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            ${this.sourceBadge(p.source)}
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;transition:transform .2s;transform:${isOpen ? "rotate(180deg)" : "rotate(0)"}">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin:8px 0 0">
          <span title="Likes">❤️ ${p.likes ?? 0}</span>
          <span title="Downloads">⬇️ ${p.downloads ?? 0}</span>
          ${p.author ? html`<span>by ${p.author}</span>` : ""}
          ${p.version ? html`<span>v${p.version}</span>` : ""}
        </div>

        ${isOpen ? html`
          <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:16px;display:grid;gap:12px">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Voice</div>
                <div style="font-size:13px;color:var(--text)">${p.voice}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Perspective</div>
                <div style="font-size:13px;color:var(--text)">${p.perspective}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Decision Style</div>
                <div style="font-size:13px;color:var(--text)">${p.decisionStyle}</div>
              </div>
            </div>

            <div>
              <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Capabilities</div>
              <div style="display:flex;flex-wrap:wrap;gap:4px">
                ${p.capabilities.map((c) => html`
                  <span style="font-size:11px;padding:2px 8px;border-radius:99px;background:var(--surface-2);color:var(--text);border:1px solid var(--border)">${c}</span>
                `)}
              </div>
            </div>

            ${p.tags?.length ? html`
              <div>
                <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Tags</div>
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                  ${p.tags.map((t) => html`
                    <span style="font-size:11px;padding:2px 8px;border-radius:99px;background:var(--accent-subtle,rgba(99,102,241,.1));color:var(--accent,#6366f1)">${t}</span>
                  `)}
                </div>
              </div>
            ` : ""}

            <div style="font-size:12px;color:var(--muted)">
              Output prefix: <code style="background:var(--surface-2);padding:1px 6px;border-radius:4px;font-size:11px">${p.outputPrefix}</code>
            </div>
          </div>
        ` : ""}
        </div>
      </div>
    `;
  }
}

export { BUILTIN_PERSONAS };

declare global { interface HTMLElementTagNameMap { "ccl-personas": CclPersonas; } }
