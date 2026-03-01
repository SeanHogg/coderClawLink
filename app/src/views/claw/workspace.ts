import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import { claws as clawsApi, type ClawDirectory, type ClawDirectoryFile } from "../../api.js";

@customElement("ccl-claw-workspace")
export class CclClawWorkspace extends LitElement {
  override createRenderRoot() { return this; }

  static override properties = {
    clawId: { type: String },
    loading: { state: true },
    error: { state: true },
    directories: { state: true },
    selectedDirectoryId: { state: true },
    files: { state: true },
    filesLoading: { state: true },
    selectedFilePath: { state: true },
    selectedFileContent: { state: true },
    fileLoading: { state: true },
  };

  clawId = "";
  private loading = true;
  private error = "";
  private directories: ClawDirectory[] = [];
  private selectedDirectoryId = "";
  private files: ClawDirectoryFile[] = [];
  private filesLoading = false;
  private selectedFilePath = "";
  private selectedFileContent = "";
  private fileLoading = false;

  override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has("clawId") && this.clawId) void this.load();
  }

  private async load() {
    if (!this.clawId) return;
    this.loading = true;
    this.error = "";
    this.selectedDirectoryId = "";
    this.files = [];
    this.selectedFilePath = "";
    this.selectedFileContent = "";

    try {
      this.directories = await clawsApi.directories(this.clawId);
      if (this.directories.length > 0) {
        this.selectedDirectoryId = this.directories[0]!.id;
        await this.loadFiles(this.selectedDirectoryId);
      }
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load workspace sync metadata";
    } finally {
      this.loading = false;
    }
  }

  private async loadFiles(directoryId: string) {
    if (!directoryId) return;
    this.filesLoading = true;
    this.selectedFilePath = "";
    this.selectedFileContent = "";
    try {
      this.files = await clawsApi.directoryFiles(this.clawId, directoryId);
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load files";
      this.files = [];
    } finally {
      this.filesLoading = false;
    }
  }

  private async selectFile(relPath: string) {
    if (!this.selectedDirectoryId || !relPath) return;
    this.selectedFilePath = relPath;
    this.fileLoading = true;
    try {
      const data = await clawsApi.directoryFileContent(this.clawId, this.selectedDirectoryId, relPath);
      this.selectedFileContent = data.content ?? "";
    } catch (e) {
      this.error = (e as Error).message ?? "Failed to load file content";
      this.selectedFileContent = "";
    } finally {
      this.fileLoading = false;
    }
  }

  private badgeClass(status: string) {
    if (status === "synced") return "badge badge-green";
    if (status === "error") return "badge badge-red";
    return "badge badge-yellow";
  }

  override render() {
    const selectedDirectory = this.directories.find((d) => d.id === this.selectedDirectoryId) ?? null;

    return html`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">.coderClaw Sync</div>
          <button class="btn btn-secondary btn-sm" @click=${() => void this.load()} ?disabled=${this.loading || this.filesLoading || this.fileLoading}>Refresh</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

        ${this.loading
          ? html`<div class="empty-state">Loading…</div>`
          : this.directories.length === 0
            ? html`<div class="empty-state"><div class="empty-state-title">No synced directories</div><div class="empty-state-sub">Gateway startup sync has not published a .coderClaw path for this claw yet.</div></div>`
            : html`
                <div class="card">
                  <div class="card-title" style="margin-bottom:10px">Directory Manifest</div>
                  <div style="display:grid;gap:8px;">
                    ${this.directories.map((d) => html`
                      <button class="btn btn-ghost btn-sm" style="justify-content:space-between;border:1px solid var(--border);padding:10px 12px;"
                        @click=${async () => { this.selectedDirectoryId = d.id; await this.loadFiles(d.id); }}>
                        <span style="text-align:left;display:grid;gap:2px;">
                          <span style="font-family:var(--mono);font-size:12px">${d.absPath}</span>
                          <span style="font-size:11px;color:var(--muted)">last synced: ${d.lastSyncedAt ? new Date(d.lastSyncedAt).toLocaleString() : "never"}</span>
                        </span>
                        <span class=${this.badgeClass(d.status)}>${d.status}</span>
                      </button>
                    `)}
                  </div>
                </div>

                ${selectedDirectory
                  ? html`
                      <div style="display:grid;grid-template-columns:minmax(220px, 320px) 1fr;gap:12px;min-height:320px;">
                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px">Files</div>
                          ${this.filesLoading
                            ? html`<div style="font-size:12px;color:var(--muted)">Loading files…</div>`
                            : this.files.length === 0
                              ? html`<div style="font-size:12px;color:var(--muted)">No files synced yet.</div>`
                              : html`
                                  <div style="display:grid;gap:6px;">
                                    ${this.files.map((f) => html`
                                      <button class="btn btn-ghost btn-sm"
                                        style="justify-content:flex-start;border:1px solid ${this.selectedFilePath === f.relPath ? "var(--accent)" : "var(--border)"};padding:8px 10px;"
                                        @click=${() => void this.selectFile(f.relPath)}>
                                        <span style="font-family:var(--mono);font-size:11px">${f.relPath}</span>
                                      </button>
                                    `)}
                                  </div>
                                `}
                        </div>

                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
                            <span>Preview</span>
                            <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">${this.selectedFilePath || "Select a file"}</span>
                          </div>
                          ${this.fileLoading
                            ? html`<div style="font-size:12px;color:var(--muted)">Loading content…</div>`
                            : this.selectedFilePath
                              ? html`<pre class="log-wrap" style="font-size:12px;max-height:520px;overflow:auto;white-space:pre-wrap;">${this.selectedFileContent}</pre>`
                              : html`<div style="font-size:12px;color:var(--muted)">Select a synced file to preview content.</div>`}
                        </div>
                      </div>
                    `
                  : ""}
              `}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-workspace": CclClawWorkspace; } }
