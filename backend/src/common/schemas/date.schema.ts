import z from 'zod';

export const DateStringSchema = z
  .string()
  .transform((dateStr) => new Date(dateStr))
  .refine((date) => !isNaN(date.getTime()), {
    message: 'Data inválida.',
  });

