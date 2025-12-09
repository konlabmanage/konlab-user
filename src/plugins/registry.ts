import { CMSPlugin } from './types';

const plugins: CMSPlugin[] = [];

export function registerPlugin(plugin: CMSPlugin) {
  plugins.push(plugin);
}

export function applyHook(name: keyof CMSPlugin, args: any) {
  plugins.forEach((p: CMSPlugin) => {
    if (p[name]) args = p[name](args);
  });
  return args;
}
