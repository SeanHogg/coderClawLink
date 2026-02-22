/* CoderClawLink — App  */
const API = window.API_URL ?? 'https://api.coderclaw.ai';

// ── State ────────────────────────────────────────────────────────────────────
let webToken    = localStorage.getItem('ccl-wtoken') ?? null;  // WebJWT (no tenant)
let tenantToken = localStorage.getItem('ccl-token')  ?? null;  // tenant-scoped JWT
let tenantId    = Number(localStorage.getItem('ccl-tid')   ?? 0);
let tenantName  = localStorage.getItem('ccl-tname')  ?? '';
let tenantSlug  = localStorage.getItem('ccl-tslug')  ?? '';
let userEmail   = localStorage.getItem('ccl-email')  ?? '';
let userId      = localStorage.getItem('ccl-uid')    ?? '';
let projects    = [];
let clawsList   = [];

// ── Helpers ──────────────────────────────────────────────────────────────────
const $  = (id)       => document.getElementById(id);
const q  = (sel, ctx = document) => ctx.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
  } catch { return null; }
}

function isTokenExpired(token) {
  const p = parseJwt(token);
  return !p || (p.exp && p.exp * 1000 < Date.now());
}

// ── API call ─────────────────────────────────────────────────────────────────
async function api(method, path, body, { useWebToken = false } = {}) {
  const tok = useWebToken ? webToken : tenantToken;
  const headers = { 'Content-Type': 'application/json' };
  if (tok) headers['Authorization'] = `Bearer ${tok}`;
  const res = await fetch(`${API}${path}`, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    if (!useWebToken) { clearTenantSession(); showPicker(); }
    else              { logout(); }
    return null;
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.error ?? err.message ?? res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const el = $('toast');
  el.textContent = (type === 'success' ? '✓ ' : '✕ ') + msg;
  el.className = `toast ${type}`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add('hidden'), 3500);
}

// ── Theme ─────────────────────────────────────────────────────────────────────
const themeToggle = $('theme-toggle');
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeToggle.textContent = t === 'dark' ? '☀' : '☾';
  localStorage.setItem('cc-theme', t);
}
themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});
applyTheme(localStorage.getItem('cc-theme') ?? 'dark');

// ── Password visibility toggle ────────────────────────────────────────────────
document.querySelectorAll('.pw-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = $(btn.dataset.pw);
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    btn.textContent = show ? '🙈' : '👁';
    btn.classList.toggle('visible', show);
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

// ── Screen management ─────────────────────────────────────────────────────────
function showAuth() {
  $('auth-screen').style.display   = '';
  $('picker-screen').style.display = 'none';
  $('app-screen').style.display    = 'none';
  $('nav-tabs').style.display      = 'none';
  $('user-chip').style.display     = 'none';
  $('btn-logout').style.display    = 'none';
}

function showPicker() {
  $('auth-screen').style.display   = 'none';
  $('picker-screen').style.display = '';
  $('app-screen').style.display    = 'none';
  $('nav-tabs').style.display      = 'none';
  $('user-chip').style.display     = 'none';
  $('btn-logout').style.display    = 'none';
  loadPickerTenants();
}

function showApp() {
  $('auth-screen').style.display   = 'none';
  $('picker-screen').style.display = 'none';
  $('app-screen').style.display    = '';
  $('nav-tabs').style.display      = '';
  $('user-chip').style.display     = '';
  $('btn-logout').style.display    = '';
  $('user-label').textContent      = tenantName ? `${userEmail} · ${tenantName}` : userEmail;
  // Push slug to URL without reload
  const slug = tenantSlug || tenantId;
  if (slug) history.replaceState({}, '', `/${slug}`);
  loadView('projects');
}

// ── Session helpers ───────────────────────────────────────────────────────────
function clearTenantSession() {
  tenantToken = null; tenantId = 0; tenantName = ''; tenantSlug = '';
  localStorage.removeItem('ccl-token');
  localStorage.removeItem('ccl-tid');
  localStorage.removeItem('ccl-tname');
  localStorage.removeItem('ccl-tslug');
}

function logout() {
  webToken = null; userEmail = ''; userId = '';
  localStorage.removeItem('ccl-wtoken');
  localStorage.removeItem('ccl-email');
  localStorage.removeItem('ccl-uid');
  clearTenantSession();
  history.replaceState({}, '', '/');
  showAuth();
}

$('btn-logout').addEventListener('click', logout);
$('btn-picker-logout').addEventListener('click', logout);

// ── Auth tabs ─────────────────────────────────────────────────────────────────
document.querySelectorAll('[data-auth-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-auth-tab]').forEach(b => b.classList.toggle('active', b === btn));
    const tab = btn.dataset.authTab;
    $('form-login').classList.toggle('active', tab === 'login');
    $('form-register').classList.toggle('active', tab === 'register');
  });
});

