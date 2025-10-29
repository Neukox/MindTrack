import api from "../../../lib/api/api";

// Tipos para busca de registros
export interface RegistroData {
  id: string;
  title: string;
  category: "ESTUDO" | "ESTAGIO" | "PESSOAL" | "PESQUISA";
  emotion:
    | "ALEGRIA"
    | "CALMA"
    | "ANSIEDADE"
    | "REFLEXAO"
    | "MOTIVACAO"
    | "TRISTEZA";
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuscarRegistrosResponse {
  success: boolean;
  data: RegistroData[];
  meta?: {
    total: number;
    filtered: number;
  };
}

// Função para buscar registros do usuário
export const buscarRegistros = async (filtros?: {
  category?: string;
  emotion?: string;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}): Promise<BuscarRegistrosResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    // Construir query parameters
    const params = new URLSearchParams();
    if (filtros?.category) params.append("category", filtros.category);
    if (filtros?.emotion) params.append("emotion", filtros.emotion);
    if (filtros?.startDate) params.append("startDate", filtros.startDate);
    if (filtros?.endDate) params.append("endDate", filtros.endDate);
    if (filtros?.keyword) params.append("keyword", filtros.keyword);

    const queryString = params.toString();
    const url = queryString ? `/reflexao?${queryString}` : `/reflexao`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
      meta: {
        total: response.data.length,
        filtered: response.data.length,
      },
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar registros:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      throw new Error(
        axiosError.response?.data?.message || "Erro ao buscar registros"
      );
    }

    throw new Error("Erro ao buscar registros");
  }
};
