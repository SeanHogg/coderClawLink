/* CoderClawLink — App  */
const API = window.API_URL ?? 'https://api.coderclaw.ai';

// ── State ────────────────────────────────────────────────────────────────────
let webToken    = localStorage.getItem('ccl-wtoken') ?? null;
let tenantToken = localStorage.getItem('ccl-token')  ?? null;
let tenantId    = Number(localStorage.getItem('ccl-tid')   ?? 0);
let tenantName  = localStorage.getItem('ccl-tname')  ?? '';
let tenantSlug  = localStorage.getItem('ccl-tslug')  ?? '';
let userEmail   = localStorage.getItem('ccl-email')  ?? '';
let userId      = localStorage.getItem('ccl-uid')    ?? '';
let projects    = [];
let clawsList   = [];
let allTasks    = [];
let taskView    = 'kanban'; // 'kanban' | 'list' | 'gantt'
let listSortKey = 'createdAt';
let listSortAsc = false;
let dragTaskId  = null;

// ── Filter helpers ────────────────────────────────────────────────────────────
function getFilteredTasks() {
  const statusFilter   = $('task-status-filter')?.value ?? '';
  const priorityFilter = $('task-priority-filter')?.value ?? '';
  const search         = ($('task-search')?.value ?? '').toLowerCase().trim();
  const showArchived   = $('task-show-archived')?.checked ?? false;
  return allTasks.filter(t => {
    if (!showArchived && t.archived) return false;
    if (statusFilter   && t.status   !== statusFilter)   return false;
    if (priorityFilter && t.priority !== priorityFilter) return false;
    if (search && !t.title.toLowerCase().includes(search) && !t.key.toLowerCase().includes(search)) return false;
    return true;
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const $  = (id)       => document.getElementById(id);
const q  = (sel, ctx = document) => ctx.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const fmtDate = (d) => d ? new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const isoDate = (d) => d ? new Date(d).toISOString().slice(0,10) : '';

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
    if (!input) return;
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    btn.textContent = show ? '🙈' : '👁';
    btn.classList.toggle('visible', show);
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

// ── Landing CTA buttons ───────────────────────────────────────────────────────
['btn-hero-register', 'btn-nav-register', 'btn-cta-register'].forEach(id =>
  $(id)?.addEventListener('click', () => openAuthModal('register')));
['btn-hero-signin', 'btn-nav-signin'].forEach(id =>
  $(id)?.addEventListener('click', () => openAuthModal('login')));

document.querySelectorAll('[data-auth-tab]').forEach(btn => {
  btn.addEventListener('click', () => openAuthModal(btn.dataset.authTab));
});

// ── Screen management ─────────────────────────────────────────────────────────
function showLanding() {
  $('landing-screen').style.display  = '';
  $('picker-screen').style.display   = 'none';
  $('app-screen').style.display      = 'none';
  $('nav-tabs').style.display        = 'none';
  $('user-chip').style.display       = 'none';
  $('btn-logout').style.display      = 'none';
  $('landing-nav-btns').style.display = '';
}

function showAuth() { showLanding(); }

function openAuthModal(tab = 'login') {
  document.querySelectorAll('[data-auth-tab]').forEach(b =>
    b.classList.toggle('active', b.dataset.authTab === tab));
  $('form-login').classList.toggle('active', tab === 'login');
  $('form-register').classList.toggle('active', tab === 'register');
  openModal('modal-auth');
}

function showPicker() {
  $('landing-screen').style.display   = 'none';
  $('landing-nav-btns').style.display = 'none';
  $('picker-screen').style.display    = '';
  $('app-screen').style.display       = 'none';
  $('nav-tabs').style.display         = 'none';
  $('user-chip').style.display        = 'none';
  $('btn-logout').style.display       = 'none';
  loadPickerTenants();
}

function showApp() {
  $('landing-screen').style.display   = 'none';
  $('landing-nav-btns').style.display = 'none';
  $('picker-screen').style.display    = 'none';
  $('app-screen').style.display       = '';
  $('nav-tabs').style.display         = '';
  $('user-chip').style.display        = '';
  $('btn-logout').style.display       = '';
  $('user-label').textContent         = tenantName ? `${userEmail} · ${tenantName}` : userEmail;
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
    closeModal('modal-auth');
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
    closeModal('modal-auth');
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
  if (name === 'tasks')    { loadTasks(); startTaskPolling(); }
  else                     { stopTaskPolling(); }
  if (name === 'claws')    loadClaws();
  if (name === 'skills')   loadSkills();
  if (name === 'tenants')  loadWorkspace();
  if (name === 'logs')     loadLogs();
}

// ── Task polling ──────────────────────────────────────────────────────────────
let _pollInterval = null;
function startTaskPolling() {
  if (_pollInterval) return;
  _pollInterval = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if ($('view-tasks')?.style.display === 'none') return;
    loadTasks();
  }, 15000);
}
function stopTaskPolling() {
  if (_pollInterval) { clearInterval(_pollInterval); _pollInterval = null; }
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

// ── Task View Switcher ────────────────────────────────────────────────────────
$('btn-view-kanban').addEventListener('click', () => setTaskView('kanban'));
$('btn-view-list').addEventListener('click',   () => setTaskView('list'));
$('btn-view-gantt').addEventListener('click',  () => setTaskView('gantt'));

function setTaskView(view) {
  taskView = view;
  ['kanban','list','gantt'].forEach(v => {
    $(`btn-view-${v}`).classList.toggle('active', v === view);
    $(`tasks-${v}`).style.display = v === view ? '' : 'none';
  });
  renderCurrentView();
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
async function loadTasks() {
  const projectId = $('task-project-filter').value;
  const path = projectId ? `/api/tasks?project_id=${projectId}` : '/api/tasks';

  // Show spinners in all views
  ['todo','in_progress','in_review','done','blocked'].forEach(s => {
    const col = $(`col-${s}`);
    if (col) col.innerHTML = `<div class="loading-row"><span class="spinner"></span></div>`;
    const cnt = $(`count-${s}`);
    if (cnt) cnt.textContent = '…';
  });
  const listBody = $('task-list-body');
  if (listBody) listBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px"><span class="spinner"></span></td></tr>`;

  try {
    const data = await api('GET', path);
    allTasks = data?.tasks ?? [];
    renderCurrentView();
  } catch (err) { toast(err.message, 'error'); }
}

function renderCurrentView() {
  const tasks = getFilteredTasks();
  if (taskView === 'kanban') renderKanban(tasks);
  else if (taskView === 'list') renderList(tasks);
  else if (taskView === 'gantt') renderGantt(tasks);
}

// ── Kanban with drag-and-drop ─────────────────────────────────────────────────
function renderKanban(tasks) {
  tasks = tasks ?? getFilteredTasks();
  const statuses = ['todo','in_progress','in_review','done','blocked'];
  const cols = {};
  statuses.forEach(s => { cols[s] = []; });
  tasks.forEach(t => { if (cols[t.status]) cols[t.status].push(t); });

  statuses.forEach(s => {
    const cntEl = $(`count-${s}`);
    if (cntEl) cntEl.textContent = cols[s].length;
    const colEl = $(`col-${s}`);
    if (!colEl) return;

    if (!cols[s].length) {
      colEl.innerHTML = `<div class="kanban-empty">Empty</div>`;
    } else {
      colEl.innerHTML = cols[s].map(t => renderTaskCard(t)).join('');
      colEl.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', () => openDrawer(Number(card.dataset.taskId)));
        // Drag events
        card.addEventListener('dragstart', e => {
          dragTaskId = Number(card.dataset.taskId);
          card.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });
        card.addEventListener('dragend', () => {
          dragTaskId = null;
          card.classList.remove('dragging');
        });
      });
    }

    // Drop zone events on the column
    colEl.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      colEl.classList.add('drag-over');
    });
    colEl.addEventListener('dragleave', () => colEl.classList.remove('drag-over'));
    colEl.addEventListener('drop', async e => {
      e.preventDefault();
      colEl.classList.remove('drag-over');
      if (dragTaskId === null) return;
      const newStatus = colEl.dataset.status;
      const task = allTasks.find(t => t.id === dragTaskId);
      if (!task || task.status === newStatus) return;
      try {
        await api('PATCH', `/api/tasks/${dragTaskId}`, { status: newStatus });
        task.status = newStatus;
        renderKanban();
        toast(`Moved to ${newStatus.replace('_',' ')}`);
      } catch (err) { toast(err.message, 'error'); }
    });
  });
}

