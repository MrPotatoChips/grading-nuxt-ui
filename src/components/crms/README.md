# CRMS Components

Custom components recreated from the crms-ui repository, modernized using Vue 3 and Nuxt UI.

## Overview

These components were migrated from a Vue 2 + Bootstrap Vue application to Vue 3 + Nuxt UI, maintaining functionality while adopting modern patterns and the Nuxt UI design system.

## Components

### CrmsHeader

Dashboard header with user menu, notifications, and theme toggle.

**Features:**
- User profile display with avatar
- Notifications popover
- User menu dropdown (Dark mode, Account settings, Logout)
- Responsive design

**Usage:**
```vue
<template>
  <CrmsHeader @toggle-sidebar="handleToggle" />
</template>

<script>
import CrmsHeader from '@/components/crms/CrmsHeader.vue'

export default {
  components: { CrmsHeader },
  methods: {
    handleToggle() {
      // Handle sidebar toggle
    }
  }
}
</script>
```

### CrmsSidebar

Role-based navigation sidebar with dynamic menu generation.

**Features:**
- Automatic navigation based on user role
- Support for multiple roles (admin, dg-agent, dg-supervisor, dg-manager, marketing-officer, marketing-manager, audit)
- Collapsible menu groups
- Icon support

**Usage:**
```vue
<template>
  <CrmsSidebar />
</template>

<script>
import CrmsSidebar from '@/components/crms/CrmsSidebar.vue'

export default {
  components: { CrmsSidebar }
}
</script>
```

### CrmsLayout

Complete dashboard layout with sidebar and header.

**Features:**
- Integrated header and sidebar
- Collapsible sidebar
- Responsive design
- Slot for main content

**Usage:**
```vue
<template>
  <CrmsLayout>
    <!-- Your page content here -->
    <h1>Dashboard</h1>
    <p>Content goes here</p>
  </CrmsLayout>
</template>

<script>
import CrmsLayout from '@/components/layouts/CrmsLayout.vue'

export default {
  components: { CrmsLayout }
}
</script>
```

### CrmsCard

Statistics card with animated counters.

**Props:**
- `title` (String) - Card title
- `subTitle` (String) - Card subtitle/description
- `count` (Number/String) - Number to display
- `variant` (String) - Color variant: 'primary', 'secondary', 'success', 'warning', 'error', 'info'
- `icon` (String) - Lucide icon name
- `loading` (Boolean) - Show loading state

**Usage:**
```vue
<template>
  <CrmsCard
    title="Total Users"
    sub-title="Active users in system"
    :count="1250"
    variant="primary"
    icon="i-lucide-users"
  />
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'

export default {
  components: { CrmsCard }
}
</script>
```

### CrmsSimpleCard

Basic card with header, content, and footer slots.

**Props:**
- `title` (String) - Card title
- `footerText` (String) - Footer text
- `icon` (String) - Header icon name
- `iconColor` (String) - Icon color variant

**Slots:**
- `default` - Main content
- `footer` - Footer content

**Usage:**
```vue
<template>
  <CrmsSimpleCard
    title="Card Title"
    footer-text="Last updated today"
    icon="i-lucide-info"
    icon-color="primary"
  >
    <p>Your content here</p>
    
    <template #footer>
      <UButton size="xs">Action</UButton>
    </template>
  </CrmsSimpleCard>
</template>

<script>
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'

export default {
  components: { CrmsSimpleCard }
}
</script>
```

### CrmsAttachment

File upload component with preview and download functionality.

**Props:**
- `title` (String) - Component title
- `modelValue` (Array) - Array of file objects
- `accept` (String) - Accepted file types (e.g., 'image/*,.pdf')
- `multiple` (Boolean) - Allow multiple files
- `allowUpload` (Boolean) - Show upload button
- `allowRemove` (Boolean) - Show remove button
- `maxSize` (Number) - Maximum file size in bytes

**Events:**
- `update:modelValue` - Emitted when files change
- `file-added` - Emitted when file is added
- `file-removed` - Emitted when file is removed

