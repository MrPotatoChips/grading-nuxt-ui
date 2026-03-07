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
  }
]

const RAdminAccounts = [

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
  }
]

const RAdminLocations = [
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
    children: RAdmin.concat(
      RAdminAccounts,
      RAdminLocations
    ).map(
      route => Object.assign(route, {
        beforeEnter: [GAuth, GAdmin]
      })
    )
  }
]
