import { AxiosError } from "axios";
import api from "../../lib/api/axios";
import type { CreateReflectionData } from "../types/reflection-request.interface";
import type { SuccessResponse } from "../types/response.interface";

// Função para criar um novo registro
export const criarRegistro = async (
  registroData: CreateReflectionData,
): Promise<SuccessResponse> => {
  try {
    const response = await api.post("/reflexao", registroData);

    return response.data as SuccessResponse;
  } catch (error: unknown) {
    console.error("Erro ao criar registro:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao criar registro",
      );
    }

    throw new Error("Erro ao criar registro");
  }
};
