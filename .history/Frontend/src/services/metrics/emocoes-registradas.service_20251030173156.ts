import { AxiosError, type AxiosResponse } from "axios";
import api from "@/lib/api/axios";
import type { Emotion } from "@/lib/types/reflection.type";

interface TypeStats {
  count: number;
  total: number;
  percentage?: number;
  label?: string;
}

export type EmotionStats = Record<Emotion, TypeStats>;

export const getEmocoesRegistradas = async (): Promise<AxiosResponse<EmotionStats>> => {
  try {
    const response = await api.get<EmotionStats>("/metrics/emotion");
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar estatisticas de emocoes"
      );
    }
    throw new Error("Erro inesperado ao buscar estatisticas de emocoes");
  }
};
