'use client';

import { NextAuthProvider } from '@konlab/auth';
import type { PropsWithChildren } from 'react';
import type { AuthConfig } from '@konlab/auth';

export function AuthProviderWrapper({ children }: PropsWithChildren) {
  const config: AuthConfig = {
    keycloak: {
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
    },
    paths: {
      home: '/',
      afterLogout: '/',
    },
    autoRefreshInterval: 45,
  };

  return (
    <NextAuthProvider config={config} enableAuthGuard={true}>
      {children}
    </NextAuthProvider>
  );
}
