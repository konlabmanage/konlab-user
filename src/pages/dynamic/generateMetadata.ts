import { resolveMetadata } from '../../runtime/metadata-resolver';

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
 * Generates metadata for dynamic routes
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }> | { slug?: string[] };
}) {
  const pathParts = await resolveParams(params);
  return resolveMetadata(pathParts);
}
