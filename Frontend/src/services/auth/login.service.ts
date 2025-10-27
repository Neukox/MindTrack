import api from "../../lib/api/axios";
import useAuthStore from "../../features/auth/store/auth.store";
import type { AuthResponse } from "../types/auth-response.interfaces";
import type { LoginData } from "@/lib/types/auth.types";
import { AxiosError } from "axios";
import type { ResponseError } from "../types/response.interface";

/**
 * Faz a chamada de login para o backend.
 * Observações:
 * - Não acessa diretamente o localStorage.
 * - Não faz tratamento específico para status 401 (Unauthorized).
 * - Em caso de sucesso, atualiza a store de autenticação.
 */
export const loginUser = async (
  loginData: LoginData,
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/login", loginData);
    const data = response.data as AuthResponse;

    // Atualiza a store (o armazenamento persistido é responsabilidade da store)
    if (data.accessToken) {
      useAuthStore.getState().login(data.accessToken);
    }

    if (data.user) {
      useAuthStore.getState().setUser(data.user);
    }

    return data;
  } catch (error: unknown) {
    console.error("Erro no login:", error);

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
