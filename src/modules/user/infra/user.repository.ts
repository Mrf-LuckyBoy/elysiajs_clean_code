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
  async finds(): Promise<UserDTO[] | null> {
    const result = await db.select().from(users);
    return result || null;
  },
  async update(user: UserDTO): Promise<void> {
    await db
      .update(users)
      .set({ name: user.name })
      .where(eq(users.id, user.id));
  },
  async delete(id: string): Promise<boolean> {
    const existing = await db.select().from(users).where(eq(users.id, id));
    if (!existing.length) return false;
    await db.delete(users).where(eq(users.id, id));
    return true;
  },
};
