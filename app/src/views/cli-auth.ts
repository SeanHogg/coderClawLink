/**
 * CLI-auth view for CoderClawLink.
 *
 * Served at /auth/cli?callback=<url>&state=<nonce>.
 * Shows the standard login/register form, then redirects back to the CLI's
 * localhost callback server on success.
 */

import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { auth, type UserInfo, type AuthSuccess, type MfaChallenge, type LegalDocument } from "../api.js";

@customElement("ccl-cli-auth")
export class CclCliAuth extends LitElement {
  override createRenderRoot() { return this; }

  // Query params parsed from the URL.
  private callbackUrl = "";
  private stateNonce = "";

  @state() private mode: "login" | "register" = "login";
  @state() private email = "";
  @state() private username = "";
  @state() private password = "";
  @state() private agreeTerms = false;
  @state() private loading = false;
  @state() private error = "";
  @state() private done = false;

  // MFA
  @state() private mfaStep = false;
  @state() private mfaToken = "";
  @state() private mfaCode = "";
  @state() private recoveryCode = "";
  @state() private mfaMethod: "totp" | "recovery" = "totp";
  @state() private pendingUser: UserInfo | null = null;

  @state() private legalTerms: LegalDocument | null = null;

  override connectedCallback() {
    super.connectedCallback();

    const params = new URLSearchParams(window.location.search);
    this.callbackUrl = params.get("callback") ?? "";
    this.stateNonce = params.get("state") ?? "";

    void this.loadLegalTerms();
  }

  private async loadLegalTerms() {
    try {
      const legal = await auth.legalCurrent();
      this.legalTerms = legal.terms;
    } catch {
      this.legalTerms = null;
    }
  }

