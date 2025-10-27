import { AxiosError } from "axios";
import api from "../../lib/api/axios";
import type { UpdateReflectionData } from "../types/reflection-request.interface";
import type { SuccessResponse } from "../types/response.interface";

// Editar um registro específico
export const editarRegistro = async (
  id: string,
  dadosEdicao: UpdateReflectionData,
): Promise<SuccessResponse> => {
  try {
    console.log(`Editando registro ID: ${id}`);
    console.log("Dados para edição:", dadosEdicao);

    const response = await api.put(`/reflexao/${id}`, dadosEdicao, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Registro editado com sucesso:");
    return response.data as SuccessResponse;
  } catch (error) {
    console.error("Erro ao editar registro:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao editar registro",
      );
    }

    throw new Error("Erro ao editar registro");
  }
};
