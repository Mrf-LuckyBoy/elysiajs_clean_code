import { AuthRepository } from '../infra/auth.repository';

export async function UpdateCidFirstTime(cidHash: string, cid: string): Promise<void> {
  await AuthRepository.updateCidUser(cidHash, cid);
}
