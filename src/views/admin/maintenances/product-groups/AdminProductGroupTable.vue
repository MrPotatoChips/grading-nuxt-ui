<template>
  <VTable
    ref="tableProductGroups"
    :provider="tableProvider"
    :loading="tableProductGroups.loading"
    :columns="tableProductGroups.columns"
    :sorting="tableProductGroups.sorting"
    :filters="tableProductGroups.filters"
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
          @click="() => $emit('edit:productGroup', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminProductGroups } from '@/services/admin'

export default {
  name: 'AdminProductGroupTable',

  emits: [
    'edit:productGroup',
    'delete:productGroup'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableProductGroups: {
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
          { id: 'group_code', meta: { label: 'Group Code' } },
          { id: 'group_name', meta: { label: 'Group Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableProductGroups.loading = true
      return SAdminProductGroups.get({
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
        this.tableProductGroups.loading = false
      })
    },

    clearFilters() {
      this.tableProductGroups.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableProductGroups
    }
  }
}
</script>
