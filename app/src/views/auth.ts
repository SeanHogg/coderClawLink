import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { auth, type UserInfo } from "../api.js";

@customElement("ccl-auth")
export class CclAuth extends LitElement {
  override createRenderRoot() { return this; }

  @state() private mode: "login" | "register" = "login";
  @state() private email = "";
  @state() private password = "";
  @state() private loading = false;
  @state() private error = "";

  private async submit(e: Event) {
    e.preventDefault();
    if (!this.email || !this.password) return;
    this.loading = true;
    this.error = "";
    try {
      const fn = this.mode === "login" ? auth.login : auth.register;
      const res = await fn(this.email, this.password);
      this.dispatchEvent(new CustomEvent<{ token: string; user: UserInfo }>(
        this.mode,
        { detail: res, bubbles: true, composed: true }
      ));
    } catch (err) {
      this.error = (err as Error).message ?? "An error occurred";
    } finally {
      this.loading = false;
    }
  }

  override render() {
    return html`
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="/logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
            <div>
              <div class="auth-logo-name">CoderClawLink</div>
              <div class="auth-logo-sub">AI Coding Mesh</div>
            </div>
          </div>

          <div class="auth-title">${this.mode === "login" ? "Welcome back" : "Create account"}</div>
          <div class="auth-sub">${this.mode === "login" ? "Sign in to your workspace" : "Get started with CoderClawLink"}</div>

          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

          <form @submit=${this.submit} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Email</label>
              <input
                class="input"
                type="email"
                placeholder="you@example.com"
                .value=${this.email}
                @input=${(e: InputEvent) => { this.email = (e.target as HTMLInputElement).value; }}
                autocomplete="email"
                required
              >
            </div>
            <div class="field">
              <label class="label">Password</label>
              <input
                class="input"
                type="password"
                placeholder="••••••••"
                .value=${this.password}
                @input=${(e: InputEvent) => { this.password = (e.target as HTMLInputElement).value; }}
                autocomplete=${this.mode === "login" ? "current-password" : "new-password"}
                required
                minlength="8"
              >
            </div>
            <button
              class="btn btn-primary btn-full btn-lg"
              type="submit"
              ?disabled=${this.loading}
              style="margin-top:4px"
            >
              ${this.loading
                ? "Please wait…"
                : this.mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div class="auth-toggle">
            ${this.mode === "login"
              ? html`Don't have an account? <a @click=${() => { this.mode = "register"; this.error = ""; }}>Sign up</a>`
              : html`Already have an account? <a @click=${() => { this.mode = "login"; this.error = ""; }}>Sign in</a>`}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-auth": CclAuth; }
}
