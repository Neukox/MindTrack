import api from "../../../lib/api/api";

export interface ExcluirRegistroResponse {
  message: string;
}

// Excluir um registro específico
export const excluirRegistro = async (
  id: string
): Promise<ExcluirRegistroResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    console.log(`Excluindo registro ID: ${id}`);

    const response = await api.delete(`/reflexao/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Registro excluído com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir registro:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: {
          data?: { message?: string };
          status?: number;
          statusText?: string;
        };
      };

      console.error("Status:", axiosError.response?.status);
      console.error("Status Text:", axiosError.response?.statusText);
      console.error("Response Data:", axiosError.response?.data);

      if (axiosError.response?.status === 404) {
        throw new Error("Registro não encontrado");
      }

      if (axiosError.response?.status === 403) {
        throw new Error("Você não tem permissão para excluir este registro");
      }

      throw new Error(
        axiosError.response?.data?.message || "Erro ao excluir registro"
      );
    }

    throw new Error("Erro ao excluir registro");
  }
};