// ── Register ──────────────────────────────────────────────────────────────────
$('form-register').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = $('reg-email').value.trim();
  const username = $('reg-username').value.trim();
  const password = $('reg-password').value;
  try {
    const data = await api('POST', '/api/auth/web/register', { email, username, password });
    if (!data) return;
    webToken  = data.token;
    userEmail = data.user.email;
    userId    = data.user.id;
    localStorage.setItem('ccl-wtoken', webToken);
    localStorage.setItem('ccl-email',  userEmail);
    localStorage.setItem('ccl-uid',    userId);
    toast('Account created! Now set up your first workspace.');
    showPicker();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Login ─────────────────────────────────────────────────────────────────────
$('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = $('login-email').value.trim();
  const password = $('login-password').value;
  try {
    const data = await api('POST', '/api/auth/web/login', { email, password });
    if (!data) return;
    webToken  = data.token;
    userEmail = data.user.email;
    userId    = data.user.id;
    localStorage.setItem('ccl-wtoken', webToken);
    localStorage.setItem('ccl-email',  userEmail);
    localStorage.setItem('ccl-uid',    userId);
    showPicker();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Tenant picker ─────────────────────────────────────────────────────────────
async function loadPickerTenants() {
  const list = $('picker-list');
  list.innerHTML = `<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', '/api/tenants/mine', null, { useWebToken: true });
    const tenants = data?.tenants ?? [];

    // Check URL slug for pre-selection
    const urlSlug = location.pathname.replace(/^\//, '').split('/')[0];

    if (!tenants.length) {
      list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:13px">You have no workspaces yet. Create one below.</p>`;
      $('btn-show-create-tenant').click();
      return;
    }

    list.innerHTML = tenants.map(t => `
      <button class="tenant-card" style="cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface-secondary,#1a1f2e);border:1px solid var(--border,#2a2f42);border-radius:12px;width:100%;text-align:left" data-tid="${t.id}" data-tname="${esc(t.name)}" data-tslug="${esc(t.slug)}" data-trole="${esc(t.role)}">
        <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#0ff2,#7c3aed44);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#0ff;flex-shrink:0">${esc(t.name[0]).toUpperCase()}</div>
        <div>
          <div style="font-weight:600;font-size:15px">${esc(t.name)}</div>
          <div style="font-size:12px;color:var(--text-muted)">${esc(t.slug)} · ${esc(t.role)}</div>
        </div>
      </button>`).join('');

    list.querySelectorAll('[data-tid]').forEach(btn => {
      // Auto-select if URL slug matches
      if (urlSlug && btn.dataset.tslug === urlSlug) selectTenant(btn.dataset);
      btn.addEventListener('click', () => selectTenant(btn.dataset));
    });
  } catch (err) {
    list.innerHTML = `<div style="color:var(--danger,#f55);font-size:13px;padding:8px">Error: ${esc(err.message)}</div>`;
  }
}

async function selectTenant(ds) {
  try {
    const data = await api('POST', '/api/auth/tenant-token', { tenantId: Number(ds.tid) }, { useWebToken: true });
    if (!data) return;
    tenantToken = data.token;
    tenantId    = Number(ds.tid);
    tenantName  = ds.tname;
    tenantSlug  = ds.tslug;
    localStorage.setItem('ccl-token',  tenantToken);
    localStorage.setItem('ccl-tid',    String(tenantId));
    localStorage.setItem('ccl-tname',  tenantName);
    localStorage.setItem('ccl-tslug',  tenantSlug);
    showApp();
  } catch (err) { toast(err.message, 'error'); }
}

$('btn-show-create-tenant').addEventListener('click', () => {
  $('form-picker-create').style.display = '';
  $('btn-show-create-tenant').style.display = 'none';
});
$('btn-cancel-create-tenant').addEventListener('click', () => {
  $('form-picker-create').style.display = 'none';
  $('btn-show-create-tenant').style.display = '';
});
$('form-picker-create').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('picker-tenant-name').value.trim();
  try {
    const t = await api('POST', '/api/tenants/create', { name }, { useWebToken: true });
    if (!t) return;
    toast(`Workspace "${t.name}" created`);
    $('picker-tenant-name').value = '';
    $('form-picker-create').style.display = 'none';
    $('btn-show-create-tenant').style.display = '';
    // Auto-select the new tenant
    await selectTenant({ tid: String(t.id), tname: t.name, tslug: t.slug });
  } catch (err) { toast(err.message, 'error'); }
});

