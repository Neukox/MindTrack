import api from "../../../lib/api/api";

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
export const getDiasConsecutivos = async (): Promise<DiasConsecutivosResponse> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/dias-consecutivos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar dias consecutivos:", error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      throw new Error(
        axiosError.response?.data?.message || 
        "Erro ao buscar dias consecutivos"
      );
    }
    
    throw new Error("Erro ao buscar dias consecutivos");
  }
};

// Função para buscar estatísticas detalhadas dos dias consecutivos
export const getEstatisticasDetalhadas = async (): Promise<EstatisticasDetalhadasResponse> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/dias-consecutivos/estatisticas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar estatísticas detalhadas:", error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      throw new Error(
        axiosError.response?.data?.message || 
        "Erro ao buscar estatísticas detalhadas"
      );
    }
    
    throw new Error("Erro ao buscar estatísticas detalhadas");
  }
};
