import { User } from 'src/modules/user/domains/entities/user.entity';
import { IAuthService } from '../../domain/interfaces/auth-service.interface';
import { AuthToken } from '../../domain/value-objects/auth-token.vo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) { }

  authenticate(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  verifyToken(token: string): Promise<User | null> {
    try {
      return this.jwtService.verifyAsync<User>(token);
    } catch {
      return Promise.resolve(null);
    }
  }

  generateToken(user: User): AuthToken {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return new AuthToken(token, 3600, 'Bearer');

  }
}
