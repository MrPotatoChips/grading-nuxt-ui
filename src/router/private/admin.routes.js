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

const RAdminMaintenances = [
  {
    path: 'maintenances/colleges',
    name: 'admin.maintenances.colleges',
    component: () => import('@/views/admin/maintenances/AdminColleges.vue'),
    meta: {
      title: 'Colleges',
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
          label: 'Colleges',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/courses',
    name: 'admin.maintenances.courses',
    component: () => import('@/views/admin/maintenances/AdminCourses.vue'),
    meta: {
      title: 'Courses',
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
          label: 'Courses',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/year-levels',
    name: 'admin.maintenances.year-levels',
    component: () => import('@/views/admin/maintenances/AdminYearLevels.vue'),
    meta: {
      title: 'Year Levels',
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
          label: 'Year Levels',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/semesters',
    name: 'admin.maintenances.semesters',
    component: () => import('@/views/admin/maintenances/AdminSemesters.vue'),
    meta: {
      title: 'Semesters',
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
          label: 'Semesters',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/sections',
    name: 'admin.maintenances.sections',
    component: () => import('@/views/admin/maintenances/AdminSections.vue'),
    meta: {
      title: 'Sections',
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
          label: 'Sections',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: 'maintenances/subjects',
    name: 'admin.maintenances.subjects',
    component: () => import('@/views/admin/maintenances/AdminSubjects.vue'),
    meta: {
      title: 'Subjects',
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
          label: 'Subjects',
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
      RAdminMaintenances,
      RAdminLocations
    ).map(
      route => Object.assign(route, {
        beforeEnter: [GAuth, GAdmin]
      })
    )
  }
]
