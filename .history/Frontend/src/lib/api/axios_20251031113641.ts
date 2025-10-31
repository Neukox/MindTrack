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

// Fila para armazenar requisições que falharam durante o refresh token
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

// Função para processar a fila de requisições falhadas
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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

      // Se já estiver atualizando o token, adiciona a requisição à fila
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Indica que o token está sendo atualizado
      isRefreshing = true;

      try {
        // Chamar o endpoint de refresh token
        const { data } = await api.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true, // Importante para enviar cookies httpOnly
          }
        );

        // adicionar novo token ao estado global
        const newToken = data.accessToken;
        useAuthStore.getState().login(newToken);

        // atualizar o token no axios
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Processar a fila de requisições falhadas
        processQueue(null, newToken);

        console.log("Token renovado com sucesso!");
        
        // Retornar a requisição original com o novo token
        return api(originalRequest);
      } catch (err) {
        console.error("Falha ao renovar token:", err);
        
        setTimeout(() => {
          useAuthStore.getState().logout();
        }, 0);

        // Se falhar ao atualizar o token, processa a fila com erro
        processQueue(err, null);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
