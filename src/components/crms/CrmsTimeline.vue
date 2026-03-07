<template>
  <div class="space-y-4">
    <h3
      v-if="title"
      class="text-lg font-semibold mb-4"
    >
      {{ title }}
    </h3>

    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <!-- Timeline Items -->
      <div
        v-for="(item, index) in items"
        :key="index"
        class="relative pl-12 pb-8 last:pb-0"
      >
        <!-- Timeline Dot -->
        <div
          class="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
          :class="getStatusClass(item.status)"
        >
          <UIcon
            :name="getStatusIcon(item.status)"
            class="text-white text-sm"
          />
        </div>

        <!-- Timeline Content -->
        <UCard
          :ui="{
            body: 'p-4'
          }"
        >
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-semibold">
                {{ item.title }}
              </h4>
              <UBadge
                v-if="item.status"
                :label="item.status"
                :color="getStatusBadgeColor(item.status)"
                size="xs"
              />
            </div>

            <p
              v-if="item.description"
              class="text-sm text-gray-600 dark:text-gray-400"
            >
              {{ item.description }}
            </p>

            <div
              v-if="item.user || item.date"
              class="flex items-center gap-4 text-xs text-gray-500 mt-2"
            >
              <div
                v-if="item.user"
                class="flex items-center gap-2"
              >
                <UIcon name="i-lucide-user" />
                <span>{{ item.user }}</span>
              </div>
              <div
                v-if="item.date"
                class="flex items-center gap-2"
              >
                <UIcon name="i-lucide-calendar" />
                <span>{{ formatDate(item.date) }}</span>
              </div>
            </div>

            <!-- Custom Slot for Additional Content -->
            <div
              v-if="item.content || $slots[`item-${index}`]"
              class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
            >
              <slot
                :name="`item-${index}`"
                :item="item"
              >
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ item.content }}
                </div>
              </slot>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrmsTimeline',

  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => [],
      validator: items => {
        return items.every(item =>
          typeof item === 'object' &&
          item.title
        )
      }
    }
  },

  methods: {
    getStatusClass (status) {
      const statusMap = {
        pending: 'bg-yellow-500',
        approved: 'bg-green-500',
        rejected: 'bg-red-500',
        completed: 'bg-blue-500',
        inProgress: 'bg-primary-500',
        cancelled: 'bg-gray-500'
      }
      return statusMap[status] || 'bg-gray-500'
    },

    getStatusIcon (status) {
      const iconMap = {
        pending: 'i-lucide-clock',
        approved: 'i-lucide-check',
        rejected: 'i-lucide-x',
        completed: 'i-lucide-check-circle',
        inProgress: 'i-lucide-loader',
        cancelled: 'i-lucide-ban'
      }
      return iconMap[status] || 'i-lucide-circle'
    },

    getStatusBadgeColor (status) {
      const colorMap = {
        pending: 'warning',
        approved: 'success',
        rejected: 'error',
        completed: 'primary',
        inProgress: 'info',
        cancelled: 'neutral'
      }
      return colorMap[status] || 'neutral'
    },

    formatDate (date) {
      if (!date) return ''

      const d = new Date(date)
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
