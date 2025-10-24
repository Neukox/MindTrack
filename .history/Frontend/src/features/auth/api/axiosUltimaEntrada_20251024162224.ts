import api from "../../../lib/api/api";

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
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/contagem-ultima-reflexao-criada", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar última entrada:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      throw new Error(
        axiosError.response?.data?.message || "Erro ao buscar última entrada"
      );
    }

    throw new Error("Erro ao buscar última entrada");
  }
};