function renderTaskCard(t) {
  const due = t.dueDate ? ` · Due ${fmtDate(t.dueDate)}` : '';
  const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done' ? ' overdue' : '';
  return `<div class="task-card${overdue}" draggable="true" data-task-id="${t.id}">
    <div class="task-card-title">${esc(t.title)}</div>
    <div class="task-card-meta">
      <span class="badge badge-${t.priority ?? 'medium'}">${t.priority ?? 'medium'}</span>
      ${t.assignedAgentType ? `<span class="badge badge-agent">${esc(t.assignedAgentType)}</span>` : ''}
    </div>
    ${due ? `<div class="task-card-due${overdue}">${esc(t.key)}${due}</div>` : `<div class="task-card-due">${esc(t.key)}</div>`}
  </div>`;
}

// ── List View ─────────────────────────────────────────────────────────────────
function renderList(tasks) {
  tasks = tasks ?? getFilteredTasks();
  const tbody = $('task-list-body');
  if (!tbody) return;

  const sorted = [...tasks].sort((a, b) => {
    let va = a[listSortKey], vb = b[listSortKey];
    if (va == null) va = '';
    if (vb == null) vb = '';
    if (va < vb) return listSortAsc ? -1 : 1;
    if (va > vb) return listSortAsc ? 1 : -1;
    return 0;
  });

  if (!sorted.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">No tasks found</td></tr>`;
    return;
  }

  tbody.innerHTML = sorted.map(t => {
    const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done';
    return `<tr class="task-row" data-task-id="${t.id}" style="cursor:pointer">
      <td><span class="task-key">${esc(t.key)}</span></td>
      <td class="task-title-cell">${esc(t.title)}</td>
      <td><span class="badge badge-${t.status}">${t.status.replace('_',' ')}</span></td>
      <td><span class="badge badge-${t.priority}">${t.priority}</span></td>
      <td class="${overdue ? 'overdue' : ''}">${fmtDate(t.dueDate)}</td>
      <td>${fmtDate(t.createdAt)}</td>
      <td style="text-align:right">
        <button class="btn btn-secondary btn-sm" data-edit-task="${t.id}">Edit</button>
      </td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('.task-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      openDrawer(Number(row.dataset.taskId));
    });
  });
  tbody.querySelectorAll('[data-edit-task]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openDrawer(Number(btn.dataset.editTask));
    });
  });

  // Sortable headers
  document.querySelectorAll('.task-table th.sortable').forEach(th => {
    th.onclick = () => {
      const key = th.dataset.sort;
      if (listSortKey === key) listSortAsc = !listSortAsc;
      else { listSortKey = key; listSortAsc = true; }
      document.querySelectorAll('.task-table th.sortable').forEach(h => h.classList.remove('asc','desc'));
      th.classList.add(listSortAsc ? 'asc' : 'desc');
      renderList();
    };
  });
}

// ── Gantt View ─────────────────────────────────────────────────────────────────
function renderGantt(tasks) {
  tasks = tasks ?? getFilteredTasks();
  const container = $('gantt-chart');
  const emptyEl   = $('gantt-empty');
  if (!container) return;

  // Use dueDate; fallback to showing all tasks with createdAt as start and +7d as due
  const tasksWithDates = tasks.map(t => ({
    ...t,
    _start: t.startDate ? new Date(t.startDate) : new Date(t.createdAt),
    _end:   t.dueDate   ? new Date(t.dueDate)   : (() => {
      const d = new Date(t.startDate || t.createdAt);
      d.setDate(d.getDate() + 7);
      return d;
    })(),
  })).filter(t => t._start <= t._end);

  if (!tasksWithDates.length) {
    emptyEl.style.display = '';
    container.style.display = 'none';
    return;
  }
  emptyEl.style.display = 'none';
  container.style.display = '';

  // Compute timeline range
  const minDate = new Date(Math.min(...tasksWithDates.map(t => t._start)));
  const maxDate = new Date(Math.max(...tasksWithDates.map(t => t._end)));
  // Pad by 1 day on each side
  minDate.setDate(minDate.getDate() - 1);
  maxDate.setDate(maxDate.getDate() + 1);

  const totalDays = Math.ceil((maxDate - minDate) / 86400000);

  // Generate week/day headers
  const months = [];
  let cur = new Date(minDate);
  cur.setDate(1);
  while (cur <= maxDate) {
    const label = cur.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    const start = Math.max(0, Math.floor((new Date(cur.getFullYear(), cur.getMonth(), 1) - minDate) / 86400000));
    const end   = Math.floor((new Date(cur.getFullYear(), cur.getMonth() + 1, 1) - minDate) / 86400000);
    months.push({ label, start: Math.max(0, start), width: Math.min(end, totalDays) - Math.max(0, start) });
    cur.setMonth(cur.getMonth() + 1);
  }

  const today = new Date();
  const todayOffset = Math.floor((today - minDate) / 86400000);
  const todayPct = (todayOffset / totalDays * 100).toFixed(2);

  const statusColor = {
    todo: 'var(--text-muted)', in_progress: 'var(--coral-bright)',
    in_review: 'var(--cyan-bright)', done: '#4ade80', blocked: '#f87171',
  };

  container.innerHTML = `
    <div class="gantt-header">
      ${months.map(m => `<div class="gantt-month" style="left:${(m.start/totalDays*100).toFixed(2)}%;width:${(m.width/totalDays*100).toFixed(2)}%">${esc(m.label)}</div>`).join('')}
    </div>
    <div class="gantt-body" style="position:relative">
      ${todayOffset >= 0 && todayOffset <= totalDays ? `<div class="gantt-today" style="left:${todayPct}%"></div>` : ''}
      ${tasksWithDates.map(t => {
        const startPct = ((t._start - minDate) / (maxDate - minDate) * 100).toFixed(2);
        const widthPct = Math.max(0.5, ((t._end - t._start) / (maxDate - minDate) * 100)).toFixed(2);
        const color    = statusColor[t.status] ?? 'var(--coral-bright)';
        const overdue  = t._end < today && t.status !== 'done';
        return `<div class="gantt-row" data-task-id="${t.id}">
          <div class="gantt-label" title="${esc(t.title)}">${esc(t.key)} ${esc(t.title)}</div>
          <div class="gantt-timeline">
            <div class="gantt-bar${overdue ? ' gantt-overdue' : ''}" style="left:${startPct}%;width:${widthPct}%;background:${color}" title="${esc(t.title)}: ${fmtDate(t._start)} → ${fmtDate(t._end)}">
              <span class="gantt-bar-label">${esc(t.title)}</span>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  container.querySelectorAll('.gantt-row').forEach(row => {
    row.addEventListener('click', () => openDrawer(Number(row.dataset.taskId)));
  });
}

$('task-project-filter').addEventListener('change', loadTasks);
$('task-status-filter').addEventListener('change', renderCurrentView);
$('task-priority-filter').addEventListener('change', renderCurrentView);
$('task-search').addEventListener('input', renderCurrentView);
$('task-show-archived').addEventListener('change', renderCurrentView);

// ── Create Task ───────────────────────────────────────────────────────────────
$('btn-create-task').addEventListener('click', () => {
  if (!projects.length) { toast('Create a project first', 'error'); return; }
  openModal('modal-create-task');
});
$('form-create-task').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api('POST', '/api/tasks', {
      projectId:         Number(fd.get('projectId')),
      title:             fd.get('title'),
      description:       fd.get('description') || undefined,
      priority:          fd.get('priority'),
      assignedAgentType: fd.get('assignedAgentType') || undefined,
      startDate:         fd.get('startDate') || undefined,
      dueDate:           fd.get('dueDate')   || undefined,
      persona:           fd.get('persona')   || undefined,
    });
    closeModal('modal-create-task'); e.target.reset();
    toast('Task created'); loadTasks();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Task Detail / Edit Modal ──────────────────────────────────────────────────
function openTaskDetail(taskId) {
  const task = allTasks.find(t => t.id === taskId);
  if (!task) return;

  $('detail-task-key').textContent   = task.key;
  $('detail-task-title').textContent = task.title;
  $('edit-task-id').value            = task.id;
  $('edit-task-title').value         = task.title;
  $('edit-task-description').value   = task.description ?? '';
  $('edit-task-status').value        = task.status;
  $('edit-task-priority').value      = task.priority;
  $('edit-task-agent').value         = task.assignedAgentType ?? '';
  $('edit-task-persona').value       = task.persona ?? '';
  $('edit-task-start-date').value    = isoDate(task.startDate);
  $('edit-task-due-date').value      = isoDate(task.dueDate);

  openModal('modal-task-detail');
  loadTaskExecutions(taskId);
}

async function loadTaskExecutions(taskId) {
  const listEl = $('task-executions-list');
  if (!listEl) return;
  listEl.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:8px 0"><span class="spinner"></span> Loading…</div>`;
  try {
    const data = await api('GET', `/api/tasks/${taskId}/executions`);
    const execs = data?.executions ?? data ?? [];
    if (!execs.length) {
      listEl.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:8px 0">No executions yet. Click <strong>Run with Agent</strong> to start.</div>`;
      return;
    }
    listEl.innerHTML = execs.map(ex => {
      const statusColor = { success: '#4ade80', failed: '#f87171', running: 'var(--coral-bright)', pending: 'var(--text-muted)' };
      const color = statusColor[ex.status] ?? 'var(--text-muted)';
      return `<div style="padding:8px 10px;border-radius:6px;border:1px solid var(--border-subtle);margin-bottom:8px;font-size:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <span style="font-weight:600;color:${color}">${esc(ex.status ?? 'unknown')}</span>
          <span style="color:var(--text-muted)">${fmtDate(ex.startedAt ?? ex.createdAt)}</span>
        </div>
        ${ex.agentType ? `<div style="color:var(--text-muted)">Agent: ${esc(ex.agentType)}</div>` : ''}
        ${ex.output ? `<pre style="margin:6px 0 0;font-size:11px;color:var(--text-secondary);white-space:pre-wrap;max-height:80px;overflow:auto">${esc(ex.output)}</pre>` : ''}
      </div>`;
    }).join('');
  } catch {
    listEl.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:8px 0">Execution history unavailable.</div>`;
  }
}

$('form-edit-task').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = Number($('edit-task-id').value);
  const fd = new FormData(e.target);
  try {
    const updated = await api('PATCH', `/api/tasks/${id}`, {
      title:             fd.get('title'),
      description:       fd.get('description') || null,
      status:            fd.get('status'),
      priority:          fd.get('priority'),
      assignedAgentType: fd.get('assignedAgentType') || null,
      startDate:         fd.get('startDate') || null,
      dueDate:           fd.get('dueDate')   || null,
      persona:           fd.get('persona')   || null,
    });
    if (updated) {
      const idx = allTasks.findIndex(t => t.id === id);
      if (idx !== -1) allTasks[idx] = updated;
    }
    closeModal('modal-task-detail');
    toast('Task updated');
    renderCurrentView();
  } catch (err) { toast(err.message, 'error'); }
});

$('btn-delete-task').addEventListener('click', async () => {
  const id = Number($('edit-task-id').value);
  if (!confirm('Delete this task permanently?')) return;
  try {
    await api('DELETE', `/api/tasks/${id}`);
    allTasks = allTasks.filter(t => t.id !== id);
    closeModal('modal-task-detail');
    toast('Task deleted');
    renderCurrentView();
  } catch (err) { toast(err.message, 'error'); }
});

// ── AI Generate (OpenRouter) ──────────────────────────────────────────────────
function getAISettings() {
  return {
    key:   localStorage.getItem('ccl-or-key')   ?? '',
    model: localStorage.getItem('ccl-or-model') ?? 'anthropic/claude-sonnet-4-6',
  };
}

async function generateTaskDescription(title, existingDesc, targetArea) {
  const { key, model } = getAISettings();
  if (!key) {
    toast('Set your OpenRouter API key in Workspace → AI Settings first', 'error');
    return;
  }

  const statusEl = $('ai-generate-status');
  const btnEl    = $('btn-ai-generate') ?? $('btn-ai-generate-edit');
  if (statusEl) { statusEl.style.display = ''; statusEl.textContent = '✨ Generating…'; }
  if (btnEl) btnEl.disabled = true;

  const systemPrompt = `You are a senior product manager and software architect. Write a comprehensive PRD/task description in markdown format. Include:
- Objective and background
- Acceptance criteria (as a checklist)
- Technical notes or implementation hints
- Edge cases to consider
Keep it concise but actionable. Use bullet points and headers.`;

  const userPrompt = `Write a detailed PRD/task description for: "${title}"${existingDesc ? `\n\nExisting notes to expand on:\n${existingDesc}` : ''}`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': location.origin,
        'X-Title': 'CoderClawLink',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt },
        ],
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? `OpenRouter error ${res.status}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    if (targetArea) targetArea.value = text;
    if (statusEl) statusEl.textContent = '✓ Generated';
    toast('AI description generated');
  } catch (err) {
    toast(err.message, 'error');
    if (statusEl) statusEl.textContent = '';
  } finally {
    if (btnEl) btnEl.disabled = false;
  }
}

$('btn-ai-generate').addEventListener('click', () => {
  const title = $('inp-task-title').value.trim();
  if (!title) { toast('Enter a task title first', 'error'); return; }
  generateTaskDescription(title, $('inp-task-description').value, $('inp-task-description'));
});

$('btn-ai-generate-edit').addEventListener('click', () => {
  const title = $('edit-task-title').value.trim();
  if (!title) { toast('Enter a task title first', 'error'); return; }
  generateTaskDescription(title, $('edit-task-description').value, $('edit-task-description'));
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
    $('claw-key-val').textContent = data.apiKey;
    $('claw-key-banner').style.display = '';
    toast('Claw registered — save the API key!');
    loadClaws();
  } catch (err) { toast(err.message, 'error'); }
});
$('btn-dismiss-key').addEventListener('click', () => { $('claw-key-banner').style.display = 'none'; });

$('btn-copy-key').addEventListener('click', async () => {
  const key = $('claw-key-val').textContent.trim();
  try {
    await navigator.clipboard.writeText(key);
    const btn = $('btn-copy-key');
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
  } catch { toast('Copy failed — select the key manually', 'error'); }
});

$('btn-download-key').addEventListener('click', () => {
  const key  = $('claw-key-val').textContent.trim();
  const name = document.querySelector('#claws-grid .card-title')?.textContent?.trim() ?? 'coderclaw';
  const text = `CODERCLAW_API_KEY=${key}\n`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${name.toLowerCase().replace(/\s+/g, '-')}-api-key.env`;
  a.click();
  URL.revokeObjectURL(url);
});

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
    } else {
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
    }
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-title">Error</div><div class="empty-desc">${esc(err.message)}</div></div>`;
  }

  // Load saved AI settings
  const { key, model } = getAISettings();
  $('openrouter-key').value   = key;
  $('openrouter-model').value = model;
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

