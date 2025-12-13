import deepmerge from 'deepmerge';
import defaultConfig from '../config/defaultSite.config';
import { validateConfig, type SiteConfig } from '../config/schema';
import { loadPluginsFromConfig, registerPluginSlots } from '../plugins';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Cache config to avoid re-reading file on every call
let cachedConfig: SiteConfig | null = null;
let pluginsLoaded = false;

/**
 * Loads site configuration from ./site.config.json and merges with default config
 * Validates config against schema and loads plugins
 */
export async function loadConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig;

  let siteConfig = {};

  const cwd = process.cwd();
  const configPath = join(cwd, 'site.config.json');

  // Load custom config file if exists
  if (existsSync(configPath)) {
    try {
      const fileContent = readFileSync(configPath, 'utf-8');
      siteConfig = JSON.parse(fileContent);
    } catch (err: any) {
      // If parsing fails, use default config only
    }
  }

  // Merge custom config with default (custom overrides default)
  const mergedConfig = deepmerge(defaultConfig, siteConfig);

  // Validate merged config against schema
  cachedConfig = validateConfig(mergedConfig);

  // Load plugins from config (only once)
  if (!pluginsLoaded && cachedConfig.plugins && cachedConfig.plugins.length > 0) {
    await loadPluginsFromConfig(cachedConfig);
    registerPluginSlots();
    pluginsLoaded = true;
  }

  return cachedConfig;
}
