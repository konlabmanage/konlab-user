/**
 * Central type exports
 * Re-exports commonly used types from various modules
 *
 * This file serves as a convenience entry point for types.
 * Types are still defined in their respective modules (colocation pattern).
 */

// Config types
export type {
  SiteConfig,
  PageConfig as PageConfigSchema,
  PluginConfig,
  RouteType as RouteTypeSchema,
} from '../config/schema';

export type {
  RouteType,
  PageComponentConfig,
  PageConfig,
  RouteParams,
  ResolvedRoute,
} from '../config/routes';

export type { FeatureFlags } from '../config/features';

// Plugin types
export type {
  Plugin,
  PluginLifecycle,
  PluginHooks,
  PluginSlots,
  PluginMetadata,
  RegisteredPlugin,
  HookName,
} from '../plugins/types';

export type { SlotName } from '../plugins/slots';
