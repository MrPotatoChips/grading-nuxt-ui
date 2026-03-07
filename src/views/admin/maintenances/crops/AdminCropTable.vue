<template>
  <VTable
    ref="tableCrops"
    :provider="tableProvider"
    :loading="tableCrops.loading"
    :columns="tableCrops.columns"
    :sorting="tableCrops.sorting"
    :filters="tableCrops.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Crop Categories"
      >
        <USelect
          v-model="tableCrops.filters.crop_category"
          value-key="id"
          label-key="category_name"
          :items="filterCropCategories"
          :loading="fetching.cropCategories"
          :disabled="fetching.cropCategories"
          :ui="{ content: 'md:min-w-fit wrap-break-word' }"
          placeholder="filter here"
          class="w-full"
        />
      </UFormField>
    </template>
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
          @click="() => $emit('edit:crop', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MCropCategories from '@/mixins/maintenances/crop-categories'

import { SAdminCrops } from '@/services/admin'

export default {
  name: 'AdminCropTable',

  emits: [
    'edit:crop',
    'delete:crop'
  ],

  mixins: [
    TableUtils,
    MCropCategories
  ],

  data () {
    return {
      tableCrops: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          crop_category: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'crop_code', meta: { label: 'Crop Code' } },
          { id: 'crop_name', meta: { label: 'Crop Name' }, enableSorting: true },
          { id: 'crop_category.category_name',  meta: { label: 'Category' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterCropCategories () {
      return [
        { id: 'All', category_name: 'All' }
      ].concat(this.options.cropCategories)
    }
  },

  mounted () {
    this.getCropCategories(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableCrops.loading = true
      return SAdminCrops.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        crop_category_id: filters.crop_category
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
        this.tableCrops.loading = false
      })
    },

    clearFilters() {
      this.tableCrops.filters = {
        search: '',
        crop_category: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableCrops
    }
  }
}
</script>
