/**
 * Code Editor view – Replit-inspired browser-based IDE.
 *
 * Connects to claw file-system directories so users can browse and
 * view source files directly in the browser.  Only a curated set of
 * languages is supported; Python is intentionally excluded.
 */
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { claws, type Claw, type ClawDirectory, type ClawDirectoryFile } from "../api.js";

/** File extensions that this editor supports (Python is excluded). */
const SUPPORTED_EXTENSIONS = new Set([
  "js", "mjs", "cjs",
  "ts", "tsx",
  "jsx",
  "html", "htm",
  "css", "scss", "sass", "less",
  "json", "jsonc",
  "yaml", "yml",
  "toml",
  "md", "mdx", "markdown",
  "sh", "bash",
  "go",
  "rs",
  "cpp", "cc", "cxx", "c", "h", "hpp",
  "java",
  "kt", "kts",
  "swift",
  "rb",
  "php",
  "sql",
  "graphql", "gql",
  "xml", "svg",
  "env", "example",
  "dockerfile",
  "lock",
  "txt",
]);

function extOf(path: string): string {
  const parts = path.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function isSupported(path: string): boolean {
  const name = path.split("/").pop() ?? path;
  // Bare filenames like "Dockerfile", "Makefile"
  const upper = name.toUpperCase();
  if (["DOCKERFILE", "MAKEFILE", "PROCFILE"].includes(upper)) return true;
  const ext = extOf(name);
  return ext !== "" && SUPPORTED_EXTENSIONS.has(ext);
}

/** Map a file extension to a friendly language label. */
function langLabel(path: string): string {
  const name = (path.split("/").pop() ?? path).toUpperCase();
  if (["DOCKERFILE"].includes(name)) return "Dockerfile";
  if (["MAKEFILE"].includes(name)) return "Makefile";
  const ext = extOf(path);
  const map: Record<string, string> = {
    js: "JavaScript", mjs: "JavaScript", cjs: "JavaScript",
    ts: "TypeScript", tsx: "TypeScript (JSX)", jsx: "JavaScript (JSX)",
    html: "HTML", htm: "HTML",
    css: "CSS", scss: "SCSS", sass: "SASS", less: "LESS",
    json: "JSON", jsonc: "JSON",
    yaml: "YAML", yml: "YAML",
    toml: "TOML",
    md: "Markdown", mdx: "Markdown (JSX)", markdown: "Markdown",
    sh: "Shell", bash: "Shell",
    go: "Go",
    rs: "Rust",
    cpp: "C++", cc: "C++", cxx: "C++", c: "C", h: "C/C++ Header", hpp: "C++ Header",
    java: "Java",
    kt: "Kotlin", kts: "Kotlin Script",
    swift: "Swift",
    rb: "Ruby",
    php: "PHP",
    sql: "SQL",
    graphql: "GraphQL", gql: "GraphQL",
    xml: "XML", svg: "SVG",
    env: "Environment", example: "Config",
    dockerfile: "Dockerfile",
    lock: "Lock file",
    txt: "Plain text",
  };
  return map[ext] ?? ext.toUpperCase();
}

@customElement("ccl-code-editor")
export class CclCodeEditor extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  @state() private clawList: Claw[] = [];
  @state() private selectedClawId = "";
  @state() private directories: ClawDirectory[] = [];
  @state() private selectedDirId = "";
  @state() private files: ClawDirectoryFile[] = [];
  @state() private selectedFile = "";
  @state() private fileContent = "";
  @state() private loadingClaws = true;
  @state() private loadingDirs = false;
  @state() private loadingFiles = false;
  @state() private loadingContent = false;
  @state() private error = "";
  @state() private searchQuery = "";

  override connectedCallback() {
    super.connectedCallback();
    void this.loadClaws();
  }

  private async loadClaws() {
    this.loadingClaws = true;
    this.error = "";
    try {
      this.clawList = await claws.list();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loadingClaws = false;
    }
  }

  private async selectClaw(id: string) {
    if (this.selectedClawId === id) return;
    this.selectedClawId = id;
    this.directories = [];
    this.selectedDirId = "";
    this.files = [];
    this.selectedFile = "";
    this.fileContent = "";
    this.loadingDirs = true;
    try {
      this.directories = await claws.directories(id);
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loadingDirs = false;
    }
  }

  private async selectDir(dirId: string) {
    if (this.selectedDirId === dirId) return;
    this.selectedDirId = dirId;
    this.files = [];
    this.selectedFile = "";
    this.fileContent = "";
    this.loadingFiles = true;
    try {
      const all = await claws.directoryFiles(this.selectedClawId, dirId);
      this.files = all.filter(f => isSupported(f.relPath));
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loadingFiles = false;
    }
  }

  private async openFile(relPath: string) {
    if (this.selectedFile === relPath) return;
    this.selectedFile = relPath;
    this.fileContent = "";
    this.loadingContent = true;
    try {
      const result = await claws.directoryFileContent(this.selectedClawId, this.selectedDirId, relPath);
      this.fileContent = result.content ?? "(binary or empty file)";
    } catch (e) {
      this.fileContent = `Error loading file: ${(e as Error).message}`;
    } finally {
      this.loadingContent = false;
    }
  }

  private filteredFiles() {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.files;
    return this.files.filter(f => f.relPath.toLowerCase().includes(q));
  }

  private formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  override render() {
    const selectedClaw = this.clawList.find(c => c.id === this.selectedClawId);
    const selectedDir = this.directories.find(d => d.id === this.selectedDirId);

    return html`
      <div style="padding:16px;display:grid;gap:16px;height:100%;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-size:18px;font-weight:600;color:var(--text-strong)">Code Editor</div>
            <div style="font-size:13px;color:var(--muted);margin-top:2px">Browse and view code files from connected claws</div>
          </div>
          <button class="btn btn-secondary btn-sm" @click=${() => void this.loadClaws()} ?disabled=${this.loadingClaws}>
            Refresh
          </button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        <!-- Claw selector -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <span style="font-size:12px;color:var(--muted);flex-shrink:0">Claw:</span>
          ${this.loadingClaws
            ? html`<span style="font-size:12px;color:var(--muted)">Loading…</span>`
            : this.clawList.length === 0
              ? html`<span style="font-size:12px;color:var(--muted)">No claws registered. <a href="#" @click=${(e: Event) => { e.preventDefault(); this.dispatchEvent(new CustomEvent("ccl:navigate", { bubbles: true, composed: true, detail: { tab: "claws" } })); }}>Register a claw →</a></span>`
              : this.clawList.map(c => html`
                <button
                  class="btn btn-sm ${this.selectedClawId === c.id ? "btn-primary" : "btn-secondary"}"
                  @click=${() => void this.selectClaw(c.id)}
                >
                  <span class="badge ${c.connectedAt ? "badge-green" : "badge-gray"}" style="width:6px;height:6px;padding:0;border-radius:50%;min-width:6px"></span>
                  ${c.name}
                </button>
              `)}
        </div>

        ${selectedClaw ? html`
          <!-- Directory selector -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <span style="font-size:12px;color:var(--muted);flex-shrink:0">Directory:</span>
            ${this.loadingDirs
              ? html`<span style="font-size:12px;color:var(--muted)">Loading…</span>`
              : this.directories.length === 0
                ? html`<span style="font-size:12px;color:var(--muted)">No synced directories for this claw.</span>`
                : this.directories.map(d => html`
                  <button
                    class="btn btn-sm ${this.selectedDirId === d.id ? "btn-primary" : "btn-secondary"}"
                    style="font-family:var(--mono);font-size:11px"
                    @click=${() => void this.selectDir(d.id)}
                    title="${d.absPath}"
                  >
                    ${d.absPath.split("/").pop() || d.absPath}
                    <span class="badge ${d.status === "synced" ? "badge-green" : d.status === "error" ? "badge-red" : "badge-yellow"}" style="margin-left:4px">${d.status}</span>
                  </button>
                `)}
          </div>

          ${selectedDir ? html`
            <!-- Editor layout -->
            <div style="display:grid;grid-template-columns:260px 1fr;gap:12px;min-height:500px;flex:1">
              <!-- File tree -->
              <div class="card" style="overflow:auto;display:flex;flex-direction:column;gap:8px;padding:12px">
                <div style="font-size:12px;font-weight:600;color:var(--text-strong);margin-bottom:4px">
                  Files
                  ${this.loadingFiles ? html`<span style="font-weight:400;color:var(--muted)"> · Loading…</span>` : html`<span style="font-weight:400;color:var(--muted)"> · ${this.files.length}</span>`}
                </div>
                <input
                  class="input"
                  style="font-size:12px;padding:6px 10px"
                  placeholder="Search files…"
                  .value=${this.searchQuery}
                  @input=${(e: InputEvent) => { this.searchQuery = (e.target as HTMLInputElement).value; }}
                >
                <div style="overflow:auto;flex:1;display:flex;flex-direction:column;gap:2px">
                  ${this.filteredFiles().length === 0 && !this.loadingFiles
                    ? html`<div style="font-size:12px;color:var(--muted)">No files found.</div>`
                    : this.filteredFiles().map(f => html`
                      <button
                        class="btn btn-ghost btn-sm"
                        style="justify-content:flex-start;text-align:left;font-family:var(--mono);font-size:11px;padding:5px 8px;border-radius:4px;${this.selectedFile === f.relPath ? "background:var(--accent-subtle);color:var(--accent)" : ""}"
                        @click=${() => void this.openFile(f.relPath)}
                        title="${f.relPath}"
                      >
                        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.relPath}</span>
                        <span style="color:var(--muted);font-size:10px;flex-shrink:0;margin-left:4px">${this.formatBytes(f.sizeBytes)}</span>
                      </button>
                    `)}
                </div>
              </div>

              <!-- File content -->
              <div class="card" style="overflow:auto;display:flex;flex-direction:column;padding:0">
                ${this.selectedFile
                  ? html`
                    <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border);flex-shrink:0">
                      <div style="font-family:var(--mono);font-size:12px;color:var(--text-strong);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${this.selectedFile}</div>
                      <span class="badge badge-gray">${langLabel(this.selectedFile)}</span>
                    </div>
                    ${this.loadingContent
                      ? html`<div style="padding:16px;font-size:13px;color:var(--muted)">Loading…</div>`
                      : html`
                        <pre style="margin:0;padding:16px;overflow:auto;flex:1;font-family:var(--mono);font-size:12px;line-height:1.6;color:var(--text);white-space:pre;tab-size:2">${this.fileContent}</pre>
                      `}
                  `
                  : html`
                    <div class="empty-state" style="flex:1">
                      <div class="empty-state-icon">📄</div>
                      <div class="empty-state-title">Select a file to view</div>
                      <div class="empty-state-sub">Choose a file from the tree to view its contents</div>
                    </div>
                  `}
              </div>
            </div>
          ` : ""}
        ` : this.loadingClaws ? "" : html`
          <div class="empty-state" style="padding:40px">
            <div class="empty-state-icon">💻</div>
            <div class="empty-state-title">Select a claw to browse code</div>
            <div class="empty-state-sub">Connect a claw with a synced directory to browse its source files</div>
          </div>
        `}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-code-editor": CclCodeEditor; } }
