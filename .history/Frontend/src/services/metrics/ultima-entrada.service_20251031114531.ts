import { AxiosError } from "axios";
import api from "../../lib/api/axios";

// Tipos para última entrada
export interface UltimaEntradaResponse {
  success: boolean;
  data: {
    dataUltimaReflexao: string | null;
    tempoDesdeUltimaReflexao: string;
    reflexaoMaisRecente: {
      id: string;
      title: string;
      categoria: string;
      emocao: string;
      createdAt: string;
    } | null;
  };
}

// Função para buscar dados da última entrada
export const getUltimaEntrada = async (): Promise<UltimaEntradaResponse> => {
  try {
    const response = await api.get("/metrics/last-reflection");
    return response.data as UltimaEntradaResponse;
  } catch (error: unknown) {
    console.error("Erro ao buscar última entrada:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao buscar última entrada"
      );
    }

    throw new Error("Erro ao buscar última entrada");
  }
};
