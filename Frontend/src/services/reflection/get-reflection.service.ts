import type { Reflection } from "@/lib/types/reflection.type";
import api from "../../lib/api/axios";
import { AxiosError } from "axios";

// Buscar um registro específico por ID
export const buscarRegistroPorId = async (id: string): Promise<Reflection> => {
  try {
    console.log(`Buscando registro ID: ${id}`);

    const response = await api.get(`/reflexao/${id}`);

    console.log("Registro encontrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar registro:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao buscar registro",
      );
    }

    throw new Error("Erro ao buscar registro");
  }
};
