import GAuth from "../guards/auth.guard"

const RPrivateShared = [
  {
    path: 'change-password',
    component: () => import('@/views/shared/private/account-settings/ChangePassword.vue'),
    name: 'shared.account-settings.change-password'
  }
]

export default [
  {
    path: '/account-settings',
    component: () => import('@/components/layouts/PrivateLayout.vue'),
    children: RPrivateShared.map(
      route => Object.assign(route, {
        beforeEnter: [GAuth]
      })
    )
  }
]
