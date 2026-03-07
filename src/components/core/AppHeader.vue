
<template>
  <div>
    <UDashboardNavbar
      :title="router.currentRoute.value.meta?.title"
    >
      <!-- <template #trailing>
        <UBadge
          label="4"
          variant="subtle"
        />
      </template> -->
      <template #right>
        <UDropdownMenu
          :items="headerItems"
          :ui="{
            content: 'w-60'
          }"
        >
          <UButton
            color="neutral"
            variant="outline"
            class="text-start"
          >
            <UUser
              size="md"
              :avatar="{
                src: 'https://lh3.googleusercontent.com/a/ACg8ocLU4Nksvzm-3eO2uPcb3eUE6amogzqHzx0_F31pxx_iT_BKGFKw=s83-c-mo'
              }"
              :chip="{
                color: 'primary',
                position: 'top-right'
              }"
              :ui="{
                name: 'md:block hidden',
                description: 'md:block hidden'
              }"
              class="md:min-w-60"
            >
              <template #name>
                {{ auth.user.name }}
              </template>
              <template #description>
                {{ auth.user.role_name }}
              </template>
            </UUser>
          </UButton>
        </UDropdownMenu>
      </template>
    </UDashboardNavbar>
    <UDashboardToolbar
      v-if="router.currentRoute.value.meta?.breadcrumbs"
    >
      <UScrollArea
        orientation="horizontal"
      >
        <div>
          <UBreadcrumb
            class="py-1.5 #data-[state='active']:bg-transparent"
            :items="router.currentRoute.value.meta?.breadcrumbs"
          />
        </div>
      </UScrollArea>
    </UDashboardToolbar>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'

import { useAuth } from '@/stores/auth.store'

const { system, store } = useColorMode({
  initialValue: 'light'
})

const router = useRouter()
const auth = useAuth()

const headerItems = computed(() => [
  [
    {
      label: auth.user.name,
      avatar: {
        src: 'https://github.com/mrpotatochips.png',
        alt: auth.user.name
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [','],
      to: {
        name: 'shared.account-settings.change-password'
      }
    },
    {
      label: 'Shortcuts',
      icon: 'i-lucide-keyboard',
      kbds: ['meta', '/'],
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'Theme',
      icon: 'i-lucide-sun-moon',
      children: [
        [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            type: 'checkbox',
            checked: store.value === 'light',
            onUpdateChecked: isChecked => {
              store.value = isChecked ? 'light' : 'dark'
            },
            onSelect: () => store.value = 'light'
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            type: 'checkbox',
            checked: store.value === 'dark',
            onUpdateChecked: isChecked => {
              store.value = isChecked ? 'dark' : 'light'
            },
            onSelect: () => store.value = 'dark'
          }
        ],
        [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
            type: 'checkbox',
            checked: store.value === 'auto',
            onUpdateChecked: isChecked => {
              store.value = isChecked ? 'auto' : system.value
            },
            onSelect: () => store.value = 'auto'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons:github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/components/dropdown-menu'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['alt', 'q'],
      onClick: () => {
        auth.clear()
        router.replace({ name: 'shared.login' })
      }
    }
  ]
])
</script>
