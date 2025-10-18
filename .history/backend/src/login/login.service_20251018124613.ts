import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
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
        })
    } catch (error) {
        
    }
  }
}
