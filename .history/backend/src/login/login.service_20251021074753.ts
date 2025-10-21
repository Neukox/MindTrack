import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import prisma from '../lib/prisma.client';
import bcrypt from 'bcrypt';

type LoginPayload = {
  email: string;
  password: string;
};
type LoginResponse = {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

@Injectable()
export class LoginService {
  async LoginUser(payload: LoginPayload): Promise<LoginResponse> {
    const { email, password } = payload;

    if (!email || !password) {
      throw new HttpException(
        'Email ou senha não fornecidos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      //Buscando se usuário existe no banco de dados
      const userEncontrado = await prisma.user.findUnique({
        where: { email },
      });

      if (!userEncontrado) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      const senhaCorreta = await bcrypt.compare(
        password,
        userEncontrado.password,
      );

      if (!senhaCorreta) {
        throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
      }

      //Login bem sucedido
      console.log('Login bem sucedido para o usuário:', userEncontrado.email);
      
      return {
        message: 'Login realizado com sucesso.',
        user: {
          id: userEncontrado.id,
          username: userEncontrado.username,
          email: userEncontrado.email,
        },
      };
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  }
}
