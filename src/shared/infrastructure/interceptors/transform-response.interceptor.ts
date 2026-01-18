import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        // 1. ambil object response dari context untuk dapat status code
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = response.statusCode;

        // 2. ambil message dari metadata (decorator) jika ada
        const message =
          this.reflector.get<string>(
            REPONSE_MESSAGE_KEY,
            context.getHandler(),
          ) || 'Success';

        // 3. bentuk response sesuai interface ApiResponse
        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}