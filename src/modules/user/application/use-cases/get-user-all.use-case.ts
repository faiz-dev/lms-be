import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../domains/repositories/user.repository.interface';
import { User } from '../../domains/entities/user.entity';
import { QueryMapper } from 'src/shared/application/mappers/query.mapper';
import { TanstackQueryDto } from 'src/shared/infrastructure/dtos/tanstack-query.dto';
import { PaginatedResult } from 'src/shared/domain/interfaces/paginated-result.interface';

@Injectable()
export class GetUserAllUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(dto: TanstackQueryDto): Promise<PaginatedResult<User>> {
    const options = QueryMapper.toDomain(dto);

    const result = await this.userRepository.findAll(options);

    return result;
  }
}
