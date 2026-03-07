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
          class="w-full"
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
                @click="filterModelSearch = ''"
              />
              <UKbd value="Ctrl" />
              <UKbd value="F" />
            </div>
          </template>
        </UInput>
        <UDropdownMenu
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8
          }"
          :ui="{
            content: 'w-65'
          }"
          :items="[
            {
              label: 'Show Columns',
              type: 'label'
            }
          ].concat(
            customTable?.tableApi?.getAllColumns().filter(
              column => column.getCanHide()
            ).map(
              column => ({
                label: column.columnDef.meta.label,
                type: 'checkbox',
                checked: column.getIsVisible(),
                onUpdateChecked(checked) {
                  customTable?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e) {
                  e?.preventDefault()
                }
              })
            )
          )"
        >
          <UButton
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-settings-2"
            aria-label="Columns select dropdown"
          />
        </UDropdownMenu>
        <USlideover
          v-if="$slots?.filters"
          title="Table Filters"
          description="Table filters"
          :ui="{
            description: 'hidden',
            content: 'max-w-75'
          }"
        >
          <template #body>
            <slot name="filters" />
          </template>
          <template #footer="{ close }">
            <UButton
              size="sm"
              color="error"
              @click.prevent="() => $emit('clear:filters')"
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

    <UCard
      class="mb-4 shadow-md"
    >
      <UTable
        ref="customTable"
        loading-color="primary"
        loading-animation="carousel"
        v-model:pagination="config.pagination"
        v-model:sorting="config.sorting"
        :data="config.items"
        :loading="config.loading"
        :columns="config.columns"
        :pagination-options="{
          manualPagination: true,
          autoResetPageIndex: false
        }"
        :sorting-options="{
          manualSorting: true
        }"
        :global-filter-options="{
          enableGlobalFilter: true
        }"
        :initial-state="{
          pagination: config.pagination,
          sorting: config.sorting
        }"
        sticky
      >
        <template #loading>
          <div class="flex flex-col justify-center items-center gap-4 py-8">
            <UIcon name="i-lucide-hard-drive-download" class="size-8 animate-bounce mx-0 px-0" />
            <div class="text-[14px]">Loading Table Items</div>
          </div>
        </template>

        <template
          v-for="(_slotCallback, slotName) in $slots"
          #[slotName]="slotProperties"
        >
          <slot
            v-if="slotName !== 'filters'"
            :name="slotName"
            v-bind="slotProperties"
          />
        </template>
      </UTable>
    </UCard>

    <div
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

      <UScrollArea
        orientation="horizontal"
      >
        <UPagination
          show-edges
          active-color="primary"
          active-variant="subtle"
          :sibling-count="0"
          :total="config.totalRows"
          :items-per-page="config.pagination.pageSize"
          @update:page="currentPage => config.pagination.pageIndex = currentPage - 1"
        />
      </UScrollArea>
    </div>
  </UContainer>
</template>
<script setup>
import { useTemplateRef, watch, computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { defineShortcuts } from '@nuxt/ui/composables/defineShortcuts'
import { refDebounced } from '@vueuse/core'
import { find } from 'lodash'

defineEmits([
  'clear:filters'
])

defineOptions({
  name: 'VTable'
})

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
    required: true
  },
  provider: {
    type: [Object, Function],
    default: () => ({ items: [], totalRows: 0 }),
    required: true
  },
  filters: {
    type: Object,
    default: () => ({ search: '' }),
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  sorting: {
    type: Object,
    default: () => ({ id: 'id', desc: false }),
    required: true
  },
  limitOptions: {
    type: Array,
    default: () => ([5, 10, 25, 50, 100])
  }
})

const config = reactive({
  pagination: {
    pageIndex: 0, // current page
    pageSize: 5, // rows per page
  },
  filters: props.filters,
  sorting: [props.sorting],
  columns: props.columns,
  totalRows: 0,
  limitOptions: props.limitOptions,
  loading: false,
  items: []
})

const customTable = useTemplateRef('customTable')
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
  if (hasProvider.value && !config.loading) {
    config.totalRows = 0
    config.items = []

    const providerResults = props.provider({
      sort: config.sorting[0]?.id,
      sortDesc: config.sorting[0]?.desc,
      perPage: config.pagination.pageSize,
      currentPage: config.pagination.pageIndex + 1,
      filters: {
        ...config.filters,
        search: debounceFilterSearch.value
      }
    })

    if (isPromise(providerResults)) {
      providerResults.then(
        providerResult => {
          config.totalRows = Number(providerResult?.totalRows || 0)
          config.items = providerResult?.items || []
        }
      )
    } else {
      config.totalRows = Number(providerResults?.totalRows || 0)
      config.items = providerResults?.items || []
    }
  }
}, { deep: true })

const refresh = () => {
  if (hasProvider.value && !config.loading) {
    const providerResults = props.provider({
      sort: config.sorting[0]?.id,
      sortDesc: config.sorting[0]?.desc,
      perPage: config.pagination.pageSize,
      currentPage: config.pagination.pageIndex + 1,
      filters: {
        ...config.filters,
        search: debounceFilterSearch.value
      }
    })

    if (isPromise(providerResults)) {
      providerResults.then(
        providerResult => {
          config.totalRows = Number(providerResult?.totalRows || 0)
          config.items = providerResult?.items || []
        }
      )
    } else {
      config.totalRows = Number(providerResults?.totalRows || 0)
      config.items = providerResults?.items || []
    }
  } else {
    config.items = props.items || []
    config.totalRows = props.totalRows || 0
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
  if (customTable.value) {
    refresh()
  }
})

onUnmounted(() => {
  config.loading = false
})

defineShortcuts({
  'meta_shift_a': () => {
    customTable.value.tableApi.toggleAllPageRowsSelected(!customTable.value.tableApi.getIsAllPageRowsSelected())
  },
  'meta_f': () => filterRefSearch.value.inputRef.focus()
})

defineExpose({
  refresh,
  updateRow
})
</script>
