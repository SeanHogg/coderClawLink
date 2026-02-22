import { eq } from 'drizzle-orm';
import { IUserRepository } from '../../domain/user/IUserRepository';
import { User, UserProps } from '../../domain/user/User';
import { UserId } from '../../domain/shared/types';
import { users as usersTable } from '../database/schema';
import type { Db } from '../database/connection';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Db) {}

  async findById(id: UserId): Promise<User | null> {
    const [row] = await this.db
      .select().from(usersTable)
      .where(eq(usersTable.id, id)).limit(1);
    return row ? toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.db
      .select().from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase())).limit(1);
    return row ? toDomain(row) : null;
  }

  async findByApiKeyHash(hash: string): Promise<User | null> {
    const [row] = await this.db
      .select().from(usersTable)
      .where(eq(usersTable.apiKeyHash, hash)).limit(1);
    return row ? toDomain(row) : null;
  }

  async save(user: User): Promise<User> {
    const plain = user.toPlain();
    const [inserted] = await this.db
      .insert(usersTable)
      .values({
        id:         plain.id,
        email:      plain.email,
        apiKeyHash: plain.apiKeyHash,
      })
      .returning();
    return toDomain(inserted);
  }
}

function toDomain(row: typeof usersTable.$inferSelect): User {
  return User.reconstitute({
    id:         row.id as UserProps['id'],
    email:      row.email,
    apiKeyHash: row.apiKeyHash,
    createdAt:  row.createdAt,
  });
}
