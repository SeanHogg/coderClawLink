/**
 * coderClawLLM — OpenRouter free-model proxy with automatic failover.
 *
 * Handles error signals from OpenRouter:
 *   1. HTTP 4xx/5xx status (except 400/401 which are client errors)
 *   2. HTTP 200 with {"error":{...}} in the body
 *      (OpenRouter sends this for upstream provider errors — rate limits, spend
 *       limits, capacity issues, etc.)
 *   3. First SSE chunk contains an error object (streaming variant of #2)
 *
 * On any of these signals the model is put on a 60-second cooldown and the next
 * healthy model in the pool is tried transparently.
 *
 * Requests are distributed round-robin across the pool so no single model is
 * hammered first on every call.
 */

// ---------------------------------------------------------------------------
// Free model pool — ordered by quality/ctx preference (best first)
// ---------------------------------------------------------------------------

export const FREE_MODEL_POOL = [
  'qwen/qwen3-coder:free',                                   // 262k ctx
  'qwen/qwen3-next-80b-a3b-instruct:free',                   // 262k ctx
  'stepfun/step-3.5-flash:free',                              // 256k ctx
  'nvidia/nemotron-3-nano-30b-a3b:free',                      // 256k ctx
  'google/gemma-3-27b-it:free',                               // 131k ctx
  'meta-llama/llama-3.3-70b-instruct:free',                   // 128k ctx
  'mistralai/mistral-small-3.1-24b-instruct:free',            // 128k ctx
  'nousresearch/hermes-3-llama-3.1-405b:free',                // 131k ctx
  'arcee-ai/trinity-large-preview:free',                      // 131k ctx
  'upstage/solar-pro-3:free',                                 // 128k ctx
  'nvidia/nemotron-nano-9b-v2:free',                          // 128k ctx
  'google/gemma-3-12b-it:free',                               // 32k ctx
] as const;

export type FreeModel = (typeof FREE_MODEL_POOL)[number];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
}

export interface ChatCompletionRequest {
  /** Ignored when proxied — we pick the model from the pool. */
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  /** Any extra passthrough params for OpenRouter. */
  [key: string]: unknown;
}

export interface ProxyResult {
  /** The raw Response from OpenRouter (may be streamed). */
  response: Response;
  /** Which model actually served the request. */
  resolvedModel: string;
  /** How many failovers happened before success. */
  retries: number;
}

// ---------------------------------------------------------------------------
// Cooldown tracker  (in-memory, per-isolate)
// ---------------------------------------------------------------------------

/** model → timestamp when cooldown expires */
const cooldowns = new Map<string, number>();

const COOLDOWN_MS = 60_000; // 60 s cooldown after any provider error

function markCooldown(model: string): void {
  cooldowns.set(model, Date.now() + COOLDOWN_MS);
}

function isOnCooldown(model: string): boolean {
  const until = cooldowns.get(model);
  if (!until) return false;
  if (Date.now() >= until) { cooldowns.delete(model); return false; }
  return true;
}

// ---------------------------------------------------------------------------
// Round-robin cursor  (in-memory, per-isolate)
// ---------------------------------------------------------------------------

/** Advances each request so the starting model rotates evenly across the pool. */
let requestCursor = 0;

// ---------------------------------------------------------------------------
// Error detection helpers
// ---------------------------------------------------------------------------

/**
 * HTTP status codes that warrant failover to the next model.
 * - 400 Bad Request: client error — won't improve by switching models.
 * - 401 Unauthorized: API key invalid — switching models won't help.
 * - Everything else 4xx/5xx: provider/capacity error → try next model.
 */
function isFailoverStatus(status: number): boolean {
  return status >= 400 && status !== 400 && status !== 401;
}

/** Detect any provider error in a parsed JSON body. */
function isBodyError(json: Record<string, unknown>): boolean {
  return 'error' in json && json['error'] != null;
}

/**
 * Detect a provider error in a raw SSE text chunk.
 * Tries to parse the first `data:` line as JSON; falls back to text heuristics.
 */
