import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

export function generateDto<T extends z.ZodType>(schema: T) {
  const dtoClass = createZodDto(schema);
  return dtoClass;
}
