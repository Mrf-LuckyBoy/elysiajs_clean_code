import { UserRepository } from '../infra/user.repository';

export async function getUsers() {
  const user = await UserRepository.finds();
  return user;
}
