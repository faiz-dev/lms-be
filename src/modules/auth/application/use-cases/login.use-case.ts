import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from 'src/modules/user/domains/repositories/user.repository.interface';
import {
  AUTH_SERVICE_TOKEN,
  type IAuthService,
} from '../../domain/interfaces/auth-service.interface';
import { LoginDto } from '../dtos/login.dto';
import { LoginResultDto } from '../dtos/login-result.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResultDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await this.authService.authenticate(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.authService.generateToken(user);

    return LoginResultDto.fromDomain(user, token);
  }
}
