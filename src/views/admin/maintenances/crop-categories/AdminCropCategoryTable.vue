<template>
  <VTable
    ref="tableCropCategories"
    :provider="tableProvider"
    :loading="tableCropCategories.loading"
    :columns="tableCropCategories.columns"
    :sorting="tableCropCategories.sorting"
    :filters="tableCropCategories.filters"
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
          @click="() => $emit('edit:crop-category', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminCropCategories } from '@/services/admin'

export default {
  name: 'AdminCropCategoryTable',

  emits: [
    'edit:crop-category',
    'delete:crop-category'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableCropCategories: {
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
          { id: 'category_code', meta: { label: 'Category Code' } },
          { id: 'category_name', meta: { label: 'Category Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableCropCategories.loading = true
      return SAdminCropCategories.get({
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
        this.tableCropCategories.loading = false
      })
    },

    clearFilters() {
      this.tableCropCategories.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableCropCategories
    }
  }
}
</script>
