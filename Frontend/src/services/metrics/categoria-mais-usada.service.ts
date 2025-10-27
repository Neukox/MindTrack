import type { Category } from "@/lib/types/reflection.type";
import type { TypeStats } from "./metrics.service";
import api from "@/lib/api/axios";
import { type AxiosResponse, AxiosError } from "axios";

export type CategoryStats = Record<Category, TypeStats>;

export const getCategoriaMaisUsada = async (): Promise<
  AxiosResponse<CategoryStats>
> => {
  try {
    const response = await api.get("/metrics/category");
    return response;
  } catch (err: unknown) {
    // Repasse de mensagem do servidor quando disponível
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data.message);
    }

    throw new Error("Erro ao obter estatísticas de categorias");
  }
};
