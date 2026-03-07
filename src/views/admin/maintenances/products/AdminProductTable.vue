<template>
  <VTable
    ref="tableProducts"
    :provider="tableProvider"
    :loading="tableProducts.loading"
    :columns="tableProducts.columns"
    :sorting="tableProducts.sorting"
    :filters="tableProducts.filters"
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
          @click="() => $emit('edit:product', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminProducts } from '@/services/admin'

export default {
  name: 'AdminProductTable',

  emits: [
    'edit:product',
    'delete:product'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableProducts: {
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
          { id: 'product_code', meta: { label: 'Code' } },
          { id: 'product_name', meta: { label: 'Name' }, enableSorting: true },
          { id: 'product_category.category_name', meta: { label: 'Category' }, enableSorting: true },
          { id: 'valid', meta: { label: 'Valid', class: { td: 'text-center', th: 'text-center' } } }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableProducts.loading = true
      return SAdminProducts.get({
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
        this.tableProducts.loading = false
      })
    },

    clearFilters() {
      this.tableProducts.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableProducts
    }
  }
}
</script>
