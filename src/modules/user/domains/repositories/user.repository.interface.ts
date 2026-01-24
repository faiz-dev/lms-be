import { PaginatedResult } from 'src/shared/domain/interfaces/paginated-result.interface';
import { CreateUserParam, User } from '../entities/user.entity';
import { FindManyOptions } from 'src/shared/domain/interfaces/find-many-options.interface';

export interface IUserRepository {
  findAll(params: FindManyOptions): Promise<PaginatedResult<User>>;
  findById(id: number): Promise<User | null>;
  createUser(user: CreateUserParam): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
  hardDeleteUser(id: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');
