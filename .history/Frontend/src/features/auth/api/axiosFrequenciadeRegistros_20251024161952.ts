import api from "../../../lib/api/api";

// Tipos para frequência de registros
export interface FrequenciaRegistrosResponse {
  success: boolean;
  data: Array<{
    semana: string;
    registros: number;
    periodo: string;
  }>;
  meta: {
    totalRegistros: number;
    mediaRegistrosPorSemana: number;
  };
}

// Função para buscar frequência de registros por semana
export const getFrequenciaRegistros = async (): Promise<FrequenciaRegistrosResponse> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/reflexao/frequencia-semanal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar frequência de registros:", error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      throw new Error(
        axiosError.response?.data?.message || 
        "Erro ao buscar frequência de registros"
      );
    }
    
    throw new Error("Erro ao buscar frequência de registros");
  }
};

// Função para buscar frequência de registros de um período específico
export const getFrequenciaRegistrosPeriodo = async (
  dataInicio: string, 
  dataFim: string
): Promise<FrequenciaRegistrosResponse> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.get("/reflexao/frequencia-periodo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        dataInicio,
        dataFim,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar frequência de registros por período:", error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    throw new Error(
      error.response?.data?.message || 
      "Erro ao buscar frequência de registros por período"
    );
  }
};
