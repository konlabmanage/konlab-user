/**
 * Plugin slot system - allows plugins to replace UI components
 */

import { getEnabledPlugins } from './registry';
import type { ComponentType } from 'react';

/**
 * Slot names for different UI areas
 */
export type SlotName =
  | 'list.columns'
  | 'list.filters'
  | 'list.actions'
  | 'detail.header'
  | 'detail.content'
  | 'detail.sidebar'
  | 'profile.header'
  | 'profile.content'
  | 'form.fields'
  | 'form.actions'
  | string; // Allow custom slots

/**
 * Slot registry - maps slot names to component overrides
 */
const slotRegistry = new Map<SlotName, ComponentType<any>>();

/**
 * Registers a component for a slot
 */
export function registerSlot(slotName: SlotName, component: ComponentType<any>): void {
  slotRegistry.set(slotName, component);
}

/**
 * Gets component for a slot, or returns default if no override
 */
export function getSlotComponent<T = any>(
  slotName: SlotName,
  defaultComponent?: ComponentType<T>,
): ComponentType<T> | undefined {
  return (slotRegistry.get(slotName) as ComponentType<T>) || defaultComponent;
}

/**
 * Checks if a slot has an override
 */
export function hasSlotOverride(slotName: SlotName): boolean {
  return slotRegistry.has(slotName);
}

/**
 * Registers slots from all enabled plugins
 */
export function registerPluginSlots(): void {
  const enabledPlugins = getEnabledPlugins();

  for (const { plugin } of enabledPlugins) {
    if (plugin.slots) {
      for (const [slotName, component] of Object.entries(plugin.slots)) {
        // Skip if component is undefined
        if (component) {
          registerSlot(slotName as SlotName, component);
        }
      }
    }
  }
}

/**
 * Clears all slot registrations
 */
export function clearSlots(): void {
  slotRegistry.clear();
}
