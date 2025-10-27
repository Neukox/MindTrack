export type Category = "ESTUDO" | "ESTAGIO" | "PESSOAL" | "PESQUISA";

export type Emotion =
  | "ALEGRIA"
  | "CALMA"
  | "ANSIEDADE"
  | "REFLEXAO"
  | "MOTIVACAO"
  | "TRISTEZA";

export const CATEGORY_MAP: Record<Category, string> = {
  ESTUDO: "Estudo",
  ESTAGIO: "Estágio",
  PESSOAL: "Pessoal",
  PESQUISA: "Pesquisa",
};

export const EMOTION_MAP: Record<Emotion, string> = {
  ALEGRIA: "Alegria",
  CALMA: "Calma",
  ANSIEDADE: "Ansiedade",
  REFLEXAO: "Reflexão",
  MOTIVACAO: "Motivação",
  TRISTEZA: "Tristeza",
};

export interface Reflection {
  id: string;
  title: string;
  content: string;
  category: Category;
  emotion: Emotion;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
