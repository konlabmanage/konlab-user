import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';
import { Button } from '@konlab/ui/components/ui/button';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export const metadata = {
  title: 'Quản lý bài viết',
  breadcrumb: 'Bài viết',
};

export default function PostsPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Bài viết' }]} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý bài viết</h1>
            <p className="text-muted-foreground">Tạo và quản lý các bài viết trong hệ thống</p>
          </div>
          <Button>Viết bài mới</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Hướng dẫn sử dụng Next.js 15</p>
            <p className="text-muted-foreground text-sm">Đã xuất bản • 15/01/2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Chỉnh sửa
            </Button>
            <Button variant="outline" size="sm">
              Xóa
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Best Practices cho React</p>
            <p className="text-muted-foreground text-sm">Bản nháp • 14/01/2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Chỉnh sửa
            </Button>
            <Button variant="outline" size="sm">
              Xóa
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">TypeScript Tips & Tricks</p>
            <p className="text-muted-foreground text-sm">Đã xuất bản • 13/01/2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Chỉnh sửa
            </Button>
            <Button variant="outline" size="sm">
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
