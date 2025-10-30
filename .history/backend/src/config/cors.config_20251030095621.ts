// Configuração CORS para o backend
export const corsConfig = {
  origin: (origin, callback) => {
    // Lista de origens permitidas
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:5174', // Vite dev server (porta alternativa)
      'http://localhost:3000', // Caso o frontend rode na 3000
      'http://127.0.0.1:5173', // Alternativa localhost
      'http://127.0.0.1:5174', // Alternativa localhost (porta alternativa)
      'http://localhost:4173', // Vite preview
      'https://mindtrackfrontend.vercel.app', // Frontend em produção (Vercel)
      process.env.CLIENT_URL, // URL do cliente do arquivo .env
    ].filter(Boolean); // Remove valores undefined/null

    // Permitir requisições sem origin (ex: Postman, curl)
    if (!origin) return callback(null, true);

    // Verificar se a origem está na lista permitida
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Não permitido pelo CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
