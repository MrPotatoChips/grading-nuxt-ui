<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <UCard
      class="mb-4 shadow-md"
    >
      <section class="flex justify-start gap-2 mb-2">
        <UInput
          ref="filterSearch"
          v-model="filterModelSearch"
          class="max-w-full md:min-w-[40ch] w-full"
          placeholder="Search here . . ."
        >
          <template #trailing>
            <div class="flex gap-0.5 items-center">
              <UButton
                v-if="filterModelSearch.length"
                color="error"
                variant="link"
                size="xs"
                icon="i-lucide-circle-x"
                aria-label="Clear input"
                @click.prevent="() => filterModelSearch = ''"
              />
              <UKbd value="Ctrl" />
              <UKbd value="F" />
            </div>
          </template>
        </UInput>
        <USlideover
          v-if="$slots?.filters"
          title="Table Filters"
          description="Table filters"
          :ui="{
            description: 'hidden',
            content: 'max-w-[300px]'
          }"
        >
          <template #body>
            <slot name="filters" />
          </template>
          <template #footer="{ close }">
            <UButton
              size="sm"
              color="error"
              @click.prevent="$emit('clear:filters')"
            >
              Clear Filters
            </UButton>
            <UButton
              size="sm"
              color="neutral"
              variant="outline"
              @click.prevent="close"
            >
              Close
            </UButton>
          </template>
          <UButton
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-filter"
            aria-label="Columns select filters"
          />
        </USlideover>
      </section>
    </UCard>

    <template
      v-if="config.loading"
    >
      <div class="flex flex-col items-center justify-center w-full py-12 bg-default ring-1 ring-default rounded-lg min-h-64">
        <UIcon name="i-lucide-hard-drive-download" class="size-9 animate-bounce mx-0 px-0" />
        <p class="text-center text-[14px]">
          Loading Grid Items
        </p>
      </div>
    </template>

    <UPageGrid
      v-else-if="config.items.length"
      :class="[
        'mb-4 gap-4',
        ui?.pageGrid
      ]"
    >
      <template
        v-for="(item, index) in config.items"
        :key="index"
      >
        <slot v-bind="{ item, index }" name="card" />
      </template>
    </UPageGrid>

    <template
      v-else
    >
      <div class="flex flex-col items-center justify-center w-full py-12 bg-white ring-1 ring-default rounded-lg">
        <UIcon
          name="i-lucide-inbox"
          class="text-default-400 mb-4 size-9"
        />
        <p class="text-center text-default-500">
          No data available
        </p>
      </div>
    </template>

    <div
      v-if="enablePagination"
      class="flex flex-col md:flex-row justify-between items-center border-t border-default pt-4 gap-2"
    >
      <UFormField
        label="Show"
        orientation="horizontal"
      >
        <USelect
          v-model:model-value="config.pagination.pageSize"
          :items="config.limitOptions"
          @update:model-value="() => config.pagination.pageIndex = 0"
        />
        out of {{ config.totalRows }} rows
      </UFormField>

      <UPagination
        active-color="primary"
        active-variant="subtle"
        :items-per-page="config.pagination.pageSize"
        :total="config.totalRows"
        @update:page="currentPage => config.pagination.pageIndex = currentPage - 1"
      />
    </div>

  </UContainer>
</template>
<script setup>
import { useTemplateRef, onMounted, watch, computed, reactive, ref } from 'vue'
import { defineShortcuts } from '@nuxt/ui/composables/defineShortcuts'
import { refDebounced } from '@vueuse/core'
import { find } from 'lodash'

// const cards = ref([
//   {
//     title: 'Icons',
//     description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
//     icon: 'i-lucide-smile',
//     to: '/docs/getting-started/integrations/icons'
//   },
//   {
//     title: 'Fonts',
//     description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
//     icon: 'i-lucide-a-large-small',
//     to: '/docs/getting-started/integrations/fonts'
//   },
//   {
//     title: 'Color Mode',
//     description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
//     icon: 'i-lucide-sun-moon',
//     to: '/docs/getting-started/integrations/color-mode'
//   }
// ])

