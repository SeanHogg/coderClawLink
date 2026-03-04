-- Migration: 0018_execution_log_events
-- Adds structured per-execution timeline events so the portal can render a
-- visual debugging timeline instead of just raw terminal output.

DO $$ BEGIN
  CREATE TYPE execution_log_event_type AS ENUM (
    'agent_start',
    'agent_end',
    'tool_call',
    'tool_result',
    'subagent_start',
    'subagent_end',
    'message',
    'checkpoint',
    'error'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS execution_log_events (
  id             serial PRIMARY KEY,
  execution_id   int    NOT NULL REFERENCES executions(id) ON DELETE CASCADE,
  tenant_id      int    NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  claw_id        int    REFERENCES coderclaw_instances(id) ON DELETE SET NULL,
  event_type     execution_log_event_type NOT NULL,
  agent_role     varchar(255),
  label          varchar(512),
  detail         text,
  parent_event_id int,
  duration_ms    int,
  ts             timestamptz NOT NULL DEFAULT now(),
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS execution_log_events_execution_idx ON execution_log_events(execution_id, ts);
CREATE INDEX IF NOT EXISTS execution_log_events_tenant_idx    ON execution_log_events(tenant_id, ts);
