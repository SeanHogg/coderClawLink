import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import DOMPurify from "dompurify";

/** Render a markdown string to sanitised Lit HTML. Shared across all chat views. */
export function renderMarkdown(text: string) {
  const raw = marked.parse(text, { gfm: true, breaks: true });
  const htmlString = typeof raw === "string" ? raw : "";
  const clean = DOMPurify.sanitize(htmlString);
  return html`<div class="md-content">${unsafeHTML(clean)}</div>`;
}
