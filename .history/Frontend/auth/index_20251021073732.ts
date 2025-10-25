// Exportações centralizadas dos serviços de autenticação

// Serviços
export { loginUser, logoutUser, isUserLoggedIn, getLoggedUser } from './axios/axiosLogin';
export { registerUser, validateRegisterData } from './axios/axiosRegister';
export { requestPasswordRecovery, resetPassword, validateEmail, validateResetToken } from './axios/axiosRecuperar-Senha';

// API base
export { default as api } from './axios/api';

// Tipos
export * from './types/auth.types';