<template>
  <VGrid
    ref="tableTasks"
    :provider="tableProvider"
    :loading="tableTasks.loading"
    :columns="tableTasks.columns"
    :sorting="tableTasks.sorting"
    :filters="tableTasks.filters"
    :limit-options="tableTasks.limitOptions"
    :ui="{
      pageGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }"
    @clear:filters="clearFilters"
  >
    <template #card="{ item }">
      <DGATaskEvent
        :card="item"
        class="shadow-md"
      >
        <template #footer>
          <div class="flex justify-end">
            <div class="flex gap-2">
              <UButton
                size="sm"
                variant="outline"
                color="neutral"
                @click="$emit('edit:taskEvent', item)"
              >
                Edit
              </UButton>
            </div>
          </div>
        </template>
      </DGATaskEvent>
    </template>
  </VGrid>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentTaskEvents } from '@/services/dg-agent'

import { dateFormatters } from '@/composables/date-formatters'

import DGATaskEvent from './components/DGATaskEvent.vue'

export default {
  name: 'AdminDocumentTypeTable',

  emits: [
    'edit:taskEvent',
    'delete:taskEvent'
  ],

  mixins: [
    TableUtils
  ],

  components: {
    DGATaskEvent
  },

  data () {
    return {
      dateFormatters,
      tableTasks: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: ''
        },
        limitOptions: [6, 12, 24, 48, 96],
        columns: []
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableTasks.loading = true
      return SDGAgentTaskEvents.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        task_id: this.$route.params.task || ''
      }).then(
        ({ data: { items, total_rows: totalRows } }) => ({
          items,
          totalRows
        })
      ).catch(
        () => ({
          items: [],
          totalRows: 0
        })
      ).finally(() => {
        this.tableTasks.loading = false
      })
    },

    clearFilters() {
      this.tableTasks.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableTasks
    }
  }
}
</script>
