/**
 * Plugin registry - manages plugin registration and lifecycle
 */

import type { Plugin, RegisteredPlugin } from './types';

/**
 * Internal plugin registry
 */
const plugins = new Map<string, RegisteredPlugin>();

/**
 * Registers a plugin
 */
export function registerPlugin(plugin: Plugin, config?: Record<string, any>): void {
  if (plugins.has(plugin.meta.name)) {
    console.warn(`Plugin "${plugin.meta.name}" is already registered. Overwriting...`);
  }

  plugins.set(plugin.meta.name, {
    plugin,
    enabled: true,
    config,
  });

  // Initialize plugin if it has onInit hook
  if (plugin.onInit) {
    try {
      plugin.onInit(config);
    } catch (error) {
      console.error(`Error initializing plugin "${plugin.meta.name}":`, error);
    }
  }
}

/**
 * Unregisters a plugin
 */
export function unregisterPlugin(name: string): void {
  const registered = plugins.get(name);
  if (!registered) return;

  // Call onDestroy if exists
  if (registered.plugin.onDestroy) {
    try {
      registered.plugin.onDestroy();
    } catch (error) {
      console.error(`Error destroying plugin "${name}":`, error);
    }
  }

  plugins.delete(name);
}

/**
 * Enables a plugin
 */
export function enablePlugin(name: string): void {
  const registered = plugins.get(name);
  if (registered) {
    registered.enabled = true;
    if (registered.plugin.onInit) {
      registered.plugin.onInit(registered.config);
    }
  }
}

/**
 * Disables a plugin
 */
export function disablePlugin(name: string): void {
  const registered = plugins.get(name);
  if (registered) {
    registered.enabled = false;
    if (registered.plugin.onDestroy) {
      registered.plugin.onDestroy();
    }
  }
}

/**
 * Gets a registered plugin
 */
export function getPlugin(name: string): RegisteredPlugin | undefined {
  return plugins.get(name);
}

/**
 * Gets all registered plugins
 */
export function getAllPlugins(): RegisteredPlugin[] {
  return Array.from(plugins.values());
}

/**
 * Gets all enabled plugins
 */
export function getEnabledPlugins(): RegisteredPlugin[] {
  return Array.from(plugins.values()).filter((p) => p.enabled);
}

/**
 * Checks if a plugin is registered
 */
export function isPluginRegistered(name: string): boolean {
  return plugins.has(name);
}

/**
 * Checks if a plugin is enabled
 */
export function isPluginEnabled(name: string): boolean {
  const registered = plugins.get(name);
  return registered?.enabled ?? false;
}
