import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { AppShell } from '@konlab/user/layouts';
import { mainNavItems } from '@/config/nav';
import { AppLogo } from '@/components/app-logo';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '@konlab/user Playground',
  description: 'Playground for @konlab/user components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authConfig = {
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
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <AppShell authConfig={authConfig} logo={<AppLogo />} mainNavItems={mainNavItems}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
