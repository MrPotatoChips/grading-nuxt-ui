import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'nprogress/nprogress.css'
import 'animate.css'

import axios from 'axios'
import persistedPiniaState from 'pinia-plugin-persistedstate'

import vAxios from 'vue-axios'
import vNuxtUI from '@nuxt/ui/vue-plugin'
import vGlobalPlugins from '@/plugins/globals'

import App from '@/App.vue'
import router from '@/router'

// import vInsProgressBar from 'vue-ins-progress-bar'
// import vMask from 'v-mask'
// import vSelect from 'vue-select'
// vueApp.component('VSelect', vSelect)

import { setupAxios } from '@/plugins/axios'
// import { setupEcho } from './plugins/laravel-echo'

import '@/plugins/yup'


const piniaStore = createPinia()
piniaStore.use(persistedPiniaState)

// piniaStore.use(({ store }) => {
//   if(['auth'].includes(store.$id)) {
//     setupEcho()
//   }
// })

const vueApp = createApp(App)

vueApp.use(piniaStore)
vueApp.use(router)
vueApp.use(vAxios, setupAxios(axios))
vueApp.use(vNuxtUI)
vueApp.use(vGlobalPlugins)

// await router.isReady()
vueApp.mount('#app')
