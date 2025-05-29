import { FDHClient } from '@/core/http/fdh.client';
import type { CheckRightResponse } from '@/core/http/model/response.model.fdh.ts';

export async function getRightInscl(idcard: string): Promise<string> {
  try {
    const result: CheckRightResponse = await FDHClient.getRight(idcard);
    const match = result.data.main_inscl.match(/\((.*?)\)/);
    const res = match ? match[1] : '';
    return res;
  } catch (err) {
    console.log(err);
    return '';
  }
}
