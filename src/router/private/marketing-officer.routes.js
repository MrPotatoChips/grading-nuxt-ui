// Marketing Officer Routes
import GAuth from '../guards/auth.guard'
import GMarketingOfficer from '../guards/marketing-officer.guard'

const RMarketingOfficer = [
  {
    path: '/mko/dashboard',
    component: () => import('@/views/mko/Dashboard.vue'),
    name: 'mko.dashboard',
    meta: {
      title: 'Marketing Officer Dashboard',
      role: 'mko'
    }
  },
  {
    path: '/mko/grower-programs',
    component: () => import('@/views/mko/GrowerPrograms.vue'),
    name: 'mko.grower-programs',
    meta: {
      title: 'Grower Programs',
      role: 'mko'
    }
  }
]

export default RMarketingOfficer.map(route =>
  Object.assign(route, {
    beforeEnter: [GAuth, GMarketingOfficer]
  })
)
