// src/runtime/config-loader.ts
import deepmerge from 'deepmerge';
import defaultConfig from '../config/defaultSite.config';

let cachedConfig: any = null;

export async function loadConfig() {
  if (cachedConfig) return cachedConfig;

  // load from app side (repo báo)
  // important: require MUST be dynamic
  let siteConfig = {};
  try {
    siteConfig = (await import(process.cwd() + '/site.config')).default;
  } catch (err) {
    // no site config => ok
  }

  // deep merge
  cachedConfig = deepmerge(defaultConfig, siteConfig);

  return cachedConfig;
}