// ── Run Task ──────────────────────────────────────────────────────────────────
$('btn-run-task').addEventListener('click', () => {
  const taskId = Number($('edit-task-id').value);
  if (!taskId) return;
  $('run-task-id').value = taskId;
  // Pre-select agent from task's assignedAgentType if set
  const task = allTasks.find(t => t.id === taskId);
  if (task?.assignedAgentType) $('run-task-agent').value = task.assignedAgentType;
  openModal('modal-run-task');
});

$('btn-confirm-run').addEventListener('click', async () => {
  const taskId    = Number($('run-task-id').value);
  const agentType = $('run-task-agent').value;
  if (!taskId) return;
  const btn = $('btn-confirm-run');
  btn.disabled = true;
  btn.textContent = 'Submitting…';
  try {
    await api('POST', `/api/tasks/${taskId}/executions`, { agentType });
    closeModal('modal-run-task');
    toast('Task submitted for execution');
    loadTaskExecutions(taskId);
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Submit';
  }
});

// ── AI Settings save ──────────────────────────────────────────────────────────
$('btn-save-ai-settings').addEventListener('click', () => {
  const key   = $('openrouter-key').value.trim();
  const model = $('openrouter-model').value;
  localStorage.setItem('ccl-or-key',   key);
  localStorage.setItem('ccl-or-model', model);
  toast('AI settings saved');
});

