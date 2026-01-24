import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../domains/repositories/user.repository.interface';
import { User } from '../../domains/entities/user.entity';
import { UpdateUserParam } from '../dtos/users/update-user-param.dto';
import {
  PASSWORD_HASHER_TOKEN,
  type IPasswordHasher,
} from '../../domains/services/password-hasher.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher, // Replace 'any' with the actual type of your password hasher service
  ) { }

  async execute(id: number, dto: UpdateUserParam): Promise<User> {

    // LOGIC 1: CEK EMAIL (Kondisional)
    if (dto.email) {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException(
          'User with this email already assigned to another account',
        );
      }
    }

    // LOGIC 2: HASH PASSWORD (Kondisional)
    if (dto.password) {
      // Here you would hash the password using your password hasher service
      // For example:
      dto.password = await this.passwordHasher.hash(dto.password);
    }

    // check if user already exists
    return await this.userRepository.updateUser(id, dto);
  }
}
