/**
 * SWR Fetcher - Auto-integrated với Keycloak
 * Best practice: Services không cần biết về axios init
 */

import { getAxiosClient } from './axios-client';

/**
 * Generic fetcher cho SWR
 * Tự động sử dụng axios client với Keycloak token
 *
 * @example
 * const { data } = useSWR('/api/users/123', fetcher)
 */
export async function fetcher<T = any>(url: string): Promise<T> {
  const client = getAxiosClient();
  const response = await client.get<T>(url);
  return response.data;
}

/**
 * Fetcher với method khác
 */
export const fetcherFactory = {
  get: <T = any>(url: string) => fetcher<T>(url),

  post:
    <T = any>(url: string, data?: any) =>
    async () => {
      const client = getAxiosClient();
      const response = await client.post<T>(url, data);
      return response.data;
    },

  put:
    <T = any>(url: string, data?: any) =>
    async () => {
      const client = getAxiosClient();
      const response = await client.put<T>(url, data);
      return response.data;
    },

  delete:
    <T = any>(url: string) =>
    async () => {
      const client = getAxiosClient();
      const response = await client.delete<T>(url);
      return response.data;
    },
};
