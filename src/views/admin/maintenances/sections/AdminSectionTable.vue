<template>
  <VTable
    ref="tableSections"
    :provider="tableProvider"
    :loading="tableSections.loading"
    :columns="tableSections.columns"
    :sorting="tableSections.sorting"
    :filters="tableSections.filters"
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
          @click="() => $emit('edit:section', row.original)"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminSections } from '@/services/admin'

export default {
  name: 'AdminSectionTable',

  emits: [
    'edit:section',
    'delete:section'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableSections: {
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
          { id: 'section_code', meta: { label: 'Section Code' }, enableSorting: true },
          { id: 'section_name', meta: { label: 'Section Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableSections.loading = true
      return SAdminSections.get({
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
        this.tableSections.loading = false
      })
    },

    clearFilters() {
      this.tableSections.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableSections
    }
  }
}
</script>
