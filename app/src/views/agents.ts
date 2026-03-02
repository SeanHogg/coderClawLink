/**
 * Tenant-level Agents view.
 * Agents are tenant-scoped — this is a full-page view that reuses the same
 * <ccl-claw-agents> component (which already queries /api/agents without
 * a claw filter).
 */
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./claw/agents.js";

@customElement("ccl-agents")
export class CclAgentsView extends LitElement {
  override createRenderRoot() { return this; }

  @property() tenantId = "";

  override render() {
    return html`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:18px;font-weight:600;color:var(--text-strong)">Agents</div>
            <div style="font-size:13px;color:var(--muted);margin-top:2px">AI agents available across all claws in this workspace</div>
          </div>
        </div>
        <ccl-claw-agents></ccl-claw-agents>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { "ccl-agents": CclAgentsView; } }
