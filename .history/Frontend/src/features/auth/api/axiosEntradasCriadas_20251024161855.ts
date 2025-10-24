import api from "../../../lib/api/api";

// Tipos para entradas criadas
export interface EntradasCriadasResponse {
  success: boolean;
  data: {
    totalEntradas: number;
    entradasEsseSemestre: number;
    crescimentoPercentual: number;
    ultimaEntrada: string | null;
  };
  meta: {
    semestreInicio: string;
    semestreFim: string;
  };
}

// Função para buscar total de entradas criadas
export const getEntradasCriadas = async (): Promise<EntradasCriadasResponse> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/contagem-total-registros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar entradas criadas:", error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      throw new Error(
        axiosError.response?.data?.message || 
        "Erro ao buscar entradas criadas"
      );
    }
    
    throw new Error("Erro ao buscar entradas criadas");
  }
};
