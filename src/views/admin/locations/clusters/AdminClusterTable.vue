<template>
  <VTable
    ref="tableClusters"
    :provider="tableProvider"
    :loading="tableClusters.loading"
    :columns="tableClusters.columns"
    :sorting="tableClusters.sorting"
    :filters="tableClusters.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Areas"
      >
        <USelect
          v-model="tableClusters.filters.area"
          value-key="id"
          label-key="area_name"
          :items="filterAreas"
          :loading="fetching.areas"
          :disabled="fetching.areas"
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
          @click="() => $emit('edit:cluster', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MAreas from '@/mixins/locations/areas'

import { SAdminClusters } from '@/services/admin'

export default {
  name: 'AdminClusterTable',

  emits: [
    'edit:cluster',
    'delete:cluster'
  ],

  mixins: [
    TableUtils,
    MAreas
  ],

  data () {
    return {
      tableClusters: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          area: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'cluster_code', meta: { label: 'Cluster Code' } },
          { id: 'cluster_name', meta: { label: 'Cluster Name' }, enableSorting: true },
          { id: 'area.area_name',  meta: { label: 'Area' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterAreas () {
      return [
        { id: 'All', area_name: 'All' }
      ].concat(this.options.areas)
    }
  },

  mounted () {
    this.getAreas(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableClusters.loading = true
      return SAdminClusters.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        area_id: filters.area
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
        this.tableClusters.loading = false
      })
    },

    clearFilters() {
      this.tableClusters.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableClusters
    }
  }
}
</script>