// ── Markdown renderer ─────────────────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text || typeof text !== 'string') return '<em style="color:var(--text-muted)">No content</em>';
  if (typeof marked === 'undefined') return `<pre style="white-space:pre-wrap;font-size:12px">${esc(text)}</pre>`;
  const html = marked.parse(text, { breaks: true, gfm: true });
  return typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(html) : html;
}

// ── Task Drawer ───────────────────────────────────────────────────────────────
let drawerTaskId = null;

function openDrawer(taskId) {
  const task = allTasks.find(t => t.id === taskId);
  if (!task) return;
  drawerTaskId = taskId;

  $('drawer-key').textContent = task.key;
  $('drawer-title').textContent = task.title;

  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
  $('drawer-badges').innerHTML = [
    `<span class="badge badge-${task.status}">${task.status.replace('_',' ')}</span>`,
    `<span class="badge badge-${task.priority}">${task.priority}</span>`,
    task.assignedAgentType ? `<span class="badge badge-agent">${esc(task.assignedAgentType)}</span>` : '',
    task.persona           ? `<span class="badge badge-persona">${esc(task.persona)}</span>` : '',
    task.archived          ? `<span class="badge" style="background:rgba(245,158,11,.15);color:#fbbf24">archived</span>` : '',
  ].join('');

  const parts = [];
  if (task.startDate) parts.push(`Start: ${fmtDate(task.startDate)}`);
  if (task.dueDate)   parts.push(`${overdue ? '⚠ ' : ''}Due: ${fmtDate(task.dueDate)}`);
  $('drawer-dates').textContent = parts.join(' · ');

  const descSection = $('drawer-desc-section');
  if (task.description) {
    $('drawer-description').innerHTML = renderMarkdown(task.description);
    descSection.style.display = '';
  } else {
    descSection.style.display = 'none';
  }

  $('drawer-btn-archive').textContent = task.archived ? '↑ Unarchive' : 'Archive';
  $('drawer-btn-restart').style.display = (task.status !== 'todo' && task.status !== 'done') ? '' : 'none';

  $('drawer-executions').innerHTML = `<div style="font-size:12px;color:var(--text-muted)"><span class="spinner"></span> Loading…</div>`;
  $('task-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  loadDrawerExecutions(taskId);
}

function closeDrawer() {
  $('task-drawer').classList.remove('open');
  document.body.style.overflow = '';
  drawerTaskId = null;
}

async function loadDrawerExecutions(taskId) {
  const listEl = $('drawer-executions');
  try {
    const data  = await api('GET', `/api/tasks/${taskId}/executions`);
    const execs = data?.executions ?? data ?? [];
    if (!execs.length) {
      listEl.innerHTML = `<div style="font-size:13px;color:var(--text-muted)">No executions yet — click <strong>▶ Run</strong> to start.</div>`;
      return;
    }
    const statusColor = { success:'#4ade80', failed:'#f87171', running:'var(--coral-bright)', pending:'var(--text-muted)', completed:'#4ade80', cancelled:'var(--text-muted)', submitted:'var(--cyan-bright)' };
    listEl.innerHTML = execs.map((ex, i) => {
      const color      = statusColor[ex.status] ?? 'var(--text-muted)';
      const output     = ex.result ?? ex.output ?? '';
      const outputHtml = output ? renderMarkdown(output) : '<em style="color:var(--text-muted)">No output</em>';
      return `<div class="exec-card">
        <div class="exec-card-header">
          <div class="exec-card-meta">
            <span style="font-weight:700;color:${color}">● ${esc(ex.status ?? 'unknown')}</span>
            ${ex.agentType ? `<span class="badge badge-agent">${esc(ex.agentType)}</span>` : ''}
            <span style="color:var(--text-muted)">${fmtDate(ex.startedAt ?? ex.createdAt)}</span>
          </div>
          <button class="btn-copy" data-exec-idx="${i}">📋 Copy</button>
        </div>
        <div class="exec-card-body">
          <div class="drawer-md">${outputHtml}</div>
        </div>
      </div>`;
    }).join('');

    listEl.querySelectorAll('[data-exec-idx]').forEach(btn => {
      const idx = Number(btn.dataset.execIdx);
      btn.addEventListener('click', async () => {
        const raw = execs[idx]?.result ?? execs[idx]?.output ?? '';
        try {
          await navigator.clipboard.writeText(raw);
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
        } catch { toast('Copy failed', 'error'); }
      });
    });
  } catch {
    listEl.innerHTML = `<div style="font-size:13px;color:var(--text-muted)">Execution history unavailable.</div>`;
  }
}

// Drawer event listeners
$('drawer-close').addEventListener('click', closeDrawer);
$('drawer-backdrop').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('task-drawer').classList.contains('open')) closeDrawer();
});

