import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default {
  install (vueApp) {
    const breakPoints = useBreakpoints(breakpointsTailwind)


    vueApp.config.globalProperties.$breakPoints = breakPoints
  }
}
