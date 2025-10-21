import axios from "axios";

// Configuração base do axios
const api = axios.create({
  baseURL: "http://localhost:3000", // URL do backend
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autorização se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Só redirecionar para login se for erro 401 E já estiver logado
    // Não redirecionar durante tentativa de login
    if (error.response?.status === 401 && error.config?.url !== '/login') {
      // Token inválido ou expirado, remover do localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirecionar para login apenas se não estiver na página de login
      if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
