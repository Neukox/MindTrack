import api from "@/lib/api/axios";
import { AxiosError, type AxiosResponse } from "axios";

export type TypeStats = {
  total: number;
  percentual: number;
}

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
