import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { CMSLayout } from '@konlab/ui/layouts/cms';
import { mainNavItems } from '@/config/nav';
import { Providers } from '@/components/providers';
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
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Providers>
          <CMSLayout logo={<AppLogo />} mainNavItems={mainNavItems}>
            {children}
          </CMSLayout>
        </Providers>
      </body>
    </html>
  );
}
