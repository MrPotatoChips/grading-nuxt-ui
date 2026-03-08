<template>
  <VTable
    ref="tableSemesters"
    :provider="tableProvider"
    :loading="tableSemesters.loading"
    :columns="tableSemesters.columns"
    :sorting="tableSemesters.sorting"
    :filters="tableSemesters.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Year Levels"
      >
        <USelect
          v-model="tableSemesters.filters.year_level"
          value-key="id"
          label-key="year_name"
          :items="filterYearLevels"
          :loading="fetching.yearLevels"
          :disabled="fetching.yearLevels"
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
          @click="() => $emit('edit:semester', row.original)"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MYearLevels from '@/mixins/maintenances/year-levels'

import { SAdminSemesters } from '@/services/admin'

export default {
  name: 'AdminSemesterTable',

  emits: [
    'edit:semester',
    'delete:semester'
  ],

  mixins: [
    TableUtils,
    MYearLevels
  ],

  data () {
    return {
      tableSemesters: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          year_level: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'semester_code', meta: { label: 'Semester Code' }, enableSorting: true },
          { id: 'semester_name', meta: { label: 'Semester Name' }, enableSorting: true },
          { id: 'semester_start', meta: { label: 'Start Date' }, enableSorting: true },
          { id: 'semester_end', meta: { label: 'End Date' }, enableSorting: true },
          { id: 'year_level.year_name', meta: { label: 'Year Level' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterYearLevels () {
      return [
        { id: 'All', year_name: 'All' }
      ].concat(this.options.yearLevels)
    }
  },

  mounted () {
    this.getYearLevels(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableSemesters.loading = true
      return SAdminSemesters.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        year_level: filters.year_level
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
        this.tableSemesters.loading = false
      })
    },

    clearFilters() {
      this.tableSemesters.filters = {
        search: '',
        year_level: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableSemesters
    }
  }
}
</script>
