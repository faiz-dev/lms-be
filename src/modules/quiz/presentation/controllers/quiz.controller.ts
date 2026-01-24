import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { type IAuthenticatedUser } from 'src/modules/auth/domain/interfaces/authenticated-user.interface';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';

@Controller('quizes')
export class QuizController {
  constructor() { }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getQuizes(@CurrentUser() user: IAuthenticatedUser) {
    console.log('Authenticated user:', user);
    return Promise.resolve([{ id: 1, title: 'Sample Quiz' }]);
  }
}
