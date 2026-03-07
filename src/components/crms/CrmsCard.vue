<template>
  <UCard
    :ui="{
      body: 'p-4'
    }"
  >
    <div
      v-if="loading"
      class="flex items-center gap-4"
    >
      <div class="flex items-center justify-center w-16 h-16">
        <UIcon
          name="i-lucide-loader-2"
          class="animate-spin text-4xl"
          :class="textVariantClass"
        />
      </div>
      <div class="flex-1">
        <USkeleton class="h-8 w-20 mb-2" />
        <USkeleton class="h-4 w-32" />
      </div>
    </div>

    <div
      v-else
      class="flex items-center gap-4"
    >
      <div class="flex items-center justify-center w-16 h-16">
        <UIcon
          :name="icon"
          class="text-4xl"
          :class="textVariantClass"
        />
      </div>
      <div class="flex-1">
        <div class="flex items-baseline gap-2">
          <h3
            class="text-3xl font-bold"
            :class="textVariantClass"
          >
            {{ animatedCounter }}
          </h3>
          <span
            class="text-lg"
            :class="textVariantClass"
          >
            {{ title }}
          </span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ subTitle }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script>
export default {
  name: 'CrmsCard',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    count: {
      type: [Number, String],
      default: 0
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value)
    },
    icon: {
      type: String,
      default: 'i-lucide-file'
    }
  },

  data () {
    return {
      tweenedNumber: Number(this.count) || 0
    }
  },

  computed: {
    textVariantClass () {
      const variantMap = {
        primary: 'text-primary-500',
        secondary: 'text-gray-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-500'
      }
      return variantMap[this.variant] || variantMap.primary
    },

    animatedCounter () {
      return Math.round(this.tweenedNumber).toLocaleString()
    }
  },

  watch: {
    count (newValue) {
      this.animateCount(newValue)
    }
  },

  mounted () {
    this.animateCount(this.count)
  },

  methods: {
    animateCount (target) {
      const targetNum = Number(target) || 0
      const start = this.tweenedNumber
      const duration = 1000 // 1 second
      const startTime = Date.now()

      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        this.tweenedNumber = start + (targetNum - start) * easeOutQuart

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          this.tweenedNumber = targetNum
        }
      }

      requestAnimationFrame(animate)
    }
  }
}
</script>