$('drawer-btn-edit').addEventListener('click', () => {
  if (!drawerTaskId) return;
  const id = drawerTaskId;
  closeDrawer();
  setTimeout(() => openTaskDetail(id), 50);
});

$('drawer-btn-run').addEventListener('click', () => {
  if (!drawerTaskId) return;
  $('run-task-id').value = drawerTaskId;
  const task = allTasks.find(t => t.id === drawerTaskId);
  if (task?.assignedAgentType) $('run-task-agent').value = task.assignedAgentType;
  openModal('modal-run-task');
});

$('drawer-btn-reply').addEventListener('click', () => {
  if (!drawerTaskId) return;
  const task = allTasks.find(t => t.id === drawerTaskId);
  if (!task || !projects.length) return;
  $('inp-task-proj').value = String(task.projectId ?? '');
  $('inp-task-title').value = `Follow-up: ${task.title}`;
  $('inp-task-description').value = `> Continuing from ${task.key}\n\n`;
  closeDrawer();
  openModal('modal-create-task');
});

$('drawer-btn-archive').addEventListener('click', async () => {
  if (!drawerTaskId) return;
  const task = allTasks.find(t => t.id === drawerTaskId);
  if (!task) return;
  try {
    const updated = await api('PATCH', `/api/tasks/${drawerTaskId}`, { archived: !task.archived });
    if (updated) { const idx = allTasks.findIndex(t => t.id === drawerTaskId); if (idx !== -1) allTasks[idx] = updated; }
    closeDrawer();
    toast(task.archived ? 'Task unarchived' : 'Task archived');
    renderCurrentView();
  } catch (err) { toast(err.message, 'error'); }
});

