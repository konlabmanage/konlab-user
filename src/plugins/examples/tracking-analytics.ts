/**
 * Example plugin: Tracking Analytics
 * Demonstrates a plugin WITHOUT UI (logic only)
 */

import type { Plugin } from '../types';

/**
 * Creates a tracking analytics plugin
 * This plugin doesn't have UI slots - it only runs logic
 */
export function createTrackingAnalyticsPlugin(config?: {
  trackingId?: string;
  enabled?: boolean;
}): Plugin {
  return {
    meta: {
      name: 'tracking-analytics',
      version: '1.0.0',
      description: 'Analytics tracking plugin (logic only, no UI)',
    },
    // No slots property - this plugin doesn't replace any UI
    onInit: (pluginConfig) => {
      const trackingId = pluginConfig?.trackingId || config?.trackingId;
      if (trackingId) {
        console.log(`[Tracking Analytics] Initialized with ID: ${trackingId}`);
        // Initialize analytics SDK here
      }
    },
    afterPublish: async (post) => {
      // Track post publish event
      console.log(`[Tracking Analytics] Post published:`, post.id);
      // Send analytics event
    },
    beforeResolveMetadata: (metadata) => {
      // Add analytics script to metadata
      return {
        ...metadata,
        // Add analytics tracking code
      };
    },
  };
}