$('btn-switch-workspace').addEventListener('click', () => {
  clearTenantSession();
  showPicker();
});

// ── Nav ───────────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b === btn));
    loadView(btn.dataset.view);
  });
});

function loadView(name) {
  document.querySelectorAll('.view-panel').forEach(p => p.style.display = 'none');
  $(`view-${name}`).style.display = '';
  const tab = document.querySelector(`.nav-tab[data-view="${name}"]`);
  if (tab) document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b === tab));
  if (name === 'projects') loadProjects();
  if (name === 'tasks')    loadTasks();
  if (name === 'claws')    loadClaws();
  if (name === 'skills')   loadSkills();
  if (name === 'agents')   loadAgents();
  if (name === 'tenants')  loadWorkspace();
}

// ── Modal helpers ─────────────────────────────────────────────────────────────
function openModal(id)  { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});

// ── Projects ──────────────────────────────────────────────────────────────────
async function loadProjects() {
  const grid = $('projects-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', '/api/projects');
    projects = data?.projects ?? [];
    syncProjectDropdowns();
    if (!projects.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">📂</div><div class="empty-title">No projects yet</div><div class="empty-desc">Create your first project to get started.</div></div>`;
      return;
    }
    grid.innerHTML = projects.map(p => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${esc(p.name)}</span>
          <span class="card-key">${esc(p.key)}</span>
        </div>
        ${p.description ? `<div class="card-desc">${esc(p.description)}</div>` : ''}
        <div class="card-footer">
          <span class="card-meta">#${p.id}</span>
          <button class="btn btn-danger btn-sm" data-del-project="${p.id}">Delete</button>
        </div>
      </div>`).join('');
    grid.querySelectorAll('[data-del-project]').forEach(btn => {
      btn.addEventListener('click', () => deleteProject(btn.dataset.delProject));
    });
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

function syncProjectDropdowns() {
  const opts = `<option value="">All Projects</option>` + projects.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
  $('task-project-filter').innerHTML = opts;
  $('inp-task-proj').innerHTML = projects.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
}

$('btn-create-project').addEventListener('click', () => openModal('modal-create-project'));
$('form-create-project').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('POST', '/api/projects', {
      key: fd.get('key'), name: fd.get('name'),
      description: fd.get('description') || undefined,
      githubRepoUrl: fd.get('githubRepoUrl') || undefined,
      tenantId,
    });
    closeModal('modal-create-project'); e.target.reset();
    toast('Project created'); loadProjects();
  } catch (err) { toast(err.message, 'error'); }
});

async function deleteProject(id) {
  if (!confirm('Delete this project and all its tasks?')) return;
  try { await api('DELETE', `/api/projects/${id}`); toast('Project deleted'); loadProjects(); }
  catch (err) { toast(err.message, 'error'); }
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
async function loadTasks() {
  const projectId = $('task-project-filter').value;
  const path = projectId ? `/api/tasks?project_id=${projectId}` : '/api/tasks';
  const cols = { todo: [], in_progress: [], in_review: [], done: [] };
  ['todo','in_progress','in_review','done'].forEach(s => {
    $(`col-${s}`).innerHTML = `<div class="loading-row"><span class="spinner"></span></div>`;
    $(`count-${s}`).textContent = '…';
  });
  try {
    const data = await api('GET', path);
    const tasks = data?.tasks ?? [];
    tasks.forEach(t => { if (cols[t.status]) cols[t.status].push(t); });
    ['todo','in_progress','in_review','done'].forEach(s => {
      $(`count-${s}`).textContent = cols[s].length;
      $(`col-${s}`).innerHTML = cols[s].length
        ? cols[s].map(t => `
          <div class="task-card">
            <div class="task-card-title">${esc(t.title)}</div>
            <div class="task-card-meta">
              <span class="badge badge-${t.priority ?? 'medium'}">${t.priority ?? 'medium'}</span>
            </div>
          </div>`).join('')
        : `<div style="padding:16px;text-align:center;font-size:13px;color:var(--text-muted)">Empty</div>`;
    });
  } catch (err) { toast(err.message, 'error'); }
}

$('task-project-filter').addEventListener('change', loadTasks);
$('btn-create-task').addEventListener('click', () => {
  if (!projects.length) { toast('Create a project first', 'error'); return; }
  openModal('modal-create-task');
});
$('form-create-task').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('POST', '/api/tasks', {
      projectId: Number(fd.get('projectId')),
      title: fd.get('title'),
      description: fd.get('description') || undefined,
      priority: fd.get('priority'),
    });
    closeModal('modal-create-task'); e.target.reset();
    toast('Task created'); loadTasks();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Claws ─────────────────────────────────────────────────────────────────────
async function loadClaws() {
  const grid = $('claws-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', '/api/claws');
    clawsList = data?.claws ?? [];
    if (!clawsList.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🤖</div><div class="empty-title">No claws registered</div><div class="empty-desc">Register your first CoderClaw to start building your mesh.</div></div>`;
      return;
    }
    grid.innerHTML = clawsList.map(c => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${esc(c.name)}</span>
          <span class="badge ${c.status === 'active' ? 'badge-done' : 'badge-todo'}">${esc(c.status)}</span>
        </div>
        <div class="card-desc" style="font-size:12px;margin-top:4px">slug: ${esc(c.slug)}</div>
        <div class="card-footer">
          <span class="card-meta">${c.lastSeenAt ? 'Last seen ' + new Date(c.lastSeenAt).toLocaleDateString() : 'Never connected'}</span>
          <button class="btn btn-danger btn-sm" data-del-claw="${c.id}">Remove</button>
        </div>
      </div>`).join('');
    grid.querySelectorAll('[data-del-claw]').forEach(btn => {
      btn.addEventListener('click', () => deleteClaw(btn.dataset.delClaw));
    });
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

$('btn-register-claw').addEventListener('click', () => openModal('modal-register-claw'));
$('form-register-claw').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    const data = await api('POST', '/api/claws', { name: fd.get('name') });
    closeModal('modal-register-claw'); e.target.reset();
    // Show one-time key banner
    $('claw-key-val').textContent = data.apiKey;
    $('claw-key-banner').style.display = '';
    toast('Claw registered — save the API key!');
    loadClaws();
  } catch (err) { toast(err.message, 'error'); }
});
$('btn-dismiss-key').addEventListener('click', () => { $('claw-key-banner').style.display = 'none'; });

async function deleteClaw(id) {
  if (!confirm('Remove this claw from the workspace?')) return;
  try { await api('DELETE', `/api/claws/${id}`); toast('Claw removed'); loadClaws(); }
  catch (err) { toast(err.message, 'error'); }
}

// ── Skills ────────────────────────────────────────────────────────────────────
async function loadSkills() {
  const scope = $('skill-scope-filter').value;
  const grid  = $('skills-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    if (scope === 'tenant') {
      const data = await api('GET', '/api/skill-assignments/tenant');
      const assignments = data?.assignments ?? [];
      if (!assignments.length) {
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🧩</div><div class="empty-title">No skills assigned</div><div class="empty-desc">Browse the marketplace and assign skills to your workspace.</div></div>`;
        return;
      }
      grid.innerHTML = assignments.map(a => `
        <div class="card">
          <div class="card-header">
            <span class="card-title">${esc(a.skillName ?? a.skillSlug)}</span>
            <span class="card-key">${esc(a.skillSlug)}</span>
          </div>
          ${a.skillDesc ? `<div class="card-desc">${esc(a.skillDesc)}</div>` : ''}
          <div class="card-footer">
            <span class="card-meta">v${esc(a.skillVer ?? '?')}</span>
            <button class="btn btn-danger btn-sm" data-unassign-skill="${esc(a.skillSlug)}">Remove</button>
          </div>
        </div>`).join('');
      grid.querySelectorAll('[data-unassign-skill]').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await api('DELETE', `/api/skill-assignments/tenant/${btn.dataset.unassignSkill}`);
            toast('Skill removed from workspace'); loadSkills();
          } catch (err) { toast(err.message, 'error'); }
        });
      });
    } else {
      // Browse marketplace
      const data = await api('GET', '/marketplace/skills');
      const skills = data?.skills ?? data ?? [];
      if (!skills.length) {
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🧩</div><div class="empty-title">No skills in marketplace</div><div class="empty-desc">Be the first to publish a skill!</div></div>`;
        return;
      }
      grid.innerHTML = skills.map(s => `
        <div class="card">
          <div class="card-header">
            <span class="card-title">${esc(s.name)}</span>
            <span class="card-key">${esc(s.slug)}</span>
          </div>
          ${s.description ? `<div class="card-desc">${esc(s.description)}</div>` : ''}
          <div class="card-footer">
            <span class="card-meta">v${esc(s.version ?? '1.0.0')} · ${(s.downloads ?? 0)} downloads</span>
            <button class="btn btn-primary btn-sm" data-assign-slug="${esc(s.slug)}" data-assign-name="${esc(s.name)}">Assign</button>
          </div>
        </div>`).join('');
      grid.querySelectorAll('[data-assign-slug]').forEach(btn => {
        btn.addEventListener('click', () => openAssignModal(btn.dataset.assignSlug, btn.dataset.assignName));
      });
    }
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

$('skill-scope-filter').addEventListener('change', loadSkills);

async function openAssignModal(slug, name) {
  $('assign-skill-slug').value    = slug;
  $('assign-skill-name').textContent = name;
  // Populate claw list
  const clawContainer = $('assign-claw-list');
  clawContainer.innerHTML = clawsList.length
    ? clawsList.map(c => `<button class="btn btn-secondary btn-sm" style="text-align:left" data-assign-claw="${c.id}">${esc(c.name)}</button>`).join('')
    : '<span style="font-size:12px;color:var(--text-muted)">No claws registered</span>';
  clawContainer.querySelectorAll('[data-assign-claw]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await api('POST', `/api/skill-assignments/claws/${btn.dataset.assignClaw}`, { skillSlug: slug });
        toast(`Skill assigned to claw`); closeModal('modal-assign-skill');
      } catch (err) { toast(err.message, 'error'); }
    });
  });
  openModal('modal-assign-skill');
}

$('btn-assign-tenant').addEventListener('click', async () => {
  const slug = $('assign-skill-slug').value;
  try {
    await api('POST', '/api/skill-assignments/tenant', { skillSlug: slug });
    toast('Skill assigned to entire workspace'); closeModal('modal-assign-skill');
  } catch (err) { toast(err.message, 'error'); }
});

// ── Agents ────────────────────────────────────────────────────────────────────
async function loadAgents() {
  const grid = $('agents-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data   = await api('GET', '/api/agents');
    const agents = data?.agents ?? [];
    if (!agents.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🤖</div><div class="empty-title">No AI agents configured</div><div class="empty-desc">AI agents connect via the API (Claude, OpenAI, Ollama, HTTP).</div></div>`;
      return;
    }
    grid.innerHTML = agents.map(a => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${esc(a.name)}</span>
          <span class="badge ${a.isActive ? 'badge-done' : 'badge-todo'}">${a.isActive ? 'active' : 'inactive'}</span>
        </div>
        <div class="card-footer">
          <span class="badge badge-in_progress">${esc(a.type)}</span>
          <span class="card-meta">${esc(a.endpoint ?? '')}</span>
        </div>
      </div>`).join('');
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

// ── Workspace ─────────────────────────────────────────────────────────────────
async function loadWorkspace() {
  $('workspace-info').innerHTML = `
    <div class="card" style="max-width:480px">
      <div class="card-header">
        <span class="card-title">${esc(tenantName)}</span>
        <span class="card-key">${esc(tenantSlug)}</span>
      </div>
      <div class="card-desc">ID: ${tenantId}</div>
    </div>`;

  const grid = $('members-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', `/api/tenants/${tenantId}`);
    const members = data?.members ?? [];
    if (!members.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-title">No members</div></div>`;
      return;
    }
    grid.innerHTML = members.map(m => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${esc(m.userId)}</span>
          <span class="badge badge-in_progress">${esc(m.role)}</span>
        </div>
        <div class="card-footer">
          <span class="card-meta">${m.isActive ? '● active' : '○ inactive'}</span>
        </div>
      </div>`).join('');
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

$('btn-invite-member').addEventListener('click', () => openModal('modal-invite-member'));
$('form-invite-member').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('POST', `/api/tenants/${tenantId}/members`, {
      newUserId: fd.get('newUserId'),
      role: fd.get('role'),
    });
    closeModal('modal-invite-member'); e.target.reset();
    toast('Member invited'); loadWorkspace();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Boot ──────────────────────────────────────────────────────────────────────
(function boot() {
  // Expired token cleanup
  if (webToken    && isTokenExpired(webToken))    { webToken    = null; localStorage.removeItem('ccl-wtoken'); }
  if (tenantToken && isTokenExpired(tenantToken)) { clearTenantSession(); }

  if (tenantToken && tenantId) {
    // Check URL slug – if it's a different workspace, go to picker
    const urlSlug = location.pathname.replace(/^\//, '').split('/')[0];
    if (urlSlug && urlSlug !== tenantSlug) {
      clearTenantSession();
      showPicker();
    } else {
      showApp();
    }
  } else if (webToken) {
    showPicker();
  } else {
    showAuth();
  }
})();
