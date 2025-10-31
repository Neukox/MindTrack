import axios from "axios";
import useAuthStore from "../../features/auth/store/auth.store";

// Configuração dinâmica da URL da API
const getApiBaseURL = () => {
  // Se estiver em produção (Vercel), usar a URL do backend em produção
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    return (
      import.meta.env.VITE_API_URL ||
      "https://mindtrack-backend-ggpl.onrender.com"
    );
  }
  // Em desenvolvimento, usar localhost
  return "http://localhost:3000";
};

// Configuração base do axios
const api = axios.create({
  baseURL: getApiBaseURL(), // URL dinâmica do backend
  timeout: 10000, // 10 segundos de timeout
  withCredentials: true, // Enviar cookies junto com as requisições
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para definir o token de autenticação
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Variável para controlar o estado de refresh token
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

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
  (response) => response,
  async (error) => {
    // Tratamento de erros
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    // Verifica se o erro é de autenticação (401)
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !(originalRequest.url && originalRequest.url.includes("/auth/refresh"))
    ) {
      console.log("Token expirado, tentando renovar...", originalRequest.url);

      originalRequest._retry = true;

      // Se já estiver atualizando o token, aguarda a promessa existente
      if (isRefreshing && refreshPromise) {
        try {
          const newToken = await refreshPromise;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Indica que o token está sendo atualizado
      isRefreshing = true;

      // Criar uma nova promessa de refresh
      refreshPromise = refreshTokenFunction();

      try {
        const newToken = await refreshPromise;

        // atualizar o token no axios
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        console.log("Token renovado com sucesso!");

        // Retornar a requisição original com o novo token
        return api(originalRequest);
      } catch (err) {
        console.error("Falha ao renovar token:", err);

        setTimeout(() => {
          useAuthStore.getState().logout();
        }, 0);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
