<template>
  <VTable
    ref="tableInteractions"
    :provider="tableProvider"
    :loading="tableInteractions.loading"
    :columns="tableInteractions.columns"
    :sorting="tableInteractions.sorting"
    :filters="tableInteractions.filters"
    @clear:filters="clearFilters"
  >
    <template #select-cell="{ row }">
      <UCheckbox
        size="xl"
        :model-value="row.getIsSelected()"
        :disabled="!row.getCanSelect()"
        @change="() => row.toggleSelected()"
      />
    </template>
    <template #actions-cell="{ row }">
      <div class="flex justify-center">
        <UButton
          size="sm"
          label="Edit"
          color="primary"
          @click="() => $emit('edit:interaction', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentGrowerInteractions } from '@/services/dg-agent'

export default {
  name: 'DGAInteractionTable',

  emits: [
    'edit:interaction',
    'delete:interaction'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableInteractions: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: ''
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'interaction_date', meta: { label: 'Interaction Date' }, enableSorting: true },
          { id: 'activity.activity_name', meta: { label: 'Activity' } },
          { id: 'user', meta: { label: 'Agent' }, cell: ({ row: { original } }) => `${original.user.first_name} ${original.user.last_name}` }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableInteractions.loading = true
      return SDGAgentGrowerInteractions.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        grower_id: this.$route.params.grower || ''
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
        this.tableInteractions.loading = false
      })
    },

    clearFilters() {
      this.tableInteractions.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableInteractions
    }
  }
}
</script>
