import { db } from '@/db';
import { address_code } from '@/db/schema';
import { readFile } from 'fs/promises';
import path from 'path';

async function importAddressCodes() {
  try {
    const filePath = path.resolve(__dirname, '../data/address_codes.json');
    const file = await readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    await db.insert(address_code).values(data);

    console.log(`Imported ${data.length} address codes successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Error importing address codes:', err);
    process.exit(1);
  }
}

importAddressCodes();
