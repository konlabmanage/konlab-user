import type { AuthConfig } from '@konlab/auth';

/**
 * Default auth configuration loaded from environment variables
 */
export function getDefaultAuthConfig(): AuthConfig {
  return {
    keycloak: {
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || '',
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
    },
    paths: {
      home: '/',
      afterLogout: '/',
    },
    autoRefreshInterval: 45,
  };
}
