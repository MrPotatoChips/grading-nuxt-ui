<template>
  <VTable
    ref="tableYearLevels"
    :provider="tableProvider"
    :loading="tableYearLevels.loading"
    :columns="tableYearLevels.columns"
    :sorting="tableYearLevels.sorting"
    :filters="tableYearLevels.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Courses"
      >
        <USelect
          v-model="tableYearLevels.filters.course"
          value-key="id"
          label-key="course_name"
          :items="filterCourses"
          :loading="fetching.courses"
          :disabled="fetching.courses"
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
          @click="() => $emit('edit:year-level', row.original)"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MCourses from '@/mixins/maintenances/courses'

import { SAdminYearLevels } from '@/services/admin'

export default {
  name: 'AdminYearLevelTable',

  emits: [
    'edit:year-level',
    'delete:year-level'
  ],

  mixins: [
    TableUtils,
    MCourses
  ],

  data () {
    return {
      tableYearLevels: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          course: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'year_name', meta: { label: 'Year Name' }, enableSorting: true },
          { id: 'course.course_name', meta: { label: 'Course' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterCourses () {
      return [
        { id: 'All', course_name: 'All' }
      ].concat(this.options.courses)
    }
  },

  mounted () {
    this.getCourses(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableYearLevels.loading = true
      return SAdminYearLevels.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        course: filters.course
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
        this.tableYearLevels.loading = false
      })
    },

    clearFilters() {
      this.tableYearLevels.filters = {
        search: '',
        course: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableYearLevels
    }
  }
}
</script>
