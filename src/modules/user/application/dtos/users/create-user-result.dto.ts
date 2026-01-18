import { User } from 'src/modules/user/domains/entities/user.entity';

export class CreateUserResult {
  id: number;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt?: string | null;


  constructor(user: CreateUserResult) {
    Object.assign(this, user);
  }

  static fromEntity(user: User): CreateUserResult {
    return new CreateUserResult({
      id: user.id!,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    });
  }
}
