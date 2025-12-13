/**
 * Plugin hooks system - applies plugin hooks in order
 */

import { getEnabledPlugins } from './registry';
import type { HookName } from './types';

/**
 * Applies a hook to all enabled plugins that implement it
 * Hooks are applied in registration order
 * Note: middleware hook is skipped (has different signature)
 */
export async function applyHook<T = any>(hookName: HookName, initialValue: T): Promise<T> {
  const enabledPlugins = getEnabledPlugins();
  let value = initialValue;

  for (const { plugin } of enabledPlugins) {
    const hook = plugin[hookName];
    if (hook) {
      try {
        // Skip middleware - it has different signature (req, res, next)
        if (hookName === 'middleware') {
          continue;
        }

        // Type assertion: all other hooks take 1 argument
        const hookFn = hook as (value: T) => T | Promise<T>;
        const result = hookFn(value);
        value = result instanceof Promise ? await result : result;
      } catch (error) {
        console.error(`Error in plugin "${plugin.meta.name}" hook "${hookName}":`, error);
        // Continue with other plugins even if one fails
      }
    }
  }

  return value;
}

/**
 * Applies a hook synchronously (for sync-only hooks)
 */
export function applyHookSync<T = any>(hookName: HookName, initialValue: T): T {
  const enabledPlugins = getEnabledPlugins();
  let value = initialValue;

  for (const { plugin } of enabledPlugins) {
    const hook = plugin[hookName];
    if (hook && typeof hook === 'function') {
      try {
        // Skip middleware - it has different signature
        if (hookName === 'middleware') {
          continue;
        }

        // Type assertion: all other hooks take 1 argument
        const hookFn = hook as (value: T) => T | Promise<T>;
        const result = hookFn(value);
        if (result instanceof Promise) {
          console.warn(
            `Plugin "${plugin.meta.name}" hook "${hookName}" is async but called synchronously`,
          );
          continue;
        }
        value = result;
      } catch (error) {
        console.error(`Error in plugin "${plugin.meta.name}" hook "${hookName}":`, error);
      }
    }
  }

  return value;
}
