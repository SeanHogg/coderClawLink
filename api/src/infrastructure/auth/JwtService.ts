import { TenantRole } from '../../domain/shared/types';

// ---------------------------------------------------------------------------
// Payload
// ---------------------------------------------------------------------------

export interface JwtPayload {
  sub:  string;       // userId
  tid:  number;       // tenantId
  role: TenantRole;
  iat:  number;
  exp:  number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function b64urlEncode(data: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(data)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function strToB64url(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function b64urlToStr(s: string): string {
  return atob(s.replace(/-/g, '+').replace(/_/g, '/'));
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Signs a JWT using HMAC-SHA-256 via the Web Crypto API.
 * Compatible with Cloudflare Workers (no Node.js required).
 */
export async function signJwt(
  payload: Omit<JwtPayload, 'iat' | 'exp'>,
  secret: string,
  expiresInSeconds = 3600,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const full: JwtPayload = { ...payload, iat: now, exp: now + expiresInSeconds };

  const header = strToB64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = strToB64url(JSON.stringify(full));
  const input  = `${header}.${body}`;

  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(input));

  return `${input}.${b64urlEncode(sig)}`;
}

/**
 * Verifies and decodes a JWT.
 * Throws if the signature is invalid or the token is expired.
 */
export async function verifyJwt(token: string, secret: string): Promise<JwtPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed token');

  const header = parts[0]!;
  const body   = parts[1]!;
  const sig    = parts[2]!;
  const input = `${header}.${body}`;

  const key = await importKey(secret);
  const sigBytes = Uint8Array.from(
    atob(sig.replace(/-/g, '+').replace(/_/g, '/')),
    (c) => c.charCodeAt(0),
  );
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes,
    new TextEncoder().encode(input),
  );
  if (!valid) throw new Error('Invalid token signature');

  const payload: JwtPayload = JSON.parse(b64urlToStr(body));
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');

  return payload;
}

// ---------------------------------------------------------------------------
// Web / Marketplace JWT  (no tenant / role required)
// ---------------------------------------------------------------------------

export interface WebJwtPayload {
  sub:      string;   // userId
  email:    string;
  username: string;
  iat:      number;
  exp:      number;
}

export async function signWebJwt(
  payload:          Omit<WebJwtPayload, 'iat' | 'exp'>,
  secret:           string,
  expiresInSeconds: number = 86_400, // 24 hours for web sessions
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const full: WebJwtPayload = { ...payload, iat: now, exp: now + expiresInSeconds };

  const header = strToB64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = strToB64url(JSON.stringify(full));
  const input  = `${header}.${body}`;

  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(input));

  return `${input}.${b64urlEncode(sig)}`;
}

export async function verifyWebJwt(token: string, secret: string): Promise<WebJwtPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed token');

  const [header, body, sig] = parts as [string, string, string];
  const input = `${header}.${body}`;

  const key = await importKey(secret);
  const sigBytes = Uint8Array.from(
    atob(sig.replace(/-/g, '+').replace(/_/g, '/')),
    (c) => c.charCodeAt(0),
  );
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(input));
  if (!valid) throw new Error('Invalid token signature');

  const payload: WebJwtPayload = JSON.parse(b64urlToStr(body));
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');

  return payload;
}
