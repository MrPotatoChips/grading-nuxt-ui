const MAdmin = [
  // {
  //   label: 'Guide',
  //   icon: 'i-lucide-book-open',
  //   defaultOpen: true,
  //   children: [
  //     {
  //       label: 'Introduction',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       externalLink: 'https://ui.nuxt.com/getting-started'
  //     },
  //     {
  //       label: 'Installation',
  //       description: 'Learn how to install and configure Nuxt UI in your application.',
  //       icon: 'i-lucide-cloud-download',
  //       externalLink: 'https://ui.nuxt.com/getting-started'
  //     },
  //     {
  //       label: 'Icons',
  //       icon: 'i-lucide-smile',
  //       description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
  //       externalLink: 'https://ui.nuxt.com/getting-started/icons'
  //     },
  //     {
  //       label: 'Colors',
  //       icon: 'i-lucide-swatch-book',
  //       description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
  //       externalLink: 'https://ui.nuxt.com/getting-started/colors'
  //     },
  //     {
  //       label: 'Theme',
  //       icon: 'i-lucide-cog',
  //       description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
  //       externalLink: 'https://ui.nuxt.com/getting-started/theming'
  //     }
  //   ]
  // },
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: {
      name: 'admin.dashboard'
    }
  }
]

const MAdminAccounts = [
  {
    label: 'Accounts',
    type: 'label',
    icon: '',
    class: 'mt-4'
  },
  {
    label: 'Roles',
    description: 'Manage user roles and permissions',
    icon: 'i-lucide-shield',
    to: {
      name: 'admin.accounts.roles'
    }
  },
  {
    label: 'Users',
    description: 'Manage system users and their information',
    icon: 'i-lucide-users',
    to: {
      name: 'admin.accounts.users'
    }
  }
]

const MAdminMaintenances = [
  {
    label: 'Maintenances',
    type: 'label',
    icon: '',
    class: 'mt-4'
  },
  {
    label: 'Colleges',
    description: 'Manage colleges and their information',
    icon: 'i-lucide-file-question-mark'
  },
  {
    label: 'Courses',
    description: 'Manage courses and their information',
    icon: 'i-lucide-file-question-mark'
  },
  {
    label: 'Year Levels',
    description: 'Manage year levels and their information',
    icon: 'i-lucide-file-question-mark'
  },
  {
    label: 'Semesters',
    description: 'Manage semesters and their information',
    icon: 'i-lucide-file-question-mark'
  },
  {
    label: 'Sections',
    description: 'Manage sections and their information',
    icon: 'i-lucide-file-question-mark'
  },
  {
    label: 'Subjects',
    description: 'Manage colleges and their information',
    icon: 'i-lucide-file-question-mark'
  }
]

const MAdminLocations = [
  {
    label: 'Locations',
    type: 'label',
    icon: '',
    class: 'mt-4'
  },
  {
    label: 'Regions',
    description: 'Manage regions',
    icon: 'i-lucide-map',
    class: '',
    to: {
      name: 'admin.locations.regions'
    }
  },
  {
    label: 'Provinces',
    description: 'Manage provinces',
    icon: 'i-lucide-map-pinned',
    to: {
      name: 'admin.locations.provinces'
    }
  },
  {
    label: 'Municipalities',
    description: 'Manage municipalities',
    icon: 'i-lucide-mountain',
    to: {
      name: 'admin.locations.municipalities'
    }
  },
  {
    label: 'Barangays',
    description: 'Manage barangays',
    icon: 'i-lucide-map-pin-house',
    to: {
      name: 'admin.locations.barangays'
    }
  }
]

export default MAdmin.concat(
  MAdminAccounts,
  MAdminMaintenances,
  MAdminLocations
)
