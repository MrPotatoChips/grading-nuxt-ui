<template>
  <VTable
    ref="tableDocuments"
    :provider="tableProvider"
    :loading="tableDocuments.loading"
    :columns="tableDocuments.columns"
    :sorting="tableDocuments.sorting"
    :filters="tableDocuments.filters"
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
          @click="() => $emit('edit:growerDocument', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentGrowerDocuments } from '@/services/dg-agent'

export default {
  name: 'DGADocumentTable',

  emits: [
    'edit:growerDocument',
    'delete:growerDocument'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableDocuments: {
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
          { id: 'grower_document_code', meta: { label: 'Grower Code' } },
          { id: 'grower_document_name', meta: { label: 'Grower Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableDocuments.loading = true
      return SDGAgentGrowerDocuments.get({
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
        this.tableDocuments.loading = false
      })
    },

    clearFilters() {
      this.tableDocuments.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableDocuments
    }
  }
}
</script>
