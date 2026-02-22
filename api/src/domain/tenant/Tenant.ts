import { TenantId, TenantStatus, TenantRole } from '../shared/types';
import { ValidationError, ForbiddenError } from '../shared/errors';

export interface TenantMemberProps {
  userId: string;
  role: TenantRole;
  isActive: boolean;
  joinedAt: Date;
}

export interface TenantProps {
  id: TenantId;
  name: string;
  slug: string;
  status: TenantStatus;
  members: TenantMemberProps[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tenant aggregate root.
 *
 * Encapsulates multi-tenant isolation: a Tenant owns Projects.
 * Members are entities owned by the Tenant aggregate.
 */
export class Tenant {
  private constructor(private readonly props: TenantProps) {}

  // ------------------------------------------------------------------
  // Factory methods
  // ------------------------------------------------------------------

  static create(
    name: string,
    ownerUserId: string,
  ): Tenant {
    if (!name.trim()) throw new ValidationError('Tenant name is required');

    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const now = new Date();

    return new Tenant({
      id: 0 as TenantId,
      name: name.trim(),
      slug,
      status: TenantStatus.ACTIVE,
      members: [
        { userId: ownerUserId, role: TenantRole.OWNER, isActive: true, joinedAt: now },
      ],
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: TenantProps): Tenant {
    return new Tenant(props);
  }

  // ------------------------------------------------------------------
  // Accessors
  // ------------------------------------------------------------------

  get id(): TenantId { return this.props.id; }
  get name(): string { return this.props.name; }
  get slug(): string { return this.props.slug; }
  get status(): TenantStatus { return this.props.status; }
  get members(): readonly TenantMemberProps[] { return this.props.members; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // ------------------------------------------------------------------
  // Behaviour
  // ------------------------------------------------------------------

  getMember(userId: string): TenantMemberProps | undefined {
    return this.props.members.find(m => m.userId === userId && m.isActive);
  }

  canManageMembers(actorUserId: string): boolean {
    const member = this.getMember(actorUserId);
    return member?.role === TenantRole.OWNER || member?.role === TenantRole.MANAGER;
  }

  addMember(actorUserId: string, newUserId: string, role: TenantRole): Tenant {
    if (!this.canManageMembers(actorUserId)) {
      throw new ForbiddenError('Only owners and managers can add members');
    }
    if (this.getMember(newUserId)) {
      throw new ValidationError(`User '${newUserId}' is already a member`);
    }
    return new Tenant({
      ...this.props,
      members: [
        ...this.props.members,
        { userId: newUserId, role, isActive: true, joinedAt: new Date() },
      ],
      updatedAt: new Date(),
    });
  }

  removeMember(actorUserId: string, targetUserId: string): Tenant {
    if (!this.canManageMembers(actorUserId)) {
      throw new ForbiddenError('Only owners and managers can remove members');
    }
    return new Tenant({
      ...this.props,
      members: this.props.members.map(m =>
        m.userId === targetUserId ? { ...m, isActive: false } : m,
      ),
      updatedAt: new Date(),
    });
  }

  suspend(): Tenant {
    return new Tenant({ ...this.props, status: TenantStatus.SUSPENDED, updatedAt: new Date() });
  }

  toPlain(): TenantProps {
    return { ...this.props, members: [...this.props.members] };
  }
}
