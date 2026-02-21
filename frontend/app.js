// AI Agent Orchestrator Portal - Frontend JavaScript

const API_BASE_URL = 'https://api.coderclaw.ai/api';

// State
let projects = [];
let tasks = [];
let agents = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadProjects();
    loadTasks();
    loadAgents();
});

// Navigation
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
}

function switchView(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.toggle('active', view.id === `${viewName}-view`);
    });
}

// Projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        projects = await response.json();
        renderProjects();
        updateProjectSelects();
    } catch (error) {
        console.error('Error loading projects:', error);
        showError('Failed to load projects');
    }
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    
    if (projects.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">No projects yet</div>
                <div class="empty-state-subtext">Create your first project to get started</div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="viewProject(${project.id})">
            <div class="project-header">
                <span class="project-key">${project.key}</span>
                <h3 class="project-name">${project.name}</h3>
            </div>
            ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
            <div class="project-meta">
                <span>Status: ${project.status}</span>
            </div>
            ${project.github_repo_url ? `
                <div class="project-github">
                    🔗 ${project.github_repo_owner}/${project.github_repo_name}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function showCreateProjectModal() {
    document.getElementById('create-project-modal').classList.add('show');
}

async function createProject(event) {
    event.preventDefault();
    
    const formData = {
        key: document.getElementById('project-key').value.toUpperCase(),
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-description').value,
        github_repo_url: document.getElementById('project-github-url').value || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            closeModal('create-project-modal');
            document.getElementById('create-project-form').reset();
            await loadProjects();
            showSuccess('Project created successfully!');
        } else {
            const error = await response.json();
            showError(error.detail || 'Failed to create project');
        }
    } catch (error) {
        console.error('Error creating project:', error);
        showError('Failed to create project');
    }
}

function viewProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        // Switch to tasks view and filter by project
        document.getElementById('project-filter').value = projectId;
        switchView('tasks');
        loadTasks();
    }
}

// Tasks
async function loadTasks() {
    const projectId = document.getElementById('project-filter')?.value;
    const url = projectId ? `${API_BASE_URL}/tasks?project_id=${projectId}` : `${API_BASE_URL}/tasks`;
    
    try {
        const response = await fetch(url);
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Failed to load tasks');
    }
}

function renderTasks() {
    // Clear all lists
    ['todo', 'in-progress', 'in-review', 'done'].forEach(status => {
        document.getElementById(`${status}-list`).innerHTML = '';
        document.getElementById(`${status}-count`).textContent = '0';
    });
    
    // Group tasks by status
    const grouped = {
        'todo': tasks.filter(t => t.status === 'todo'),
        'in_progress': tasks.filter(t => t.status === 'in_progress'),
        'in_review': tasks.filter(t => t.status === 'in_review'),
        'done': tasks.filter(t => t.status === 'done')
    };
    
    // Render each group
    Object.entries(grouped).forEach(([status, statusTasks]) => {
        const listId = status.replace('_', '-') + '-list';
        const countId = status.replace('_', '-') + '-count';
        
        document.getElementById(countId).textContent = statusTasks.length;
        
        if (statusTasks.length > 0) {
            document.getElementById(listId).innerHTML = statusTasks.map(task => `
                <div class="task-card" onclick="viewTask(${task.id})">
                    <div class="task-key">${task.key}</div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                        ${task.assigned_agent_type ? `<span class="agent-badge">${task.assigned_agent_type}</span>` : ''}
                        ${task.github_pr_url ? '<span>🔗 PR</span>' : ''}
                    </div>
                </div>
            `).join('');
        }
    });
}

function showCreateTaskModal() {
    document.getElementById('create-task-modal').classList.add('show');
}

async function createTask(event) {
    event.preventDefault();
    
    const formData = {
        project_id: parseInt(document.getElementById('task-project').value),
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value || null,
        priority: document.getElementById('task-priority').value,
        assigned_agent_type: document.getElementById('task-agent').value || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            closeModal('create-task-modal');
            document.getElementById('create-task-form').reset();
            await loadTasks();
            showSuccess('Task created successfully!');
        } else {
            const error = await response.json();
            showError(error.detail || 'Failed to create task');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        showError('Failed to create task');
    }
}

async function viewTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const project = projects.find(p => p.id === task.project_id);
    
    document.getElementById('task-detail-title').textContent = task.key;
    document.getElementById('task-detail-content').innerHTML = `
        <div class="task-detail-section">
            <h4>Title</h4>
            <div>${task.title}</div>
        </div>
        
        <div class="task-detail-section">
            <h4>Description</h4>
            <div>${task.description || 'No description'}</div>
        </div>
        
        <div class="task-detail-section">
            <h4>Details</h4>
            <div>
                <p><strong>Project:</strong> ${project ? project.name : 'Unknown'}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${task.status.replace('_', '-')}">${task.status}</span></p>
                <p><strong>Priority:</strong> <span class="priority-badge priority-${task.priority}">${task.priority}</span></p>
                ${task.assigned_agent_type ? `<p><strong>Agent:</strong> <span class="agent-badge">${task.assigned_agent_type}</span></p>` : ''}
                ${task.github_pr_url ? `<p><strong>Pull Request:</strong> <a href="${task.github_pr_url}" target="_blank">#${task.github_pr_number}</a></p>` : ''}
            </div>
        </div>
        
        <div class="task-actions">
            ${!task.github_pr_url && project?.github_repo_url ? `
                <button class="btn btn-primary" onclick="createPRForTask(${task.id})">Create PR</button>
            ` : ''}
            ${task.assigned_agent_type ? `
                <button class="btn btn-success" onclick="executeTask(${task.id}, '${task.assigned_agent_type}')">Execute with ${task.assigned_agent_type}</button>
            ` : ''}
            <button class="btn btn-secondary" onclick="closeModal('task-detail-modal')">Close</button>
        </div>
    `;
    
    document.getElementById('task-detail-modal').classList.add('show');
}

async function executeTask(taskId, agentType) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const prompt = `Task: ${task.title}\n\nDescription: ${task.description || 'No description'}\n\nPlease generate code or solution for this task.`;
    
    showLoading('Executing task with agent...');
    
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task_id: taskId,
                agent_type: agentType,
                prompt: prompt
            })
        });
        
        if (response.ok) {
            await loadTasks();
            closeModal('task-detail-modal');
            showSuccess('Task executed successfully!');
        } else {
            const error = await response.json();
            showError(error.detail || 'Failed to execute task');
        }
    } catch (error) {
        console.error('Error executing task:', error);
        showError('Failed to execute task');
    }
}

async function createPRForTask(taskId) {
    showLoading('Creating pull request...');
    
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/create_pr`, {
            method: 'POST'
        });
        
        if (response.ok) {
            const result = await response.json();
            await loadTasks();
            closeModal('task-detail-modal');
            showSuccess(`Pull request created: #${result.pr_number}`);
        } else {
            const error = await response.json();
            showError(error.detail || 'Failed to create pull request');
        }
    } catch (error) {
        console.error('Error creating PR:', error);
        showError('Failed to create pull request');
    }
}

