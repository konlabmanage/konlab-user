import { resolveRoute } from '../../runtime/route-resolver';
import { pageComponents } from './page-components';
export { generateMetadata } from './generateMetadata';

/**
 * Helper to resolve params (handles both Promise and direct params for Next.js 15+)
 */
async function resolveParams(
  params: Promise<{ slug?: string[] }> | { slug?: string[] },
): Promise<string[]> {
  const resolved = params instanceof Promise ? await params : params;
  return resolved.slug || [];
}

/**
 * Dynamic page component that renders based on route type
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }> | { slug?: string[] };
}) {
  const pathParts = await resolveParams(params);
  const route = await resolveRoute(pathParts);

  if (!route || !route.type) return null;

  // Get component for route type
  const Component = pageComponents[route.type];
  if (!Component) return null;

  return <Component />;
}
