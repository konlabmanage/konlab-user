/**
 * AppShell - Unified wrapper for all common providers and layout
 * Combines ThemeProvider, AuthProvider, Toaster, and CMSLayout
 *
 * @example
 * ```tsx
 * <AppShell logo={<AppLogo />} mainNavItems={mainNavItems}>
 *   {children}
 * </AppShell>
 * ```
 *
 * Note: authConfig is automatically loaded from environment variables:
 * - NEXT_PUBLIC_KEYCLOAK_URL
 * - NEXT_PUBLIC_KEYCLOAK_REALM
 * - NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
 */

'use client';

import { useMemo } from 'react';
import {
  ThemeProvider,
  Toaster,
  CMSLayout,
  type CMSLayoutProps,
  type SidebarMenuGroupType,
} from '@konlab/ui';
import { NextAuthProvider } from '@konlab/auth';
import { NotificationButton, type NotificationButtonProps } from './components/notification-button';
import { UserMenu, type UserMenuProps } from './components/user-menu';
import { SearchBar, type SearchBarProps } from './components/search-bar';
import { mainNavItems as defaultMainNavItems } from './components/nav';
import { getDefaultAuthConfig } from '../config/auth.config';

export interface AppShellProps extends Omit<CMSLayoutProps, 'children' | 'mainNavItems'> {
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
   * Navigation items for sidebar (default: common navigation items)
   * If not provided, will use default navigation items
   */
  mainNavItems?: SidebarMenuGroupType[];
  /**
   * Props cho NotificationButton component
   */
  notificationButtonProps?: Omit<NotificationButtonProps, 'className'>;
  /**
   * Props cho UserMenu component
   */
  userMenuProps?: Omit<UserMenuProps, 'className'>;
  /**
   * Props cho SearchBar component
   */
  searchBarProps?: Omit<SearchBarProps, 'className'>;
  /**
   * Children to render inside CMSLayout
   */
  children: React.ReactNode;
}

/**
 * Inner component that uses hooks (must be inside NextAuthProvider)
 */
function AppShellInner({
  children,
  mainNavItems,
  notificationButtonProps,
  userMenuProps,
  searchBarProps,
  ...cmsLayoutProps
}: Omit<AppShellProps, 'enableAuthGuard'>) {
  const notificationSlot = useMemo(
    () => <NotificationButton {...notificationButtonProps} />,
    [notificationButtonProps],
  );
  const profileSlot = useMemo(() => <UserMenu {...userMenuProps} />, [userMenuProps]);

  const searchSlot = useMemo(
    () => (
      <SearchBar
        {...searchBarProps}
        className="flex flex-1 items-center justify-center gap-3 px-4"
      />
    ),
    [searchBarProps],
  );

  return (
    <CMSLayout
      {...cmsLayoutProps}
      mainNavItems={mainNavItems}
      searchSlot={searchSlot}
      notificationSlot={notificationSlot}
      profileSlot={profileSlot}
    >
      {children}
    </CMSLayout>
  );
}

/**
 * Unified app shell component that wraps:
 * - ThemeProvider
 * - NextAuthProvider
 * - Toaster
 * - CMSLayout
 */
export function AppShell({
  enableAuthGuard = true,
  defaultTheme = 'light',
  themeStorageKey = 'vite-ui-theme',
  children,
  mainNavItems = defaultMainNavItems,
  notificationButtonProps,
  userMenuProps,
  searchBarProps,
  ...cmsLayoutProps
}: AppShellProps) {
  const authConfig = useMemo(() => getDefaultAuthConfig(), []);

  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={themeStorageKey}>
      <NextAuthProvider config={authConfig} enableAuthGuard={enableAuthGuard}>
        <AppShellInner
          {...cmsLayoutProps}
          mainNavItems={mainNavItems}
          notificationButtonProps={notificationButtonProps}
          userMenuProps={userMenuProps}
          searchBarProps={searchBarProps}
        >
          {children}
        </AppShellInner>
        <Toaster />
      </NextAuthProvider>
    </ThemeProvider>
  );
}
