// src/runtime/route-resolver.ts
import { loadConfig } from './config-loader';

export async function resolveRoute(pathParts: string[]) {
  const config = await loadConfig();
  const path = '/' + pathParts.join('/');

  // 1) exact match
  const exact = config.pages.find((p: any) => p.path === path);
  if (exact) return exact;

  // 2) dynamic match: /news/[slug]
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

// helper: match /news/[slug]
function matchDynamic(pattern: string[], parts: string[]) {
  if (pattern.length !== parts.length) return null;

  const params: any = {};

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i].startsWith('[')) {
      const key = pattern[i].replace('[', '').replace(']', '');
      params[key] = parts[i];
    } else if (pattern[i] !== parts[i]) {
      return null;
    }
  }

  return params;
}
