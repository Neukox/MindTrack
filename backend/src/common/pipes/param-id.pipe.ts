import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ParamIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {

    if (metadata.type !== 'param' && metadata.data !== 'id') {
      return value;
    }

    const ParamIdSchema = z.cuid();

    const parseResult = ParamIdSchema.safeParse(value);

    if (!parseResult.success) {
      throw new BadRequestException('Parâmetro ID inválido.');
    }

    return parseResult.data;
  }
}