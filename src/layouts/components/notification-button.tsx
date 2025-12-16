'use client';

import { useMemo } from 'react';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@konlab/ui/components';
import { cn } from '@konlab/ui';
import { Bell, CheckCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  read?: boolean;
  createdAt?: string | Date;
}

/**
 * Mock notifications data for development/testing
 */
export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Thông báo mới',
    message: 'Bạn có một thông báo mới từ hệ thống',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 phút trước
  },
  {
    id: 2,
    title: 'Cập nhật tài khoản',
    message: 'Thông tin tài khoản của bạn đã được cập nhật thành công',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 phút trước
  },
  {
    id: 3,
    title: 'Nhắc nhở',
    message: 'Đừng quên hoàn thành nhiệm vụ của bạn hôm nay',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 giờ trước
  },
  {
    id: 4,
    title: 'Thông báo đã đọc',
    message: 'Đây là một thông báo đã được đọc trước đó',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 ngày trước
  },
  {
    id: 5,
    title: 'Hoàn thành nhiệm vụ',
    message: 'Bạn đã hoàn thành nhiệm vụ được giao',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 ngày trước
  },
  {
    id: 6,
    title: 'Thông báo hệ thống',
    message: 'Hệ thống sẽ bảo trì vào cuối tuần này',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 giờ trước
  },
];

export interface NotificationButtonProps {
  /**
   * Số lượng thông báo chưa đọc (tự động tính từ notifications nếu không truyền)
   */
  unreadCount?: number;
  /**
   * Danh sách thông báo
   */
  notifications?: Notification[];
  /**
   * Callback khi click vào một thông báo
   */
  onNotificationClick?: (notification: Notification) => void;
  /**
   * Callback khi click "Đánh dấu đã đọc tất cả"
   */
  onMarkAllAsRead?: () => void;
  /**
   * URL đến trang notification (default: '/notifications')
   */
  viewAllUrl?: string;
  /**
   * Custom className cho button
   */
  className?: string;
}

/**
 * NotificationButton component với badge và dropdown
 */
export function NotificationButton({
  unreadCount: propUnreadCount,
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  viewAllUrl = '/notifications',
  className,
}: NotificationButtonProps) {
  const router = useRouter();

  // Sử dụng mock data nếu không truyền notifications
  const displayNotifications = useMemo(() => {
    return notifications ?? mockNotifications;
  }, [notifications]);

  // Tính số thông báo chưa đọc từ notifications nếu không truyền prop
  const unreadCount = useMemo(() => {
    if (propUnreadCount !== undefined) return propUnreadCount;
    return displayNotifications.filter((n) => !n.read).length;
  }, [propUnreadCount, displayNotifications]);

  const hasUnread = unreadCount > 0;

  const handleViewAll = () => {
    router.push(viewAllUrl);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Thông báo"
          className={cn(
            '[&_svg]:icon-white hover:[&_svg]:icon-black relative rounded-full',
            className,
          )}
        >
          <Bell />
          {hasUnread && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Thông báo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <DropdownMenuLabel className="p-0 font-semibold">Thông báo</DropdownMenuLabel>
          {hasUnread && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAllAsRead();
                    }}
                  >
                    <CheckCheck className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Đánh dấu đã đọc tất cả</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {displayNotifications.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto">
              {displayNotifications.map((notification) => {
                const isUnread = !notification.read;
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      'flex flex-col items-start gap-1 border-b p-3 transition-colors',
                      isUnread && 'bg-muted/50',
                    )}
                    onSelect={(e) => {
                      e.preventDefault();
                      onNotificationClick?.(notification);
                    }}
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <div className="flex-1">
                        <div
                          className={cn(
                            'font-medium',
                            isUnread ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {notification.title}
                        </div>
                        <div className="text-muted-foreground mt-1 text-sm">
                          {notification.message}
                        </div>
                      </div>
                      {isUnread && (
                        <div className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
            <div className="border-t p-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAll();
                }}
              >
                Xem thêm
              </Button>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground py-6 text-center text-sm">
            Không có thông báo mới
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
