import { z } from 'zod';

/**
 * Schema for validating site configuration
 */

// Page component configuration
const pageComponentSchema = z.object({
  columns: z.string().optional(),
  filters: z.string().optional(),
  actions: z.string().optional(),
});

// Route type enum
export const RouteType = z.enum(['profile', 'list', 'detail', 'form', 'dashboard']);

// Page configuration schema
export const pageSchema = z.object({
  path: z.string().startsWith('/'),
  type: RouteType,
  title: z.string().optional(),
  description: z.string().optional(),
  components: pageComponentSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
});

// Plugin configuration
export const pluginSchema = z.object({
  name: z.string(),
  enabled: z.boolean().optional().default(true),
  config: z.record(z.string(), z.any()).optional(),
});

// Site configuration schema
export const siteConfigSchema = z.object({
  name: z.string().optional().default(''),
  logo: z.string().optional(),
  description: z.string().optional(),
  pages: z.array(pageSchema).default([]),
  plugins: z
    .union([z.array(z.string()), z.array(pluginSchema)])
    .optional()
    .default([]),
  features: z.record(z.string(), z.boolean()).optional(),
  theme: z.record(z.string(), z.any()).optional(),
});

// Type exports
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type PageConfig = z.infer<typeof pageSchema>;
export type PluginConfig = z.infer<typeof pluginSchema>;
export type RouteType = z.infer<typeof RouteType>;

/**
 * Validates site configuration against schema
 */
export function validateConfig(config: unknown): SiteConfig {
  return siteConfigSchema.parse(config);
}
