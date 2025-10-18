import { Injectable } from '@nestjs/common';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};
@Injectable()
export class RegisterService {

    export functon registerUser(payload: RegisterPayload): string {
        //Fazendo validações básicas.
        if (!payload.username || !payload.password )
    }
}
