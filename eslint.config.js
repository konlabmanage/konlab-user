import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Resolve alias @konlab/shared/configs/eslint/react
const sharedConfigPath = require.resolve('@konlab/shared/configs/eslint/react');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(sharedConfigPath),
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'storybook-static/**',
      'src/stories/**',
      '*.config.js',
      '*.config.ts',
      '.husky/**',
      'packages/konlab-shared/**', // Shared submodule has its own ESLint config (ESLint 8)
      'src/components/ui/chart.tsx', // Known TypeScript ESLint bug with mapped types
    ],
  },
];
