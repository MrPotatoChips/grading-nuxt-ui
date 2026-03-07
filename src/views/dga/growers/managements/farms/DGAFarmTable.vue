<template>
  <VTable
    ref="tableFarms"
    :provider="tableProvider"
    :loading="tableFarms.loading"
    :columns="tableFarms.columns"
    :sorting="tableFarms.sorting"
    :filters="tableFarms.filters"
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
          @click="() => $emit('edit:farm', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentGrowerFarms } from '@/services/dg-agent'

export default {
  name: 'DGAFarmTable',

  emits: [
    'edit:farm',
    'delete:farm'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableFarms: {
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
          { id: 'farm_code', meta: { label: 'Grower Code' } },
          { id: 'farm_name', meta: { label: 'Grower Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableFarms.loading = true
      return SDGAgentGrowerFarms.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search
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
        this.tableFarms.loading = false
      })
    },

    clearFilters() {
      this.tableFarms.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableFarms
    }
  }
}
</script>
