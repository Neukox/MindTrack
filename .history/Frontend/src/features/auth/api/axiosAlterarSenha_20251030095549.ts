import api from "../../../lib/api/api";

// Tipos para mudança de senha
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

// Alterar senha do usuário
export const changeUserPassword = async (
  passwordData: ChangePasswordData
): Promise<ChangePasswordResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    console.log("Enviando requisição para /user/change-password");
    console.log("Headers:", { Authorization: `Bearer ${token}` });
    console.log("Dados:", passwordData);

    const response = await api.post("/user/change-password", passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Resposta recebida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro detalhado:", error);

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

      throw new Error(
        axiosError.response?.data?.message || "Erro ao alterar senha"
      );
    }

    throw new Error("Erro ao alterar senha");
  }
};
