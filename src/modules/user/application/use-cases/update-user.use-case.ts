import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users/create-user-param.dto';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../domains/repositories/user.repository.interface';
import { User } from '../../domains/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, dto: CreateUserDto): Promise<User> {
    // check if user already exists
    const existingUser = await this.userRepository.existsByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // create user entity
    const user = User.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });

    return await this.userRepository.createUser(user);
  }
}
