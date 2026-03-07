<template>
  <UApp>
    <UModal
      fullscreen
      title="Modal fullscreen"
      :open="!$pinia"
      :ui="{ header: 'hidden' }"
    >
      <AppMainLayout />

      <template #body>
        <UContainer class="h-full w-full flex items-center justify-center flex-col gap-1">
          <UIcon name="i-lucide-aperture" class="animate-spin size-25"/>
        </UContainer>
      </template>
    </UModal>
    <!-- <UContextMenu
      :items="menus"
      :ui="{
        content: 'w-100'
      }"
      @update:open="open => console.log('Context menu open:', open)"
    > -->
    <!-- </UContextMenu> -->

  <UModal
    v-model:open="modalUsers"
    description="a command palette for searching users"
    title="Command Palette"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search anything here . . ."
        class="h-80"
      />
    </template>
  </UModal>
  </UApp>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { defineShortcuts } from '@nuxt/ui/composables/defineShortcuts'
import { computed } from 'vue'
import { ref } from 'vue'

const router = useRouter()
const modalUsers = ref(false)

const searchTerm = ref('')
const status = ref('loaded') // Simulating a loading state, replace with actual logic

const groups = computed(() => [
  {
    id: 'users',
    label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
    items: [
      {
        id: 'user-1',
        label: 'John Doe',
        description: 'Sales Manager',
        icon: 'i-lucide-user'
      },
      {
        id: 'user-2',
        label: 'Jane Smith',
        description: 'Marketing Specialist',
        icon: 'i-lucide-user'
      },
      {
        id: 'user-3',
        label: 'Alice Johnson',
        description: 'Product Designer',
        icon: 'i-lucide-user'
      }
    ],
    ignoreFilter: false
  },
  {
    id: 'categories',
    label: searchTerm.value ? `Categories matching “${searchTerm.value}”...` : 'Categories',
    items: [
      {
        id: 'category-1',
        label: 'Sales',
        description: 'Sales related tasks',
        icon: 'i-lucide-folder'
      },
      {
        id: 'category-2',
        label: 'Marketing',
        description: 'Marketing related tasks',
        icon: 'i-lucide-folder'
      },
      {
        id: 'category-3',
        label: 'Design',
        description: 'Design related tasks',
        icon: 'i-lucide-folder'
      }
    ],
    ignoreFilter: false
  }
])

defineShortcuts({
  'meta_/': () => modalUsers.value = true,
  'meta_shift_q': () => router.push({ name: 'shared.user.sales-orders' })
})
</script>
<script>
export default {
  name: 'App',

  mounted() {
    // console.log('App mounted', this.$pinia, this)
    console.log(this.$route)
  },

  data () {
    return {
      menus: [
        [
          {
            label: 'Appearance',
            children: [
              {
                label: 'System',
                icon: 'i-lucide-monitor'
              },
              {
                label: 'Light',
                icon: 'i-lucide-sun'
              },
              {
                label: 'Dark',
                icon: 'i-lucide-moon'
              }
            ]
          }
        ],
        [
          {
            label: 'Show Sidebar',
            kbds: ['meta', 's']
          },
          {
            label: 'Show Toolbar',
            kbds: ['shift', 'meta', 'd']
          },
          {
            label: 'Collapse Pinned Tabs',
            disabled: true
          }
        ],
        [
          {
            label: 'Refresh the Page'
          },
          {
            label: 'Clear Cookies and Refresh'
          },
          {
            label: 'Clear Cache and Refresh'
          },
          {
            type: 'separator'
          },
          {
            label: 'Developer',
            children: [
              [
                {
                  label: 'View Source',
                  kbds: ['meta', 'shift', 'u']
                },
                {
                  label: 'Developer Tools',
                  kbds: ['option', 'meta', 'i']
                },
                {
                  label: 'Inspect Elements',
                  kbds: ['option', 'meta', 'c']
                }
              ],
              [
                {
                  label: 'JavaScript Console',
                  kbds: ['option', 'meta', 'j']
                }
              ]
            ]
          }
        ]
      ]
    }
  },

  computed: {
    layout () {
      switch (this.$route.meta.layout) {
        case 'shared.user.sales-orders': {
          return 'userView'
        }
        default: {
          return 'AppMainLayout'
        }
      }
    }
  }
}
</script>
<style lang="css">
@import './assets/css/app.css';
</style>
