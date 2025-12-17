/**
 * Custom axios client với token từ Keycloak
 * Singleton pattern với proper error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Keycloak from 'keycloak-js';

let axiosInstance: AxiosInstance | null = null;
let keycloakInstance: Keycloak | null = null;
let isInitialized = false;

/**
 * Logout callback - sẽ được set từ bên ngoài
 */
let onUnauthorized: (() => void) | null = null;

/**
 * Set callback khi gặp 401 Unauthorized
 */
export function setUnauthorizedCallback(callback: () => void) {
  onUnauthorized = callback;
}

/**
 * Initialize axios client với Keycloak instance (singleton)
 */
export function initializeAxiosWithKeycloak(
  baseURL: string,
  keycloak: Keycloak | null,
): AxiosInstance {
  // Nếu đã init rồi, chỉ update keycloak instance
  if (isInitialized && axiosInstance) {
    keycloakInstance = keycloak;
    return axiosInstance;
  }

  keycloakInstance = keycloak;

  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add access token from Keycloak
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (keycloakInstance?.token && config.headers) {
        try {
          // Refresh token nếu hết hạn trong 30s
          const refreshed = await keycloakInstance.updateToken(30);
          if (refreshed) {
            // Token đã được refresh, dùng token mới
            config.headers.Authorization = `Bearer ${keycloakInstance.token}`;
          } else {
            // Token vẫn còn hạn, dùng token hiện tại
            config.headers.Authorization = `Bearer ${keycloakInstance.token}`;
          }
        } catch (error) {
          // Token refresh failed - có thể là refresh token hết hạn
          // Không add token vào request, để API trả về 401
          // eslint-disable-next-line no-console
          console.error('[axios] Token refresh failed, request will fail:', error);
          // Trigger logout
          if (onUnauthorized) {
            onUnauthorized();
          }
          return Promise.reject(new Error('Token refresh failed'));
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor - Handle errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // eslint-disable-next-line no-console
        console.error('[axios] 401 Unauthorized - triggering logout');
        // Trigger logout callback
        if (onUnauthorized) {
          onUnauthorized();
        }
      }

      // Handle network errors
      if (!error.response) {
        // eslint-disable-next-line no-console
        console.error('[axios] Network error:', error.message);
      }

      return Promise.reject(error);
    },
  );

  axiosInstance = client;
  isInitialized = true;

  return client;
}

/**
 * Get axios client instance
 * Note: Sẽ throw error nếu chưa init - đây là intended behavior
 * để catch lỗi sớm thay vì silent fail
 */
export function getAxiosClient(): AxiosInstance {
  if (!axiosInstance) {
    throw new Error(
      'Axios client not initialized. This usually means the app is trying to fetch data before authentication is complete.',
    );
  }
  return axiosInstance;
}

/**
 * Check if axios client is initialized
 */
export function isAxiosInitialized(): boolean {
  return isInitialized && axiosInstance !== null;
}

/**
 * Update Keycloak instance (khi re-init)
 */
export function updateKeycloakInstance(keycloak: Keycloak | null) {
  keycloakInstance = keycloak;
}

/**
 * Reset axios instance (for testing or cleanup)
 */
export function resetAxiosInstance() {
  axiosInstance = null;
  keycloakInstance = null;
  isInitialized = false;
  onUnauthorized = null;
}
