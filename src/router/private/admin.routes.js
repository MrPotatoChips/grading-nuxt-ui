import GAuth from "@/router/guards/auth.guard"
import GAdmin from "@/router/guards/admin.guard"

const RAdmin = [
  {
    path: 'dashboard',
    name: 'admin.dashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: 'accounts/users',
    name: 'admin.accounts.users',
    component: () => import('@/views/admin/accounts/AdminUsers.vue'),
    meta: {
      title: 'Users',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Accounts',
          class: 'text-xs'
        },
        {
          label: 'Users',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'accounts/roles',
    name: 'admin.accounts.roles',
    component: () => import('@/views/admin/accounts/AdminRoles.vue'),
    meta: {
      title: 'Roles',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Accounts',
          class: 'text-xs'
        },
        {
          label: 'Roles',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'accounts/growers',
    name: 'admin.accounts.growers',
    component: () => import('@/views/admin/accounts/AdminGrowers.vue'),
    meta: {
      title: 'Growers',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Accounts',
          class: 'text-xs'
        },
        {
          label: 'Growers',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/document-types',
    name: 'admin.maintenances.document-types',
    component: () => import('@/views/admin/maintenances/AdminDocumentTypes.vue'),
    meta: {
      title: 'Document Types',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Document Types',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/activities',
    name: 'admin.maintenances.activities',
    component: () => import('@/views/admin/maintenances/AdminActivities.vue'),
    meta: {
      title: 'Activities',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Activities',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/crop-categories',
    name: 'admin.maintenances.crop-categories',
    component: () => import('@/views/admin/maintenances/AdminCropCategories.vue'),
    meta: {
      title: 'Crop Categories',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Crop Categories',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/crops',
    name: 'admin.maintenances.crops',
    component: () => import('@/views/admin/maintenances/AdminCrops.vue'),
    meta: {
      title: 'Crops',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Crops',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/product-groups',
    name: 'admin.maintenances.product-groups',
    component: () => import('@/views/admin/maintenances/AdminProductGroups.vue'),
    meta: {
      title: 'Product Groups',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Product Groups',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/product-categories',
    name: 'admin.maintenances.product-categories',
    component: () => import('@/views/admin/maintenances/AdminProductCategories.vue'),
    meta: {
      title: 'Product Categories',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Product Categories',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/products',
    name: 'admin.maintenances.products',
    component: () => import('@/views/admin/maintenances/AdminProducts.vue'),
    meta: {
      title: 'Products',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Products',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/areas',
    name: 'admin.locations.areas',
    component: () => import('@/views/admin/locations/AdminAreas.vue'),
    meta: {
      title: 'Areas',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Areas',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/clusters',
    name: 'admin.locations.clusters',
    component: () => import('@/views/admin/locations/AdminClusters.vue'),
    meta: {
      title: 'Clusters',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Clusters',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/regions',
    name: 'admin.locations.regions',
    component: () => import('@/views/admin/locations/AdminRegions.vue'),
    meta: {
      title: 'Regions',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Regions',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/provinces',
    name: 'admin.locations.provinces',
    component: () => import('@/views/admin/locations/AdminProvinces.vue'),
    meta: {
      title: 'Provinces',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Provinces',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/municipalities',
    name: 'admin.locations.municipalities',
    component: () => import('@/views/admin/locations/AdminMunicipalities.vue'),
    meta: {
      title: 'Municipalities',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Municipalities',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'locations/barangays',
    name: 'admin.locations.barangays',
    component: () => import('@/views/admin/locations/AdminBarangays.vue'),
    meta: {
      title: 'Barangays',
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Barangays',
          class: 'text-xs'
        }
      ]
    }
  }
]

export default [
  {
    path: '/admin',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RAdmin.map(
      route => Object.assign(route, {
        beforeEnter: [GAuth, GAdmin]
      })
    )
  }
]
