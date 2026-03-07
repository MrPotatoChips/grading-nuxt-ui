<template>
  <VTable
    ref="tableAreas"
    :provider="tableProvider"
    :loading="tableAreas.loading"
    :columns="tableAreas.columns"
    :sorting="tableAreas.sorting"
    :filters="tableAreas.filters"
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
          @click="() => $emit('edit:area', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminAreas } from '@/services/admin'

export default {
  name: 'AdminAreaTable',

  emits: [
    'edit:area',
    'delete:area'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableAreas: {
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
          { id: 'area_code', meta: { label: 'Area Code' } },
          { id: 'area_name', meta: { label: 'Area Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableAreas.loading = true
      return SAdminAreas.get({
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
        this.tableAreas.loading = false
      })
    },

    clearFilters() {
      this.tableAreas.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableAreas
    }
  }
}
</script>
