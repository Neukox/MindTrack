export interface ReflectionToImpression {
  title: string;
  content: string;
  category: string;
  emotion: string;
  createdAt: string;
}

export interface ReflectionReport {
  pdfGenerationDate: string;
  username: string;
  periodStart: string;
  periodEnd: string;
  totalReflections: number;
  reflectionsCategoryStats: Record<string, Record<string, number>>;
  reflectionsEmotionStats: Record<string, Record<string, number>>;
  reflections: ReflectionToImpression[];
}
