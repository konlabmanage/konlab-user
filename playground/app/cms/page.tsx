import { Card, CardContent, CardHeader, CardTitle } from '@konlab/ui';

export const metadata = {
  title: 'CMS Dashboard',
  breadcrumb: 'Trang chủ',
};

export default function CMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Chào mừng đến với CMS Dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-muted-foreground text-xs">+12.5% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-muted-foreground text-xs">+8.2% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ chuyển đổi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-muted-foreground text-xs">+0.5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
