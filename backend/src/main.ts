import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { corsConfig } from './config/cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import cookieParser from 'cookie-parser';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para permitir requisições do frontend
  app.enableCors(corsConfig);

  app.enableShutdownHooks();

  // Registra filtro global para transformar erros do Zod em respostas HTTP amigáveis
  app.useGlobalFilters(new ZodExceptionFilter());

  app.use(cookieParser());
  
  const port = process.env.PORT ?? 3000;

  //Adicionar documentação Swagger para a API usando @nestjs/swagger
  const config = new DocumentBuilder()
    .setTitle('MindTrack API')
    .setDescription(
      'API para gerenciamento de reflexões e monitoramento mental',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    const document = documentFactory();
    SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));
  }

  await app.listen(port);

  console.log('🚀 Servidor MindTrack iniciado com sucesso!');
  console.log(`📡 Servidor rodando na porta: ${port}`);
  console.log(`🌐 URL: http://localhost:${port}`);
  console.log(`📚 Documentação API: http://localhost:${port}/api`);
  console.log('📊 Status: Pronto para receber requisições');
}

bootstrap().catch((error) => {
  logger.error('Erro ao iniciar o servidor: ', error);
  process.exitCode = 1;
});
