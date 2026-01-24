import { createParamDecorator } from '@nestjs/common';
import { IAuthenticatedUser } from '../../domain/interfaces/authenticated-user.interface';

export const CurrentUser = createParamDecorator(
  (_, ctx): IAuthenticatedUser | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as IAuthenticatedUser;
    return user;
  },
);
