import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { ENV } from '@/config/env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SECRET = ENV.ENCRYPT_SECRET;

const KEY = scryptSync(SECRET, 'salt', 32);

export const Crypto = {
  encrypt(text: string): string {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, KEY, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  },

  decrypt(encryptedText: string): string {
    const [ivHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = createDecipheriv(ALGORITHM, KEY, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  },
};
