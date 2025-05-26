import { AuthRepository } from '../infra/auth.repository';
import type { UserProviderDTO } from '../model/auth.model';
import { ProviderClient } from '@/core/http/provider.client';

export async function loginProviderID(
  codeRedirect: string
): Promise<UserProviderDTO[]> {
  const result = await ProviderClient.getHealthIdToken(codeRedirect);
  const provider = await ProviderClient.serviceTokenProviderID(
    result.data.access_token
  );
  const userStuff = await ProviderClient.serviceCheckStaff(
    provider.data.access_token
  );
  const arrayCheck = [];
  for (const i of userStuff.data.organization) {
    arrayCheck.push(
      ['0001', '0004', '0011', '0015', '0050', '0051', '0065'].includes(
        i.position_id
      )
    );
  }
  const resultCheck = arrayCheck.some((val) => val);
  if (!resultCheck) {
    return [];
  }
  const useableLits = await AuthRepository.upsertUserProvider(userStuff.data);
  return useableLits;
}
