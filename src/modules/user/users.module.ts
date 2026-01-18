import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { UsersController } from './presentation/controllers/users.controller';
import { PASSWORD_HASHER_TOKEN } from './domains/services/password-hasher.interface';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password.hasher';
import { USER_REPOSITORY_TOKEN } from './domains/repositories/user.repository.interface';
import { TypeOrmUserRepository } from './infrastructure/database/repositories/typeorm/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    { provide: PASSWORD_HASHER_TOKEN, useClass: BcryptPasswordHasher },
    { provide: USER_REPOSITORY_TOKEN, useClass: TypeOrmUserRepository}
  ],
})
export class UsersModule { }
