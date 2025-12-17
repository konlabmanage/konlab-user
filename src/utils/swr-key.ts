/**
 * SWR Key utilities - Generic key builder
 */

const API_PREFIX = '/api';

type SWRKeyPart = string | number | null | undefined;
type QueryParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Generic SWR key builder - nhận unlimited params
 * Returns null nếu có bất kỳ param nào là null/undefined (skip fetch)
 *
 * @example
 * createSWRKey('users', userId) // => '/api/users/123'
 * createSWRKey('users', userId, 'profile') // => '/api/users/123/profile'
 * createSWRKey('users', null) // => null (skip fetch)
 * createSWRKey('users', { page: 1, limit: 10 }) // => '/api/users?page=1&limit=10'
 * createSWRKey('users', userId, { status: 'active' }) // => '/api/users/123?status=active'
 */
export function createSWRKey(...parts: (SWRKeyPart | QueryParams)[]): string | null {
  // Tách path parts và query params
  const pathParts: SWRKeyPart[] = [];
  let queryParams: QueryParams | null = null;

  for (const part of parts) {
    if (part === null || part === undefined) {
      // Nếu có null/undefined → skip fetch
      return null;
    }

    if (typeof part === 'object') {
      // Object cuối cùng = query params
      queryParams = part;
    } else {
      // String/number = path part
      pathParts.push(part);
    }
  }

  // Build path
  const path = [API_PREFIX, ...pathParts].join('/');

  // Build query string
  if (queryParams) {
    const query = new URLSearchParams(
      Object.entries(queryParams)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    );
    const queryString = query.toString();
    return queryString ? `${path}?${queryString}` : path;
  }

  return path;
}

/**
 * User keys factory - shortcuts cho common patterns
 */
export const userKeys = {
  all: createSWRKey('users'),
  detail: (id: string) => createSWRKey('users', id),
  profile: (id: string) => createSWRKey('users', id, 'profile'),
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    createSWRKey('users', params || {}),
} as const;
