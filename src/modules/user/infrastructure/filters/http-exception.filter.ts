import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // logging
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // jika error 500 maka catat sebagai error lengkap
      this.logger.error(
        `Error ${status} on ${request.method} ${request.url}: ${JSON.stringify(message)}`,
        exception instanceof Error ? exception.stack : '',
      );
    } else {
      // jika error biasa maka catat saja
      this.logger.warn(
        `Error ${status} on ${request.method} ${request.url}: ${JSON.stringify(message)}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
