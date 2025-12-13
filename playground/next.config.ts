import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@konlab/ui', '@konlab/auth', '@konlab/user'],

  webpack: (config) => {
    const srcPath = resolve(__dirname, '../src');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '.'),
      '@konlab/user': srcPath,
      '@konlab/user/pages': resolve(srcPath, 'pages'),
      '@konlab/user/features': resolve(srcPath, 'features'),
      '@konlab/user/runtime': resolve(srcPath, 'runtime'),
      '@konlab/user/layouts': resolve(srcPath, 'layouts'),
      '@konlab/ui': resolve(__dirname, '../packages/konlab-ui/src'),
      '@konlab/auth': resolve(__dirname, '../packages/konlab-auth/src'),
    };
    return config;
  },
};

export default nextConfig;
