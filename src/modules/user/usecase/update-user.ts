import { UserRepository } from '../infra/user.repository';
import { UserDTO } from '../model/user.model';

export async function updateUser(user: UserDTO): Promise<UserDTO> {
  await UserRepository.update(user);
  return user;
}
