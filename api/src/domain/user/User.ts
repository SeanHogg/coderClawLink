import { UserId } from '../shared/types';
import { ValidationError } from '../shared/errors';

export interface UserProps {
  id:         UserId;
  email:      string;
  apiKeyHash: string;
  createdAt:  Date;
}

/**
 * User aggregate root.
 *
 * A User authenticates via an API key which is stored as a SHA-256 hash.
 * The plaintext key is shown only once at creation time.
 */
export class User {
  private constructor(private readonly props: UserProps) {}

  static create(email: string, apiKeyHash: string): User {
    const e = email.toLowerCase().trim();
    if (!e.includes('@')) throw new ValidationError('Invalid email address');

    return new User({
      id:         crypto.randomUUID() as UserId,
      email:      e,
      apiKeyHash,
      createdAt:  new Date(),
    });
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  get id(): UserId      { return this.props.id; }
  get email(): string   { return this.props.email; }
  get apiKeyHash(): string { return this.props.apiKeyHash; }
  get createdAt(): Date { return this.props.createdAt; }

  toPlain(): UserProps { return { ...this.props }; }
}
