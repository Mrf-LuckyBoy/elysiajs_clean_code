import type { Config } from 'drizzle-kit';
import { ENV } from '@/config/env';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: ENV.DB_HOST,
    port: Number(ENV.DB_PORT || 3306),
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
  },
} satisfies Config;
