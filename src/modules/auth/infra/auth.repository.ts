import { db } from '@/db';
import { eq, and } from 'drizzle-orm';
import { user_provider, user_provider_vhv } from '@/db/schema';
import type { UserProviderDTO, LoginUser } from '../model/auth.model';
import type { ProviderData } from '@/core/http/model/response.model';
import { randomUUID } from 'crypto';
import { Crypto } from '@/core/crypto';

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
        hno: organiz.address.address,
        soi_road: !organiz.address.soi
          ? organiz.address.street || '-'
          : organiz.address.soi || '-',
        province: organiz.address.province,
        district: organiz.address.district,
        sub_district: organiz.address.sub_district,
        createAt: new Date(),
        updateAt: new Date(),
      };
      result.push({ ...user });
      user.fname = Crypto.encrypt(user.fname ?? '');
      user.lname = Crypto.encrypt(user.lname ?? '');
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
                position: user.position,
                hno: user.hno,
                soi_road: user.soi_road,
                province: user.province,
                district: user.district,
                sub_district: user.sub_district,
                updateAt: user.updateAt,
              },
            })
        );
      else if (
        [
          '0001',
          '0004',
          '0011',
          '0015',
          '0050',
          // mock add role
          '0065',
          '0024',
          '0016',
        ].includes(organiz.position_id)
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
                position: user.position,
                hno: user.hno,
                soi_road: user.soi_road,
                province: user.province,
                district: user.district,
                sub_district: user.sub_district,
                updateAt: user.updateAt,
              },
            })
        );
    }
    await Promise.all(promise_upsert);
    return result;
  },
  async checkLoginUser(loginUser: LoginUser): Promise<UserProviderDTO> {
    let result: UserProviderDTO[];
    if (loginUser.position === 'อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)') {
      result = await db
        .select()
        .from(user_provider_vhv)
        .where(
          and(
            eq(user_provider_vhv.cid_hash, loginUser.cid_hash),
            eq(user_provider_vhv.hos_code, loginUser.hos_code)
          )
        );
    } else {
      result = await db
        .select()
        .from(user_provider)
        .where(
          and(
            eq(user_provider.cid_hash, loginUser.cid_hash),
            eq(user_provider.hos_code, loginUser.hos_code)
          )
        );
    }
    return result[0];
  },
  async checkCidUser(cidHash: string): Promise<string> {
    const result = await db
      .select({
        cidOffice: user_provider.cid,
        cidVhv: user_provider_vhv.cid,
      })
      .from(user_provider)
      .leftJoin(
        user_provider_vhv,
        eq(user_provider.cid_hash, user_provider_vhv.cid_hash)
      )
      .where(eq(user_provider.cid_hash, cidHash));
    if (result.length === 0) {
      return '';
    }
    if (!result[0].cidOffice && !result[0].cidVhv) {
      return '';
    }

    if (result[0].cidOffice && result[0].cidVhv) {
      return result[0].cidOffice === result[0].cidVhv
        ? result[0].cidOffice
        : result[0].cidOffice || result[0].cidVhv;
    }
    return result[0].cidOffice || result[0].cidVhv || '';
  },
  async updateCidUser(cidHash: string, cid: string): Promise<void> {
    cid = Crypto.encrypt(cid);
    await Promise.all([
      db
        .update(user_provider)
        .set({ cid: cid })
        .where(eq(user_provider.cid_hash, cidHash)),
      db
        .update(user_provider_vhv)
        .set({ cid: cid })
        .where(eq(user_provider_vhv.cid_hash, cidHash)),
    ]);
  },
};
