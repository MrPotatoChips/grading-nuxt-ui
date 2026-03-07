<template>
  <UDashboardSearch
    shortcut="meta_/"
    :groups="groups"
  />

  <UDashboardSidebar
    id="default"
    collapsible
    resizable
    :min-size="10"
    :max-size="16"
    :default-size="16"
    :collapsed-size="0"
    :ui="{
      root: 'transition-[width] transition-discrete duration-700 bg-elevated/25',
      footer: 'lg:border-t lg:border-default'
    }"
  >
    <!-- <template #header="{ collapsed }">
      <div class="flex flex-row justify-between w-100">
        <img v-if="!collapsed" :src="aljayLogo" class="w-[100px] transition-[width] transition-discrete duration-100" />
        <UDashboardSidebarCollapse />
      </div>
    </template> -->
    <template #header>
      <div class="flex flex-row justify-between w-100">
        <UDashboardSidebarCollapse />
      </div>
    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton
        :collapsed="collapsed"
        :kbds="['meta', '/']"
        class="bg-transparent ring-default transition-all duration-700"
      />

      <UNavigationMenu
        tooltip
        popover
        highlight
        variant="pill"
        color="primary"
        orientation="vertical"
        highlight-color="primary"
        :collapsed="collapsed"
        :items="sidebarMenus"
        :ui="{
          label: 'transition-all duration-700',
          link: 'data-[active]:bg-primary-100 rounded-lg dark:data-[active]:bg-primary-900 dark:data-[active]:text-white'
        }"
      />
      <!-- <UNavigationMenu
        class="mt-auto"
        tooltip
        popover
        highlight
        variant="pill"
        orientation="vertical"
        highlight-color="primary"
        :collapsed="collapsed"
        :items="bottomNavigations"
        :ui="{
          label: 'transition-all duration-700'
        }"
      /> -->
    </template>
<!--
    <template #footer>
      <UUser
        name="MrPotatoChips"
        description="Web Developer"
        :avatar="{
          src: 'https://github.com/mrpotatochips.png'
        }"
        size="xl"
        chip
      />
    </template> -->
  </UDashboardSidebar>
</template>
<script setup>
import { computed, reactive, watch } from 'vue'
import { getSidebarMenu } from '@/router/navigations'
import { useAuth } from '@/stores/auth.store'
import { useRoute } from 'vue-router'

// import aljayLogo from '@/assets/images/aljay-logo.png'

const auth = useAuth()

let sidebarMenus = reactive(getSidebarMenu(auth.user.role))

const currentRoute = useRoute()

const checkActiveRoute = (selectedRoute, routes) => {
  return routes.map(
    route => {
      // route.defaultOpen = false
      route.active = false
      route.icon = String(route.icon).toString().replace('-bold-duotone', '-line-duotone')

      if (route?.children) {
        route.children.forEach(child => {
          child.icon = String(child.icon).toString().replace('-bold-duotone', '-line-duotone')

          if (child.to.name === selectedRoute.name) {
            // route.defaultOpen = true
            route.active = true
            child.icon = String(child.icon).toString().replace('-line-duotone', '-bold-duotone')
          }
        })
      }

      const toRoutePath = ['/', String(route.to?.name).replace('.', '/')].join('')

      if (route.to?.name === selectedRoute?.name || String(selectedRoute?.path).startsWith(toRoutePath)) {
        route.active = true
        route.icon = String(route.icon).toString().replace('-line-duotone', '-bold-duotone')
      }

      return route
    }
  )
}

sidebarMenus = checkActiveRoute(currentRoute, sidebarMenus)

watch(currentRoute, () => {
  sidebarMenus = checkActiveRoute(currentRoute, sidebarMenus)
})

const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: sidebarMenus.flat()
  }
])

// const bottomNavigations = [
//   [
//     {
//       label: 'Feedback',
//       class: 'px-1.5',
//       icon: 'i-lucide-message-circle',
//       to: 'https://github.com/nuxt-ui-templates/dashboard-vue',
//       target: '_blank'
//     },
//     {
//       label: 'Help & Support',
//       class: 'px-1.5',
//       icon: 'i-lucide-info',
//       to: 'https://github.com/nuxt/ui',
//       target: '_blank'
//     }
//   ]
// ]
</script>
