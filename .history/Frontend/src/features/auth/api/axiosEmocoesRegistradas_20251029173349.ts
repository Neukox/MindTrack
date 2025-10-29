import api from "../../../lib/api/api";

// Tipos para emoções registradas
export interface EmocoesRegistradasResponse {
  [emocao: string]: {
    total: number;
    percentual: number;
  };
}

// Função para buscar emoções registradas
export const getEmocoesRegistradas =
  async (): Promise<EmocoesRegistradasResponse> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get("/metrics/emotion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar emoções registradas:", error);

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
            "Erro ao buscar emoções registradas"
        );
      }

      throw new Error("Erro ao buscar emoções registradas");
    }
  };