defineEmits([
  'clear:filters'
])

defineOptions({
  name: 'VTable'
})

const props = defineProps({
  ui: {
    type: Object,
    default: () => ({})
  },
  enablePagination: {
    type: Boolean,
    default: () => true
  },
  columns: {
    type: Array,
    default: () => []
  },
  provider: {
    required: true,
    type: [Object, Function],
    default: () => ({ items: [], totalRows: 0 })
  },
  filters: {
    type: Object,
    default: () => ({ search: '' })
  },
  loading: {
    type: Boolean,
    default: false
  },
  sorting: {
    type: Object,
    default: () => ({ id: 'id', desc: false })
  },
  limitOptions: {
    type: Array,
    default: () => ([6, 12, 24, 48, 96])
  }
})

const config = reactive({
  pagination: {
    pageIndex: 0, // current page
    pageSize: 6, // rows per page
  },
  filters: props.filters,
  sorting: [props.sorting],
  columns: props.columns,
  totalRows: 0,
  limitOptions: props.limitOptions,
  loading: false,
  items: []
})

// const customTable = useTemplateRef('customTable')
const filterRefSearch = useTemplateRef('filterSearch')

const filterModelSearch = ref('')
const debounceFilterSearch = refDebounced(filterModelSearch, 1000)

const isPromise = value => value instanceof Promise
const isFunction = value => value instanceof Function

const hasProvider = computed(() => isFunction(props.provider))
watch(() => [
  props.loading,
  props.filters,
  props.limitOptions
], ([isLoading, filters, limitOptions]) => {
  config.loading = isLoading
  config.filters = filters
  config.limitOptions = limitOptions
}, { deep: true })

watch(() => [
  config.pagination.pageIndex,
  config.pagination.pageSize,
  config.sorting,
  config.filters,
  debounceFilterSearch.value
], async () => {
  if (hasProvider.value) {
    config.totalRows = 0
    config.items = []

    const items = props.provider({
      sort: config.sorting[0]?.id,
      sortDesc: config.sorting[0]?.desc,
      perPage: config.pagination.pageSize,
      currentPage: config.pagination.pageIndex + 1,
      filters: {
        ...config.filters,
        search: debounceFilterSearch.value
      }
    })

    if (isPromise(items)) {
      items.then(({ items, totalRows }) => {
        config.totalRows = totalRows || 0
        config.items = items || []
      })
    } else {
      config.totalRows = items.totalRows || 0
      config.items = items.items || []
    }
  }
}, { deep: true })

const refresh = () => {
  if (hasProvider.value) {
    const items = props.provider({
      sort: config.sorting[0]?.id,
      sortDesc: config.sorting[0]?.desc,
      perPage: config.pagination.pageSize,
      currentPage: config.pagination.pageIndex + 1,
      filters: {
        ...config.filters,
        search: debounceFilterSearch.value
      }
    })

    if (isPromise(items)) {
      items.then(({ items, totalRows }) => {
        config.totalRows = totalRows || 0
        config.items = items || []
      })
    } else {
      config.totalRows = items.totalRows || 0
      config.items = items.items || []
    }
  } else {
    config.items = props.items.items || []
    config.totalRows = props.items.totalRows || 0
  }
}

const updateRow = (payload = {}, whereClause = {}) => {
  if (config.items) {
    const payloadID = { id: payload.id }
    const hasWhereClause = Object.keys(whereClause).length > 0
    const finalWhereClause = hasWhereClause ? Object.assign(whereClause, payloadID) : payloadID

    const tableRow = find(config.items, finalWhereClause)

    if (tableRow) {
      Object.assign(tableRow, payload)
    }

    return tableRow
  }

  return {}
}

onMounted(async () => {
  refresh()
})

defineShortcuts({
  'meta_shift_a': () => {
    // customTable.value.tableApi.toggleAllPageRowsSelected(!customTable.value.tableApi.getIsAllPageRowsSelected())
  },
  'meta_f': () => filterRefSearch.value.inputRef.focus()
})

defineExpose({
  refresh,
  updateRow
})
</script>
