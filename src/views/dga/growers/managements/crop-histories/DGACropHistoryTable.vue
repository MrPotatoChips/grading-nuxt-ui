<template>
  <VTable
    ref="tableCropHistories"
    :provider="tableProvider"
    :loading="tableCropHistories.loading"
    :columns="tableCropHistories.columns"
    :sorting="tableCropHistories.sorting"
    :filters="tableCropHistories.filters"
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
          @click="() => $emit('edit:cropHistory', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentGrowerCropHistories } from '@/services/dg-agent'

export default {
  name: 'DGACropHistoryTable',

  emits: [
    'edit:cropHistory',
    'delete:cropHistory'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableCropHistories: {
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
          { id: 'crop_history_code', meta: { label: 'Grower Code' } },
          { id: 'crop_history_name', meta: { label: 'Grower Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableCropHistories.loading = true
      return SDGAgentGrowerCropHistories.get({
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
        this.tableCropHistories.loading = false
      })
    },

    clearFilters() {
      this.tableCropHistories.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableCropHistories
    }
  }
}
</script>
