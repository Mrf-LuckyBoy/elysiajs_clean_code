import { db } from '@/db';
// import { eq, and } from 'drizzle-orm';
import { address_code, title_normalize, relationship } from '@/db/schema';
import { TitleName, AddressCode, Relationship } from '../model/dropdown.model';

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
  // async dropdownVillcode(): Promise<void>{

  // },
};
