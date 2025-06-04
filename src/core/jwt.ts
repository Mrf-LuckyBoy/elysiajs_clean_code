import { ENV } from '@/config/env';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = ENV.JWT_SECRET;

export const Jwt = {
  sign(payload: object): string {
    return sign(payload, JWT_SECRET, { expiresIn: '4h' });
  },
  verify<T>(token: string): T {
    return verify(token, JWT_SECRET) as T;
  },
};
