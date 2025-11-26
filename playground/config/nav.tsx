'use client';

import { Home, Users, Settings, FileText } from 'lucide-react';
import { type SidebarMenuGroupType } from '@konlab/ui/layouts/cms';

export const mainNavItems: SidebarMenuGroupType[] = [
  {
    items: [
      {
        title: 'Trang chủ',
        url: '/',
        icon: Home,
      },
      {
        title: 'Người dùng',
        url: '/cms/users',
        icon: Users,
      },
      {
        title: 'Bài viết',
        url: '/cms/posts',
        icon: FileText,
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        title: 'Cài đặt',
        url: '/cms/settings',
        icon: Settings,
      },
    ],
  },
];
