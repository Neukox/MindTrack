import api from "../../../lib/api/api";

// Tipos para recuperação de senha
export interface RecoverPasswordData {
  email: string;
}

export interface RecoverPasswordResponse {
  message: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Função para solicitar recuperação de senha
export const requestPasswordRecovery = async (
  recoverData: RecoverPasswordData
): Promise<RecoverPasswordResponse> => {
  try {
    const response = await api.post("/auth/recover-password", recoverData);
    return response.data;
  } catch (error: unknown) {
    // Tratar diferentes tipos de erro
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    const axiosError = error as { response?: { data?: { message?: string } } };
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }

    throw new Error("Erro interno. Tente novamente mais tarde.");
  }
};

// Função para resetar a senha com o token
export const resetPassword = async (
  resetData: ResetPasswordData
): Promise<ResetPasswordResponse> => {
  try {
    const response = await api.post("/auth/reset-password", resetData);
    return response.data;
  } catch (error: unknown) {
    // Tratar diferentes tipos de erro
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    const axiosError = error as { response?: { data?: { message?: string } } };
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }

    throw new Error("Erro interno. Tente novamente mais tarde.");
  }
};

// Função para validar email
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Função para validar token de reset
export const validateResetToken = (token: string): boolean => {
  return Boolean(token && token.length > 0);
};
