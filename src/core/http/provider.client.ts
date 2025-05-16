import { httpHealthID, httpProvider } from '@/core/http/axios';
import {
  HealthIdLoginResponse,
  TokenProviderIDResponse,
  ProviderResponse,
} from './model/response.model';
import { ENV } from '@/config/env';
import qs from 'qs';

export const ProviderClient = {
  async getHealthIdToken(code: string) {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: ENV.REDIRECT_URI,
      client_id: ENV.HEALTHID_CLIENT_ID,
      client_secret: ENV.HEALTHID_SECRET_KEY,
    });
    const response = await httpHealthID.post<HealthIdLoginResponse>(
      '/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },
  async serviceTokenProviderID(code: string) {
    const data = JSON.stringify({
      client_id: ENV.PROVIDER_CLIENT_ID,
      secret_key: ENV.PROVIDER_SECRET_KEY,
      token_by: 'Health ID',
      token: code,
    });
    const response = await httpProvider.post<TokenProviderIDResponse>(
      '/services/token',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
  async serviceCheckStaff(code: string) {
    const response = await httpProvider.get<ProviderResponse>(
      '/services/moph-idp/check-staff',
      {
        headers: {
          'client-id': ENV.PROVIDER_CLIENT_ID,
          'secret-key': ENV.PROVIDER_SECRET_KEY,
          Authorization: `Bearer ${code}`,
        },
        maxBodyLength: Infinity,
      }
    );
    return response;
  },
};
