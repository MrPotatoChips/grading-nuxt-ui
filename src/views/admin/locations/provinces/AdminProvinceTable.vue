<template>
  <VTable
    ref="tableProvinces"
    :provider="tableProvider"
    :loading="tableProvinces.loading"
    :columns="tableProvinces.columns"
    :sorting="tableProvinces.sorting"
    :filters="tableProvinces.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Regions"
      >
        <USelect
          v-model="tableProvinces.filters.region"
          value-key="id"
          label-key="region_name"
          :items="filterRegions"
          :loading="fetching.regions"
          :disabled="fetching.regions"
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
          @click="() => $emit('edit:province', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MRegions from '@/mixins/locations/regions'

import { SAdminProvinces } from '@/services/admin'

export default {
  name: 'AdminProvinceTable',

  emits: [
    'edit:province',
    'delete:province'
  ],

  mixins: [
    TableUtils,
    MRegions
  ],

  data () {
    return {
      tableProvinces: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          region: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'province_name', meta: { label: 'Province Name' }, enableSorting: true },
          { id: 'region.region_name',  meta: { label: 'Region' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterRegions () {
      return [
        { id: 'All', region_name: 'All' }
      ].concat(this.options.regions)
    }
  },

  mounted () {
    this.getRegions(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableProvinces.loading = true
      return SAdminProvinces.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        region_id: filters.region
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
        this.tableProvinces.loading = false
      })
    },

    clearFilters() {
      this.tableProvinces.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableProvinces
    }
  }
}
</script>
