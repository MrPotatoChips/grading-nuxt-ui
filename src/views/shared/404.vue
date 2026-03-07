<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <UCard class="w-full max-w-md p-8 text-center shadow-lg" bordered>
      <UIcon name="error" class="text-blue-500 mx-auto mb-4" />
      <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">Page Not Found</p>
      <UButton variant="outline" color="primary" @click.prevent="goHome">
        Go to Dashboard
      </UButton>
    </UCard>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth.store'

export default defineComponent({

  name: 'VViewsShared404',

  setup() {
    const router = useRouter()

    const { user } = useAuth()

    const goHome = () => {
      if (user?.role) {
        router.replace({ name: `${user.role}.dashboard` })
      } else {
        router.replace({ name: 'shared.login' })
      }
    }

    return { goHome }
  }
})
</script>
