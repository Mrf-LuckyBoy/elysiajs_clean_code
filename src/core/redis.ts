import { redis } from '../config/redis.config';

export const redisService = {
  async setCache(key: string, value: string, ttlSec?: number) {
    if (ttlSec) {
      await redis.set(key, value, 'EX', ttlSec);
    } else {
      await redis.set(key, value);
    }
  },
  async getCache(key: string) {
    return await redis.get(key);
  },
  async delCache(key: string) {
    return await redis.del(key);
  },
  async existsCache(key: string) {
    return await redis.exists(key);
  },
};
