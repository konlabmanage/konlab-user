import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Quản lý chức vụ',
  breadcrumb: 'Chức vụ',
};

export default function RolesPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Chức vụ' }]} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý chức vụ</h1>
            <p className="text-muted-foreground">
              Quản lý và phân quyền các chức vụ trong hệ thống
            </p>
          </div>
          <Button>Thêm chức vụ</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách chức vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Administrator</p>
                  <p className="text-muted-foreground text-sm">Quyền truy cập đầy đủ hệ thống</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Editor</p>
                  <p className="text-muted-foreground text-sm">Quyền chỉnh sửa nội dung</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Viewer</p>
                  <p className="text-muted-foreground text-sm">Quyền xem nội dung</p>
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
