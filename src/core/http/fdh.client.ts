import qs from 'qs';
import { httpFDH } from '@/core/http/fetch';
import { CheckRightResponse } from './model/response.model.fdh';
import { ENV } from '@/config/env';

export const FDHClient = {
  async getRight(cid: string): Promise<CheckRightResponse> {
    const data = qs.stringify({ pid: cid });
    return await httpFDH<CheckRightResponse>('/nhso/inscl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': ENV.X_API_KEY_FDH_NSHO,
      },
      body: data,
    });
  },
};
