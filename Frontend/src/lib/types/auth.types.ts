// Tipos compartilhados para autenticação

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  token?: string;
}

export interface RecoverPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

// Estados de loading para componentes
export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}
