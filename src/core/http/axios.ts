import axios from 'axios';
import { ENV } from '@/config/env';

export const httpHealthID = axios.create({
  baseURL: `${ENV.HEALTHID_DOMAIN}/api/v1`,
});

export const httpProvider = axios.create({
  baseURL: `${ENV.PROVIDER_DOMAIN}/api/v1`,
});

export const http = axios.create({
  timeout: 5000,
});
