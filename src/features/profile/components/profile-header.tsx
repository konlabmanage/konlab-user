'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@konlab/ui/components';
import { Phone, Mail, Building2 } from 'lucide-react';
import type { AuthUser } from '@konlab/auth';
import { cn } from '@konlab/ui';

interface ProfileHeaderProps {
  user: AuthUser | null;
}

// Get user initials for avatar fallback
function getInitials(name?: string) {
  if (!name) return 'U';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user?.name || user?.preferred_username || 'Người dùng';

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <Avatar className="h-24 w-24">
        <AvatarImage src={(user as any)?.avatar} alt={displayName} />
        <AvatarFallback className="text-2xl">{getInitials(displayName)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
        <div>
          <h1 className="text-2xl font-semibold">{displayName}</h1>
          <p className={cn("text-muted-foreground mt-1 text-sm", user?.position ? 'text-foreground' : 'text-muted-foreground')}>{user?.position || 'Chưa có chức vụ'}</p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <div className="flex items-center gap-2">
            <Phone className="text-muted-foreground h-4 w-4" />
            <span className={cn("text-sm", user?.phone ? 'text-foreground' : 'text-muted-foreground')}>{user?.phone || 'Chưa có số điện thoại'}</span>
          </div>
          <div className="text-muted-foreground">·</div>
          <div className="flex items-center gap-2">
            <Mail className="text-muted-foreground h-4 w-4" />
            <span className={cn("text-sm", user?.email ? 'text-foreground' : 'text-muted-foreground')}>{user?.email || 'Chưa có email'}</span>
          </div>
          <div className="text-muted-foreground">·</div>
          <div className="flex items-center gap-2">
            <Building2 className="text-muted-foreground h-4 w-4" />
            <span className={cn("text-sm", user?.department ? 'text-foreground' : 'text-muted-foreground')}>{user?.department || 'Chưa có phòng ban'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
