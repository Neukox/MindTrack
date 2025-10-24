import api from "../../../lib/api/api";

// Tipos para o registro
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// Função para registrar novo usuário
export const registerUser = async (
  registerData: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await api.post("/auth/register", registerData);
    
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
    console.error("Erro no registro:", error);

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
        case 400:
          throw new Error(message || "Dados inválidos.");
        case 409:
          throw new Error(message || "Email já está cadastrado.");
        case 500:
          throw new Error("Erro interno do servidor. Tente novamente.");
        default:
          throw new Error(message || "Erro no cadastro.");
      }
    }

    // Erro de rede ou outro
    if (axiosError.message?.includes("Network Error")) {
      throw new Error("Erro de conexão. Verifique se o servidor está rodando.");
    }

    throw new Error("Erro interno. Tente novamente mais tarde.");
  }
};

// Função para validar dados antes do envio
export const validateRegisterData = (
  data: RegisterData & { confirmarSenha: string }
): string[] => {
  const errors: string[] = [];

  if (!data.username || data.username.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email inválido");
  }

  if (!data.password || data.password.length < 8) {
    errors.push("Senha deve ter pelo menos 8 caracteres");
  }

  if (data.password !== data.confirmarSenha) {
    errors.push("As senhas não coincidem");
  }

  return errors;
};
