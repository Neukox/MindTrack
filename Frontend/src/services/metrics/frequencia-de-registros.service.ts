import { AxiosError } from "axios";
import api from "../../lib/api/axios";

export interface FrequenciaRegistros {
  week: number;
  count: number;
  period: string;
}

// Função para buscar frequência de registros por semana
export const getFrequenciaRegistros = async (): Promise<
  FrequenciaRegistros[]
> => {
  try {
    const response = await api.get("/metrics/week/frequency");

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar frequência de registros:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message ||
          "Erro ao buscar frequência de registros",
      );
    }

    throw new Error("Erro ao buscar frequência de registros");
  }
};

// Função para buscar frequência de registros de um período específico
export const getFrequenciaRegistrosPeriodo = async (
  dataInicio: string,
  dataFim: string,
): Promise<FrequenciaRegistros[]> => {
  try {
    // Authorization is applied globally by the `api` instance.
    const response = await api.get("/reflexao/frequencia-periodo", {
      params: { dataInicio, dataFim },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar frequência de registros por período:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message ||
          "Erro ao buscar frequência de registros por período",
      );
    }

    throw new Error("Erro ao buscar frequência de registros por período");
  }
};