  private redirectToCallback(token: string) {
    if (!this.callbackUrl) {
      this.error = "Missing callback URL — cannot return to CLI.";
      return;
    }
    const url = new URL(this.callbackUrl);
    url.searchParams.set("token", token);
    url.searchParams.set("state", this.stateNonce);
    this.done = true;
    window.location.href = url.toString();
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
        ? await auth.login(this.email, this.password, "CLI Auth")
        : await auth.register(this.email, this.username || this.email.split("@")[0], this.password);

      if (this.mode === "register" && this.legalTerms) {
        try { await auth.acceptTerms(this.legalTerms.version); } catch { /* best effort */ }
      }

      if (this.mode === "login" && "mfaRequired" in res && res.mfaRequired) {
        const challenge = res as MfaChallenge;
        this.mfaStep = true;
        this.mfaToken = challenge.mfaToken;
        this.pendingUser = challenge.user;
        return;
      }

      const success = res as AuthSuccess;
      this.redirectToCallback(success.token);
    } catch (err) {
      this.error = (err as Error).message ?? "An error occurred";
    } finally {
      this.loading = false;
    }
  }

  private async submitMfa(e: Event) {
    e.preventDefault();
    if (!this.mfaToken) return;
    this.loading = true;
    this.error = "";
    try {
      const res = await auth.loginMfa(this.mfaToken, {
        code: this.mfaMethod === "totp" ? this.mfaCode.trim() : undefined,
        recoveryCode: this.mfaMethod === "recovery" ? this.recoveryCode.trim() : undefined,
        sessionName: "CLI Auth",
      });
      this.redirectToCallback(res.token);
    } catch (err) {
      this.error = (err as Error).message ?? "MFA verification failed";
    } finally {
      this.loading = false;
    }
  }

  private openLegalModal(type: "terms" | "privacy") {
    const url = type === "terms" ? "https://coderclaw.ai/terms/" : "https://coderclaw.ai/privacy/";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  override render() {
    if (!this.callbackUrl || !this.stateNonce) {
      return html`
        <div class="auth-shell">
          <div class="auth-card">
            <div class="auth-title">Invalid request</div>
            <div class="auth-sub">Missing callback or state parameter. Please try again from your terminal.</div>
          </div>
        </div>`;
    }

    if (this.done) {
      return html`
        <div class="auth-shell">
          <div class="auth-card">
            <div class="auth-title">&#x2705; Authenticated</div>
            <div class="auth-sub">Returning to the terminal…</div>
          </div>
        </div>`;
    }

    return html`
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
            <div>
              <div class="auth-logo-name">CoderClawLink</div>
              <div class="auth-logo-sub">CLI Authentication</div>
            </div>
          </div>

          <div class="auth-title">
            ${this.mfaStep
              ? "Multi-factor verification"
              : this.mode === "login" ? "Sign in from the CLI" : "Create account"}
          </div>
          <div class="auth-sub">
            ${this.mfaStep
              ? `Verify ${this.pendingUser?.email ?? this.email} to continue`
              : this.mode === "login"
                ? "Sign in to connect your CoderClaw instance"
                : "Create a free account to get started"}
          </div>

          ${this.error ? html`<div class="error-banner">${this.error}</div>` : ""}

          ${this.mfaStep ? html`
            <form @submit=${this.submitMfa} style="display:grid;gap:14px">
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button type="button"
                  class="btn ${this.mfaMethod === "totp" ? "btn-primary" : "btn-secondary"} btn-sm"
                  @click=${() => { this.mfaMethod = "totp"; this.error = ""; }}>Authenticator app</button>
                <button type="button"
                  class="btn ${this.mfaMethod === "recovery" ? "btn-primary" : "btn-secondary"} btn-sm"
                  @click=${() => { this.mfaMethod = "recovery"; this.error = ""; }}>Recovery code</button>
              </div>
              ${this.mfaMethod === "totp" ? html`
                <div class="field">
                  <label class="label">6-digit code</label>
                  <input class="input" type="text" placeholder="123456"
                    .value=${this.mfaCode}
                    @input=${(e: InputEvent) => { this.mfaCode = (e.target as HTMLInputElement).value; }}
                    autocomplete="one-time-code" inputmode="numeric" required>
                </div>
              ` : html`
                <div class="field">
                  <label class="label">Recovery code</label>
                  <input class="input" type="text" placeholder="ABCD-EFGH"
                    .value=${this.recoveryCode}
                    @input=${(e: InputEvent) => { this.recoveryCode = (e.target as HTMLInputElement).value; }}
                    autocomplete="off" required>
                </div>
              `}
              <button class="btn btn-primary btn-full btn-lg" type="submit" ?disabled=${this.loading}>
                ${this.loading ? "Verifying…" : "Verify and sign in"}
              </button>
              <button class="btn btn-secondary btn-full" type="button"
                @click=${() => { this.mfaStep = false; this.mfaToken = ""; this.mfaCode = ""; this.recoveryCode = ""; this.mfaMethod = "totp"; }}
                ?disabled=${this.loading}>Back</button>
            </form>
          ` : html`
            <form @submit=${this.submit} style="display:grid;gap:14px">
              <div class="field">
                <label class="label">Email</label>
                <input class="input" type="email" placeholder="you@example.com"
                  .value=${this.email}
                  @input=${(e: InputEvent) => { this.email = (e.target as HTMLInputElement).value; }}
                  autocomplete="email" required>
              </div>
              ${this.mode === "register" ? html`
                <div class="field">
                  <label class="label">Username <span class="label-hint">(optional)</span></label>
                  <input class="input" type="text" placeholder="yourhandle"
                    .value=${this.username}
                    @input=${(e: InputEvent) => { this.username = (e.target as HTMLInputElement).value; }}
                    autocomplete="username">
                </div>
                <div class="field" style="display:flex;align-items:center;gap:6px">
                  <input id="agreeTerms" type="checkbox"
                    .checked=${this.agreeTerms}
                    @change=${(e: Event) => { this.agreeTerms = (e.target as HTMLInputElement).checked; }}>
                  <label for="agreeTerms" class="label" style="margin:0">
                    I agree to the <a href="#" @click=${() => this.openLegalModal("terms")}>Terms of Use</a>
                  </label>
                </div>
              ` : ""}
              <div class="field">
                <label class="label">Password</label>
                <input class="input" type="password" placeholder="••••••••"
                  .value=${this.password}
                  @input=${(e: InputEvent) => { this.password = (e.target as HTMLInputElement).value; }}
                  autocomplete=${this.mode === "login" ? "current-password" : "new-password"}
                  required minlength="8">
              </div>
              <button class="btn btn-primary btn-full btn-lg" type="submit"
                ?disabled=${this.loading} style="margin-top:4px">
                ${this.loading ? "Please wait…" : this.mode === "login" ? "Sign in" : "Create account"}
              </button>
            </form>
          `}

          <div class="auth-toggle">
            ${this.mode === "login"
              ? html`Don't have an account? <a @click=${() => { this.mode = "register"; this.error = ""; }}>Sign up</a>`
              : html`Already have an account? <a @click=${() => { this.mode = "login"; this.error = ""; }}>Sign in</a>`}
          </div>

          <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border,#30363d);font-size:0.85rem;color:var(--text-muted,#8b949e);text-align:center">
            You will be redirected back to the terminal after authentication.
          </div>
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ccl-cli-auth": CclCliAuth; }
}
