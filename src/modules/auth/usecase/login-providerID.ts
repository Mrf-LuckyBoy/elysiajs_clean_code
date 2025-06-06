import { AuthRepository } from '../infra/auth.repository';
import type {
  UserProviderDTO,
  UserProviderResponseDTO,
} from '../model/auth.model';
import { ProviderClient } from '@/core/http/provider.client';
import { Crypto } from '@/core/crypto';

export async function loginProviderID(
  codeRedirect: string
): Promise<UserProviderResponseDTO> {
  const result = await ProviderClient.getHealthIdToken(codeRedirect);
  const provider = await ProviderClient.serviceTokenProviderID(
    result.data.access_token
  );
  const userStuff = await ProviderClient.serviceCheckStaff(
    provider.data.access_token
  );
  let cid = await AuthRepository.checkCidUser(userStuff.data.hash_cid);
  if (cid !== '') {
    cid = Crypto.decrypt(cid ?? '');
  }
  const arrayCheck = [];
  for (const i of userStuff.data.organization) {
    arrayCheck.push(
      [
        '0001',
        '0004',
        '0011',
        '0015',
        '0050',
        '0051',
        '0065',
        // mock
        '0065',
        '0024',
        '0016',
      ].includes(i.position_id)
    );
  }
  const resultCheck = arrayCheck.some((val) => val);
  if (!resultCheck) {
    return {
      cid: cid,
      useable: [],
    };
  }
  const useableLits: UserProviderDTO[] =
    await AuthRepository.upsertUserProvider(userStuff.data);
  const response: UserProviderResponseDTO = {
    cid: cid,
    useable: useableLits,
  };
  return response;
}
