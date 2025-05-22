import { db } from '@/db';
// import { eq, and } from 'drizzle-orm';
import { title_normalize } from '@/db/schema';
import { TitleName } from '../model/dropdown.model';

export const DropdownRepository = {
  async dropdownTitle(): Promise<TitleName[]> {
    const result: TitleName[] = await db.select().from(title_normalize);
    return result;
  },
    async dropdownVillcode(): Promise<void>{

    },
};
