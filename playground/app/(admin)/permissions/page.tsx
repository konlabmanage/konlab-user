import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Quản lý quyền',
  breadcrumb: 'Quyền',
};

export default function PermissionsPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Quyền' }]} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý quyền</h1>
            <p className="text-muted-foreground">
              Quản lý và cấu hình các quyền truy cập trong hệ thống
            </p>
          </div>
          <Button>Thêm quyền</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách quyền</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">users.read</p>
                  <p className="text-muted-foreground text-sm">Quyền xem danh sách người dùng</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">users.write</p>
                  <p className="text-muted-foreground text-sm">Quyền tạo và chỉnh sửa người dùng</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">users.delete</p>
                  <p className="text-muted-foreground text-sm">Quyền xóa người dùng</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">admin.access</p>
                  <p className="text-muted-foreground text-sm">Quyền truy cập khu vực quản trị</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
