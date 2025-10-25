import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ReflexaoModule } from './reflexao/reflexao.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { EdicaoRegistrosModule } from './edicao-registros/edicao-registros.module';
import { ContagemTotalRegistrosModule } from './contagem-total-registros/contagem-total-registros.module';
import { ContagemUltimaReflexaoCriadaModule } from './contagem-ultima-reflexao-criada/contagem-ultima-reflexao-criada.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoginModule,
    RegisterModule,
    ResetPasswordModule,
    ReflexaoModule,
    AuthModule,
    UserModule,
    EmailModule,
    EdicaoRegistrosModule,
    ContagemTotalRegistrosModule,
    ContagemUltimaReflexaoCriadaModule,
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
