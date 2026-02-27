import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getTenantToken } from "../../api.js";

const BASE = (typeof window !== "undefined" && (window as unknown as { API_URL?: string }).API_URL) ?? "https://api.coderclaw.ai";

async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getTenantToken() ?? ""}`, ...(opts.headers ?? {}) },
  });
  if (res.status === 404 || res.status === 204) return null;
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  taskId?: string;
  enabled: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
  lastStatus?: string;
}

@customElement("ccl-claw-cron")
export class CclClawCron extends LitElement {
  override createRenderRoot() { return this; }

  @property() clawId = "";
  @property() wsUrl = "";

  @state() private jobs: CronJob[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private showModal = false;
  @state() private form = { name: "", schedule: "0 9 * * 1-5", taskId: "" };
  @state() private saving = false;

  override connectedCallback() { super.connectedCallback(); this.load(); }
  override updated(c: Map<string, unknown>) { if (c.has("clawId") && this.clawId) this.load(); }

  private async load() {
    this.loading = true;
    try {
      const data = await apiFetch<CronJob[]>(`/api/claws/${this.clawId}/cron`);
      this.jobs = data ?? [];
    } catch (e) { this.error = (e as Error).message; }
    finally { this.loading = false; }
  }

  private async toggle(job: CronJob) {
    try {
      await apiFetch(`/api/claws/${this.clawId}/cron/${job.id}`, { method: "PATCH", body: JSON.stringify({ enabled: !job.enabled }) });
      this.jobs = this.jobs.map(j => j.id === job.id ? { ...j, enabled: !j.enabled } : j);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async remove(job: CronJob) {
    if (!confirm(`Delete cron job "${job.name}"?`)) return;
    try {
      await apiFetch(`/api/claws/${this.clawId}/cron/${job.id}`, { method: "DELETE" });
      this.jobs = this.jobs.filter(j => j.id !== job.id);
    } catch (e) { this.error = (e as Error).message; }
  }

  private async save(e: Event) {
    e.preventDefault();
    this.saving = true;
    try {
      const created = await apiFetch<CronJob>(`/api/claws/${this.clawId}/cron`, { method: "POST", body: JSON.stringify(this.form) });
      if (created) this.jobs = [created, ...this.jobs];
      this.showModal = false;
    } catch (e) { this.error = (e as Error).message; }
    finally { this.saving = false; }
  }

  private fmt(d?: string) { return d ? new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"; }

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Cron Jobs</div>
          <button class="btn btn-primary btn-sm" @click=${() => { this.showModal = true; }}>Add job</button>
        </div>

        ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}
        ${this.loading ? html`<div style="color:var(--muted);font-size:13px">Loading…</div>`
          : this.jobs.length === 0
            ? html`<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-title">No cron jobs</div><div class="empty-state-sub">Schedule recurring tasks for this claw</div></div>`
            : this.jobs.map(job => html`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${job.name}</div>
                    <code style="font-size:11px;font-family:var(--mono);color:var(--muted)">${job.schedule}</code>
                  </div>
                  <span class="badge ${job.enabled ? "badge-green" : "badge-gray"}">${job.enabled ? "active" : "paused"}</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;color:var(--muted);margin-bottom:12px">
                  <div>Last run: ${this.fmt(job.lastRunAt)}</div>
                  <div>Next run: ${this.fmt(job.nextRunAt)}</div>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${() => this.toggle(job)}>${job.enabled ? "Pause" : "Resume"}</button>
                  <button class="btn btn-danger btn-sm" @click=${() => this.remove(job)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal ? html`
          <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.showModal = false; }}>
            <div class="modal">
              <div class="modal-title">New cron job</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${(e: InputEvent) => { this.form = { ...this.form, name: (e.target as HTMLInputElement).value }; }}></div>
                <div class="field">
                  <label class="label">Schedule <span class="label-hint">(cron expression)</span></label>
                  <input class="input" placeholder="0 9 * * 1-5" .value=${this.form.schedule}
                    @input=${(e: InputEvent) => { this.form = { ...this.form, schedule: (e.target as HTMLInputElement).value }; }}>
                  <div style="font-size:11px;color:var(--muted);margin-top:4px">minute hour day month weekday</div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${() => this.showModal = false}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving ? "Saving…" : "Create"}</button>
                </div>
              </form>
            </div>
          </div>` : ""}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-claw-cron": CclClawCron; } }
