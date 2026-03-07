import RCombined from './combined.routes'
import GVerifyAuth from './guards/verify-auth.guard'

import { createRouter, createWebHistory } from 'vue-router'
import { useNProgress } from '@vueuse/integrations'

import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'


const appProgress = useNProgress(0, {
  showSpinner: false
})

const RApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash
      }
    }

    return {
      behavior: 'smooth',
      top: 0,
      left: 0
    }
  },
  routes: RCombined.map(
    route => Object.assign(route, {
      beforeEnter: [GVerifyAuth].concat(route?.beforeEnter || [])
    })
  )
})

RApp.onError(errors => {
  console.trace(errors)
})

RApp.beforeEach((_to, _from, next) => {
  // Add your global before guard logic here
  appProgress.start()
  next()
})

RApp.afterEach(() => {
  appProgress.done()
})

RApp.isReady().finally(() => {
  if(['android'].includes(Capacitor.getPlatform())) {
    App.getInfo().then(
      appInfo => {
        console.log(appInfo)
      }
    )

    App.addListener('backButton', () => {
      if (RApp.currentRoute.value.name === 'shared.login') {
        App.exitApp()
      } else {
        RApp.back()
      }
    })
  }
})

export default RApp
