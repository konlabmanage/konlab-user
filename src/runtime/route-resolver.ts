import { loadConfig } from './config-loader';

/**
 * Resolves route config by matching path against configured routes
 * Supports exact match and dynamic patterns like /news/[slug]
 */
export async function resolveRoute(pathParts: string[]) {
  const config = await loadConfig();
  const path = '/' + (pathParts?.join('/') ?? '');

  // Try exact match first
  const exact = config.pages.find((p: any) => p.path === path);
  if (exact) return exact;

  // Try dynamic match for patterns with [param]
  for (const page of config.pages) {
    if (!page.path.includes('[')) continue;

    const patternParts = page.path.split('/');
    const match = matchDynamic(patternParts, pathParts);

    if (match) {
      return { ...page, params: match };
    }
  }

  return null;
}

/**
 * Matches dynamic pattern against path parts and extracts params
 * Example: ['', 'news', '[slug]'] matches ['news', 'article-1'] -> { slug: 'article-1' }
 */
function matchDynamic(pattern: string[], parts: string[]) {
  if (pattern?.length !== parts?.length) return null;

  const params: any = {};

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i].startsWith('[')) {
      // Extract param name from [slug] -> slug
      const key = pattern[i].replace('[', '').replace(']', '');
      params[key] = parts[i];
    } else if (pattern[i] !== parts[i]) {
      return null;
    }
  }

  return params;
}
