/**
 * coderClawLink – Frontend application
 * Communicates with api.coderclaw.ai
 */

const API = 'https://api.coderclaw.ai';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/** @type {Array<object>} */
let projects = [];
/** @type {Array<object>} */
let tasks = [];
/** @type {Array<object>} */
let tenants = [];

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupModals();
  setupForms();
  loadProjects();
  loadTasks();
  loadTenants();
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
}

function switchView(name) {
  document.querySelectorAll('.nav-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.view === name),
  );
  document.querySelectorAll('.view').forEach(v =>
    v.classList.toggle('active', v.id === `${name}-view`),
  );
}

// ---------------------------------------------------------------------------
// Modal helpers
// ---------------------------------------------------------------------------

function setupModals() {
  // Open triggers
  document.getElementById('open-create-project')
    ?.addEventListener('click', () => openModal('modal-create-project'));
  document.getElementById('open-create-task')
    ?.addEventListener('click', () => openModal('modal-create-task'));
  document.getElementById('open-create-tenant')
    ?.addEventListener('click', () => openModal('modal-create-tenant'));

  // Close triggers (close buttons + backdrop click)
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(el.dataset.close));
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.show').forEach(m => closeModal(m.id));
    }
  });
}

function openModal(id) {
  document.getElementById(id)?.classList.add('show');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('show');
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

function setupForms() {
  document.getElementById('form-create-project')
    ?.addEventListener('submit', handleCreateProject);
  document.getElementById('form-create-task')
    ?.addEventListener('submit', handleCreateTask);
  document.getElementById('form-create-tenant')
    ?.addEventListener('submit', handleCreateTenant);

  document.getElementById('project-filter')
    ?.addEventListener('change', loadTasks);
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

async function loadProjects() {
  try {
    projects = await apiFetch('/api/projects');
    renderProjects();
    syncProjectSelects();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!projects.length) {
    grid.innerHTML = emptyState('📋', 'No projects yet', 'Create your first project to get started');
    return;
  }
  grid.innerHTML = projects.map(p => `
    <div class="card project-card" data-id="${p.id}" role="button" tabindex="0">
      <div class="card-header">
        <span class="badge">${p.key}</span>
        <span class="status-pill status-${p.status}">${p.status}</span>
      </div>
      <h3 class="card-title">${escHtml(p.name)}</h3>
      ${p.description ? `<p class="card-desc">${escHtml(p.description)}</p>` : ''}
      ${p.githubRepoOwner ? `<div class="card-meta">🔗 ${escHtml(p.githubRepoOwner)}/${escHtml(p.githubRepoName)}</div>` : ''}
    </div>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('project-filter').value = card.dataset.id;
      switchView('tasks');
      loadTasks();
    });
  });
}

async function handleCreateProject(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {
    key:          fd.get('key'),
    name:         fd.get('name'),
    description:  fd.get('description') || null,
    githubRepoUrl: fd.get('githubRepoUrl') || null,
  };
  try {
    await apiFetch('/api/projects', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modal-create-project');
    e.target.reset();
    await loadProjects();
    showToast('Project created');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

async function loadTasks() {
  const projectId = document.getElementById('project-filter')?.value;
  const qs = projectId ? `?project_id=${projectId}` : '';
  try {
    tasks = await apiFetch(`/api/tasks${qs}`);
    renderTasks();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderTasks() {
  const statuses = ['todo', 'in_progress', 'in_review', 'done'];
  statuses.forEach(status => {
    const group = tasks.filter(t => t.status === status);
    document.getElementById(`count-${status}`).textContent = group.length;
    document.getElementById(`list-${status}`).innerHTML = group.map(task => `
      <div class="task-card card small">
        <div class="task-key">${escHtml(task.key)}</div>
        <div class="task-title">${escHtml(task.title)}</div>
        <div class="task-meta">
          <span class="priority-badge priority-${task.priority}">${task.priority}</span>
          ${task.assignedAgentType ? `<span class="agent-badge">${task.assignedAgentType}</span>` : ''}
          ${task.githubPrUrl ? `<a href="${escHtml(task.githubPrUrl)}" target="_blank" class="pr-link">PR #${task.githubPrNumber}</a>` : ''}
        </div>
      </div>
    `).join('');
  });
}

async function handleCreateTask(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {
    projectId:          Number(fd.get('projectId')),
    title:              fd.get('title'),
    description:        fd.get('description') || null,
    priority:           fd.get('priority'),
    assignedAgentType:  fd.get('assignedAgentType') || null,
  };
  try {
    await apiFetch('/api/tasks', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modal-create-task');
    e.target.reset();
    await loadTasks();
    showToast('Task created');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---------------------------------------------------------------------------
// Tenants
// ---------------------------------------------------------------------------

async function loadTenants() {
  try {
    tenants = await apiFetch('/api/tenants');
    renderTenants();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderTenants() {
  const grid = document.getElementById('tenants-grid');
  if (!tenants.length) {
    grid.innerHTML = emptyState('🏢', 'No tenants yet', 'Create your first tenant organisation');
    return;
  }
  grid.innerHTML = tenants.map(t => `
    <div class="card tenant-card">
      <div class="card-header">
        <span class="badge">${escHtml(t.slug)}</span>
        <span class="status-pill status-${t.status}">${t.status}</span>
      </div>
      <h3 class="card-title">${escHtml(t.name)}</h3>
      <div class="card-meta">${t.members?.length ?? 0} member(s)</div>
    </div>
  `).join('');
}

async function handleCreateTenant(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { name: fd.get('name'), ownerUserId: fd.get('ownerUserId') };
  try {
    await apiFetch('/api/tenants', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modal-create-tenant');
    e.target.reset();
    await loadTenants();
    showToast('Tenant created');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function syncProjectSelects() {
  const opts = projects.map(p => `<option value="${p.id}">${escHtml(p.key)} – ${escHtml(p.name)}</option>`).join('');
  /** @type {HTMLSelectElement} */
  const filter = document.getElementById('project-filter');
  const select = document.getElementById('inp-task-project');
  if (filter) {
    const currentFilter = filter.value;
    filter.innerHTML = '<option value="">All Projects</option>' + opts;
    filter.value = currentFilter;
  }
  if (select) select.innerHTML = opts;
}

function emptyState(icon, title, subtitle) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <div class="empty-title">${title}</div>
      <div class="empty-subtitle">${subtitle}</div>
    </div>`;
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {'success'|'error'} type */
function showToast(message, type = 'success') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.className = `toast ${type}`;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.className = 'toast hidden'; }, 3500);
}
