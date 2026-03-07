<template>
  <VTable
    ref="tableRegions"
    :provider="tableProvider"
    :loading="tableRegions.loading"
    :columns="tableRegions.columns"
    :sorting="tableRegions.sorting"
    :filters="tableRegions.filters"
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
          @click="() => $emit('edit:region', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminRegions } from '@/services/admin'

export default {
  name: 'AdminRegionTable',

  emits: [
    'edit:region',
    'delete:region'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableRegions: {
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
          { id: 'region_code', meta: { label: 'Region Code' } },
          { id: 'region_name', meta: { label: 'Region Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableRegions.loading = true
      return SAdminRegions.get({
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
        this.tableRegions.loading = false
      })
    },

    clearFilters() {
      this.tableRegions.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableRegions
    }
  }
}
</script>
