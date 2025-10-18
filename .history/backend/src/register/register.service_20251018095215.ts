import { Injectable, BadRequestException } from '@nestjs/common';
import prisma from '../lib/prisma.client';
import * as bcrypt from 'bcrypt';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class RegisterService {
  async registerUser(payload: RegisterPayload): Promise<void> {
    const { username, password, email } = payload;

    // Validações básicas
    if (!username || !password || !email) {
      throw new BadRequestException('Todos os campos são obrigatórios.');
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Email inválido.');
    }

    // Validação de senha
    if (password.length < 6) {
      throw new BadRequestException(
        'A senha deve ter pelo menos 6 caracteres.',
      );
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado.');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const userCreated = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created:', userCreated);
  }
}
