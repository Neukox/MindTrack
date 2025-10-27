import z from 'zod';
import { DateStringSchema } from '@/common/schemas/date.schema';
import { generateDto } from '@/common/dto/dto-generator';

export const periodDateSchema = z
  .object({
    startDate: DateStringSchema,
    endDate: DateStringSchema,
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: 'A data de início deve ser anterior ou igual à data de término.',
    path: ['startDate'],
  });

export default class PeriodDateDto extends generateDto(periodDateSchema) {}
