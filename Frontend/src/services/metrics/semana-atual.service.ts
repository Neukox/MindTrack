import api from "../../lib/api/axios";

// Tipos para registros da semana atual
export interface SemanaAtualResponse {
  success: boolean;
  data: Array<{
    id: string;
    title: string;
    category: string;
    emotion: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }>;
  meta: {
    total: number;
    weekStart: string;
    weekEnd: string;
  };
}

// Tipos para estatísticas da semana
export interface EstatisticasSemanaResponse {
  success: boolean;
  data: {
    registrosEssaSemana: number;
    registrosSemanaAnterior: number;
    crescimentoPercentual: number;
    weekStart: string;
    weekEnd: string;
  };
}

/**
 * Busca os registros da semana atual.
 *
 * Observações:
 * - Não acessa `localStorage` para buscar token.
 * - Não realiza tratamento específico para 401 (Unauthorized).
 * - A autenticação e refresh devem ser gerenciados pelo `api` (axios) global.
 */
export const getRegistrosSemanaAtual =
  async (): Promise<SemanaAtualResponse> => {
    try {
      const response = await api.get("/registros-essa-semana");
      return response.data as SemanaAtualResponse;
    } catch (error: unknown) {
      console.error("Erro ao buscar registros da semana atual:", error);

      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (axiosError?.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }

      throw new Error("Erro ao buscar registros da semana atual");
    }
  };

/**
 * Busca estatísticas agregadas da semana atual.
 *
 * Observações:
 * - Não acessa `localStorage` para buscar token.
 * - Não realiza tratamento específico para 401 (Unauthorized).
 * - A autenticação e refresh devem ser gerenciados pelo `api` (axios) global.
 */
export const getEstatisticasSemanaAtual =
  async (): Promise<EstatisticasSemanaResponse> => {
    try {
      const response = await api.get("/registros-essa-semana/estatisticas");
      return response.data as EstatisticasSemanaResponse;
    } catch (error: unknown) {
      console.error("Erro ao buscar estatísticas da semana atual:", error);

      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (axiosError?.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }

      throw new Error("Erro ao buscar estatísticas da semana atual");
    }
  };
