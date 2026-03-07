<template>
  <!-- <Suspense> -->
  <UApp>
    <RouterView />
    <UModal
      fullscreen
      title="App Splashscreen"
      :open="!$pinia"
      :ui="{ header: 'hidden' }"
    >
      <template #body>
        <UContainer class="h-full w-full flex items-center justify-center flex-col gap-1">
          <UIcon
            name="i-lucide-aperture"
            class="animate-spin size-25"
          />
        </UContainer>
      </template>
    </UModal>
  </UApp>
  <!-- </Suspense> -->
</template>
<script>
// import PublicLayout from '@/components/layouts/PublicLayout.vue'
// import PrivateLayout from '@/components/layouts/PrivateLayout.vue'
import { useAuth } from '@/stores/auth.store'

export default {
  name: 'App',

  // components: {
  //   PublicLayout,
  //   PrivateLayout
  // },

  mounted() {
    // console.log('App mounted', this.$pinia, this)
    // console.log(this)
  },

  data () {
    return {
      auth: useAuth()
    }
  },

  computed: {
    layout () {
      if (!this.$pinia) {
        return 'pinia-layout'
      }

      const auth = useAuth()

      if (!auth.user) {
        return 'public-layout'
      }

      return 'private-layout'

      // switch (this.$route.meta.layout) {
      //   case 'private': {
      //     return 'private-layout';
      //   }
      //   default: {
      //     return 'public-layout';
      //   }
      // }
    }
  }
}
</script>
<style lang="css">
@import './assets/css/app.css';
</style>
