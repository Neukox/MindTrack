import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
import bcrypt from 'bcrypt';

type LoginPayload = {
  email: string;
  password: string;
};
@Injectable()
export class LoginService {
  async LoginUser(payload: LoginPayload): Promise<void> {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Email ou senha não fornecidos.');
    }

    try {
      //Buscando se usuário existe no banco de dados
      const userEncontrado = await prisma.user.findUnique({
        where: { email },
      });

      if (!userEncontrado) {
        throw new Error('Usuário não encontrado.');
      }

      const senhaCorreta = await bcrypt.compare(
        password,
        userEncontrado.password,
      );

      if (!senhaCorreta) {
        throw new Error('Senha incorreta.');
      }

      //Login bem sucedido
      console.log('Login bem sucedido para o usuário:', userEncontrado.email);
    } catch (error: any) {
      console.error('Erro ao realizar login:', error);
    }
  }
}
