import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users/create-user-param.dto';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../domains/repositories/user.repository.interface';
import { User } from '../../domains/entities/user.entity';
import {
  PASSWORD_HASHER_TOKEN,
  type IPasswordHasher,
} from '../../domains/services/password-hasher.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // check if user already exists
    const existingUser = await this.userRepository.existsByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    // create user entity
    const user = User.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    return await this.userRepository.createUser(user);
  }
}
