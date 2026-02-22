/**
 * Crypto utilities using the Web Crypto API (SubtleCrypto).
 *
 * These work natively in Cloudflare Workers without any npm dependencies.
 */

/** SHA-256 hex digest of a string – used to store API keys. */
export async function hashSecret(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Generates a new random API key in the format `clk_<32 hex chars>`. */
export function generateApiKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const hex   = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `clk_${hex}`;
}
