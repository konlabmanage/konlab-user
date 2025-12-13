import { loadConfig } from '../../runtime/config-loader';

/**
 * Generates static params for all configured pages
 * Converts page paths to slug arrays for Next.js static generation
 */
export async function generateStaticParams() {
  const config = await loadConfig();

  return config.pages.map((p: any) => {
    // Convert '/profile2' -> ['profile2']
    const slug = p.path.slice(1).split('/').filter(Boolean);
    return { slug };
  });
}
