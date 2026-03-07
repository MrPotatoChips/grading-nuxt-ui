<template>
  <VTable
    ref="tableBarangays"
    :provider="tableProvider"
    :loading="tableBarangays.loading"
    :columns="tableBarangays.columns"
    :sorting="tableBarangays.sorting"
    :filters="tableBarangays.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Municipalities"
      >
        <USelect
          v-model="tableBarangays.filters.municipality"
          value-key="id"
          label-key="municipality_name"
          :items="filterMunicipalities"
          :loading="fetching.municipalities"
          :disabled="fetching.municipalities"
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
          @click="() => $emit('edit:barangay', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MMunicipalities from '@/mixins/locations/municipalities'

import { SAdminBarangays } from '@/services/admin'

export default {
  name: 'AdminBarangayTable',

  emits: [
    'edit:barangay',
    'delete:barangay'
  ],

  mixins: [
    TableUtils,
    MMunicipalities
  ],

  data () {
    return {
      tableBarangays: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          municipality: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'barangay_name', meta: { label: 'Barangay Name' }, enableSorting: true },
          { id: 'municipality.municipality_name',  meta: { label: 'Municipality' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterMunicipalities () {
      return [
        { id: 'All', municipality_name: 'All' }
      ].concat(this.options.municipalities)
    }
  },

  mounted () {
    this.getMunicipalities(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableBarangays.loading = true
      return SAdminBarangays.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        municipality_id: filters.municipality
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
        this.tableBarangays.loading = false
      })
    },

    clearFilters() {
      this.tableBarangays.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableBarangays
    }
  }
}
</script>
