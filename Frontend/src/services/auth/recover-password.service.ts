import type { RecoverPasswordData, ResetPasswordData } from "@/features/auth";
import api from "@/lib/api/axios";
import type {
  ResponseError,
  SuccessResponse,
} from "../types/response.interface";
import { AxiosError } from "axios";

// Função para solicitar recuperação de senha
export const requestPasswordRecovery = async (
  recoverData: RecoverPasswordData,
): Promise<SuccessResponse> => {
  try {
    const response = await api.post<SuccessResponse>(
      "/auth/recover-password",
      recoverData,
    );
    return response.data;
  } catch (error: unknown) {
    // Tratar diferentes tipos de erro
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ResponseError>;

      // Repasse de mensagem do servidor quando disponível
      if (axiosError.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }

      if (axiosError.message?.includes("Network Error")) {
        throw new Error(
          "Erro de conexão. Verifique sua internet e tente novamente.",
        );
      }
    }

    throw new Error("Erro interno. Tente novamente mais tarde.");
  }
};

// Função para resetar a senha com o token
export const resetPassword = async (
  resetData: ResetPasswordData,
): Promise<SuccessResponse> => {
  try {
    const response = await api.post<SuccessResponse>(
      "/auth/reset-password",
      resetData,
    );
    return response.data;
  } catch (error: unknown) {
    // Tratar diferentes tipos de erro
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ResponseError>;

      // Repasse de mensagem do servidor quando disponível
      if (axiosError.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }

      if (axiosError.message?.includes("Network Error")) {
        throw new Error(
          "Erro de conexão. Verifique sua internet e tente novamente.",
        );
      }
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
