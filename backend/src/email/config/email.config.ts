import { registerAs } from '@nestjs/config';

const parseBool = (value?: string): boolean | undefined => {
  if (typeof value === 'undefined' || value === null) return undefined;
  const v = value.toString().trim().toLowerCase();
  if (v === '1' || v === 'true' || v === 'yes') return true;
  if (v === '0' || v === 'false' || v === 'no') return false;
  return undefined;
};

const emailConfig = registerAs('email', () => {
  const rawHost = process.env.EMAIL_HOST;
  const rawPort = process.env.EMAIL_PORT;
  const rawUser = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASS;
  const rawFrom = process.env.EMAIL_FROM;

  const host = rawHost ? rawHost.toString().trim() : undefined;
  const port = Number.isNaN(Number(rawPort))
    ? 587
    : parseInt((rawPort || '587').toString().trim(), 10);
  const user = rawUser ? rawUser.toString().trim() : undefined;
  const pass = rawPass ? rawPass.toString().trim() : undefined;
  const from = rawFrom ? rawFrom.toString().trim() : user;

  // EMAIL_SECURE can be provided as "true"/"false"/"1"/"0"/"yes"/"no"
  const secureEnv = parseBool(process.env.EMAIL_SECURE);

  // Prefer explicit env setting; otherwise infer from port (465 -> secure)
  const secure = typeof secureEnv !== 'undefined' ? secureEnv : port === 465;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
  };
});

export default emailConfig;
