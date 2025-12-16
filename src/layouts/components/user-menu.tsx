'use client';

import { useMemo } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@konlab/ui/components';
import { cn } from '@konlab/ui';
import { useAuth } from '@konlab/auth';
import { LogOut, Key, Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface UserMenuProps {
  /**
   * URL avatar của user
   */
  avatarUrl?: string;
  /**
   * Custom className cho button
   */
  className?: string;
}

/**
 * UserMenu component với avatar dropdown
 */
export function UserMenu({ avatarUrl, className }: UserMenuProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const userInitials = useMemo(() => {
    if (!user) return 'U';
    const name = user.name || user.preferred_username || user.email || '';
    return (
      name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U'
    );
  }, [user]);

  const userName = user?.name || user?.preferred_username || 'Người dùng';
  const userEmail = user?.email || '';

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleChangePasswordClick = () => {
    router.push('/profile?tab=password');
  };

  const handleSecurityClick = () => {
    router.push('/profile?tab=2fa');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Tài khoản"
          className={cn('text-accent-foreground rounded-full', className)}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt="User avatar" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{userName}</p>
            {userEmail && <p className="text-muted-foreground text-xs leading-none">{userEmail}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          Xem thông tin cá nhân
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleChangePasswordClick}>
          <Key className="mr-2 h-4 w-4" />
          Đổi mật khẩu
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSecurityClick}>
          <Shield className="mr-2 h-4 w-4" />
          Bảo mật
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
