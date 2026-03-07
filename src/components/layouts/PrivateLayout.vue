<template>
  <UMain>
    <UDashboardGroup
      unit="rem"
      storage="local"
      class="flex-1"
    >
      <AppSidebar />

      <!-- :ui="{
          body: 'col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10'
        }" -->
      <UDashboardPanel
        :ui="{
          body: 'border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'
        }"
      >
        <template #header>
          <AppHeader />
        </template>

        <template #body>
          <RouterView
            v-slot="{ Component }"
          >

            <!-- enter-active-class="animate__animated animate__fadeInUp" -->
            <!-- leave-active-class="animate__animated animate__fadeOut" -->
            <Transition
              mode="out-in"
              name="router-fade"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <component :is="Component" />
            </Transition>
          </RouterView>
        </template>

        <template #footer>
          <AppFooter />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </UMain>
</template>
<script setup>
import { overlays } from '@/composables/overlays'
import { defineShortcuts } from '@nuxt/ui/composables/defineShortcuts'


defineShortcuts({
  'alt_q': () => {
    overlays.confirm({
      title: 'Confirmation',
      body: 'Logout your current session?',
      confirmButtonText: 'Logout',
      confirmButtonVariant: 'error',
      discardButtonText: 'Discard',
      preConfirm: async () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      }
    })
  }
})

</script>
