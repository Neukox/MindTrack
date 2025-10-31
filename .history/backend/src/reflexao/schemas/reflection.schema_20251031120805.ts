import { DateStringSchema } from '@/common/schemas/date.schema';
import { Category, Emotion } from '@generated/prisma';
import z from 'zod';

export const CategoryEnum = z.nativeEnum(Category).refine(
  (value) => Object.values(Category).includes(value),
  { message: 'Categoria inválida.' }
);

export const EmotionEnum = z.nativeEnum(Emotion).refine(
  (value) => Object.values(Emotion).includes(value),
  { message: 'Emoção inválida.' }
);

export const ReflectionSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  category: CategoryEnum,
  content: z.string().min(1, 'O conteúdo é obrigatório.'),
  emotion: EmotionEnum,
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
