import Link from "next/link"
import { Button } from "@konlab/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@konlab/ui"

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Konlab UI Playground
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Demo và test các component từ @konlab/ui package
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 w-full max-w-4xl">
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
            <CardDescription>
              Xem tất cả các UI components có sẵn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/components">Xem Components</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
