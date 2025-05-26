import qs from 'qs';
import { httpHealthID, httpProvider } from '@/core/http/fetch';
import {
  HealthIdLoginResponse,
  TokenProviderIDResponse,
  ProviderResponse,
} from './model/response.model';
import { ENV } from '@/config/env';

export const ProviderClient = {
  async getHealthIdToken(code: string): Promise<HealthIdLoginResponse> {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: ENV.REDIRECT_URI,
      client_id: ENV.HEALTHID_CLIENT_ID,
      client_secret: ENV.HEALTHID_SECRET_KEY,
    });

    return await httpHealthID<HealthIdLoginResponse>('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });
  },

  async serviceTokenProviderID(code: string): Promise<TokenProviderIDResponse> {
    const body = JSON.stringify({
      client_id: ENV.PROVIDER_CLIENT_ID,
      secret_key: ENV.PROVIDER_SECRET_KEY,
      token_by: 'Health ID',
      token: code,
    });

    return await httpProvider<TokenProviderIDResponse>('/services/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  },

  async serviceCheckStaff(code: string): Promise<ProviderResponse> {
    return await httpProvider<ProviderResponse>(
      '/services/moph-idp/check-staff',
      {
        method: 'GET',
        headers: {
          'client-id': ENV.PROVIDER_CLIENT_ID,
          'secret-key': ENV.PROVIDER_SECRET_KEY,
          Authorization: `Bearer ${code}`,
        },
      }
    );
  },
};
