import { IUserRepository } from '../../domain/user/IUserRepository';
import { User } from '../../domain/user/User';
import { AuditEventType } from '../../domain/shared/types';
import { UnauthorizedError, ConflictError } from '../../domain/shared/errors';
import { signJwt } from '../../infrastructure/auth/JwtService';
import { hashSecret, generateApiKey } from '../../infrastructure/auth/HashService';
import { IAuditRepository } from '../../domain/audit/IAuditRepository';
import { AuditEvent } from '../../domain/audit/AuditEvent';
import { ITenantRepository } from '../../domain/tenant/ITenantRepository';
import { TenantRole, asTenantId } from '../../domain/shared/types';

export interface RegisterDto {
  email:    string;
  tenantId: number;
}

export interface RegisterResult {
  user:   { id: string; email: string };
  apiKey: string; // shown once – plaintext
}

export interface LoginResult {
  token:     string;
  expiresIn: number;
}

/**
 * AuthService handles user registration (API key issuance) and login.
 *
 * Authentication flow:
 *   1. Registration: generate API key, hash it, store hash. Return plaintext once.
 *   2. Login: client sends `Authorization: Bearer <apiKey>`.
 *              We hash it, find matching user, issue a short-lived JWT.
 *   3. Subsequent requests: client sends `Authorization: Bearer <jwt>`.
 *              jwtMiddleware verifies + injects userId/tenantId/role into context.
 */
export class AuthService {
  constructor(
    private readonly users:   IUserRepository,
    private readonly tenants: ITenantRepository,
    private readonly audit:   IAuditRepository,
    private readonly jwtSecret: string,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResult> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) throw new ConflictError(`Email '${dto.email}' is already registered`);

    const tenant = await this.tenants.findById(asTenantId(dto.tenantId));
    if (!tenant) throw new UnauthorizedError('Tenant not found');

    const apiKey = generateApiKey();
    const hash   = await hashSecret(apiKey);
    const user   = await this.users.save(User.create(dto.email, hash));

    await this.audit.save(AuditEvent.create({
      tenantId:     asTenantId(dto.tenantId),
      userId:       user.id,
      eventType:    AuditEventType.USER_REGISTERED,
      resourceType: 'user',
      resourceId:   user.id,
      metadata:     null,
    }));

    return { user: { id: user.id, email: user.email }, apiKey };
  }

  async login(rawApiKey: string, tenantId: number): Promise<LoginResult> {
    const hash = await hashSecret(rawApiKey);

    // Find all users isn't scalable – in production, add a UNIQUE index on api_key_hash.
    // For now we rely on findByApiKeyHash if the repo exposes it, or hash+compare.
    // We store hash in users table so we do a direct lookup by hash.
    const user = await this.users.findByApiKeyHash(hash);
    if (!user) throw new UnauthorizedError('Invalid API key');

    // Resolve caller's role in the requested tenant.
    const tenant = await this.tenants.findById(asTenantId(tenantId));
    if (!tenant) throw new UnauthorizedError('Tenant not found');

    const member = tenant.getMember(user.id);
    if (!member) throw new UnauthorizedError('User is not a member of this tenant');

    const expiresIn = 3600;
    const token = await signJwt(
      { sub: user.id, tid: tenantId, role: member.role },
      this.jwtSecret,
      expiresIn,
    );

    await this.audit.save(AuditEvent.create({
      tenantId:     asTenantId(tenantId),
      userId:       user.id,
      eventType:    AuditEventType.USER_LOGIN,
      resourceType: 'user',
      resourceId:   user.id,
      metadata:     null,
    }));

    return { token, expiresIn };
  }
}
