import { Injectable } from '@nestjs/common';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {
  registerUser(payload: RegisterPayload): void {
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
    // Implementação pendente: salvar no banco usando o prisma client.
    return;
  }
}
