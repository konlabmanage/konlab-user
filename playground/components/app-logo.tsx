'use client';

import { AppLogoProps } from '@konlab/ui/layouts/cms';

export function AppLogo({ sidebarIsOpen }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
        <span className="text-sm font-bold">K</span>
      </div>
      {sidebarIsOpen && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Konlab CMS</span>
        </div>
      )}
    </div>
  );
}
