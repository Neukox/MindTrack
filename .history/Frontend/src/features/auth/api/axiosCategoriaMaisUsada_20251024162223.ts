import api from "../../../lib/api/api";

// Tipos para categorias mais usadas
export interface CategoriaMaisUsadaResponse {
  success: boolean;
  data: Array<{
    categoria: string;
    quantidade: number;
    percentual: number;
  }>;
  meta: {
    totalRegistros: number;
    categoriaMaisFrequente: string;
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

      const response = await api.get("/reflexao/categorias-estatisticas", {
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
