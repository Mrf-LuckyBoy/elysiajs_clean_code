// @/core/http/fetch.ts
import { ENV } from '@/config/env';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const createFetcher = (
  baseURL?: string,
  defaultOptions?: RequestInit,
  timeout = 10000
) => {
  return async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(baseURL ? `${baseURL}${path}` : path, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultHeaders,
          ...(defaultOptions?.headers || {}),
          ...(options.headers || {}),
        },
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } finally {
      clearTimeout(id);
    }
  };
};

export const http = createFetcher(); // default/global
