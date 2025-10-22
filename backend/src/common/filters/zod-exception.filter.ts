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

    const issues = this.formatZodError(zodError);

    const payload = {
      statusCode: 400,
      message: 'Validação falhou',
      errors: issues,
    };

    return res.status(400).json(payload);
  }

  private formatZodError(zodError: ZodError) {
    const errorsMap: Record<string, string[]> = {};

    zodError.issues.map((issue) => {
      const path = issue.path.join('.') || 'root';

      if (!errorsMap[path]) {
        errorsMap[path] = [];
      }

      errorsMap[path].push(issue.message);
    });

    return errorsMap;
  }
}
