import { loadConfig } from './config-loader';
import { resolveRoute } from './route-resolver';

/**
 * Resolves page metadata (title, description) from route config
 * Formats title as "Page Title - Website Name" if website name exists
 */
export async function resolveMetadata(pathParts: string[]) {
  const config = await loadConfig();
  const route = await resolveRoute(pathParts);

  if (!route) return {};

  const pageTitle = route.title || '';
  const websiteName = config.name || '';

  // Format: "Page Title - Website Name" (only if website name exists)
  const fullTitle = websiteName ? `${pageTitle} - ${websiteName}` : pageTitle;

  return {
    title: fullTitle,
    description: route.description ?? config.description,
  };
}
