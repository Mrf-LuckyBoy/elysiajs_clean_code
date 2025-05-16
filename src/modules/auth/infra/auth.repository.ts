import { db } from '@/db';
import { user_provider, user_provider_vhv } from '@/db/schema';
import type { UserProviderDTO } from '../model/auth.model';
import type { ProviderData } from '@/core/http/model/response.model';
import { randomUUID } from 'crypto';
import { Crypto } from '@/core/crypto/crypto';

export const AuthRepository = {
  async upsertUserProvider(
    providerUser: ProviderData
  ): Promise<UserProviderDTO[]> {
    const promise_upsert = [];
    const result: UserProviderDTO[] = [];
    for (const organiz of providerUser.organization) {
      const user: UserProviderDTO = {
        user_id: randomUUID(),
        cid_hash: providerUser.hash_cid,
        hos_code: organiz.hcode,
        hos_name: organiz.hname_th,
        title: providerUser.title_th,
        fname: providerUser.firstname_th,
        lname: providerUser.lastname_th,
        position: organiz.position,
        createAt: new Date(),
        updateAt: new Date(),
      };
      result.push({ ...user });
      user.fname = Crypto.encrypt(user.fname);
      user.lname = Crypto.encrypt(user.lname);
      if (organiz.position_id === '0051')
        promise_upsert.push(
          db
            .insert(user_provider_vhv)
            .values({ ...user })
            .onDuplicateKeyUpdate({
              set: {
                hos_name: user.hos_name,
                title: user.title,
                fname: user.fname,
                lname: user.lname,
                updateAt: user.updateAt,
              },
            })
        );
      else if (
        ['0001', '0004', '0011', '0015', '0050'].includes(organiz.position_id)
      )
        promise_upsert.push(
          db
            .insert(user_provider)
            .values({ ...user })
            .onDuplicateKeyUpdate({
              set: {
                hos_name: user.hos_name,
                title: user.title,
                fname: user.fname,
                lname: user.lname,
                updateAt: user.updateAt,
              },
            })
        );
    }
    await Promise.all(promise_upsert);
    return result;
  },
};
