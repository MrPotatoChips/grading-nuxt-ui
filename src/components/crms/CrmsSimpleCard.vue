<template>
  <UCard
    :ui="{
      body: 'p-4'
    }"
  >
    <div class="space-y-3">
      <div
        v-if="title"
        class="flex items-center justify-between"
      >
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <UIcon
          v-if="icon"
          :name="icon"
          class="text-xl"
          :class="iconColorClass"
        />
      </div>

      <slot />

      <div
        v-if="$slots.footer || footerText"
        class="pt-2 border-t border-gray-200 dark:border-gray-700"
      >
        <slot name="footer">
          <p class="text-sm text-gray-500">
            {{ footerText }}
          </p>
        </slot>
      </div>
    </div>
  </UCard>
</template>

<script>
export default {
  name: 'CrmsSimpleCard',

  props: {
    title: {
      type: String,
      default: ''
    },
    footerText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value)
    }
  },

  computed: {
    iconColorClass () {
      const colorMap = {
        primary: 'text-primary-500',
        secondary: 'text-gray-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-500'
      }
      return colorMap[this.iconColor] || colorMap.primary
    }
  }
}
</script>
