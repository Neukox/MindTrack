import { Injectable } from '@nestjs/common';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {
  async registerUser(payload: RegisterPayload): Promise<string> {
    //Fazendo validações básicas
    if (!payload.username || !payload.password || !payload.email) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    //Fazendo verificação de email com regex
    
  }
}
