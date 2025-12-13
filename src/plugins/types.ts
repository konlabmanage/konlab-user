/**
 * Plugin system types and interfaces
 */

/**
 * Plugin lifecycle hooks
 */
export interface PluginLifecycle {
  /**
   * Called when plugin is initialized
   */
  onInit?: (config?: Record<string, any>) => void | Promise<void>;

  /**
   * Called when plugin is destroyed/disabled
   */
  onDestroy?: () => void | Promise<void>;
}

/**
 * Plugin hooks for modifying behavior
 */
export interface PluginHooks {
  /**
   * Modify props before rendering list page
   */
  beforeRenderList?: (props: any) => any | Promise<any>;

  /**
   * Modify post data before saving
   */
  beforeSavePost?: (post: any) => any | Promise<any>;

  /**
   * Called after post is published
   */
  afterPublish?: (post: any) => void | Promise<void>;

  /**
   * Modify route config before resolving
   */
  beforeResolveRoute?: (pathParts: string[]) => string[] | Promise<string[]>;

  /**
   * Modify metadata before returning
   */
  beforeResolveMetadata?: (metadata: any) => any | Promise<any>;

  /**
   * Add custom middleware
   */
  middleware?: (req: any, res: any, next: () => void) => void | Promise<void>;
}

/**
 * UI component slots that plugins can override
 */
export interface PluginSlots {
  /**
   * Slot name -> React component
   * Example: { 'list.columns': CustomColumnsComponent }
   */
  [slotName: string]: ComponentType<any> | undefined;
}

/**
 * Plugin metadata
 */
export interface PluginMetadata {
  name: string;
  version?: string;
  description?: string;
  author?: string;
}

/**
 * Complete plugin interface
 */
export interface Plugin extends PluginLifecycle, PluginHooks {
  /**
   * Plugin metadata
   */
  meta: PluginMetadata;

  /**
   * UI component slots that this plugin can override
   * Plugins without UI don't need this
   */
  slots?: PluginSlots;

  /**
   * Plugin configuration schema (optional, for validation)
   */
  configSchema?: any;
}

/**
 * Registered plugin with state
 */
export interface RegisteredPlugin {
  plugin: Plugin;
  enabled: boolean;
  config?: Record<string, any>;
}

/**
 * Hook names for type safety
 */
export type HookName = keyof PluginHooks;

import type { ComponentType } from 'react';