$('drawer-btn-restart').addEventListener('click', async () => {
  if (!drawerTaskId) return;
  try {
    const updated = await api('PATCH', `/api/tasks/${drawerTaskId}`, { status: 'todo' });
    if (updated) { const idx = allTasks.findIndex(t => t.id === drawerTaskId); if (idx !== -1) allTasks[idx] = updated; }
    closeDrawer();
    toast('Task reset to To Do');
    renderCurrentView();
  } catch (err) { toast(err.message, 'error'); }
});

// ── Logs view ─────────────────────────────────────────────────────────────────
async function loadLogs() {
  const listEl  = $('logs-list');
  const emptyEl = $('logs-empty');
  listEl.innerHTML = `<div style="padding:24px;text-align:center"><span class="spinner"></span></div>`;
  emptyEl.style.display = 'none';

  // Populate task filter
  const filterEl = $('logs-task-filter');
  filterEl.innerHTML = `<option value="">All Tasks</option>` +
    allTasks.map(t => `<option value="${t.id}">${esc(t.key)} — ${esc(t.title)}</option>`).join('');

  const taskId = filterEl.value ? Number(filterEl.value) : null;
  const path   = taskId ? `/api/tasks/${taskId}/executions` : '/api/executions';

  try {
    const data  = await api('GET', path);
    const execs = data?.executions ?? data ?? [];
    if (!execs.length) {
      listEl.innerHTML = '';
      emptyEl.style.display = '';
      return;
    }
    const statusColor = { success:'log-status-success', failed:'log-status-failed', running:'log-status-running', completed:'log-status-success', pending:'log-status-pending', submitted:'log-status-running' };
    listEl.innerHTML = execs.map(ex => {
      const cls  = statusColor[ex.status] ?? 'log-status-pending';
      const task = allTasks.find(t => t.id === ex.taskId);
      const output = ex.result ?? ex.output ?? '';
      return `<div class="log-entry">
        <div class="log-entry-meta">
          <div class="${cls}">${esc(ex.status ?? '?')}</div>
          <div>${fmtDate(ex.startedAt ?? ex.createdAt)}</div>
          ${ex.agentType ? `<div>${esc(ex.agentType)}</div>` : ''}
        </div>
        <div class="log-entry-body">
          ${task ? `<div class="log-entry-task">${esc(task.key)} — ${esc(task.title)}</div>` : ''}
          ${output ? `<div class="log-entry-output">${esc(output)}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch {
    listEl.innerHTML = `<div style="padding:24px;color:var(--text-muted);font-size:13px">Could not load execution logs.</div>`;
  }
}

$('btn-logs-refresh').addEventListener('click', loadLogs);
$('logs-task-filter').addEventListener('change', loadLogs);
$('btn-logs-copy-all').addEventListener('click', async () => {
  const text = $('logs-list').innerText;
  try {
    await navigator.clipboard.writeText(text);
    toast('Logs copied');
  } catch { toast('Copy failed', 'error'); }
});

// ── Boot ──────────────────────────────────────────────────────────────────────
(function boot() {
  if (webToken    && isTokenExpired(webToken))    { webToken    = null; localStorage.removeItem('ccl-wtoken'); }
  if (tenantToken && isTokenExpired(tenantToken)) { clearTenantSession(); }

  if (tenantToken && tenantId) {
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
