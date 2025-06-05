import { db } from '@/db';
// import { eq, and } from 'drizzle-orm';
import { address_code, title_normalize, relationship, user_provider, user_provider_vhv } from '@/db/schema';
import { TitleName, AddressCode, Relationship, users, usersVhv } from '../model/dropdown.model';

export const DropdownRepository = {
  async dropdownTitle(): Promise<TitleName[]> {
    const result: TitleName[] = await db.select().from(title_normalize);
    return result;
  },

  async dropdoewnAddress(): Promise<AddressCode[]> {
    const address_result: AddressCode[] = await db.select().from(address_code);
    return address_result;
  },

  async dropdoewnRelationship(): Promise<Relationship[]> {
    const relationshipResult: Relationship[] = await db.select().from(relationship);
    return relationshipResult;
  },

  async dropdownUser(): Promise<users[]> {
    const userResult: users[] = await db
      .select({
        user_id: user_provider.user_id,
        hos_code: user_provider.hos_code,
        hos_name: user_provider.hos_name,
        title: user_provider.title,
        fname: user_provider.fname,
        lname: user_provider.lname,
      })
      .from(user_provider);
    return userResult;
  },

  async dropdownUserVhv(): Promise<usersVhv[]> {
    const userVhvResult: usersVhv[] = await db
      .select({
        user_id: user_provider_vhv.user_id,
        hos_code: user_provider_vhv.hos_code,
        hos_name: user_provider_vhv.hos_name,
        title: user_provider_vhv.title,
        fname: user_provider_vhv.fname,
        lname: user_provider_vhv.lname,
      })
      .from(user_provider_vhv);
    return userVhvResult;
  },
  // async dropdownฏoctor(): Promise<>
  // async dropdownVillcode(): Promise<void>{

  // },
};
