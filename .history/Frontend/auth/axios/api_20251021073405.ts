import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autorização se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
    if (error.response?.status === 401) {
      // Token inválido ou expirado, remover do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirecionar para login se necessário
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;