import { registerAs } from '@nestjs/config';

const resetPasswordConfig = registerAs('resetPassword', () => ({
  tokenExpirationMinutes:
    Number(process.env.RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES) || 15,
}));

export default resetPasswordConfig;
