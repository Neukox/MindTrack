import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ReflexaoModule } from './reflexao/reflexao.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
import { PdfModule } from './pdf/pdf.module';
import { ContagemTotalRegistrosModule } from './contagem-total-registros/contagem-total-registros.module';
import { ContagemUltimaReflexaoCriadaModule } from './contagem-ultima-reflexao-criada/contagem-ultima-reflexao-criada.module';
import { RegistrosEssaSemanaModule } from './registros-essa-semana/registros-essa-semana.module';
import { MetricsModule } from './metrics/metrics.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ResetPasswordModule,
    ReflexaoModule,
    AuthModule,
    UserModule,
    EmailModule,
    TemplatesModule,
    PdfModule,
    ContagemTotalRegistrosModule,
    ContagemUltimaReflexaoCriadaModule,
    RegistrosEssaSemanaModule,
    MetricsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
