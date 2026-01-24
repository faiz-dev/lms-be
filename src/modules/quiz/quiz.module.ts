import { Module } from '@nestjs/common';
import { QuizController } from './presentation/controllers/quiz.controller';

@Module({
  controllers: [QuizController],
})
export class QuizModule {}