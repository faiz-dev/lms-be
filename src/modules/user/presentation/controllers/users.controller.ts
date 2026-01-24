import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { CreateUserDto } from '../../application/dtos/users/create-user-param.dto';
import { CreateUserResult } from '../../application/dtos/users/create-user-result.dto';
import { UpdateUserParam } from '../../application/dtos/users/update-user-param.dto';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { ResponseMessage } from 'src/shared/infrastructure/decorators/response-message.decorator';
import { TanstackQueryDto } from 'src/shared/infrastructure/dtos/tanstack-query.dto';
import { GetUserAllUseCase } from '../../application/use-cases/get-user-all.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserAllUseCase: GetUserAllUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() dto: CreateUserDto) {
    // Implementation for creating a user
    const user = await this.createUserUseCase.execute(dto);
    return CreateUserResult.fromEntity(user);
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') id: number) {
    // Implementation for getting a user
    const user = await this.getUserUseCase.execute(id);
    return CreateUserResult.fromEntity(user);
  }

  @Patch(':id')
  @HttpCode(200)
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserParam) {
    // Implementation for updating a user
    const user = await this.updateUserUseCase.execute(id, dto);
    return CreateUserResult.fromEntity(user);
  }

  @Delete(':id')
  @HttpCode(200)
  @ResponseMessage('User deleted successfully')
  async deleteUser(@Param('id') id: number) {
    // Implementation for deleting a user
    await this.deleteUserUseCase.execute(id);
    return null;
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(@Query() query: TanstackQueryDto) {
    // Implementation for getting all users
    // This method is left unimplemented as per the provided code snippets
    const result = this.getUserAllUseCase.execute(query);

    return result;
  }
}
