// Exportações centralizadas dos serviços de autenticação

// Serviços
export {
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getLoggedUser,
} from "./api/axiosLogin";
export { registerUser, validateRegisterData } from "./api/axiosRegister";
export {
  requestPasswordRecovery,
  resetPassword,
  validateEmail,
  validateResetToken,
} from "./api/axiosRecuperar-Senha";

// API base
export { default as api } from "../../lib/api/api";

// Tipos
export * from "../../lib/types/auth.types";
