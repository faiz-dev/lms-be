import { User } from 'src/modules/user/domains/entities/user.entity';
import { AuthToken } from '../../domain/value-objects/auth-token.vo';

export class UserProfileDto {
  id: string;
  email: string;
  role: string;
}

export class LoginResultDto {
  user: UserProfileDto;
  token: {
    accessToken: string;
    expireIn: number;
    tokenType: string;
  };

  static fromDomain(user: User, token: AuthToken): LoginResultDto {
    return {
      user: {
        id: user.id!.toString(),
        email: user.email,
        role: user.role,
      },
      token: {
        accessToken: token.accessToken,
        expireIn: token.expireIn,
        tokenType: token.tokenType,
      },
    };
  }
}
