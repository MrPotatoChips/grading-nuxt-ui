<template>
  <VTable
    ref="tableDocumentTypes"
    :provider="tableProvider"
    :loading="tableDocumentTypes.loading"
    :columns="tableDocumentTypes.columns"
    :sorting="tableDocumentTypes.sorting"
    :filters="tableDocumentTypes.filters"
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
          @click="() => $emit('edit:documentType', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminDocumentTypes } from '@/services/admin'

export default {
  name: 'AdminDocumentTypeTable',

  emits: [
    'edit:documentType',
    'delete:documentType'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableDocumentTypes: {
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
          { id: 'document_type_code', meta: { label: 'Code' } },
          { id: 'document_type_name', meta: { label: 'Name' }, enableSorting: true },
          { id: 'document_type_category', meta: { label: 'Category' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableDocumentTypes.loading = true
      return SAdminDocumentTypes.get({
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
        this.tableDocumentTypes.loading = false
      })
    },

    clearFilters() {
      this.tableDocumentTypes.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableDocumentTypes
    }
  }
}
</script>
