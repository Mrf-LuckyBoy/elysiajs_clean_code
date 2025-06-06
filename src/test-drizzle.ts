import { db } from './db';
import { users } from './db/schema';

export async function testDrizzle() {
  try {
    await db.select().from(users).limit(1);
    console.log('✅ Drizzle connected!');
  } catch (error) {
    console.error('❌ Drizzle DB test failed:', error);
  }
}
