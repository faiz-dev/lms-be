import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserResult } from '../dtos/users/create-user-result.dto';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../domains/repositories/user.repository.interface';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(id: number): Promise<CreateUserResult> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return CreateUserResult.fromEntity(user);
  }
}
