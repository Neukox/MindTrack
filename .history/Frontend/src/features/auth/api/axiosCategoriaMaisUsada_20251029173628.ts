import api from "../../../lib/api/api";

// Tipos para categorias mais usadas
export interface CategoriaMaisUsadaResponse {
  [categoria: string]: {
    total: number;
    percentual: number;
  };
}

// Função para buscar categorias mais usadas
export const getCategoriaMaisUsada =
  async (): Promise<CategoriaMaisUsadaResponse> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get("/metrics/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar categorias mais usadas:", error);

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
            "Erro ao buscar categorias mais usadas"
        );
      }

      throw new Error("Erro ao buscar categorias mais usadas");
    }
  };
