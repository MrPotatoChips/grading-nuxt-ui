// Marketing Manager Routes
import GAuth from '../guards/auth.guard'
import GMarketingManager from '../guards/marketing-manager.guard'

const RMarketingManager = [
  {
    path: '/mkm/dashboard',
    component: () => import('@/views/mkm/Dashboard.vue'),
    name: 'mkm.dashboard',
    meta: {
      title: 'Marketing Manager Dashboard',
      role: 'mkm'
    }
  },
  {
    path: '/mkm/growers',
    component: () => import('@/views/mkm/Growers.vue'),
    name: 'mkm.growers',
    meta: {
      title: 'Growers',
      role: 'mkm'
    }
  }
]

export default RMarketingManager.map(route =>
  Object.assign(route, {
    beforeEnter: [GAuth, GMarketingManager]
  })
)
