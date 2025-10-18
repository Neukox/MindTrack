import { Injectable } from '@nestjs/common';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {
  async registerUser(payload: RegisterPayload): Promise<any> {
    //Fazendo validações básicas
    if (!payload.username || !payload.password || !payload.email) {
      throw new Error('Todos os campos são obrigatórios.');
    }
  }
}
