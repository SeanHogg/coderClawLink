/**
 * coderClawLLM routes — OpenAI-compatible LLM proxy.
 *
 * POST  /v1/chat/completions   – proxied chat completion (429 failover)
 * GET   /v1/models             – list the free model pool + status
 * GET   /v1/health             – health check
 */
import { Hono } from 'hono';
import type { HonoEnv } from '../../env';
import {
  LlmProxyService,
  FREE_MODEL_POOL,
  type ChatCompletionRequest,
} from '../../application/llm/LlmProxyService';

export function createLlmRoutes(): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();

  // -----------------------------------------------------------------------
  // POST /v1/chat/completions
  // -----------------------------------------------------------------------
  router.post('/v1/chat/completions', async (c) => {
    const apiKey = c.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'LLM proxy not configured (missing OPENROUTER_API_KEY)' }, 503);
    }

    const body = await c.req.json<ChatCompletionRequest>();
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return c.json({ error: 'messages array is required' }, 400);
    }

    const service = new LlmProxyService(apiKey);
    const result = await service.complete(body);

    // Clone upstream headers we care about
    const upstreamHeaders = new Headers();
    const contentType = result.response.headers.get('content-type');
    if (contentType) upstreamHeaders.set('content-type', contentType);
    // Expose which model actually served + retry count
    upstreamHeaders.set('x-coderclaw-model', result.resolvedModel);
    upstreamHeaders.set('x-coderclaw-retries', String(result.retries));

    // Stream passthrough: if the upstream is SSE, pipe it through
    if (body.stream && result.response.body) {
      upstreamHeaders.set('cache-control', 'no-cache');
      upstreamHeaders.set('connection', 'keep-alive');
      return new Response(result.response.body, {
        status: result.response.status,
        headers: upstreamHeaders,
      });
    }

    // Non-streaming: parse, augment with metadata, return
    const upstream = await result.response.json() as Record<string, unknown>;
    return c.json(
      {
        ...upstream,
        // Inject proxy metadata under a non-colliding key
        _coderclaw: {
          resolvedModel: result.resolvedModel,
          retries: result.retries,
          pool: FREE_MODEL_POOL.length,
        },
      },
      result.response.status as 200,
    );
  });

  // -----------------------------------------------------------------------
  // GET /v1/models — pool status
  // -----------------------------------------------------------------------
  router.get('/v1/models', async (c) => {
    const apiKey = c.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      // Still return the pool info, just flag unconfigured
      return c.json({ configured: false, models: FREE_MODEL_POOL });
    }
    const service = new LlmProxyService(apiKey);
    return c.json({
      configured: true,
      object: 'list',
      data: service.status(),
    });
  });

  // -----------------------------------------------------------------------
  // GET /v1/health
  // -----------------------------------------------------------------------
  router.get('/v1/health', (c) =>
    c.json({ status: 'ok', service: 'coderClawLLM', pool: FREE_MODEL_POOL.length }),
  );

  return router;
}
