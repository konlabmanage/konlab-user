# Plugin Examples

## Plugin Types

### 1. Logic-Only Plugins (No UI)

Plugins that only run logic, don't replace any UI components.

Example: `tracking-analytics.ts`

- No `slots` property
- Only implements hooks like `onInit`, `afterPublish`, etc.
- Runs in background

### 2. UI Plugins (With Slots)

Plugins that replace UI components using slots.

Example: `custom-menu.ts`

- Has `slots` property with slot names -> components
- Replaces default components with custom ones
- Can still have logic hooks

## Available Slots

- `list.columns` - List page columns component
- `list.filters` - List page filters component
- `list.actions` - List page actions component
- `detail.header` - Detail page header component
- `detail.content` - Detail page content component
- `detail.sidebar` - Detail page sidebar component
- `profile.header` - Profile page header component
- `profile.content` - Profile page content component
- `form.fields` - Form fields component
- `form.actions` - Form actions component

## Usage in Features

When creating features, use `resolveComponent()` to check for plugin overrides:

```typescript
import { resolveComponent } from '@konlab/user/utils/resolve-component';
import DefaultColumns from './default-columns';

// In your feature component
const Columns = resolveComponent('list.columns', DefaultColumns);

return <Columns data={data} />;
```
