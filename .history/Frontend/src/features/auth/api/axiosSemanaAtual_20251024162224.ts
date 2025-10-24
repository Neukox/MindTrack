import api from "../../../lib/api/api";

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

// Função para buscar registros da semana atual
export const getRegistrosSemanaAtual =
  async (): Promise<SemanaAtualResponse> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get("/registros-essa-semana", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar registros da semana atual:", error);

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (axiosError.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        throw new Error(
          axiosError.response?.data?.message ||
            "Erro ao buscar registros da semana atual"
        );
      }

      throw new Error("Erro ao buscar registros da semana atual");
    }
  };

// Função para buscar estatísticas da semana atual
export const getEstatisticasSemanaAtual =
  async (): Promise<EstatisticasSemanaResponse> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get("/registros-essa-semana/estatisticas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar estatísticas da semana atual:", error);

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (axiosError.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        throw new Error(
          axiosError.response?.data?.message ||
            "Erro ao buscar estatísticas da semana atual"
        );
      }

      throw new Error("Erro ao buscar estatísticas da semana atual");
    }
  };
