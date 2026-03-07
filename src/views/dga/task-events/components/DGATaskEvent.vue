<template>
  <UCard
    :ui="{
      header: 'p-4 sm:p-4',
      body: 'p-4 sm:p-4 border-b-0',
      footer: 'p-4 sm:p-4',
    }"
  >
    <template #header>
      <div class="text-sm">
        <b>{{ card.barangay?.barangay_name }}</b>, <b>{{ card.municipality?.municipality_name }}</b>, <b>{{ card.province?.province_name }}</b>
      </div>
      <div class="text-xs">{{ dateFormatters.toDateTimeShort(card.created_at) }}</div>
    </template>

    <div class="flex flex-col gap-2 mb-2">
      <div class="text-xs truncate">Remarks/Concerns during the said Event, Remarks/Concerns during the said EventRemarks/Concerns during the said EventRemarks/Concerns during the said EventRemarks/Concerns during the said Event</div>
    </div>

    <div class="grid grid-cols-3 gap-1">
      <div
        class="col-span-3 min-h-35 sm:min-h-25 max-h-35 flex justify-center bg-center bg-no-repeat bg-cover"
        style="background-image: url('https://avatars.githubusercontent.com/u/103509771?v=4');"
      />
      <div
        class="col-span-1 min-h-35 sm:min-h-25 max-h-35 flex justify-center bg-center bg-no-repeat bg-cover"
        style="background-image: url('https://avatars.githubusercontent.com/u/103509772?v=4');"
      />
      <div
        class="col-span-1 min-h-35 sm:min-h-25 max-h-35 flex justify-center bg-center bg-no-repeat bg-cover"
        style="background-image: url('https://avatars.githubusercontent.com/u/103509773?v=4');"
      />
      <div
        class="col-span-1 min-h-35 sm:min-h-25 max-h-35 flex justify-center bg-center bg-no-repeat bg-cover"
        style="background-image: url('https://avatars.githubusercontent.com/u/103509774?v=4');"
      />
    </div>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
<script>
import { dateFormatters } from '@/composables/date-formatters'

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

  data () {
    return {
      dateFormatters
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
