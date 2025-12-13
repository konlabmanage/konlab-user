/**
 * AppShell - Unified wrapper for all common providers and layout
 * Combines ThemeProvider, AuthProvider, Toaster, and CMSLayout
 *
 * @example
 * ```tsx
 * <AppShell
 *   authConfig={{
 *     keycloak: {
 *       url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
 *       realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
 *       clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
 *     },
 *   }}
 *   logo={<AppLogo />}
 *   mainNavItems={mainNavItems}
 * >
 *   {children}
 * </AppShell>
 * ```
 */

'use client';

import { ThemeProvider, Toaster, CMSLayout, type CMSLayoutProps } from '@konlab/ui';
import { NextAuthProvider, type AuthConfig } from '@konlab/auth';

export interface AppShellProps extends Omit<CMSLayoutProps, 'children'> {
  /**
   * Auth configuration for NextAuthProvider
   */
  authConfig: AuthConfig;
  /**
   * Enable auth guard (default: true)
   */
  enableAuthGuard?: boolean;
  /**
   * Theme configuration
   */
  defaultTheme?: 'light' | 'dark' | 'system';
  /**
   * Theme storage key (default: 'vite-ui-theme')
   */
  themeStorageKey?: string;
  /**
   * Logo to display in header
   */
  logo?: React.ReactNode;
  /**
   * Children to render inside CMSLayout
   */
  children: React.ReactNode;
}

/**
 * Unified app shell component that wraps:
 * - ThemeProvider
 * - NextAuthProvider
 * - Toaster
 * - CMSLayout
 */
export function AppShell({
  authConfig,
  enableAuthGuard = true,
  defaultTheme = 'light',
  themeStorageKey = 'vite-ui-theme',
  children,
  ...cmsLayoutProps
}: AppShellProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={themeStorageKey}>
      <NextAuthProvider config={authConfig} enableAuthGuard={enableAuthGuard}>
        <CMSLayout {...cmsLayoutProps}>{children}</CMSLayout>
        <Toaster />
      </NextAuthProvider>
    </ThemeProvider>
  );
}
