import { ProfilePage } from '@konlab/user/features/profile';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export default function AppProfilePage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Trang chủ', href: '/' }, { label: 'Hồ sơ' }]} />
      <ProfilePage />
    </>
  );
}
