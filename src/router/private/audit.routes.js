// Audit Routes
import GAuth from '../guards/auth.guard'
import GAudit from '../guards/audit.guard'

const RAudit = [
  {
    path: '/audit/dashboard',
    component: () => import('@/views/audit/Dashboard.vue'),
    name: 'audit.dashboard',
    meta: {
      title: 'Audit Dashboard',
      role: 'audit'
    }
  },
  {
    path: '/audit/grower-management',
    component: () => import('@/views/audit/GrowerManagement.vue'),
    name: 'audit.grower-management',
    meta: {
      title: 'Grower Management',
      role: 'audit'
    }
  },
  {
    path: '/audit/reports',
    component: () => import('@/views/audit/Reports.vue'),
    name: 'audit.reports',
    meta: {
      title: 'Reports',
      role: 'audit'
    }
  }
]

export default RAudit.map(route =>
  Object.assign(route, {
    beforeEnter: [GAuth, GAudit]
  })
)
