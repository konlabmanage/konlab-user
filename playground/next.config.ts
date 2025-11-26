import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@konlab/ui', '@konlab/auth'],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@konlab/ui': resolve(__dirname, '../packages/konlab-ui/src'),
      '@konlab/auth': resolve(__dirname, '../packages/konlab-auth/src'),
    };
    return config;
  },
};

export default nextConfig;
