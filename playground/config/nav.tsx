'use client';

import { Home, Users, Shield, Building, Key, User } from 'lucide-react';
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
        title: 'Hồ sơ',
        url: '/profile',
        icon: User,
      },
    ],
  },
  {
    label: 'CMS',
    items: [
      {
        title: 'Quản lý người dùng',
        url: '/users',
        icon: Users,
      },
      {
        title: 'Quản lý phòng ban',
        url: '/departments',
        icon: Building,
      },
    ],
  },
  {
    label: 'Admin',
    items: [
      {
        title: 'Quản lý chức vụ',
        url: '/roles',
        icon: Shield,
      },
      {
        title: 'Quản lý quyền',
        url: '/permissions',
        icon: Key,
      },
    ],
  },
];
