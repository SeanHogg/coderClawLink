import { html, type TemplateResult } from "lit";
import type { Task, TaskStatus } from "../api.js";

export interface TaskKanbanRenderOptions {
  tasks: Task[];
  statuses: readonly TaskStatus[];
  statusLabels: Record<TaskStatus, string>;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, status: TaskStatus) => void | Promise<void>;
  renderCard: (task: Task) => TemplateResult;
  renderColumnFooter?: (status: TaskStatus) => TemplateResult | null;
}

export function renderTaskKanban(options: TaskKanbanRenderOptions): TemplateResult {
  return html`
    <div class="kanban">
      ${options.statuses.map((status) => {
        const tasksForStatus = options.tasks.filter((task) => task.status === status);
        return html`
          <div class="kanban-col" @dragover=${options.onDragOver} @drop=${(e: DragEvent) => options.onDrop(e, status)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${options.statusLabels[status]}</div>
              <div class="kanban-col-count">${tasksForStatus.length}</div>
            </div>
            <div class="kanban-col-body">
              ${tasksForStatus.map((task) => options.renderCard(task))}
              ${options.renderColumnFooter ? options.renderColumnFooter(status) : ""}
            </div>
          </div>
        `;
      })}
    </div>
  `;
}
