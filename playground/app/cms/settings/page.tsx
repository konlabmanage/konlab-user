import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { Input } from '@konlab/ui/components/ui/input';
import { Label } from '@konlab/ui/components/ui/label';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Cài đặt',
  breadcrumb: 'Cài đặt',
};

export default function SettingsPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Cài đặt' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
          <p className="text-muted-foreground">Quản lý cài đặt hệ thống và tài khoản</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Tên trang web</Label>
                <Input id="site-name" defaultValue="Konlab CMS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL trang web</Label>
                <Input id="site-url" defaultValue="https://example.com" />
              </div>
              <Button>Lưu thay đổi</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu mới</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Đổi mật khẩu</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
