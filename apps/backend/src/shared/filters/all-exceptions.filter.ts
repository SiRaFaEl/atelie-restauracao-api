import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private extractResponse(exception: unknown): {
    message: string;
    errors?: Record<string, string[]>;
  } {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') return { message: response };
      if (typeof response === 'object' && response && 'message' in response) {
        const body = response as {
          message: string | string[];
          errors?: Record<string, string[]>;
        };
        return {
          message: Array.isArray(body.message)
            ? body.message.join(' ')
            : body.message,
          errors: body.errors,
        };
      }
    }
    return { message: 'Erro interno do servidor' };
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = this.extractResponse(exception);
    response.status(status).json({
      statusCode: status,
      message: body.message,
      ...(body.errors ? { errors: body.errors } : {}),
      timestamp: new Date().toISOString(),
    });
  }
}
