import { UserOrmEntity } from '../../entities/user.orm-entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { IUserRepository } from 'src/modules/user/domains/repositories/user.repository.interface';
import { User } from 'src/modules/user/domains/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async createUser(user: User): Promise<User> {
    const entity = this.repository.create({
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    await this.repository.update(id, {
      ...user,
      updatedAt: new Date(),
    });
    const updatedEntity = await this.repository.findOne({ where: { id } });
    return updatedEntity ? this.toDomain(updatedEntity) : null;
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { email } });
    return !!entity;
  }

  private toDomain(entity: UserOrmEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
    });
  }
}
