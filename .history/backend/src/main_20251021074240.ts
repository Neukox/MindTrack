import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { corsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração de CORS para permitir requisições do frontend
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Caso o frontend rode na 3000
      'http://127.0.0.1:5173', // Alternativa localhost
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Registra filtro global para transformar erros do Zod em respostas HTTP amigáveis
  app.useGlobalFilters(new ZodExceptionFilter());
  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log('🚀 Servidor MindTrack iniciado com sucesso!');
  console.log(`📡 Servidor rodando na porta: ${port}`);
  console.log(`🌐 URL: http://localhost:${port}`);
  console.log('📊 Status: Pronto para receber requisições');
}

bootstrap().catch((error) => {
  console.error('❌ Erro ao iniciar o servidor:', error);
  process.exit(1);
});
