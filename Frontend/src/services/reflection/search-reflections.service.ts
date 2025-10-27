import type { Reflection } from "@/lib/types/reflection.type";
import api from "../../lib/api/axios";
import { AxiosError } from "axios";

/**
 * Buscar registros do usuário
 *
 * Observações:
 * - Não acessa `localStorage` diretamente.
 * - Não faz tratamento específico para 401 (Unauthorized).
 * - A autenticação (headers / refresh) deve ser gerenciada pelo `api` (axios) global.
 */
export const buscarRegistros = async (filtros?: {
  category?: string;
  emotion?: string;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}): Promise<Reflection[]> => {
  try {
    // Construir query parameters
    const params = new URLSearchParams();
    if (filtros?.category) params.append("category", filtros.category);
    if (filtros?.emotion) params.append("emotion", filtros.emotion);
    if (filtros?.startDate) params.append("startDate", filtros.startDate);
    if (filtros?.endDate) params.append("endDate", filtros.endDate);
    if (filtros?.keyword) params.append("keyword", filtros.keyword);

    const queryString = params.toString();
    const url = queryString ? `/reflexao/?${queryString}` : `/reflexao`;

    const response = await api.get(url);

    const data = response.data as Reflection[];

    return data;
  } catch (error: unknown) {
    console.error("Erro ao buscar registros:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao buscar registros",
      );
    }

    // Erro genérico
    throw new Error("Erro ao buscar registros");
  }
};
