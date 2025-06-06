import Redis from 'ioredis';
import { ENV } from '@/config/env';

export const redis = new Redis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
  password: ENV.REDIS_PASSWORD,
  db: Number(ENV.REDIS_DB),
});

redis.on('connect', () => console.log('✅ Redis connected!'));
redis.on('error', (err) => console.error('❌ Redis error', err));
