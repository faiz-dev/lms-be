import { UserOrmEntity } from '../../entities/user.orm-entity';
import { IUserRepository } from 'src/modules/user/domains/repositories/user.repository.interface';
import { User } from 'src/modules/user/domains/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResult } from 'src/shared/domain/interfaces/paginated-result.interface';
import { FindManyOptions } from 'src/shared/domain/interfaces/find-many-options.interface';
import { TypeOrmQueryHelper } from 'src/shared/infrastructure/database/typeorm-query.helper';
import { PaginationResultMapper } from 'src/shared/application/mappers/pagination-result.mapper';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) { }

  async findAll(params: FindManyOptions): Promise<PaginatedResult<User>> {
    // 1. Inisialisasi query builder
    const query = this.repository.createQueryBuilder('users');

    // 2. Konfigurasi Mapping field
    const fieldMapping = {
      email: 'users.email',
      role: 'users.role',
      createdAt: 'users.created_at',
    };

    // 3. Konfigurasi searchable fields
    const searchableFields = ['users.email'];

    // 4. Apply options menggunakan helper
    TypeOrmQueryHelper.applyOptions(
      query,
      params,
      fieldMapping,
      searchableFields,
    );

    // 5. Default jika user tidak minta sorting
    if (!params.sorting || params.sorting.length === 0) {
      query.addOrderBy('users.created_at', 'DESC');
    }

    // 6. Eksekusi query
    const [data, totalItems] = await query.getManyAndCount();

    // 7. Map ke domain entity
    const domainData = data.map((entity) => this.toDomain(entity));

    // 8. Kembalikan dalam format paginated result
    const limit = params.pagination?.limit ?? totalItems;
    const offset = params.pagination?.offset ?? 0;

    // 9. Gunakan PaginationResultMapper untuk mengembalikan hasil
    return PaginationResultMapper.toResult<User>(
      domainData,
      totalItems,
      offset,
      limit,
    );
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async createUser(user: User): Promise<User> {
    const entity = this.repository.create({
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    // 1. Ambil data lama
    const existingUserOrm = await this.repository.findOne({ where: { id } });

    if (!existingUserOrm) {
      throw new NotFoundException('User not found');
    }

    // 2. Siapkan data yang akan diupdate`
    this.repository.merge(existingUserOrm, {
      ...(user.email !== undefined && { email: user.email }),
      ...(user.password !== undefined && { password: user.password }),
      ...(user.role !== undefined && { role: user.role }),
      updatedAt: new Date(),
    });

    // 3. Simpan perubahan
    const updatedEntity = await this.repository.save(existingUserOrm);

    // 4. Kembalikan entitas dalam bentuk domain
    return this.toDomain(updatedEntity);
  }

  async deleteUser(id: number): Promise<void> {
    const { affected } = await this.repository.softDelete(id);
    if (affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async hardDeleteUser(id: number): Promise<void> {
    const { affected } = await this.repository.delete(id);
    if (affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { email } });
    return !!entity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entityOrm = await this.repository.findOne({ where: { email } });
    return entityOrm ? this.toDomain(entityOrm) : null;
  }

  private toDomain(entity: UserOrmEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
      deletedAt: entity.deletedAt ?? null,
    });
  }
}
