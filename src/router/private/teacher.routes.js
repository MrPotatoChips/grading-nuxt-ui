// Teacher Routes
import GAuth from '../guards/auth.guard'
import GTeacher from '../guards/teacher.guard'

const RTeacher = [
  {
    path: '/dashboard',
    component: () => import('@/views/teacher/TeacherDashboard.vue'),
    name: 'teacher.dashboard',
    meta: {
      title: 'Dashboard'
    }
  }
]


export default [
  {
    path: '/teacher',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RTeacher.map(
      route => Object.assign(route, {
        beforeEnter: [GAuth, GTeacher]
      })
    )
  }
]
