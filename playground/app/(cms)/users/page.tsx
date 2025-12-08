import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';
import { UsersPage } from '@konlab/user/features/users';

export const metadata = {
  title: 'Quản lý người dùng',
  breadcrumb: 'Người dùng',
};

export default function Page() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Người dùng' }]} />
      <UsersPage />
    </>
  );
}
