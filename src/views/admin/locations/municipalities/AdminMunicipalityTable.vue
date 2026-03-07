<template>
  <VTable
    ref="tableMunicipalities"
    :provider="tableProvider"
    :loading="tableMunicipalities.loading"
    :columns="tableMunicipalities.columns"
    :sorting="tableMunicipalities.sorting"
    :filters="tableMunicipalities.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Provinces"
      >
        <USelect
          v-model="tableMunicipalities.filters.province"
          value-key="id"
          label-key="province_name"
          :items="filterProvinces"
          :loading="fetching.provinces"
          :disabled="fetching.provinces"
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
          @click="() => $emit('edit:municipality', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MProvinces from '@/mixins/locations/provinces'

import { SAdminMunicipalities } from '@/services/admin'

export default {
  name: 'AdminMunicipalityTable',

  emits: [
    'edit:municipality',
    'delete:municipality'
  ],

  mixins: [
    TableUtils,
    MProvinces
  ],

  data () {
    return {
      tableMunicipalities: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          province: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'municipality_name', meta: { label: 'Municipality Name' }, enableSorting: true },
          { id: 'province.province_name',  meta: { label: 'Province' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterProvinces () {
      return [
        { id: 'All', province_name: 'All' }
      ].concat(this.options.provinces)
    }
  },

  mounted () {
    this.getProvinces(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableMunicipalities.loading = true
      return SAdminMunicipalities.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        province_id: filters.province
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
        this.tableMunicipalities.loading = false
      })
    },

    clearFilters() {
      this.tableMunicipalities.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableMunicipalities
    }
  }
}
</script>
