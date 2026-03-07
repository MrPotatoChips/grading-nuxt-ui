// DG Agent Routes
import GAuth from '../guards/auth.guard'
import GDGAgent from '../guards/dg-agent.guard'

const RDGAgent = [
  {
    path: '/dga/dashboard',
    component: () => import('@/views/dga/DGADashboard.vue'),
    name: 'dga.dashboard',
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dga/growers',
    component: () => import('@/views/dga/DGAGrowers.vue'),
    name: 'dga.growers',
    meta: {
      title: 'Growers',
      breadcrumbs: [
        {
          label: 'DG Agent',
          class: 'text-xs',
          to: {
            name: 'dga.dashboard'
          }
        },
        {
          label: 'Growers',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: '/dga/growers/:grower?/managements',
    component: () => import('@/views/dga/growers/managements/DGAManagementsWrapper.vue'),
    children: [
      {
        path: '',
        name: 'dga.grower-managements',
        redirect: { name: 'dga.grower-managements.informations' }
      },
      {
        path: 'informations',
        component: () => import('@/views/dga/growers/managements/DGAInformations.vue'),
        name: 'dga.grower-managements.informations',
        meta: {
          title: 'Growers',
          breadcrumbs: [
            {
              label: 'DG Agent',
              class: 'text-xs',
              to: {
                name: 'dga.dashboard'
              }
            },
            {
              label: 'Growers',
              class: 'text-xs',
              to: {
                name: 'dga.growers'
              }
            },
            {
              label: 'Informations',
              class: 'text-xs'
            }
          ]
        }
      },
      {
        path: 'interactions',
        component: () => import('@/views/dga/growers/managements/DGAInteractions.vue'),
        name: 'dga.grower-managements.interactions',
        meta: {
          title: 'Growers',
          breadcrumbs: [
            {
              label: 'DG Agent',
              class: 'text-xs',
              to: {
                name: 'dga.dashboard'
              }
            },
            {
              label: 'Growers',
              class: 'text-xs',
              to: {
                name: 'dga.growers'
              }
            },
            {
              label: 'Interactions',
              class: 'text-xs'
            }
          ]
        }
      },
      {
        path: 'farms',
        component: () => import('@/views/dga/growers/managements/DGAFarms.vue'),
        name: 'dga.grower-managements.farms',
        meta: {
          title: 'Growers',
          breadcrumbs: [
            {
              label: 'DG Agent',
              class: 'text-xs',
              to: {
                name: 'dga.dashboard'
              }
            },
            {
              label: 'Growers',
              class: 'text-xs',
              to: {
                name: 'dga.growers'
              }
            },
            {
              label: 'Farms',
              class: 'text-xs'
            }
          ]
        }
      },
      {
        path: 'crop-histories',
        component: () => import('@/views/dga/growers/managements/DGACropHistories.vue'),
        name: 'dga.grower-managements.crop-histories',
        meta: {
          title: 'Growers',
          breadcrumbs: [
            {
              label: 'DG Agent',
              class: 'text-xs',
              to: {
                name: 'dga.dashboard'
              }
            },
            {
              label: 'Growers',
              class: 'text-xs',
              to: {
                name: 'dga.growers'
              }
            },
            {
              label: 'Crop Histories',
              class: 'text-xs'
            }
          ]
        }
      },
      {
        path: 'documents',
        component: () => import('@/views/dga/growers/managements/DGADocuments.vue'),
        name: 'dga.grower-managements.documents',
        meta: {
          title: 'Growers',
          breadcrumbs: [
            {
              label: 'DG Agent',
              class: 'text-xs',
              to: {
                name: 'dga.dashboard'
              }
            },
            {
              label: 'Growers',
              class: 'text-xs',
              to: {
                name: 'dga.growers'
              }
            },
            {
              label: 'Documents',
              class: 'text-xs'
            }
          ]
        }
      }
    ],
    meta: {
      title: 'Growers Managements',
      role: 'dga'
    }
  },
  {
    path: '/dga/tasks',
    component: () => import('@/views/dga/DGATasks.vue'),
    name: 'dga.tasks',
    meta: {
      title: 'Tasks',
      breadcrumbs: [
        {
          label: 'DG Agent',
          class: 'text-xs',
          to: {
            name: 'dga.dashboard'
          }
        },
        {
          label: 'Tasks',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: '/dga/tasks/:task?/events',
    component: () => import('@/views/dga/DGATaskEvents.vue'),
    name: 'dga.task-events',
    meta: {
      title: 'Task Events',
      breadcrumbs: [
        {
          label: 'DG Agent',
          class: 'text-xs',
          to: {
            name: 'dga.dashboard'
          }
        },
        {
          label: 'Tasks',
          class: 'text-xs',
          to: {
            name: 'dga.tasks'
          }
        },
        {
          label: 'Task Events',
          class: 'text-xs'
        }
      ]
    }
  },
  {
    path: '/dga/grower-programs',
    component: () => import('@/views/dga/DGAGrowerPrograms.vue'),
    name: 'dga.grower-programs',
    meta: {
      title: 'Grower Programs',
      role: 'dga'
    }
  }
]

export default [
  {
    path: '/dga',
    name: 'dga',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RDGAgent.map(route =>
      Object.assign(route, {
        beforeEnter: [GAuth, GDGAgent]
      })
    )
  }
]
