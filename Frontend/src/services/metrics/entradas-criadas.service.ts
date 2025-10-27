import { AxiosError } from "axios";
import api from "../../lib/api/axios";

// Tipos para entradas criadas
export interface EntradasCriadasResponse {
  registrosEsseSemestre: number;
  registrosSemestreAnterior: number;
  crescimentoPercentual: number;
  semesterStart: Date;
  semesterEnd: Date;
}

// Função para buscar total de entradas criadas
export const getEntradasCriadas =
  async (): Promise<EntradasCriadasResponse> => {
    try {
      const response = await api.get("/metrics/semester");

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
