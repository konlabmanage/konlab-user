/**
 * Plugin loader - loads plugins from configuration
 */

import { registerPlugin, enablePlugin, disablePlugin } from './registry';
import type { Plugin, SiteConfig } from '../config/schema';
import type { PluginConfig } from '../config/schema';

/**
 * Plugin factory registry - maps plugin names to factory functions
 */
const pluginFactories = new Map<string, (config?: Record<string, any>) => Plugin>();

/**
 * Registers a plugin factory
 */
export function registerPluginFactory(
  name: string,
  factory: (config?: Record<string, any>) => Plugin,
): void {
  pluginFactories.set(name, factory);
}

/**
 * Loads plugins from site configuration
 */
export async function loadPluginsFromConfig(config: SiteConfig): Promise<void> {
  if (!config.plugins || config.plugins.length === 0) {
    return;
  }

  for (const pluginConfig of config.plugins) {
    // Handle string format: "plugin-name"
    if (typeof pluginConfig === 'string') {
      await loadPlugin(pluginConfig);
      continue;
    }

    // Handle object format: { name: "plugin-name", enabled: true, config: {...} }
    const { name, enabled = true, config: pluginConfigData } = pluginConfig as PluginConfig;

    if (!name) continue;

    await loadPlugin(name, pluginConfigData);

    // Enable/disable based on config
    if (enabled) {
      enablePlugin(name);
    } else {
      disablePlugin(name);
    }
  }
}

/**
 * Loads a single plugin by name
 */
async function loadPlugin(name: string, config?: Record<string, any>): Promise<void> {
  const factory = pluginFactories.get(name);

  if (!factory) {
    console.warn(`Plugin factory for "${name}" not found. Skipping...`);
    return;
  }

  try {
    const plugin = factory(config);
    registerPlugin(plugin, config);
  } catch (error) {
    console.error(`Error loading plugin "${name}":`, error);
  }
}

/**
 * Gets all registered plugin factories
 */
export function getPluginFactories(): string[] {
  return Array.from(pluginFactories.keys());
}

