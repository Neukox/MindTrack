import type { User } from "./user.type";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface RecoverPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

// Estados de loading para componentes
export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}
