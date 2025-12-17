import Keycloak from 'keycloak-js';
import { initializeAxiosWithKeycloak } from '../lib/axios-client';

/**
 * Khởi tạo axios client với Keycloak instance
 * Chỉ gọi một lần khi app khởi động (client-side)
 */
export function initializeAxios(keycloak: Keycloak | null) {
  if (typeof window === 'undefined') {
    return; // Chỉ init ở client-side
  }

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

    initializeAxiosWithKeycloak(baseURL, keycloak);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[axios] Axios client initialized');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[axios] Failed to initialize axios client:', error);
  }
}
