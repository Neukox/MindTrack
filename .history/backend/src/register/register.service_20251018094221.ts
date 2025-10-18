import { Injectable } from '@nestjs/common';
import prisma


type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {
  async registerUser(payload: RegisterPayload): Promise<void> {
    //Fazendo validações básicas
    if (!payload.username || !payload.password || !payload.email) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    //Fazendo verificação de email com regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      throw new Error('Email inválido.');
    }

    //Fazendo verificação de força da senha
    if (payload.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    //Dados confirmados, os dados serao salvos no banco de dados.
    const {username, password, email} = payload;
    const userCreated = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
    // Implementação pendente: salvar no banco usando o prisma client.
    return;
  }
}
