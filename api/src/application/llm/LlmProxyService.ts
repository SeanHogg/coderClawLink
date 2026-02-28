/**
 * coderClawLLM — OpenRouter free-model proxy with automatic 429 failover.
 *
 * Maintains a ranked pool of free OpenRouter models. When the upstream
 * provider returns 429, the request is transparently retried on the next
 * model in the pool.  The caller sees a single, seamless response.
 *
 * The endpoint is OpenAI-compatible:  POST /v1/chat/completions
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
  /** How many 429 retries happened before success. */
  retries: number;
}

// ---------------------------------------------------------------------------
// Cooldown tracker  (in-memory, per-isolate)
// ---------------------------------------------------------------------------

/** model → timestamp when cooldown expires */
const cooldowns = new Map<string, number>();

const COOLDOWN_MS = 60_000; // 60 s cooldown after a 429

function markCooldown(model: string): void {
  cooldowns.set(model, Date.now() + COOLDOWN_MS);
}

function isOnCooldown(model: string): boolean {
  const until = cooldowns.get(model);
  if (!until) return false;
  if (Date.now() >= until) {
    cooldowns.delete(model);
    return false;
  }
  return true;
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
   * On 429, automatically fail over to the next healthy model.
   */
  async complete(
    body: ChatCompletionRequest,
    requestHeaders?: Record<string, string>,
  ): Promise<ProxyResult> {
    // Build ordered candidate list: skip models on cooldown
    const candidates = FREE_MODEL_POOL.filter((m) => !isOnCooldown(m));

    if (candidates.length === 0) {
      // All models on cooldown — just try the first one and let the caller
      // handle the upstream error.
      candidates.push(FREE_MODEL_POOL[0]);
    }

    let lastResponse: Response | undefined;
    let retries = 0;

    for (const model of candidates) {
      const payload = {
        ...body,
        model,
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://coderclaw.ai',
        'X-Title': 'coderClawLLM',
        ...(requestHeaders ?? {}),
      };

      const upstream = await fetch(OPENROUTER_BASE, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      // Success or non-429 error — return as-is
      if (upstream.status !== 429) {
        return { response: upstream, resolvedModel: model, retries };
      }

      // 429 — mark cooldown, try next model
      markCooldown(model);
      lastResponse = upstream;
      retries++;
    }

    // Every candidate returned 429
    return {
      response: lastResponse!,
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
