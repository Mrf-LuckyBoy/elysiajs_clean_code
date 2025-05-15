import { UserRepository } from '../infra/user.repository';

export async function deleteUser(id: string): Promise<boolean> {
  return await UserRepository.delete(id);
}
