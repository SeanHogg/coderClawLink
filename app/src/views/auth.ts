import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { auth, claws as clawsApi, getWebToken, type UserInfo, type MfaChallenge, type AuthSuccess, type LegalDocument } from "../api.js";
import "./quickstart.js";

@customElement("ccl-auth")
export class CclAuth extends LitElement {
  override createRenderRoot() { return this; }

  @state() private mode: "login" | "register" = "login";
  @state() private email = "";
  @state() private username = "";
  @state() private password = "";
  @state() private agreeTerms = false;
  @state() private loading = false;
  @state() private error = "";
  @state() private mfaStep = false;
  @state() private mfaToken = "";
  @state() private mfaCode = "";
  @state() private recoveryCode = "";
  @state() private mfaMethod: "totp" | "recovery" = "totp";
  @state() private pendingUser: UserInfo | null = null;
  @state() private legalTerms: LegalDocument | null = null;
  @state() private showRegisterQuickstart = false;
  @state() private checkingQuickstartVisibility = false;

  override connectedCallback() {
    super.connectedCallback();
    void this.loadLegalTerms();
    void this.refreshRegisterQuickstartVisibility();
  }

  private async loadLegalTerms() {
    try {
      const legal = await auth.legalCurrent();
      this.legalTerms = legal.terms;
    } catch {
      this.legalTerms = null;
    }
  }

