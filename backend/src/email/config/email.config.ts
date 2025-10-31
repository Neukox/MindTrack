import { registerAs } from '@nestjs/config';

const emailConfig = registerAs('email', () => {
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const secureEnv = process.env.EMAIL_SECURE;
  const secure =
    typeof secureEnv !== 'undefined' ? secureEnv === 'true' : port === 465;

  return {
    host: process.env.EMAIL_HOST,
    port,
    secure: process.env.NODE_ENV === 'production',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  };
});

export default emailConfig;
