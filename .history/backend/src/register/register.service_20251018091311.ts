import { Injectable } from '@nestjs/common';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {

    export function registerUser(payload: RegisterPayload): string {
        //Fazendo validações básicas.
        if (!payload.username || !payload.password || !payload.email) {
            return 'Todos os campos são obrigatórios.';
        }
    }
}
