/**
 * Route type definitions and route configuration helpers
 */

export type RouteType = 'profile' | 'list' | 'detail' | 'form' | 'dashboard';

export interface PageComponentConfig {
  columns?: string;
  filters?: string;
  actions?: string;
  [key: string]: string | undefined;
}

export interface PageConfig {
  path: string;
  type: RouteType;
  title?: string;
  description?: string;
  components?: PageComponentConfig;
  meta?: Record<string, any>;
}

export interface RouteParams {
  [key: string]: string;
}

export interface ResolvedRoute extends PageConfig {
  params?: RouteParams;
}

/**
 * Route type constants for type safety
 */
export const RouteTypes = {
  PROFILE: 'profile' as const,
  LIST: 'list' as const,
  DETAIL: 'detail' as const,
  FORM: 'form' as const,
  DASHBOARD: 'dashboard' as const,
} as const;

/**
 * Checks if a route type is valid
 */
export function isValidRouteType(type: string): type is RouteType {
  return ['profile', 'list', 'detail', 'form', 'dashboard'].includes(type);
}
