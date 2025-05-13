import { UserRepository } from '../infra/user.repository';

export async function getUserById(id: string) {
  const user = await UserRepository.findById(id);
  if (!user) throw new Error('User not found');
  return user;
}
