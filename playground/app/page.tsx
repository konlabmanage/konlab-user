import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@konlab/ui/components';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Konlab UI Playground</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Demo và test các component từ @konlab/ui package
          </p>
        </div>

        <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>CMS Layout</CardTitle>
              <CardDescription>
                Layout CMS với sidebar, header và breadcrumb tự động
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/cms">Xem CMS Layout</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Xem tất cả các UI components có sẵn</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/components">Xem Components</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
