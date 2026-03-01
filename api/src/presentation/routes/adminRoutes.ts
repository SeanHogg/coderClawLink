/**
 * Superadmin routes — /api/admin/*
 *
 * All routes require a WebJWT with sa: true (enforced by superAdminMiddleware).
 *
 * GET  /api/admin/users                — all platform users + tenant counts
 * GET  /api/admin/tenants              — all tenants + member/claw counts
 * GET  /api/admin/health               — system health (DB ping, model pool, counts)
 * GET  /api/admin/errors               — recent API error log (last 200 entries)
 * POST /api/admin/impersonate          — issue a tenant JWT for any user+tenant pair
 */
import { Hono } from 'hono';
import { sql, desc } from 'drizzle-orm';
import type { HonoEnv } from '../../env';
import { superAdminMiddleware } from '../middleware/superAdminMiddleware';
import { buildDatabase } from '../../infrastructure/database/connection';
import {
  users,
  tenants,
  tenantMembers,
  coderclawInstances,
  apiErrorLog,
  llmUsageLog,
} from '../../infrastructure/database/schema';
import { signJwt } from '../../infrastructure/auth/JwtService';
import { LlmProxyService, FREE_MODEL_POOL, PRO_MODEL_POOL, PREFERRED_POOL_SIZE } from '../../application/llm/LlmProxyService';
import { llmFailoverLog } from '../../infrastructure/database/schema';

