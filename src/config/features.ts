/**
 * Feature flags configuration
 * Controls which features are enabled/disabled in the application
 */

export interface FeatureFlags {
  // User features
  profile?: boolean;
  profileEdit?: boolean;
  changePassword?: boolean;
  twoFactorAuth?: boolean;

  // Content features
  posts?: boolean;
  postsCreate?: boolean;
  postsEdit?: boolean;
  postsDelete?: boolean;

  // UI features
  darkMode?: boolean;
  notifications?: boolean;
  search?: boolean;

  // Admin features
  adminPanel?: boolean;
  userManagement?: boolean;
  analytics?: boolean;

  // Custom features
  [key: string]: boolean | undefined;
}

/**
 * Default feature flags (all enabled by default)
 */
export const defaultFeatures: FeatureFlags = {
  profile: true,
  profileEdit: true,
  changePassword: true,
  twoFactorAuth: true,
  posts: true,
  postsCreate: true,
  postsEdit: true,
  postsDelete: true,
  darkMode: true,
  notifications: true,
  search: true,
  adminPanel: false,
  userManagement: false,
  analytics: false,
};

/**
 * Checks if a feature is enabled
 */
export function isFeatureEnabled(
  features: FeatureFlags | undefined,
  featureName: keyof FeatureFlags,
): boolean {
  if (!features) return defaultFeatures[featureName] ?? false;
  return features[featureName] ?? defaultFeatures[featureName] ?? false;
}

/**
 * Gets all enabled features
 */
export function getEnabledFeatures(features?: FeatureFlags): string[] {
  const merged = { ...defaultFeatures, ...features };
  return Object.entries(merged)
    .filter(([_, enabled]) => enabled === true)
    .map(([name]) => name);
}

