/**
 * SWR Fetcher - Auto-integrated với Keycloak
 * Best practice: Services không cần biết về axios init
 */

import { getAxiosClient, isAxiosInitialized } from './axios-client';

/**
 * Generic fetcher cho SWR
 * Tự động sử dụng axios client với Keycloak token
 * Gracefully handle khi axios chưa init (sẽ retry sau)
 *
 * @example
 * const { data } = useSWR('/api/users/123', fetcher)
 */
export async function fetcher<T = unknown>(url: string): Promise<T> {
  // Check axios ready trước khi fetch
  if (!isAxiosInitialized()) {
    // Throw error để SWR retry sau (khi axios đã init)
    throw new Error('Axios client not ready yet, will retry');
  }

  const client = getAxiosClient();
  const response = await client.get<T>(url);
  return response.data;
}

/**
 * Fetcher với method khác
 */
export const fetcherFactory = {
  get: <T = unknown>(url: string) => fetcher<T>(url),

  post:
    <T = unknown>(url: string, data?: unknown) =>
    async (): Promise<T> => {
      const client = getAxiosClient();
      const response = await client.post<T>(url, data);
      return response.data;
    },

  put:
    <T = unknown>(url: string, data?: unknown) =>
    async (): Promise<T> => {
      const client = getAxiosClient();
      const response = await client.put<T>(url, data);
      return response.data;
    },

  delete:
    <T = unknown>(url: string) =>
    async (): Promise<T> => {
      const client = getAxiosClient();
      const response = await client.delete<T>(url);
      return response.data;
    },
};
