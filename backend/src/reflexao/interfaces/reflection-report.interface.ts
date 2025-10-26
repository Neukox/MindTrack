import { Reflection } from '@generated/prisma';

export const CATEGORY_MAPPED = {
  ESTUDO: 'Estudo',
  PESSOAL: 'Pessoal',
  ESTAGIO: 'Estágio',
  PESQUISA: 'Pesquisa',
} as const;

export const EMOTION_MAPPED = {
  ALEGRIA: 'Alegria',
  CALMA: 'Calma',
  ANSIEDADE: 'Ansiedade',
  REFLEXAO: 'Reflexão',
  MOTIVACAO: 'Motivação',
  TRISTEZA: 'Tristeza',
} as const;

export interface ReflectionReport {
  pdfGenerationDate: string;
  username: string;
  periodStart: string;
  periodEnd: string;
  totalReflections: number;
  reflectionsCategoryStats: Record<string, Record<string, number>>;
  reflectionsEmotionStats: Record<string, Record<string, number>>;
  reflections: Reflection[];
}
