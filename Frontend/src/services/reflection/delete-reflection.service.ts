import api from "@/lib/api/axios";
import type { SuccessResponse } from "../types/response.interface";
import { AxiosError } from "axios";

// Excluir um registro específico
export const excluirRegistro = async (id: string): Promise<SuccessResponse> => {
  try {
    console.log(`Excluindo registro ID: ${id}`);
    const response = await api.delete(`/reflexao/${id}`);
    console.log("Registro excluído com sucesso");
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir registro:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao excluir registro",
      );
    }

    throw new Error("Erro ao excluir registro");
  }
};
