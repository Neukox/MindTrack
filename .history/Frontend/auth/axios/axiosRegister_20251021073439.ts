import api from './api';

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
export const registerUser = async (registerData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/register', registerData);
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
    
    throw new Error('Erro interno. Tente novamente mais tarde.');
  }
};

// Função para validar dados antes do envio
export const validateRegisterData = (data: RegisterData & { confirmarSenha: string }): string[] => {
  const errors: string[] = [];
  
  if (!data.username || data.username.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email inválido');
  }
  
  if (!data.password || data.password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (data.password !== data.confirmarSenha) {
    errors.push('As senhas não coincidem');
  }
  
  return errors;
};