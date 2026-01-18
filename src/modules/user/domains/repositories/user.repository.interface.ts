import { CreateUserParam, User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  createUser(user: CreateUserParam): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | null>;
  deleteUser(id: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');
