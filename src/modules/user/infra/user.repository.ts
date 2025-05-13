import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { UserDTO } from '../model/user.model';

export const UserRepository = {
  async findById(id: string): Promise<UserDTO | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  },
  async create(user: UserDTO): Promise<void> {
    await db.insert(users).values(user);
  },
};
