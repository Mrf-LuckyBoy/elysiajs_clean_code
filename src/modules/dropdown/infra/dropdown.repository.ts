import { db } from '@/db';
// import { eq, and } from 'drizzle-orm';
import {
  address_code,
  title_normalize,
  relationship,
  user_provider,
  user_provider_vhv,
} from '@/db/schema';
import {
  TitleName,
  AddressCode,
  Relationship,
  users,
  usersVhv,
} from '../model/dropdown.model';

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
    const relationshipResult: Relationship[] = await db
      .select()
      .from(relationship);
    return relationshipResult;
  },

  async dropdownUser(): Promise<users[]> {
    const userResult: users[] = await db.select().from(user_provider);
    return userResult;
  },

  async dropdownUserVhv(): Promise<usersVhv[]> {
    const userVhvResult: usersVhv[] = await db.select().from(user_provider_vhv);
    return userVhvResult;
  },
  // async dropdownฏoctor(): Promise<>
  // async dropdownVillcode(): Promise<void>{

  // },
};
