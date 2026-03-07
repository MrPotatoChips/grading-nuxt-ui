<template>
  <UCard
    :ui="{
      header: 'p-4 sm:p-4',
      body: 'p-4 sm:p-4 border-b-0',
      footer: 'p-4 sm:p-4',
    }"
  >
    <template #header>
      <div class="font-semibold text-sm">{{ card.activity.activity_name }}</div>
      <div class="text-xs">{{ card.crop.crop_name }}</div>
    </template>

    <div class="flex flex-col gap-y-3">
      <div class="grid grid-cols-6">
        <div class="col-span-2">
          <div class="flex items-center gap-2">
          <UIcon name="i-lucide-list-checks" class="size-4 text-primary" />
            <div class="text-xs">
              Event
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="text-[10px]">
            <b>{{ card.events_count }}</b> Conducted / <b>{{ card.event_plan }}</b> Target
          </div>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="text-[10px]">
            <b>{{ eventPercentage }}</b> %
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6">
        <div class="col-span-2">
          <div class="flex items-center gap-2">
          <UIcon name="i-lucide-users" class="size-4 text-secondary" />
            <div class="text-xs">
              Growers
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="text-[10px]">
            <b>{{ card.growers_attended_count }}</b> Attended / <b>{{ card.total_grower_plan }}</b> Target
          </div>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="text-[10px]">
            <b>{{ growerPercentage }}</b> %
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6">
        <div class="col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-earth" class="size-4 text-error" />
            <div class="text-[10px]">
              Hectares
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="text-[10px]">
            <b>{{ card.total_actual_hectares }}</b> Attended / <b>{{ card.total_hectare_plan }}</b> Target
          </div>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="text-[10px]">
            <b>{{ hectarePercentage }}</b> %
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6">
        <div class="col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-circle-dollar-sign" class="size-4 text-warning" />
            <div class="text-xs">
              Sales
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="text-[10px]">
            <b>{{ card.total_actual_sales }}</b> Attained / <b>{{ card.total_sales_plan }}</b> Target
          </div>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="text-[10px]">
            <b>{{ salesPercentage }}</b> %
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 py-2 border-t border-default">

        <div class="col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-percent" class="size-4 text-neutral" />
            <div class="text-xs">
              Conversions
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="text-[10px]">
            <b>{{ card.growers_bought_count }}</b> Bought / <b>{{ card.growers_attended_count }}</b> Target
          </div>
        </div>
        <div class="col-span-1 flex justify-end">
          <div class="text-[10px]">
            <b>{{ conversionPercentage }}</b> %
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
<script>
export default {
  name: 'DGATask',

  emits: [
    'record:task-event'
  ],

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  computed: {
    eventPercentage () {
      if (this.card.event_plan === 0) {
        return 0
      }

      return ((this.card.events_count / this.card.event_plan) * 100).toFixed(2)
    },

    growerPercentage () {
      if (this.card.total_grower_plan === 0) {
        return 0
      }

      return ((this.card.growers_attended_count / this.card.total_grower_plan) * 100).toFixed(2)
    },

    hectarePercentage () {
      if (this.card.total_hectare_plan === 0) {
        return 0
      }

      return ((this.card.total_actual_hectares / this.card.total_hectare_plan) * 100).toFixed(2)
    },

    salesPercentage () {
      if (this.card.total_sales_plan === 0) {
        return 0
      }

      return ((this.card.total_actual_sales / this.card.total_sales_plan) * 100).toFixed(2)
    },

    conversionPercentage () {
      if (this.card.growers_attended_count === 0) {
        return 0
      }

      return ((this.card.growers_bought_count / this.card.growers_attended_count) * 100).toFixed(2)
    }
  }
}
</script>
