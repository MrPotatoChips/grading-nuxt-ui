<template>
  <VGrid
    ref="tableTasks"
    :provider="tableProvider"
    :loading="tableTasks.loading"
    :columns="tableTasks.columns"
    :sorting="tableTasks.sorting"
    :filters="tableTasks.filters"
    :enable-pagination="tableTasks.enablePagination"
    :limit-options="tableTasks.limitOptions"
    @clear:filters="clearFilters"
  >
    <template #card="{ item }">
      <DGATask
        :card="item"
        class="shadow-md"
      >
        <template #footer>
          <div class="flex justify-between">
            <div>
              <span class="text-sm font-bold text-shadow-warning">
                <UBadge
                  variant="soft"
                  color="neutral"
                >
                  {{ dateFormatters.toMonthShort(item.schedule) }}
                </UBadge>
              </span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="sm"
                @click.prevent="() => $emit('edit:task', item)"
              >
                Record Event
              </UButton>
              <UButton
                size="sm"
                variant="outline"
                color="neutral"
                :to="{
                  name: 'dga.task-events',
                  params: {
                    task: item.id
                  }
                }"
              >
                View Details <UIcon name="i-lucide-arrow-right" />
              </UButton>
            </div>
          </div>
        </template>
      </DGATask>
    </template>
  </VGrid>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentTasks } from '@/services/dg-agent'

import { dateFormatters } from '@/composables/date-formatters'

import DGATask from './components/DGATask.vue'

export default {
  name: 'AdminDocumentTypeTable',

  emits: [
    'edit:task',
    'delete:task'
  ],

  mixins: [
    TableUtils
  ],

  components: {
    DGATask
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
        enablePagination: false,
        limitOptions: [6, 12, 24, 48, 96],
        columns: []
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableTasks.loading = true
      return SDGAgentTasks.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search
      }).then(
        ({ data: items }) => ({
          items,
          totalRows: items.length
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
