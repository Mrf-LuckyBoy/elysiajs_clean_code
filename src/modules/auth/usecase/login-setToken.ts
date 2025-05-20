import { AuthRepository } from '../infra/auth.repository';
import { Jwt } from '@/core/jwt';
import type { UserProviderDTO, LoginUser } from '../model/auth.model';
import { Crypto } from '@/core/crypto';

export async function loginSetToken(loginUser: LoginUser): Promise<string> {
  const result: UserProviderDTO =
    await AuthRepository.checkLoginUser(loginUser);
  if (!result) {
    return '';
  }
  result.fname = Crypto.decrypt(result.fname || '');
  result.lname = Crypto.decrypt(result.lname || '');
  const jwt = Jwt.sign(result);
  return jwt;
}