**Usage:**
```vue
<template>
  <CrmsAttachment
    v-model="files"
    title="Attachments"
    accept="image/*,.pdf"
    :multiple="true"
    @file-added="handleFileAdded"
    @file-removed="handleFileRemoved"
  />
</template>

<script>
import CrmsAttachment from '@/components/crms/CrmsAttachment.vue'

export default {
  components: { CrmsAttachment },
  data() {
    return {
      files: []
    }
  },
  methods: {
    handleFileAdded(file) {
      console.log('File added:', file)
    },
    handleFileRemoved(file) {
      console.log('File removed:', file)
    }
  }
}
</script>
```

### CrmsTimeline

Activity timeline with status indicators.

**Props:**
- `title` (String) - Timeline title
- `items` (Array) - Timeline items

**Item Object:**
```javascript
{
  title: String,        // Required
  description: String,  // Optional
  user: String,        // Optional
  date: Date/String,   // Optional
  status: String,      // Optional: 'pending', 'approved', 'rejected', 'completed', 'inProgress', 'cancelled'
  content: String      // Optional: HTML content
}
```

**Slots:**
- `item-{index}` - Custom content for specific timeline item

**Usage:**
```vue
<template>
  <CrmsTimeline
    title="Activity Timeline"
    :items="timelineItems"
  />
</template>

<script>
import CrmsTimeline from '@/components/crms/CrmsTimeline.vue'

export default {
  components: { CrmsTimeline },
  data() {
    return {
      timelineItems: [
        {
          title: 'Project Started',
          description: 'Initial setup completed',
          user: 'John Doe',
          date: new Date('2024-01-15'),
          status: 'completed'
        },
        {
          title: 'In Progress',
          description: 'Development ongoing',
          user: 'Jane Smith',
          date: new Date(),
          status: 'inProgress'
        }
      ]
    }
  }
}
</script>
```

## Migration Notes

### From Bootstrap Vue to Nuxt UI

| Bootstrap Vue | Nuxt UI |
|--------------|---------|
| BCard | UCard |
| BButton | UButton |
| BAvatar | UUser (with avatar prop) |
| BPopover | UPopover |
| BModal | UModal |
| BDropdown | UDropdownMenu |
| BSkeleton | USkeleton |
| BBadge | UBadge |

### Key Changes

1. **Component Syntax**
   - Bootstrap Vue uses `B` prefix (e.g., `BCard`)
   - Nuxt UI uses `U` prefix (e.g., `UCard`)

2. **Props & Styling**
   - Bootstrap uses Bootstrap classes (e.g., `bg-primary`, `text-danger`)
   - Nuxt UI uses Tailwind classes and color props (e.g., `color="primary"`)

3. **State Management**
   - Original: Vuex
   - Updated: Pinia stores

4. **Validation**
   - Original: Vee-Validate v2 (ValidationObserver/ValidationProvider)
   - Updated: Native form validation or Vee-Validate v4

5. **Icons**
   - Original: Font Awesome
   - Updated: Lucide icons via `i-lucide-{name}`

## Styling

All components follow the Nuxt UI design system and support:
- Dark mode
- Tailwind CSS utilities
- Responsive layouts
- Consistent spacing and typography

## Examples

Visit `/showcases/components/crms` to see interactive examples of all CRMS components.

## Development

### Adding New Components

When creating new CRMS components:

1. Place files in `src/components/crms/`
2. Use `Crms` prefix in component names
3. Follow Options API pattern
4. Use Nuxt UI components
5. Include prop validation
6. Add comprehensive examples

### Code Style

- Follow existing nuxt-app patterns
- Use Options API (not Composition API)
- Name components: `Crms + ComponentName`
- Use Nuxt UI components (UButton, UCard, etc.)
- Apply Tailwind CSS for styling
- Include proper error handling

## Testing

Components can be tested in the showcase page at `/showcases/components/crms` which includes:
- Static examples
- Interactive demos
- Loading states
- Various configurations

## License

These components are part of the nuxt-app project and follow the same license.
