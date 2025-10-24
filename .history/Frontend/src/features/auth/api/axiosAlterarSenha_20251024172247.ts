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

    const response = await api.post("/user/change-password", passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao alterar senha:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      throw new Error(
        axiosError.response?.data?.message || "Erro ao alterar senha"
      );
    }

    throw new Error("Erro ao alterar senha");
  }
};
