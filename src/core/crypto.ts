import { createCipheriv, createDecipheriv, createHash, scryptSync } from 'crypto';
import { ENV } from '@/config/env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SECRET = ENV.ENCRYPT_SECRET;

const KEY = scryptSync(SECRET, 'salt', 32);

export const Crypto = {
  encrypt(text: string): string {
    if (!text) return '';

    // 🔐 Deterministic IV: md5(text) → first 12 bytes
    const iv = createHash('md5').update(text).digest().subarray(0, IV_LENGTH);

    const cipher = createCipheriv(ALGORITHM, KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
  },

  decrypt(encryptedText: string): string {
    const [ivHex, tagHex, encryptedHex] = encryptedText.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted.toString('utf8');
  },
};