  private openLegalModal(type: "terms" | "privacy") {
    const url = type === "terms" ? "https://coderclaw.ai/terms/" : "https://coderclaw.ai/privacy/";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("mode")) {
      void this.refreshRegisterQuickstartVisibility();
    }
  }

  private async refreshRegisterQuickstartVisibility() {
    // only show the quickstart when we're on the register form; reset otherwise
    if (this.mode !== "register") {
      this.showRegisterQuickstart = false;
      return;
    }
    if (this.checkingQuickstartVisibility) return;

    this.checkingQuickstartVisibility = true;
    try {
      // if the user isn't even logged in yet there can't possibly be any claws
      // associated with their tenant, so avoid making an authenticated API call
      // which would return 401 and (previously) trigger a global logout.
      if (!getWebToken()) {
        this.showRegisterQuickstart = true;
      } else {
        const existingClaws = await clawsApi.list();
        this.showRegisterQuickstart = existingClaws.length === 0;
      }
    } catch {
      // any error during the check is non‑fatal; fall back to showing quickstart
      this.showRegisterQuickstart = true;
    } finally {
      this.checkingQuickstartVisibility = false;
    }
  }

  private async submit(e: Event) {
    e.preventDefault();
    if (!this.email || !this.password) return;
    this.loading = true;
    this.error = "";
    try {
      if (this.mode === "register" && !this.agreeTerms) {
        this.error = "You must agree to the Terms of Use.";
        this.loading = false;
        return;
      }

      const res = this.mode === "login"
        ? await auth.login(this.email, this.password, "Web App")
        : await auth.register(this.email, this.username || this.email.split("@")[0], this.password);

      // if registered, accept current terms automatically
      if (this.mode === "register" && this.legalTerms) {
        try {
          await auth.acceptTerms(this.legalTerms.version);
        } catch {
          // ignore; user can accept later
        }
      }

      if (this.mode === "login" && "mfaRequired" in res && res.mfaRequired) {
        const challenge = res as MfaChallenge;
        this.mfaStep = true;
        this.mfaToken = challenge.mfaToken;
        this.pendingUser = challenge.user;
        this.mfaCode = "";
        this.recoveryCode = "";
        return;
      }

      const success = res as AuthSuccess;

      this.dispatchEvent(new CustomEvent<{ token: string; user: UserInfo }>(
        this.mode === "register" ? "register" : "login",
        { detail: { token: success.token, user: success.user }, bubbles: true, composed: true }
      ));
    } catch (err) {
      this.error = (err as Error).message ?? "An error occurred";
    } finally {
      this.loading = false;
    }
  }

  private async submitMfa(e: Event) {
    e.preventDefault();
    if (!this.mfaToken) return;
    if (this.mfaMethod === "totp" && !this.mfaCode.trim()) return;
    if (this.mfaMethod === "recovery" && !this.recoveryCode.trim()) return;

    this.loading = true;
    this.error = "";
    try {
      const res = await auth.loginMfa(this.mfaToken, {
        code: this.mfaMethod === "totp" ? this.mfaCode.trim() : undefined,
        recoveryCode: this.mfaMethod === "recovery" ? this.recoveryCode.trim() : undefined,
        sessionName: "Web App",
      });
      this.dispatchEvent(new CustomEvent<{ token: string; user: UserInfo }>(
        "login",
        { detail: { token: res.token, user: res.user }, bubbles: true, composed: true }
      ));
    } catch (err) {
      this.error = (err as Error).message ?? "MFA verification failed";
    } finally {
      this.loading = false;
    }
  }

  private resetMfaStep() {
    this.mfaStep = false;
    this.mfaToken = "";
    this.mfaCode = "";
    this.recoveryCode = "";
    this.mfaMethod = "totp";
    this.pendingUser = null;
  }

  override render() {
    return html`
      <div class="auth-shell">
        <div class="auth-card">
          <button class="auth-close" @click=${() => this.dispatchEvent(new Event("close", { bubbles: true, composed: true }))} title="Close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="auth-logo">
            <img src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
            <div>
              <div class="auth-logo-name">CoderClawLink</div>
              <div class="auth-logo-sub">AI Coding Mesh</div>
            </div>
          </div>

          <div class="auth-title">
            ${this.mfaStep
              ? "Multi-factor verification"
              : this.mode === "login" ? "Welcome back" : "Create account"}
          </div>
          <div class="auth-sub">
            ${this.mfaStep
              ? `Verify ${this.pendingUser?.email ?? this.email} to continue`
              : this.mode === "login" ? "Sign in to your workspace" : "Get started with CoderClawLink"}
          </div>

          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

          ${this.mfaStep ? html`
            <form @submit=${this.submitMfa} style="display:grid;gap:14px">
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button
                  type="button"
                  class="btn ${this.mfaMethod === "totp" ? "btn-primary" : "btn-secondary"} btn-sm"
                  @click=${() => { this.mfaMethod = "totp"; this.error = ""; }}
                >
                  Authenticator app
                </button>
                <button
                  type="button"
                  class="btn ${this.mfaMethod === "recovery" ? "btn-primary" : "btn-secondary"} btn-sm"
                  @click=${() => { this.mfaMethod = "recovery"; this.error = ""; }}
                >
                  Recovery code
                </button>
              </div>

              ${this.mfaMethod === "totp" ? html`
                <div class="field">
                  <label class="label">6-digit code</label>
                  <input
                    class="input"
                    type="text"
                    placeholder="123456"
                    .value=${this.mfaCode}
                    @input=${(e: InputEvent) => { this.mfaCode = (e.target as HTMLInputElement).value; }}
                    autocomplete="one-time-code"
                    inputmode="numeric"
                    required
                  >
                </div>
              ` : html`
                <div class="field">
                  <label class="label">Recovery code</label>
                  <input
                    class="input"
                    type="text"
                    placeholder="ABCD-EFGH"
                    .value=${this.recoveryCode}
                    @input=${(e: InputEvent) => { this.recoveryCode = (e.target as HTMLInputElement).value; }}
                    autocomplete="off"
                    required
                  >
                </div>
              `}

              <button
                class="btn btn-primary btn-full btn-lg"
                type="submit"
                ?disabled=${this.loading}
              >
                ${this.loading ? "Verifying…" : "Verify and sign in"}
              </button>

              <button
                class="btn btn-secondary btn-full"
                type="button"
                @click=${() => { this.resetMfaStep(); }}
                ?disabled=${this.loading}
              >
                Back
              </button>
            </form>
          ` : html`
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
            ${this.mode === "register" ? html`
            <div class="field">
              <label class="label">Username <span class="label-hint">(optional)</span></label>
              <input
                class="input"
                type="text"
                placeholder="yourhandle"
                .value=${this.username}
                @input=${(e: InputEvent) => { this.username = (e.target as HTMLInputElement).value; }}
                autocomplete="username"
              >
            </div>
            <div class="field" style="display:flex;align-items:center;gap:6px">
              <input
                id="agreeTerms"
                type="checkbox"
                .checked=${this.agreeTerms}
                @change=${(e: Event) => { this.agreeTerms = (e.target as HTMLInputElement).checked; }}
              />
              <label for="agreeTerms" class="label" style="margin:0">
                I agree to the <a href="#" @click=${() => this.openLegalModal('terms')}>Terms of Use</a>
              </label>
            </div>
            ` : ""}
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
          `}

          <div class="auth-toggle">
            ${this.mode === "login"
              ? html`Don't have an account? <a @click=${() => { this.mode = "register"; this.error = ""; this.resetMfaStep(); }}>Sign up</a>`
              : html`Already have an account? <a @click=${() => { this.mode = "login"; this.error = ""; this.resetMfaStep(); }}>Sign in</a>`}
          </div>
        </div>

        ${this.mode === "register" && this.showRegisterQuickstart && !this.mfaStep
          ? html`
            <div style="margin-top:20px;width:min(980px,95vw)">
              <ccl-quickstart></ccl-quickstart>
            </div>
          `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-auth": CclAuth; }
}
