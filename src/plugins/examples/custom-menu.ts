/**
 * Example plugin: Custom Menu
 * Demonstrates a plugin WITH UI slots (replaces components)
 */

import React from 'react';
import type { Plugin } from '../types';
import type { ComponentType } from 'react';

// Example custom menu component
const CustomMenuComponent: ComponentType<{ items?: any[] }> = () => {
  return React.createElement('div', null, React.createElement('p', null, 'Custom Menu Component'));
};

/**
 * Creates a custom menu plugin
 * This plugin HAS UI slots - it replaces default components
 */
export function createCustomMenuPlugin(config?: {
  menuItems?: Array<{ label: string; url: string }>;
}): Plugin {
  return {
    meta: {
      name: 'custom-menu',
      version: '1.0.0',
      description: 'Custom menu plugin (with UI slots)',
    },
    // Define UI slots this plugin overrides
    slots: {
      'list.actions': CustomMenuComponent, // Replace list actions with custom menu
      // Can add more slots here
    },
    onInit: (pluginConfig) => {
      const menuItems = pluginConfig?.menuItems || config?.menuItems || [];
      console.log(`[Custom Menu] Initialized with ${menuItems.length} items`);
      // Register custom menu items
    },
    beforeResolveRoute: (pathParts) => {
      // Modify route resolution if needed
      return pathParts;
    },
  };
}
