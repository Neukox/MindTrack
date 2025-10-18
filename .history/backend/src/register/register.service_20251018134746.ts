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
  private prisma = prisma;

  async registerUser(payload: RegisterPayload): Promise<void> {
    const { username, password, email } = payload;

    try {
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

      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException('Email já cadastrado.');
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário

      const userCreated = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      console.log('User created:', userCreated);
    } catch (error) {
      // Se for uma BadRequestException, re-lança para o NestJS tratar
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Para outros erros, loga e lança uma exceção genérica
      console.error('Erro ao registrar usuário:', error);
      throw new BadRequestException(
        'Erro interno. Tente novamente mais tarde.',
      );
    } finally {
      // Fecha a conexão do Prisma para evitar vazamentos de memória
      await this.prisma.$disconnect();
    }
  }
}
