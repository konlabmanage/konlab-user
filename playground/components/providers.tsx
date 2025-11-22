'use client';

import { ThemeProvider, Toaster } from "@konlab/ui";
import { AuthProviderWrapper } from "@/components/auth-provider-wrapper";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProviderWrapper>
        {children}
      </AuthProviderWrapper>
      <Toaster />
    </ThemeProvider>
  );
}

