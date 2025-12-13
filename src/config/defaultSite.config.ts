import type { SiteConfig } from './schema';

/**
 * Default site configuration
 * This is merged with custom config from site.config.json
 */
const defaultConfig: SiteConfig = {
  name: '', // Website name, empty by default
  pages: [
    { path: '/news', type: 'list', title: 'Tin tức' },
    { path: '/news/[slug]', type: 'detail' },
  ],
  plugins: [],
  features: {},
};

export default defaultConfig;
