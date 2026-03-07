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
  },
  {
    label: 'Accounts',
    icon: 'i-lucide-user-round-cog',
    defaultOpen: true,
    children: [
      {
        label: 'Users',
        description: 'Manage system users and their information',
        icon: 'i-lucide-users',
        to: {
          name: 'admin.accounts.users'
        }
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
        label: 'Growers',
        description: 'Manage grower accounts',
        icon: 'i-lucide-user',
        to: {
          name: 'admin.accounts.growers'
        }
      }
    ]
  },
  {
    label: 'Maintenances',
    icon: 'i-lucide-columns-settings',
    defaultOpen: true,
    children: [
      {
        label: 'Document Types',
        description: 'Manage document types and classifications',
        icon: 'i-lucide-file-question-mark',
        to: {
          name: 'admin.maintenances.document-types'
        }
      },
      {
        label: 'Activities',
        description: 'Manage activities',
        icon: 'i-lucide-list-todo',
        to: {
          name: 'admin.maintenances.activities'
        }
      },
      {
        label: 'Crop Categories',
        description: 'Manage crop categories',
        icon: 'i-lucide-vegan',
        to: {
          name: 'admin.maintenances.crop-categories'
        }
      },
      {
        label: 'Crops',
        description: 'Manage crops',
        icon: 'i-lucide-sprout',
        to: {
          name: 'admin.maintenances.crops'
        }
      },
      {
        label: 'Product Groups',
        description: 'Manage product groups',
        icon: 'i-lucide-box',
        to: {
          name: 'admin.maintenances.product-groups'
        }
      },
      {
        label: 'Product Categories',
        description: 'Manage product categories',
        icon: 'i-lucide-boxes',
        to: {
          name: 'admin.maintenances.product-categories'
        }
      },
      {
        label: 'Products',
        description: 'Manage products',
        icon: 'i-lucide-file-box',
        to: {
          name: 'admin.maintenances.products'
        }
      }
    ]
  },
  {
    label: 'Locations',
    icon: 'i-lucide-earth',
    defaultOpen: true,
    children: [
      {
        label: 'Areas',
        description: 'Manage areas',
        icon: 'i-lucide-locate',
        to: {
          name: 'admin.locations.areas'
        }
      },
      {
        label: 'Clusters',
        description: 'Manage clusters',
        icon: 'i-lucide-locate-fixed',
        to: {
          name: 'admin.locations.clusters'
        }
      },
      {
        label: 'Regions',
        description: 'Manage regions',
        icon: 'i-lucide-map',
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
  }
  // {
  //   label: 'Component Showcase',
  //   icon: 'i-lucide-package',
  //   // defaultOpen: true,
  //   children: [
  //     {
  //       label: 'Dashboard',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-layout-dashboard',
  //       to: {
  //         name: 'components.dashboard'
  //       }
  //     },
  //     {
  //       label: 'Buttons',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-bold',
  //       to: {
  //         name: 'components.buttons'
  //       }
  //     },
  //     {
  //       label: 'Forms',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-facebook',
  //       to: {
  //         name: 'components.forms'
  //       }
  //     },
  //     {
  //       label: 'Feedbacks',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       to: {
  //         name: 'components.feedbacks'
  //       }
  //     },
  //     {
  //       label: 'Navigations',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       to: {
  //         name: 'components.navigations'
  //       }
  //     },
  //     {
  //       label: 'Layouts',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       to: {
  //         name: 'components.layouts'
  //       }
  //     },
  //     {
  //       label: 'Data Displays',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       to: {
  //         name: 'components.data-displays'
  //       }
  //     },
  //     {
  //       label: 'Overlays',
  //       description: 'Fully styled and customizable components for Nuxt.',
  //       icon: 'i-lucide-house',
  //       to: {
  //         name: 'components.overlays'
  //       }
  //     }
  //   ]
  // }
]

export default MAdmin
