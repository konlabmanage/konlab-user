/**
 * Component resolver - resolves components with plugin slot support
 */

import { getSlotComponent, type SlotName } from './slots';
import type { ComponentType } from 'react';

/**
 * Resolves a component, checking for plugin slot overrides first
 * @param slotName - Slot name to check for overrides
 * @param defaultComponent - Default component if no override
 * @returns Component to use (plugin override or default)
 */
export function resolveComponent<T = any>(
  slotName: SlotName,
  defaultComponent: ComponentType<T>,
): ComponentType<T> {
  const override = getSlotComponent<T>(slotName, defaultComponent);
  return override || defaultComponent;
}

/**
 * Resolves a component with optional fallback
 */
export function resolveComponentOptional<T = any>(
  slotName: SlotName,
  defaultComponent?: ComponentType<T>,
): ComponentType<T> | undefined {
  return getSlotComponent<T>(slotName, defaultComponent);
}

