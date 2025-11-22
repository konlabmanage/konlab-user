import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CMSLayout } from "@konlab/ui/layouts/cms";
import { menuItems } from "@/config/nav";
import { Providers } from "@/components/providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Konlab UI Playground",
  description: "Playground for @konlab/ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <Providers>
          <CMSLayout
            logo={
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">K</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Konlab CMS</span>
                  <span className="text-xs text-muted-foreground">Dashboard</span>
                </div>
              </div>
            }
            items={menuItems}
          >
            {children}
          </CMSLayout>
        </Providers>
      </body>
    </html>
  );
}
