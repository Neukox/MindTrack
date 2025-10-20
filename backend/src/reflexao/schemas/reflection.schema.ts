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
  userId: z.cuid('ID de usuário inválido.'),
});
