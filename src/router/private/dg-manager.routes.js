// DG Manager Routes
import GAuth from '../guards/auth.guard'
import GDGManager from '../guards/dg-manager.guard'

const RDGManager = [
  {
    path: '/dgm/dashboard',
    component: () => import('@/views/dgm/Dashboard.vue'),
    name: 'dgm.dashboard',
    meta: {
      title: 'DG Manager Dashboard',
      role: 'dgm'
    }
  },
  {
    path: '/dgm/supervisors',
    component: () => import('@/views/dgm/Supervisors.vue'),
    name: 'dgm.supervisors',
    meta: {
      title: 'Supervisors',
      role: 'dgm'
    }
  },
  {
    path: '/dgm/growers',
    component: () => import('@/views/dgm/Growers.vue'),
    name: 'dgm.growers',
    meta: {
      title: 'Growers',
      role: 'dgm'
    }
  }
]

export default RDGManager.map(route =>
  Object.assign(route, {
    beforeEnter: [GAuth, GDGManager]
  })
)
