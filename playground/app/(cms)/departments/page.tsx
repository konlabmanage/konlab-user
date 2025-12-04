import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Quản lý phòng ban',
  breadcrumb: 'Phòng ban',
};

export default function DepartmentsPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Phòng ban' }]} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý phòng ban</h1>
            <p className="text-muted-foreground">
              Quản lý và theo dõi các phòng ban trong hệ thống
            </p>
          </div>
          <Button>Thêm phòng ban</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách phòng ban</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Phòng Kỹ thuật</p>
                  <p className="text-muted-foreground text-sm">Quản lý và phát triển sản phẩm</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Phòng Kinh doanh</p>
                  <p className="text-muted-foreground text-sm">Quản lý bán hàng và marketing</p>
                </div>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Phòng Nhân sự</p>
                  <p className="text-muted-foreground text-sm">Quản lý nhân sự và tuyển dụng</p>
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
