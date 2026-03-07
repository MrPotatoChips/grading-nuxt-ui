<template>
  <VTable
    ref="tableProductCategories"
    :provider="tableProvider"
    :loading="tableProductCategories.loading"
    :columns="tableProductCategories.columns"
    :sorting="tableProductCategories.sorting"
    :filters="tableProductCategories.filters"
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
          @click="() => $emit('edit:productCategory', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminProductCategories } from '@/services/admin'

export default {
  name: 'AdminProductCategoryTable',

  emits: [
    'edit:productCategory',
    'delete:productCategory'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableProductCategories: {
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
          { id: 'category_code', meta: { label: 'Code' } },
          { id: 'category_name', meta: { label: 'Name' }, enableSorting: true },
          { id: 'product_group.group_name', meta: { label: 'Group' }, enableSorting: true },
          { id: 'valid', meta: { label: 'Valid', class: { td: 'text-center', th: 'text-center' } } }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableProductCategories.loading = true
      return SAdminProductCategories.get({
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
        this.tableProductCategories.loading = false
      })
    },

    clearFilters() {
      this.tableProductCategories.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableProductCategories
    }
  }
}
</script>
