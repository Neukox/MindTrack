import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
}));
