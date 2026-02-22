/** Cloudflare Worker entry point – app.coderclaw.ai
 *
 * Static assets (index.html, app.js, styles.css) are served automatically
 * by the [assets] binding configured in wrangler.toml.
 *
 * This script acts as a fallback: returns 404 for any request that is not
 * a static asset (e.g. /api/* calls that should go to api.coderclaw.ai).
 */
export interface Env {
  ASSETS: Fetcher;
  API_URL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Try to serve a static asset first
    try {
      return await env.ASSETS.fetch(request);
    } catch {
      // Asset not found – return index.html for SPA client-side routing
      const indexUrl = new URL('/', request.url);
      return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
    }
  },
} satisfies ExportedHandler<Env>;
