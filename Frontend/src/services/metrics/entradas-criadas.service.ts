import { AxiosError } from "axios";
import api from "../../lib/api/axios";

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
export const getEntradasCriadas =
  async (): Promise<EntradasCriadasResponse> => {
    try {
      const response = await api.get("/contagem-total-registros");

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar entradas criadas:", error);

      if (error instanceof AxiosError) {
        throw new Error(
          error?.response?.data.message || "Erro ao buscar entradas criadas",
        );
      }

      throw new Error("Erro ao buscar entradas criadas");
    }
  };
