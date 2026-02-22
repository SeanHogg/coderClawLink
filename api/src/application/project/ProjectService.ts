import { IProjectRepository } from '../../domain/project/IProjectRepository';
import { Project } from '../../domain/project/Project';
import { ProjectId, ProjectStatus, asProjectId } from '../../domain/shared/types';
import { NotFoundError, ConflictError } from '../../domain/shared/errors';

export interface CreateProjectDto {
  key: string;
  name: string;
  description?: string | null;
  githubRepoUrl?: string | null;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
  githubRepoUrl?: string | null;
}

/**
 * Application service: orchestrates Project use cases.
 *
 * Depends only on the repository *interface* (Dependency Inversion Principle).
 * Contains no infrastructure concerns (SQL, HTTP, etc.).
 */
export class ProjectService {
  constructor(private readonly projects: IProjectRepository) {}

  async listProjects(): Promise<Project[]> {
    return this.projects.findAll();
  }

  async getProject(id: number): Promise<Project> {
    const project = await this.projects.findById(asProjectId(id));
    if (!project) throw new NotFoundError('Project', id);
    return project;
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    const existing = await this.projects.findByKey(dto.key.trim().toUpperCase());
    if (existing) {
      throw new ConflictError(`Project key '${dto.key.toUpperCase()}' is already taken`);
    }

    const { githubRepoOwner, githubRepoName } = parseGithubUrl(dto.githubRepoUrl ?? null);

    const project = Project.create({
      key: dto.key,
      name: dto.name,
      description: dto.description ?? null,
      status: ProjectStatus.ACTIVE,
      githubRepoUrl: dto.githubRepoUrl ?? null,
      githubRepoOwner,
      githubRepoName,
    });

    return this.projects.save(project);
  }

  async updateProject(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.getProject(id);

    const { githubRepoOwner, githubRepoName } = dto.githubRepoUrl !== undefined
      ? parseGithubUrl(dto.githubRepoUrl)
      : { githubRepoOwner: project.githubRepoOwner, githubRepoName: project.githubRepoName };

    const updated = project.update({
      name: dto.name,
      description: dto.description,
      status: dto.status,
      githubRepoUrl: dto.githubRepoUrl,
      githubRepoOwner,
      githubRepoName,
    });

    return this.projects.update(updated);
  }

  async deleteProject(id: number): Promise<void> {
    await this.getProject(id); // throws NotFoundError if missing
    await this.projects.delete(asProjectId(id));
  }
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function parseGithubUrl(
  url: string | null,
): { githubRepoOwner: string | null; githubRepoName: string | null } {
  if (!url) return { githubRepoOwner: null, githubRepoName: null };
  try {
    const parts = new URL(url).pathname.replace(/^\//, '').replace(/\.git$/, '').split('/');
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return { githubRepoOwner: parts[0], githubRepoName: parts[1] };
    }
  } catch {
    // fall through
  }
  return { githubRepoOwner: null, githubRepoName: null };
}
