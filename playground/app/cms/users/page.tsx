import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Quản lý người dùng',
  breadcrumb: 'Người dùng',
};

export default function UsersPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Người dùng' }]} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
            <p className="text-muted-foreground">Quản lý và theo dõi người dùng trong hệ thống</p>
          </div>
          <Button>Thêm người dùng</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Nguyễn Văn A</p>
                  <p className="text-muted-foreground text-sm">admin@example.com</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Trần Thị B</p>
                  <p className="text-muted-foreground text-sm">user@example.com</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Lê Văn C</p>
                  <p className="text-muted-foreground text-sm">editor@example.com</p>
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