function isChunkError(text: string): boolean {
  if (!text.includes('"error"')) return false;
  // Try to parse the first SSE data line
  const dataLine = text.split('\n').find((l) => l.startsWith('data: '));
  if (!dataLine) return true; // has "error" substring but no parseable line → be safe
  try {
    const parsed = JSON.parse(dataLine.slice(6)) as Record<string, unknown>;
    return 'error' in parsed && parsed['error'] != null;
  } catch {
    return true; // unparseable chunk that mentions "error" → failover
  }
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';

export class LlmProxyService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Forward a chat-completion request through the free model pool.
   * Automatically fails over on any HTTP error status OR embedded error body.
   * Requests are distributed round-robin so all models share traffic evenly.
   */
  async complete(
    body: ChatCompletionRequest,
    requestHeaders?: Record<string, string>,
  ): Promise<ProxyResult> {
    const available = FREE_MODEL_POOL.filter((m) => !isOnCooldown(m));
    const pool = available.length > 0 ? available : [...FREE_MODEL_POOL];

    // Rotate the starting position for round-robin distribution
    const start = requestCursor % pool.length;
    const candidates = [...pool.slice(start), ...pool.slice(0, start)];
    requestCursor++;

    let lastResponse: Response | undefined;
    let retries = 0;

    for (const model of candidates) {
      const upstream = await fetch(OPENROUTER_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://coderclaw.ai',
          'X-Title': 'coderClawLLM',
          ...(requestHeaders ?? {}),
        },
        body: JSON.stringify({ ...body, model }),
      });

      // ── HTTP error status (402 spend limit, 429 rate limit, 5xx, etc.) ───────
      if (isFailoverStatus(upstream.status)) {
        markCooldown(model);
        lastResponse = upstream;
        retries++;
        continue;
      }

      // ── Streaming: peek first chunk for embedded error ────────────────────
      if (body.stream && upstream.body) {
        const [peekStream, passStream] = upstream.body.tee();
        const reader = peekStream.getReader();
        const { value: firstChunk } = await reader.read();
        reader.cancel().catch(() => { /* ignore */ });

        const firstText = firstChunk ? new TextDecoder().decode(firstChunk) : '';

        if (isChunkError(firstText)) {
          await passStream.cancel().catch(() => { /* ignore */ });
          markCooldown(model);
          retries++;
          continue;
        }

        // Good stream — pass through
        return {
          response: new Response(passStream, { status: upstream.status, headers: upstream.headers }),
          resolvedModel: model,
          retries,
        };
      }

      // ── Non-streaming: read body and check for embedded error ─────────────
      const json = await upstream.json() as Record<string, unknown>;

      if (isBodyError(json)) {
        markCooldown(model);
        retries++;
        continue;
      }

      // Good response — reconstruct so the route handler can .json() it
      return {
        response: new Response(JSON.stringify(json), {
          status: upstream.status,
          headers: upstream.headers,
        }),
        resolvedModel: model,
        retries,
      };
    }

    // All candidates exhausted — return a clean error
    const exhaustedBody = JSON.stringify({
      error: {
        message: 'All free models are temporarily unavailable. Please retry in a moment.',
        code: 429,
        type: 'rate_limit_error',
      },
    });
    return {
      response: lastResponse ?? new Response(exhaustedBody, {
        status: 429,
        headers: { 'content-type': 'application/json' },
      }),
      resolvedModel: candidates[candidates.length - 1] ?? FREE_MODEL_POOL[0],
      retries,
    };
  }

  /** Return the current model pool with cooldown status. */
  status(): Array<{ model: string; available: boolean; cooldownUntil?: number }> {
    return FREE_MODEL_POOL.map((m) => {
      const until = cooldowns.get(m);
      const available = !until || Date.now() >= until;
      return { model: m, available, ...(until && !available ? { cooldownUntil: until } : {}) };
    });
  }
}
