import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IAuthenticatedUser } from '../../domain/interfaces/authenticated-user.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = IAuthenticatedUser>(err: any, user: any): TUser {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Session has expired or is invalid, please log in again',
        )
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user as TUser;
  }
}
