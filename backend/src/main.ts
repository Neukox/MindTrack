import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { corsConfig } from './config/cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para permitir requisições do frontend
  app.enableCors(corsConfig);

  // Registra filtro global para transformar erros do Zod em respostas HTTP amigáveis
  app.useGlobalFilters(new ZodExceptionFilter());
  const port = process.env.PORT ?? 3000;

  //Adicionar documentação Swagger para a API usando @nestjs/swagger
  const config = new DocumentBuilder()
    .setTitle('MindTrack API')
    .setDescription(
      'API para gerenciamento de reflexões e monitoramento mental',
    )
    .setVersion('1.0')
    .addTag('reflexoes')
    .addTag('usuarios')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory());

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
