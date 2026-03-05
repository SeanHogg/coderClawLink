/**
 * Pricing view — ccl-pricing
 *
 * Standalone Lit 3 component that renders the three-tier pricing table
 * (Free · Pro · Enterprise), a feature comparison grid, and a FAQ section.
 *
 * Used in two contexts:
 *  1. The public landing page (pre-auth) as a full-page section.
 *  2. The in-app Billing tab to show upgrade options.
 *
 * Props:
 *  - currentPlan: "free" | "pro" | "enterprise" — highlights the active tier
 *  - tenantId: string — when set, shows in-app upgrade/downgrade buttons
 */
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tenants } from "../api.js";

type Plan = "free" | "pro" | "enterprise";

interface PlanFeature {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
  highlight?: boolean;
}

const FEATURES: PlanFeature[] = [
  { label: "Monthly price",             free: "$0",           pro: "$29 / seat",     enterprise: "Custom",          highlight: true },
  { label: "Claws (AI agents)",         free: "1",            pro: "Unlimited",      enterprise: "Unlimited",       highlight: true },
  { label: "Projects",                  free: "3",            pro: "Unlimited",      enterprise: "Unlimited"        },
  { label: "Tasks",                     free: "50",           pro: "Unlimited",      enterprise: "Unlimited"        },
  { label: "Team members",              free: "1",            pro: "Up to 25",       enterprise: "Unlimited"        },
  { label: "LLM requests / month",      free: "1,000",        pro: "50,000",         enterprise: "Unlimited / SLA", highlight: true },
  { label: "coderClawLLM compute",      free: "Free pool",    pro: "Pro pool",       enterprise: "Dedicated"        },
  { label: "Chat history",              free: "7 days",       pro: "90 days",        enterprise: "Unlimited"        },
  { label: "Audit log retention",       free: "30 days",      pro: "1 year",         enterprise: "Unlimited"        },
  { label: "Approval gates",            free: true,           pro: true,             enterprise: true               },
  { label: "Specs & Workflows",         free: true,           pro: true,             enterprise: true               },
  { label: "Marketplace skills",        free: "Install",      pro: "Publish + install", enterprise: "Private registry" },
  { label: "Full RBAC (4 roles)",       free: false,          pro: true,             enterprise: true               },
  { label: "MFA (TOTP)",                free: true,           pro: true,             enterprise: "TOTP + hardware"  },
  { label: "GDPR / CCPA tooling",       free: true,           pro: true,             enterprise: "✅ + DPA"         },
  { label: "SSO / SAML",                free: false,          pro: false,            enterprise: true               },
  { label: "Private skill registry",    free: false,          pro: false,            enterprise: true               },
  { label: "Self-hosted (MIT)",         free: true,           pro: true,             enterprise: "✅ + air-gap"     },
  { label: "SLA",                       free: "Community",    pro: "Biz hours",      enterprise: "99.9% uptime"     },
  { label: "Support",                   free: "Discord",      pro: "Email + Discord",enterprise: "Dedicated CSM"    },
];

const FAQS = [
  {
    q: "Can I try Pro before paying?",
    a: "Yes — all new accounts receive a 14-day Pro trial with no credit card required. Trial limits match the full Pro plan.",
  },
  {
    q: "What happens when I hit the LLM request limit?",
    a: "Requests beyond the monthly limit are queued, not dropped. You'll receive a warning email at 80% usage. Purchase add-on blocks or enable Bring Your Own Key (BYOK) to avoid interruption.",
  },
  {
    q: "Is billing per Claw or per user?",
    a: "Pro billing is per seat (named user), not per Claw. You can register unlimited Claws on Pro with no additional seat cost.",
  },
  {
    q: "Can I self-host for free?",
    a: "Yes. coderClawLink is MIT-licensed. Run the full platform — portal, API, relay, and database — on your own infrastructure at zero licensing cost. Pricing applies only to the managed app.coderclaw.ai / api.coderclaw.ai cloud service.",
  },
  {
    q: "Is my data private on the managed cloud?",
    a: "Yes. All data is tenant-isolated. coderClaw.ai staff cannot access your data without an explicit impersonation record in the audit log. See our Privacy Policy for full details.",
  },
  {
    q: "Can I switch between self-hosted and managed cloud?",
    a: "Yes. Export your data at any time via the API. Migration tooling is available in the coderClaw CLI.",
  },
];

@customElement("ccl-pricing")
export class CclPricing extends LitElement {
  override createRenderRoot() { return this; }

  @property() currentPlan: Plan = "free";
  @property() tenantId = "";

  @state() private billingCycle: "monthly" | "yearly" = "monthly";
  @state() private upgrading = false;
  @state() private upgradeError = "";
  @state() private upgradeDone = false;
  @state() private openFaq: number | null = null;

  private proMonthly = 29;
  private proYearly = 23; // ~20% discount

  private get proPrice() {
    return this.billingCycle === "yearly" ? this.proYearly : this.proMonthly;
  }

