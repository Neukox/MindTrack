import api from "@/lib/api/axios";
import type { Category, Emotion } from "@/lib/types/reflection.type";
import { AxiosError, type AxiosResponse } from "axios";

export type TypeStats = {
  total: number;
  percentual: number;
}

export type CategoryStats = Record<Category, TypeStats>;

export type EmotionStats = Record<Emotion, TypeStats>;

/**
 * Tipos de retorno esperados para as métricas.
 * Ajuste os campos se o backend retornar nomes diferentes.
 */

export type FrequencyStat = {
  date: string;
  count: number;
};

/**
 * Busca a estatística de categorias mais usadas.
 */
export const getCategoriaMaisUsada = async (): Promise<
  AxiosResponse<CategoryStats>
> => {
  try {
    const response = await api.get("/metrics/category");
    return response;
  } catch (err: unknown) {
    // Repasse de mensagem do servidor quando disponível
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data.message);
    }

    throw new Error("Erro ao obter estatísticas de categorias");
  }
};

/**
 * Busca a estatística de emoções registradas.
 */
export const getEmocoesRegistradas = async (): Promise<
  AxiosResponse<EmotionStats>
> => {
  try {
    const response = await api.get("/metrics/emotion");
    return response;
  } catch (err: unknown) {
    // Repasse de mensagem do servidor quando disponível
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data.message);
    }
    throw new Error("Erro ao obter estatísticas de emoções");
  }
};

/**
 * Busca a frequência de registros ao longo do tempo.
 *
 * Retorna um array de objetos contendo uma `date` e um `count`.
 */
export const getFrequenciaRegistros = async (): Promise<
  AxiosResponse<FrequencyStat[]>
> => {
  try {
    const response = await api.get("/reflexao/frequencia-registros");
    return response;
  } catch (err: unknown) {
    // Repasse de mensagem do servidor quando disponível
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data.message);
    }

    throw new Error("Erro ao obter frequência de registros");
  }
};
