import { db } from './db';
import { users } from './db/schema';

async function testDrizzle() {
  try {
    const result = await db.select().from(users).limit(1);
    console.log('✅ Drizzle connected! Example result:', result);
  } catch (error) {
    console.error('❌ Drizzle DB test failed:', error);
  }
}

testDrizzle();
