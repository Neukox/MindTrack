import { AxiosError } from "axios";
import api from "../../lib/api/axios";

// Tipos para estatísticas detalhadas
export interface DiasConsecutivosResponse {
  diasConsecutivosAtual: number;
  maiorSequencia: number;
  totalDiasComReflexoes: number;
  percentualDiasAtivos: number;
  ultimosDias: Array<{
    data: string;
    temReflexao: boolean;
    quantidadeReflexoes: number;
  }>;
}

// Função para buscar estatísticas detalhadas dos dias consecutivos
export const getEstatisticasDetalhadas =
  async (): Promise<DiasConsecutivosResponse> => {
    try {
      const response = await api.get("/metrics/streak");
      return response.data as DiasConsecutivosResponse;
    } catch (error: unknown) {
      console.error("Erro ao buscar estatísticas detalhadas:", error);

      if (error instanceof AxiosError) {
        throw new Error(
          error?.response?.data.message ||
            "Erro ao buscar estatísticas detalhadas",
        );
      }

      throw new Error("Erro ao buscar estatísticas detalhadas");
    }
  };
