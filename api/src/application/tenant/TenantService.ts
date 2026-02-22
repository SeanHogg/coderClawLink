import { ITenantRepository } from '../../domain/tenant/ITenantRepository';
import { Tenant } from '../../domain/tenant/Tenant';
import { TenantRole, asTenantId } from '../../domain/shared/types';
import { NotFoundError, ConflictError } from '../../domain/shared/errors';

export interface CreateTenantDto {
  name: string;
  ownerUserId: string;
}

/**
 * Application service: orchestrates Tenant use cases.
 */
export class TenantService {
  constructor(private readonly tenants: ITenantRepository) {}

  async listTenants(): Promise<Tenant[]> {
    return this.tenants.findAll();
  }

  async getTenant(id: number): Promise<Tenant> {
    const tenant = await this.tenants.findById(asTenantId(id));
    if (!tenant) throw new NotFoundError('Tenant', id);
    return tenant;
  }

  async createTenant(dto: CreateTenantDto): Promise<Tenant> {
    const slug = dto.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.tenants.findBySlug(slug);
    if (existing) {
      throw new ConflictError(`A tenant with name '${dto.name}' already exists`);
    }

    const tenant = Tenant.create(dto.name, dto.ownerUserId);
    return this.tenants.save(tenant);
  }

  async addMember(
    tenantId: number,
    actorUserId: string,
    newUserId: string,
    role: TenantRole,
  ): Promise<Tenant> {
    const tenant = await this.getTenant(tenantId);
    const updated = tenant.addMember(actorUserId, newUserId, role);
    return this.tenants.update(updated);
  }

  async removeMember(
    tenantId: number,
    actorUserId: string,
    targetUserId: string,
  ): Promise<Tenant> {
    const tenant = await this.getTenant(tenantId);
    const updated = tenant.removeMember(actorUserId, targetUserId);
    return this.tenants.update(updated);
  }

  async deleteTenant(id: number): Promise<void> {
    await this.getTenant(id);
    await this.tenants.delete(asTenantId(id));
  }
}
