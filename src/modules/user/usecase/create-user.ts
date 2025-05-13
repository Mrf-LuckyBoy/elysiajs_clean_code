import { UserRepository } from '../infra/user.repository';
import { UserDTO } from '../model/user.model';
import { randomUUID } from 'crypto';

export async function createUser(name: string): Promise<UserDTO> {
  const newUser: UserDTO = {
    id: randomUUID(),
    name,
  };

  await UserRepository.create(newUser);
  return newUser;
}
