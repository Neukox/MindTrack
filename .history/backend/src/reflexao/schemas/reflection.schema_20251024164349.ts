import { DateStringSchema } from '@/common/schemas/date.schema';
import { Category, Emotion } from '@generated/prisma';
import z from 'zod';

export const CategoryEnum = z.enum(Category, {
  error: 'Categoria inválida.',
});

export const EmotionEnum = z.enum(Emotion, {
  error: 'Emoção inválida.',
});

export const ReflectionSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  category: CategoryEnum,
  content: z.string().min(1, 'O conteúdo é obrigatório.'),
  emotion: EmotionEnum,
  userId: z.cuid('ID de usuário inválido.').optional(),
});

export const ReflectionFilterSchema = z
  .object({
    category: CategoryEnum.optional(),
    emotion: EmotionEnum.optional(),
    startDate: DateStringSchema.optional(),
    endDate: DateStringSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: 'A data de início deve ser anterior ou igual à data de término.',
    },
  );
