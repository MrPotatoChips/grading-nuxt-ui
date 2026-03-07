import GGuest from "./guards/guest.guard"

const RPublicShared = [
  {
    path: '',
    name: 'shared.redirect',
    redirect: {
      name: 'shared.login'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/shared/404.vue'),
    name: 'shared.page-not-found'
  },
  {
    path: '/sign-in',
    component: () => import('@/views/shared/public/SignIn.vue'),
    name: 'shared.login'
  },
  {
    path: '/auth/:provider/callback',
    component: () => import('@/views/shared/public/SingleSignOn.vue'),
    name: 'shared.sso'
  }
].map(
  route => Object.assign(route, {
    beforeEnter: [GGuest]
  })
)

export default RPublicShared
