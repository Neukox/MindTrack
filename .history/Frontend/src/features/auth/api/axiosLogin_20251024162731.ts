import api from "../../../lib/api/api";

// Tipos para o login
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Função para fazer login
export const loginUser = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", loginData);

    // Se o backend retornar accessToken, salvar no localStorage
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    // Salvar dados do usuário no localStorage
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: unknown) {
    console.error("Erro no login:", error);

    // Verificar se é um erro de resposta HTTP
    const axiosError = error as {
      response?: {
        status?: number;
        data?: { message?: string };
      };
      message?: string;
    };

    if (axiosError.response) {
      // Erro de resposta do servidor
      const status = axiosError.response.status;
      const message = axiosError.response.data?.message;

      switch (status) {
        case 401:
          throw new Error(message || "Email ou senha incorretos.");
        case 404:
          throw new Error(message || "Usuário não encontrado.");
        case 400:
          throw new Error(message || "Dados inválidos.");
        case 500:
          throw new Error("Erro interno do servidor. Tente novamente.");
        default:
          throw new Error(message || "Erro na autenticação.");
      }
    }

    // Erro de rede ou outro
    if (axiosError.message?.includes("Network Error")) {
      throw new Error("Erro de conexão. Verifique se o servidor está rodando.");
    }

    throw new Error("Erro interno. Tente novamente mais tarde.");
  }
};

// Função para fazer logout
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Função para verificar se usuário está logado
export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

// Função para obter dados do usuário logado
export const getLoggedUser = (): {
  id: string;
  username: string;
  email: string;
} | null => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
