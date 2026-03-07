// DG Supervisor Routes
import GAuth from '../guards/auth.guard'
import GDGSupervisor from '../guards/dg-supervisor.guard'

const RDGSupervisor = [
  {
    path: 'dashboard',
    component: () => import('@/views/dgs/Dashboard.vue'),
    name: 'dgs.dashboard',
    meta: {
      title: 'DG Supervisor Dashboard',
      role: 'dgs'
    }
  },
  {
    path: 'agents',
    component: () => import('@/views/dgs/Agents.vue'),
    name: 'dgs.agents',
    meta: {
      title: 'Agents',
      role: 'dgs'
    }
  },
  {
    path: 'growers',
    component: () => import('@/views/dgs/Growers.vue'),
    name: 'dgs.growers',
    meta: {
      title: 'Growers',
      role: 'dgs'
    }
  },
  {
    path: 'tasks',
    component: () => import('@/views/dgs/Tasks.vue'),
    name: 'dgs.tasks',
    meta: {
      title: 'Tasks',
      role: 'dgs'
    }
  }
]

export default [
  {
    path: '/dgs',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RDGSupervisor.map(route =>
      Object.assign(route, {
        beforeEnter: [GAuth, GDGSupervisor]
      })
    )
  }
]

RDGSupervisor.map(route =>
  Object.assign(route, {
    beforeEnter: [GAuth, GDGSupervisor]
  })
)
