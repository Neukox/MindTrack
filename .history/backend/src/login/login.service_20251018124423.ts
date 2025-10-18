import { Injectable } from '@nestjs/common';

type LoginPayload = {
  email: string;
  password: string;
};
@Injectable()
export class LoginService {
  LoginUser(payload: LoginPayload): Promise<void> {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Email ou senha não fornecidos.');
    }
  }
}
