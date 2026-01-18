import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { CreateUserDto } from '../../application/dtos/users/create-user-param.dto';
import { CreateUserResult } from '../../application/dtos/users/create-user-result.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() dto: CreateUserDto) {
    // Implementation for creating a user
    const user = await this.createUserUseCase.execute(dto);
    return CreateUserResult.fromEntity(user);
  }
}