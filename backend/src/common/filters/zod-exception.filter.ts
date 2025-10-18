import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const zodError = exception.getZodError() as ZodError;

    const issues = zodError.issues.map((issue) => ({
      path: Array.isArray(issue.path)
        ? issue.path.join('.')
        : String(issue.path),
      messages: issue.message,
    }));

    const payload = {
      statusCode: 400,
      message: 'Validation failed',
      errors: issues,
    };

    return res.status(400).json(payload);
  }
}
