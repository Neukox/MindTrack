import { AxiosError } from "axios";
import api from "../../lib/api/axios";

// Tipos para dias consecutivos
export interface DiasConsecutivosResponse {
  success: boolean;
  data: {
    diasConsecutivos: number;
    dataUltimaReflexao: string | null;
    sequenciaAtual: boolean;
  };
}

// Tipos para estatísticas detalhadas
export interface EstatisticasDetalhadasResponse {
  success: boolean;
  data: {
    diasConsecutivosAtual: number;
    maiorSequencia: number;
    totalDiasComReflexoes: number;
    percentualDiasAtivos: number;
    ultimosDias: Array<{
      data: string;
      temReflexao: boolean;
      quantidadeReflexoes: number;
    }>;
  };
}

// Função para buscar dias consecutivos atuais
export const getDiasConsecutivos =
  async (): Promise<DiasConsecutivosResponse> => {
    try {
      const response = await api.get("/dias-consecutivos");

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar dias consecutivos:", error);

      if (error instanceof AxiosError) {
        throw new Error(
          error?.response?.data.message || "Erro ao buscar dias consecutivos",
        );
      }

      throw new Error("Erro ao buscar dias consecutivos");
    }
  };

// Função para buscar estatísticas detalhadas dos dias consecutivos
export const getEstatisticasDetalhadas =
  async (): Promise<EstatisticasDetalhadasResponse> => {
    try {
      const response = await api.get("/dias-consecutivos/estatisticas");
      return response.data as EstatisticasDetalhadasResponse;
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
