'use client';

import { useState, useMemo } from 'react';
import { ListingTable, type ColumnType, type PaginationConfig } from '@konlab/ui/components';
import { useLayoutContext } from '@konlab/ui/layouts/shared';
import { Input, Button, Badge } from '@konlab/ui/components';
import { Search, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@konlab/ui/components';

// User type
type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
};

// Mock data generator
const generateUsers = (count: number): User[] => {
  const statuses: User['status'][] = ['active', 'inactive', 'pending'];
  const roles = ['Admin', 'User', 'Moderator', 'Guest'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Người dùng ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `090${String(i + 1).padStart(7, '0')}`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    createdAt: new Date(2024, 0, i + 1).toLocaleDateString('vi-VN'),
    lastLogin: i % 3 === 0 ? new Date().toLocaleDateString('vi-VN') : undefined,
  }));
};

const mockUsers = generateUsers(100);

export function UsersPage() {
  const { page } = useLayoutContext();
  const {
    Container: PageContainer,
    Header: PageHeader,
    Title: PageTitle,
    Subtitle: PageSubtitle,
    Filters: PageFilters,
    Content: PageContent,
    Action: PageAction,
  } = page;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading] = useState(false);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return mockUsers;

    const query = searchQuery.toLowerCase();
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone?.includes(query) ||
        user.role.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  // Paginate filtered users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, currentPage, pageSize]);

  // Handle pagination change
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Columns definition
  const columns: ColumnType<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: true,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (value: unknown, record: User) => (
        <div>
          <div className="font-medium">{value as string}</div>
          <div className="text-muted-foreground text-xs">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: unknown) => (value as string) || '-',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      render: (value: unknown) => <Badge variant="outline">{value as string}</Badge>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (value: unknown) => {
        const status = value as string;
        const variant =
          status === 'active' ? 'default' : status === 'inactive' ? 'destructive' : 'secondary';
        return (
          <Badge variant={variant}>
            {status === 'active'
              ? 'Hoạt động'
              : status === 'inactive'
                ? 'Không hoạt động'
                : 'Chờ duyệt'}
          </Badge>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_: unknown, _record: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Pagination config
  const paginationConfig: PaginationConfig = {
    current: currentPage,
    pageSize,
    total: filteredUsers.length,
    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  };

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <PageTitle>Quản lý người dùng</PageTitle>
          <PageSubtitle>Quản lý và theo dõi tất cả người dùng trong hệ thống</PageSubtitle>
        </div>
        <PageAction>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </PageAction>
      </PageHeader>

      <PageFilters>
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-9"
            />
          </div>
        </div>
      </PageFilters>

      <PageContent className="rounded-lg border bg-white p-6">
        <ListingTable<User>
          columns={columns}
          dataSource={paginatedUsers}
          rowKey="id"
          pagination={paginationConfig}
          loading={loading}
          size="middle"
          bordered
        />
      </PageContent>
    </PageContainer>
  );
}
