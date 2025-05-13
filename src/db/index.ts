import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { ENV } from '@/config/env';

const pool = mysql.createPool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT || 3306),
  user: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
});

export const db = drizzle(pool, { schema, mode: 'default' });
