<template>
  <VTable
    ref="tableGrowers"
    :provider="tableProvider"
    :loading="tableGrowers.loading"
    :columns="tableGrowers.columns"
    :sorting="tableGrowers.sorting"
    :filters="tableGrowers.filters"
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
          @click="() => $emit('edit:grower', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminGrowers } from '@/services/admin'

export default {
  name: 'AdminGrowerTable',

  emits: [
    'edit:grower',
    'delete:grower'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableGrowers: {
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
          { id: 'status', meta: { label: 'Status' }, enableSorting: true },
          { id: 'first_name', meta: { label: 'First Name' }, enableSorting: true },
          { id: 'middle_name', meta: { label: 'Middle Name' } },
          { id: 'last_name', meta: { label: 'Last Name' }, enableSorting: true },
          { id: 'email', meta: { label: 'Email' } },
          { id: 'mobile_number', meta: { label: 'Mobile Number' } },
          { id: 'address', meta: { label: 'Address' } }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableGrowers.loading = true
      return SAdminGrowers.get({
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
        this.tableGrowers.loading = false
      })
    },

    clearFilters() {
      this.tableGrowers.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableGrowers
    }
  }
}
</script>
