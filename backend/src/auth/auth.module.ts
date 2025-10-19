import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import TokenHashingService from './hashing/token-hashing.service';
import HashingService from './hashing/hashing.service';
import BcryptService from './hashing/bcrypt.service';
import { ResetPasswordModule } from '@/reset-password/reset-password.module';
import { ConfigModule } from '@nestjs/config';
import resetPasswordConfig from './config/resetPassword.config';
import { UserModule } from '@/user/user.module';
import { EmailModule } from '@/email/email.module';

@Global()
@Module({
  imports: [
    ResetPasswordModule,
    ConfigModule.forFeature(resetPasswordConfig),
    UserModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenHashingService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [AuthService, HashingService, TokenHashingService, ConfigModule],
})
export class AuthModule {}