export function createAdminRoutes(): Hono<HonoEnv> {
  const router = new Hono<HonoEnv>();

  // All admin routes require superadmin WebJWT
  router.use('*', superAdminMiddleware);

  // -------------------------------------------------------------------------
  // GET /api/admin/users
  // -------------------------------------------------------------------------
  router.get('/users', async (c) => {
    const db = buildDatabase(c.env);

    const rows = await db.execute(sql`
      SELECT
        u.id,
        u.email,
        u.username,
        u.display_name  AS "displayName",
        u.is_superadmin AS "isSuperadmin",
        u.created_at    AS "createdAt",
        COUNT(DISTINCT tm.tenant_id)::int AS "tenantCount"
      FROM users u
      LEFT JOIN tenant_members tm ON tm.user_id = u.id AND tm.is_active = true
      GROUP BY u.id, u.email, u.username, u.display_name, u.is_superadmin, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 500
    `);

    return c.json({ users: rows.rows });
  });

  // -------------------------------------------------------------------------
  // GET /api/admin/tenants
  // -------------------------------------------------------------------------
  router.get('/tenants', async (c) => {
    const db = buildDatabase(c.env);

    const rows = await db.execute(sql`
      SELECT
        t.id,
        t.name,
        t.slug,
        t.status,
        t.plan,
        t.billing_status AS "billingStatus",
        CASE WHEN t.plan = 'pro' AND t.billing_status = 'active' THEN true ELSE false END AS "isPaid",
        CASE WHEN t.plan = 'pro' AND t.billing_status = 'active' THEN 'pro' ELSE 'free' END AS "effectivePlan",
        t.created_at AS "createdAt",
        COUNT(DISTINCT tm.user_id)::int  AS "memberCount",
        COUNT(DISTINCT ci.id)::int       AS "clawCount"
      FROM tenants t
      LEFT JOIN tenant_members tm ON tm.tenant_id = t.id AND tm.is_active = true
      LEFT JOIN coderclaw_instances ci ON ci.tenant_id = t.id
      GROUP BY t.id, t.name, t.slug, t.status, t.plan, t.billing_status, t.created_at
      ORDER BY t.created_at DESC
      LIMIT 500
    `);

    return c.json({ tenants: rows.rows });
  });

  // -------------------------------------------------------------------------
  // GET /api/admin/health
  // -------------------------------------------------------------------------
  router.get('/health', async (c) => {
    const db = buildDatabase(c.env);

    let dbOk = false;
    let dbLatencyMs = 0;
    try {
      const t0 = Date.now();
      await db.execute(sql`SELECT 1`);
      dbLatencyMs = Date.now() - t0;
      dbOk = true;
    } catch { /* dbOk stays false */ }

    // Platform counts
    const [counts] = (await db.execute(sql`
      SELECT
        (SELECT COUNT(*)::int FROM users)                   AS "userCount",
        (SELECT COUNT(*)::int FROM tenants)                 AS "tenantCount",
        (SELECT COUNT(*)::int FROM coderclaw_instances)     AS "clawCount",
        (SELECT COUNT(*)::int FROM executions)              AS "executionCount",
        (SELECT COUNT(*)::int FROM api_error_log)           AS "errorCount",
        (SELECT COUNT(*)::int FROM tenants WHERE plan = 'pro' AND billing_status = 'active') AS "paidTenantCount"
    `)).rows as Array<{
      userCount: number; tenantCount: number; clawCount: number;
      executionCount: number; errorCount: number; paidTenantCount: number;
    }>;

    // LLM model pool — include both Free + Pro pools, with live cooldown state when keys are available
    const freeApiKey = c.env.OPENROUTER_API_KEY;
    const proApiKey = c.env.OPENROUTER_API_KEY_PRO;

    const freeModelPool = freeApiKey
      ? new LlmProxyService(freeApiKey, {
          modelPool: FREE_MODEL_POOL,
          preferredPoolSize: Math.min(PREFERRED_POOL_SIZE, FREE_MODEL_POOL.length),
          productName: 'coderClawLLM',
        }).status()
      : FREE_MODEL_POOL.map((m, i) => ({ model: m, preferred: i < PREFERRED_POOL_SIZE, available: true }));

    const proModelPool = proApiKey
      ? new LlmProxyService(proApiKey, {
          modelPool: PRO_MODEL_POOL,
          preferredPoolSize: Math.min(PREFERRED_POOL_SIZE, PRO_MODEL_POOL.length),
          productName: 'coderClawLLMPro',
        }).status()
      : PRO_MODEL_POOL.map((m, i) => ({ model: m, preferred: i < PREFERRED_POOL_SIZE, available: true }));

    const modelPool = [...freeModelPool, ...proModelPool];

    return c.json({
      status:       dbOk ? 'ok' : 'degraded',
      db:           { ok: dbOk, latencyMs: dbLatencyMs },
      platform:     counts,
      llm:          { pool: modelPool.length, models: modelPool },
      timestamp:    new Date().toISOString(),
    });
  });

  // -------------------------------------------------------------------------
  // GET /api/admin/errors
  // -------------------------------------------------------------------------
  router.get('/errors', async (c) => {
    const db = buildDatabase(c.env);

    const rows = await db
      .select()
      .from(apiErrorLog)
      .orderBy(desc(apiErrorLog.createdAt))
      .limit(200);

    return c.json({ errors: rows });
  });

  // -------------------------------------------------------------------------
  // POST /api/admin/impersonate   { userId, tenantId }
  // Issue a 1-hour tenant-scoped JWT for any user+tenant pair.
  // -------------------------------------------------------------------------
  router.post('/impersonate', async (c) => {
    const { userId, tenantId } = await c.req.json<{ userId: string; tenantId: number }>();
    if (!userId || !tenantId) {
      return c.json({ error: 'userId and tenantId are required' }, 400);
    }

    const db = buildDatabase(c.env);

    // Verify the user exists
    const [userRow] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(sql`${users.id} = ${userId}`)
      .limit(1);
    if (!userRow) return c.json({ error: 'User not found' }, 404);

    // Verify the tenant exists and get the user's role
    const [memberRow] = await db
      .select({ role: tenantMembers.role })
      .from(tenantMembers)
      .where(sql`${tenantMembers.userId} = ${userId} AND ${tenantMembers.tenantId} = ${tenantId} AND ${tenantMembers.isActive} = true`)
      .limit(1);

    // Use the user's actual role if a member, otherwise default to 'viewer'
    const role = memberRow?.role ?? 'viewer';

    const token = await signJwt(
      { sub: userId, tid: tenantId, role: role as Parameters<typeof signJwt>[0]['role'] },
      c.env.JWT_SECRET,
      3600,
    );

    return c.json({
      token,
      expiresIn:    3600,
      userId:       userRow.id,
      email:        userRow.email,
      tenantId,
      role,
    });
  });

  // -------------------------------------------------------------------------
  // GET /api/admin/llm-usage?days=30
  // Per-model aggregates + daily time series
  // -------------------------------------------------------------------------
  router.get('/llm-usage', async (c) => {
    const days = Math.min(Number(c.req.query('days') ?? '30'), 90);
    const db = buildDatabase(c.env);

    // Per-model totals
    const byModel = await db.execute(sql`
      SELECT
        model,
        COUNT(*)::int                    AS requests,
        SUM(prompt_tokens)::bigint       AS prompt_tokens,
        SUM(completion_tokens)::bigint   AS completion_tokens,
        SUM(total_tokens)::bigint        AS total_tokens,
        SUM(retries)::int                AS retries,
        COUNT(CASE WHEN streamed THEN 1 END)::int AS streamed_requests
      FROM llm_usage_log
      WHERE created_at >= NOW() - (${days} || ' days')::interval
      GROUP BY model
      ORDER BY requests DESC
    `);

    // Daily time series (requests + tokens)
    const daily = await db.execute(sql`
      SELECT
        DATE_TRUNC('day', created_at)::date::text AS day,
        COUNT(*)::int                             AS requests,
        SUM(total_tokens)::bigint                 AS total_tokens
      FROM llm_usage_log
      WHERE created_at >= NOW() - (${days} || ' days')::interval
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY DATE_TRUNC('day', created_at)
    `);

    // Platform totals (all time)
    const [totals] = (await db.execute(sql`
      SELECT
        COUNT(*)::int          AS total_requests,
        SUM(total_tokens)::bigint AS total_tokens,
        SUM(prompt_tokens)::bigint AS total_prompt_tokens,
        SUM(completion_tokens)::bigint AS total_completion_tokens,
        COUNT(DISTINCT model)::int AS model_count
      FROM llm_usage_log
    `)).rows as Array<{
      total_requests: number; total_tokens: bigint;
      total_prompt_tokens: bigint; total_completion_tokens: bigint;
      model_count: number;
    }>;

    // Per-model failover counts (errors that triggered a fallback)
    const failovers = await db.execute(sql`
      SELECT
        model,
        error_code  AS "errorCode",
        COUNT(*)::int AS count
      FROM llm_failover_log
      WHERE created_at >= NOW() - (${days} || ' days')::interval
      GROUP BY model, error_code
      ORDER BY count DESC
    `);

    return c.json({
      days,
      totals: {
        requests:          Number(totals?.total_requests          ?? 0),
        totalTokens:       Number(totals?.total_tokens            ?? 0),
        promptTokens:      Number(totals?.total_prompt_tokens     ?? 0),
        completionTokens:  Number(totals?.total_completion_tokens ?? 0),
        modelCount:        Number(totals?.model_count             ?? 0),
      },
      byModel:    byModel.rows,
      daily:      daily.rows,
      failovers:  failovers.rows,
    });
  });

  return router;
}
