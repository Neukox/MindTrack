import api from './api';

// Tipos para o login
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  // Se houver token JWT, adicionar aqui
  token?: string;
}

// Função para fazer login
export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', loginData);
    
    // Se o backend retornar token, salvar no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    // Salvar dados do usuário no localStorage
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
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

// Função para fazer logout
export const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Função para verificar se usuário está logado
export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};

// Função para obter dados do usuário logado
export const getLoggedUser = (): any | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};