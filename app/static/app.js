/* CoderClawLink – App */
const API = window.API_URL ?? 'https://api.coderclaw.ai';

/* ── State ── */
let token = localStorage.getItem('ccl-token') ?? null;
let tenantId = Number(localStorage.getItem('ccl-tid') ?? 0);
let userEmail = localStorage.getItem('ccl-email') ?? '';
let projects = [];

/* ── Helpers ── */
const $ = (id) => document.getElementById(id);
const q = (sel, ctx = document) => ctx.querySelector(sel);

async function api(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) { logout(); return null; }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

/* ── Toast ── */
function toast(msg, type = 'success') {
  const el = $('toast');
  el.textContent = (type === 'success' ? '✓ ' : '✕ ') + msg;
  el.className = `toast ${type}`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add('hidden'), 3500);
}

/* ── Theme ── */
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

/* ── Auth ── */
function showAuth() {
  $('auth-screen').style.display = '';
  $('app-screen').style.display = 'none';
  $('nav-tabs').style.display = 'none';
  $('user-chip').style.display = 'none';
  $('btn-logout').style.display = 'none';
}

function showApp() {
  $('auth-screen').style.display = 'none';
  $('app-screen').style.display = '';
  $('nav-tabs').style.display = '';
  $('user-chip').style.display = '';
  $('btn-logout').style.display = '';
  $('user-email-label').textContent = userEmail;
  loadView('projects');
}

function logout() {
  token = null; tenantId = 0; userEmail = '';
  localStorage.removeItem('ccl-token');
  localStorage.removeItem('ccl-tid');
  localStorage.removeItem('ccl-email');
  showAuth();
}

$('btn-logout').addEventListener('click', logout);

/* auth tabs */
document.querySelectorAll('[data-auth-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-auth-tab]').forEach(b => b.classList.toggle('active', b === btn));
    const tab = btn.dataset.authTab;
    $('form-login').classList.toggle('active', tab === 'login');
    $('form-register').classList.toggle('active', tab === 'register');
  });
});

/* register */
$('form-register').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('reg-email').value.trim();
  try {
    const data = await api('POST', '/api/auth/register', { email });
    const res = $('reg-result');
    res.style.display = '';
    res.innerHTML = `<strong>Account created!</strong><br>Your API key (save it — shown only once):<br><code style="font-family:monospace;color:var(--cyan-bright)">${data.apiKey}</code>`;
    toast('Account created — save your API key!', 'success');
  } catch (err) {
    toast(err.message, 'error');
  }
});

/* login */
$('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('login-email').value.trim();
  const apiKey = $('login-apikey').value.trim();
  const tid = Number($('login-tenant').value);
  try {
    const data = await api('POST', '/api/auth/token', { apiKey, tenantId: tid });
    token = data.token;
    tenantId = tid;
    userEmail = email;
    localStorage.setItem('ccl-token', token);
    localStorage.setItem('ccl-tid', tid);
    localStorage.setItem('ccl-email', email);
    showApp();
  } catch (err) {
    toast(err.message, 'error');
  }
});

/* ── Nav ── */
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
  if (tab) {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b === tab));
  }
  if (name === 'projects') loadProjects();
  if (name === 'tasks')    loadTasks();
  if (name === 'tenants')  loadTenants();
  if (name === 'agents')   loadAgents();
}

/* ── Modal helpers ── */
function openModal(id) { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => { if (e.target === m) closeModal(m.id); });
});

/* ── Projects ── */
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
      </div>
    `).join('');
    grid.querySelectorAll('[data-del-project]').forEach(btn => {
      btn.addEventListener('click', () => deleteProject(btn.dataset.delProject));
    });
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error loading projects</div><div class="empty-desc">${esc(err.message)}</div></div>`;
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
    closeModal('modal-create-project');
    e.target.reset();
    toast('Project created');
    loadProjects();
  } catch (err) { toast(err.message, 'error'); }
});

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  try {
    await api('DELETE', `/api/projects/${id}`);
    toast('Project deleted');
    loadProjects();
  } catch (err) { toast(err.message, 'error'); }
}

/* ── Tasks ── */
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
              ${t.assignedAgentType ? `<span class="badge badge-in_progress">${esc(t.assignedAgentType)}</span>` : ''}
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
      assignedAgentType: fd.get('assignedAgentType') || undefined,
    });
    closeModal('modal-create-task');
    e.target.reset();
    toast('Task created');
    loadTasks();
  } catch (err) { toast(err.message, 'error'); }
});

/* ── Tenants ── */
async function loadTenants() {
  const grid = $('tenants-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', '/api/tenants');
    const tenants = data?.tenants ?? [];
    if (!tenants.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🏢</div><div class="empty-title">No tenants</div><div class="empty-desc">Create a tenant to organise your workspace.</div></div>`;
      return;
    }
    grid.innerHTML = tenants.map(t => `
      <div class="tenant-card">
        <div class="tenant-avatar">${esc(t.name[0]).toUpperCase()}</div>
        <div class="tenant-info">
          <div class="tenant-name">${esc(t.name)}</div>
          <div class="tenant-meta">ID: ${t.id}</div>
        </div>
      </div>`).join('');
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }
}

$('btn-create-tenant').addEventListener('click', () => openModal('modal-create-tenant'));

$('form-create-tenant').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('POST', '/api/tenants', { name: fd.get('name') });
    closeModal('modal-create-tenant');
    e.target.reset();
    toast('Tenant created');
    loadTenants();
  } catch (err) { toast(err.message, 'error'); }
});

/* ── Agents ── */
async function loadAgents() {
  const grid = $('agents-grid');
  grid.innerHTML = `<div class="loading-row"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', '/api/agents');
    const agents = data?.agents ?? [];
    if (!agents.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🤖</div><div class="empty-title">No agents registered</div><div class="empty-desc">Agents connect via the API.</div></div>`;
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

/* ── Escape HTML ── */
function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Boot ── */
if (token) showApp(); else showAuth();
