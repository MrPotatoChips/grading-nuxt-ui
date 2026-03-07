// Student Routes
import GAuth from '../guards/auth.guard'
import GStudent from '../guards/student.guard'

const RStudent = [
  {
    path: '/dashboard',
    component: () => import('@/views/student/StudentDashboard.vue'),
    name: 'student.dashboard',
    meta: {
      title: 'Dashboard'
    }
  }
]


export default [
  {
    path: '/student',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RStudent.map(
      route => Object.assign(route, {
        beforeEnter: [GAuth, GStudent]
      })
    )
  }
]
