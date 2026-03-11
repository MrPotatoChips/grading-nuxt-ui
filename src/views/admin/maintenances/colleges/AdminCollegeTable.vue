<template>
  <VTable
    ref="tableColleges"
    :provider="tableProvider"
    :loading="tableColleges.loading"
    :columns="tableColleges.columns"
    :sorting="tableColleges.sorting"
    :filters="tableColleges.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Provinces"
      >
        <USelect
          v-model="tableColleges.filters.province"
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

      <UFormField
        label="Municipalities"
      >
        <USelect
          v-model="tableColleges.filters.municipality"
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

      <UFormField
        label="Barangays"
      >
        <USelect
          v-model="tableColleges.filters.barangay"
          value-key="id"
          label-key="barangay_name"
          :items="filterBarangays"
          :loading="fetching.barangays"
          :disabled="fetching.barangays"
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
          @click="() => $emit('edit:college', row.original)"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MProvinces from '@/mixins/locations/provinces'
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'

import { SAdminColleges } from '@/services/admin'

export default {
  name: 'AdminCollegeTable',

  emits: [
    'edit:college',
    'delete:college'
  ],

  mixins: [
    TableUtils,
    MProvinces,
    MMunicipalities,
    MBarangays
  ],

  data () {
    return {
      tableColleges: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          province: 'All',
          municipality: 'All',
          barangay: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'college_code', meta: { label: 'College Code' }, enableSorting: true },
          { id: 'college_name', meta: { label: 'College Name' }, enableSorting: true },
          { id: 'province.province_name', meta: { label: 'Province' }, enableSorting: true },
          { id: 'municipality.municipality_name', meta: { label: 'Municipality' }, enableSorting: true },
          { id: 'barangay.barangay_name', meta: { label: 'Barangay' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterProvinces () {
      return [
        { id: 'All', province_name: 'All' }
      ].concat(this.options.provinces)
    },

    filterMunicipalities () {
      return [
        { id: 'All', municipality_name: 'All' }
      ].concat(this.options.municipalities)
    },

    filterBarangays () {
      return [
        { id: 'All', barangay_name: 'All' }
      ].concat(this.options.barangays)
    }
  },

  mounted () {
    this.getProvinces(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableColleges.loading = true
      return SAdminColleges.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        province: filters.province,
        municipality: filters.municipality,
        barangay: filters.barangay
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
        this.tableColleges.loading = false
      })
    },

    clearFilters() {
      this.tableColleges.filters = {
        search: '',
        province: 'All',
        municipality: 'All',
        barangay: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableColleges
    }
  }
}
</script>