// Agents
async function loadAgents() {
    try {
        const [availableResponse, typesResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/agents/available`),
            fetch(`${API_BASE_URL}/agents/types`)
        ]);
        
        const availableAgents = await availableResponse.json();
        const allAgentTypes = await typesResponse.json();
        
        agents = allAgentTypes.map(type => ({
            type,
            available: availableAgents.includes(type)
        }));
        
        renderAgents();
    } catch (error) {
        console.error('Error loading agents:', error);
        showError('Failed to load agents');
    }
}

function renderAgents() {
    const grid = document.getElementById('agents-grid');
    
    const agentIcons = {
        'auggie': '🤖',
        'claude': '🧠',
        'opendevin': '🔨',
        'goose': '🦆',
        'ollama': '🦙'
    };
    
    grid.innerHTML = agents.map(agent => `
        <div class="agent-card ${agent.available ? 'available' : 'unavailable'}">
            <div class="agent-icon">${agentIcons[agent.type] || '🤖'}</div>
            <div class="agent-name">${agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}</div>
            <span class="agent-status ${agent.available ? 'available' : 'unavailable'}">
                ${agent.available ? '✓ Available' : '✗ Not Configured'}
            </span>
        </div>
    `).join('');
}

// Helper functions
function updateProjectSelects() {
    const selects = ['project-filter', 'task-project'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const currentValue = select.value;
        
        // Keep first option, update rest
        const firstOption = select.options[0];
        select.innerHTML = '';
        if (firstOption) select.appendChild(firstOption);
        
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `[${project.key}] ${project.name}`;
            select.appendChild(option);
        });
        
        select.value = currentValue;
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function showSuccess(message) {
    alert(message); // In production, use a proper notification system
}

function showError(message) {
    alert('Error: ' + message); // In production, use a proper notification system
}

function showLoading(message) {
    console.log('Loading:', message); // In production, show a loading overlay
}

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
