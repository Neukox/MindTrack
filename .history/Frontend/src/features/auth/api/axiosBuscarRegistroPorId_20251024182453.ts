import api from "../../../lib/api/api";

// Tipos para um registro específico
export interface RegistroDetalhado {
  id: string;
  title: string;
  content: string;
  category: string;
  emotion: string;
  createdAt: string;
  updatedAt: string;
}

// Buscar um registro específico por ID
export const buscarRegistroPorId = async (
  id: string
): Promise<RegistroDetalhado> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    console.log(`Buscando registro ID: ${id}`);

    const response = await api.get(`/reflexao/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Registro encontrado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar registro:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: {
          data?: { message?: string };
          status?: number;
        };
      };

      if (axiosError.response?.status === 404) {
        throw new Error("Registro não encontrado");
      }

      throw new Error(
        axiosError.response?.data?.message || "Erro ao buscar registro"
      );
    }

    throw new Error("Erro ao buscar registro");
  }
};
