import z from 'zod';

export const LoginSchema = z.object({
  email: z
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'E-mail é obrigatório' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    .nonempty({ message: 'Senha é obrigatória' }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
    .nonempty({ message: 'Nome de usuário é obrigatório' }),
  email: z
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'E-mail é obrigatório' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .nonempty({ message: 'Senha é obrigatória' }),
});
