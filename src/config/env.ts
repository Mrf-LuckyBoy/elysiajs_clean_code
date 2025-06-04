import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DB_HOST: z.string(),
  DB_PORT: z.string().default('3306'),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  SERVER_PORT: z.string(),
  JWT_SECRET: z.string(),
  PROVIDER_CLIENT_ID: z.string(),
  PROVIDER_SECRET_KEY: z.string(),
  HEALTHID_CLIENT_ID: z.string(),
  HEALTHID_SECRET_KEY: z.string(),
  HEALTHID_DOMAIN: z.string(),
  PROVIDER_DOMAIN: z.string(),
  ENCRYPT_SECRET: z.string(),
  REDIRECT_URI: z.string(),
  FDH_DOMAIN: z.string(),
  X_API_KEY_FDH_NSHO: z.string(),
  MOPH_BUDDY_DOMAIN: z.string(),
  BUN_ENV: z.string(),
});

// Validate and parse
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  process.exit(1);
}

export const ENV = _env.data;
