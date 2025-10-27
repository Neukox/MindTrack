import { AxiosError } from "axios";
import api from "../../lib/api/axios";
import type { SuccessResponse } from "../types/response.interface";

// Tipos para mudança de senha
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Alterar senha do usuário
export const changeUserPassword = async (
  passwordData: ChangePasswordData,
): Promise<SuccessResponse> => {
  try {
    console.log("Enviando requisição para /user/change-password");
    const response = await api.patch("/user/change-password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Erro detalhado:", error);

    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data.message || "Erro ao alterar senha");
    }

    throw new Error("Erro ao alterar senha");
  }
};