  private handleUpgrade() {
    if (!this.tenantId) return;
    // Redirect to the full billing form in the workspace settings panel
    window.dispatchEvent(new CustomEvent("ccl:navigate", {
      bubbles: true,
      detail: { tab: "workspace", workspaceTab: "settings", workspaceSection: "billing" },
    }));
  }

  private async handleDowngrade() {
    if (!this.tenantId || this.upgrading) return;
    if (!confirm("Downgrade to Free? Changes take effect at end of billing period.")) return;
    this.upgrading = true;
    this.upgradeError = "";
    try {
      await tenants.downgradeToFree(this.tenantId);
      this.currentPlan = "free";
    } catch (e) {
      this.upgradeError = (e as Error).message ?? "Downgrade failed. Please try again.";
    } finally {
      this.upgrading = false;
    }
  }

  private featureCell(val: string | boolean) {
    if (val === true) return html`<span style="color:var(--success,#22c55e);font-size:16px">✓</span>`;
    if (val === false) return html`<span style="color:var(--muted);font-size:14px">—</span>`;
    return html`<span style="font-size:13px">${val}</span>`;
  }

  private renderPlanCard(
    plan: Plan,
    name: string,
    price: string,
    priceSub: string,
    badge: string | null,
    description: string,
    cta: () => unknown,
    ctaLabel: string,
    ctaDisabled: boolean,
  ) {
    const active = this.currentPlan === plan;
    return html`
      <div style="
        border:2px solid ${active ? "var(--accent,#6366f1)" : "var(--border)"};
        border-radius:12px;
        padding:28px 24px;
        background:var(--surface);
        display:flex;
        flex-direction:column;
        gap:14px;
        position:relative;
        transition:border-color .2s;
        ${plan === "pro" ? "box-shadow:0 4px 24px rgba(99,102,241,.12);" : ""}
      ">
        ${badge ? html`
          <div style="
            position:absolute;top:-14px;left:50%;transform:translateX(-50%);
            background:var(--accent,#6366f1);color:#fff;
            font-size:11px;font-weight:700;letter-spacing:.06em;
            padding:3px 14px;border-radius:99px;white-space:nowrap;
          ">${badge}</div>
        ` : ""}

        <div>
          <div style="font-size:15px;font-weight:700;color:var(--text-strong)">${name}</div>
          <div style="margin-top:8px">
            <span style="font-size:32px;font-weight:800;color:var(--text-strong)">${price}</span>
            <span style="font-size:13px;color:var(--muted);margin-left:4px">${priceSub}</span>
          </div>
          <div style="font-size:13px;color:var(--muted);margin-top:6px;line-height:1.5">${description}</div>
        </div>

        ${this.tenantId ? html`
          <button
            class="btn ${active ? "btn-secondary" : "btn-primary"}"
            style="width:100%"
            ?disabled=${ctaDisabled}
            @click=${cta}
          >
            ${this.upgrading && plan !== "free" ? "Processing…" : ctaLabel}
          </button>
        ` : html`
          <button
            class="btn btn-primary"
            style="width:100%"
            @click=${() => window.dispatchEvent(new CustomEvent("ccl:navigate-auth"))}
          >
            ${active ? "Current plan" : ctaLabel}
          </button>
        `}

        ${active ? html`<div style="font-size:12px;color:var(--accent,#6366f1);text-align:center;font-weight:600">Your current plan</div>` : ""}
      </div>
    `;
  }

  override render() {
    const inApp = Boolean(this.tenantId);

    return html`
      <div style="padding:${inApp ? "24px" : "64px 24px"};max-width:1100px;margin:0 auto">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:48px">
          <h1 style="font-size:clamp(26px,5vw,40px);font-weight:800;color:var(--text-strong);margin:0 0 12px">
            Simple, transparent pricing
          </h1>
          <p style="color:var(--muted);font-size:16px;max-width:540px;margin:0 auto">
            Start free — no credit card required. Upgrade when your team is ready.
            <strong style="color:var(--text-strong)">MIT-licensed and always self-hostable.</strong>
          </p>

          <!-- Billing cycle toggle -->
          <div style="display:inline-flex;align-items:center;gap:10px;margin-top:24px;background:var(--surface-2);border-radius:99px;padding:4px 8px">
            <button
              class="btn btn-sm ${this.billingCycle === "monthly" ? "btn-primary" : "btn-ghost"}"
              style="border-radius:99px"
              @click=${() => { this.billingCycle = "monthly"; }}
            >Monthly</button>
            <button
              class="btn btn-sm ${this.billingCycle === "yearly" ? "btn-primary" : "btn-ghost"}"
              style="border-radius:99px"
              @click=${() => { this.billingCycle = "yearly"; }}
            >
              Yearly
              <span style="margin-left:6px;background:#22c55e;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px">Save 20%</span>
            </button>
          </div>
        </div>

        ${this.upgradeError ? html`
          <div class="error-banner" style="margin-bottom:20px">${this.upgradeError}</div>
        ` : ""}
        ${this.upgradeDone ? html`
          <div style="background:var(--ok-subtle);border:1px solid var(--ok);border-radius:8px;padding:12px 16px;margin-bottom:20px;color:var(--ok);font-size:14px">
            ✓ Upgraded to Pro successfully! Your new limits are active immediately.
          </div>
        ` : ""}

        <!-- Plan cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:64px;padding-top:16px">
          ${this.renderPlanCard(
            "free", "Free", "$0", "forever",
            null,
            "For individuals and small teams evaluating the platform.",
            () => {},
            this.currentPlan === "free" ? "Current plan" : "Downgrade to Free",
            this.currentPlan === "free" || !this.tenantId,
          )}
          ${this.renderPlanCard(
            "pro", "Pro", `$${this.proPrice}`, `/ seat / ${this.billingCycle === "yearly" ? "month, billed yearly" : "month"}`,
            "Most popular",
            "For professional teams that need unlimited agents and higher LLM throughput.",
            () => this.handleUpgrade(),
            this.currentPlan === "pro" ? "Current plan" : "Upgrade to Pro",
            this.currentPlan === "pro",
          )}
          ${this.renderPlanCard(
            "enterprise", "Enterprise", "Custom", "pricing",
            null,
            "For large organisations that need SSO, dedicated capacity, and contractual SLAs.",
            () => { window.open("mailto:sales@coderclaw.ai?subject=Enterprise inquiry", "_blank"); },
            "Contact sales",
            false,
          )}
        </div>

        <!-- Feature comparison table -->
        <div style="margin-bottom:64px">
          <h2 style="font-size:20px;font-weight:700;color:var(--text-strong);margin:0 0 24px;text-align:center">
            Full feature comparison
          </h2>
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead>
                <tr>
                  <th style="text-align:left;padding:10px 12px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border)">Feature</th>
                  <th style="text-align:center;padding:10px 12px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border);min-width:90px">Free</th>
                  <th style="text-align:center;padding:10px 12px;color:var(--accent);font-weight:700;border-bottom:2px solid var(--accent);min-width:120px">Pro</th>
                  <th style="text-align:center;padding:10px 12px;color:var(--muted);font-weight:600;border-bottom:2px solid var(--border);min-width:120px">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                ${FEATURES.map((f, i) => html`
                  <tr style="background:${f.highlight ? "var(--surface-2)" : i % 2 === 0 ? "transparent" : "var(--surface)"}">
                    <td style="padding:10px 12px;color:var(--text);border-bottom:1px solid var(--border);${f.highlight ? "font-weight:600" : ""}">${f.label}</td>
                    <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--border)">${this.featureCell(f.free)}</td>
                    <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--border);background:${f.highlight ? "var(--accent-subtle)" : "rgba(99,102,241,.03)"}">${this.featureCell(f.pro)}</td>
                    <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--border)">${this.featureCell(f.enterprise)}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Self-hosted callout -->
        <div style="
          background:linear-gradient(135deg,var(--surface-2),var(--surface));
          border:1px solid var(--border);
          border-radius:12px;
          padding:28px 32px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          flex-wrap:wrap;
          gap:16px;
          margin-bottom:64px;
        ">
          <div>
            <div style="font-size:18px;font-weight:700;color:var(--text-strong);margin-bottom:6px">
              🦞 Self-hosted? It's free forever.
            </div>
            <div style="color:var(--muted);font-size:14px;max-width:520px">
              coderClawLink is MIT-licensed. Run the full platform — portal, API, relay, and database — on your own Cloudflare account or Docker host at zero licensing cost.
            </div>
          </div>
          <a
            href="https://github.com/SeanHogg/coderClawLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
            style="white-space:nowrap"
          >
            View on GitHub →
          </a>
        </div>

        <!-- FAQ -->
        <div style="max-width:720px;margin:0 auto">
          <h2 style="font-size:20px;font-weight:700;color:var(--text-strong);margin:0 0 24px;text-align:center">
            Frequently asked questions
          </h2>
          <div style="display:grid;gap:2px">
            ${FAQS.map((faq, i) => html`
              <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden">
                <button
                  style="
                    width:100%;text-align:left;padding:14px 16px;
                    background:var(--surface);
                    border:none;cursor:pointer;
                    display:flex;justify-content:space-between;align-items:center;
                    font-size:14px;font-weight:600;color:var(--text-strong);
                    gap:12px;
                  "
                  @click=${() => { this.openFaq = this.openFaq === i ? null : i; }}
                >
                  <span>${faq.q}</span>
                  <svg viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;stroke:currentColor;fill:none;stroke-width:2;transition:transform .2s;transform:${this.openFaq === i ? "rotate(180deg)" : "rotate(0)"}">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                ${this.openFaq === i ? html`
                  <div style="padding:0 16px 14px;font-size:13px;color:var(--muted);line-height:1.6;background:var(--surface)">
                    ${faq.a}
                  </div>
                ` : ""}
              </div>
            `)}
          </div>
        </div>

      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-pricing": CclPricing; } }
