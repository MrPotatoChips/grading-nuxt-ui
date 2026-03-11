<template>
  <VTable
    ref="tableSubjects"
    :provider="tableProvider"
    :loading="tableSubjects.loading"
    :columns="tableSubjects.columns"
    :sorting="tableSubjects.sorting"
    :filters="tableSubjects.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Semesters"
      >
        <USelect
          v-model="tableSubjects.filters.semester"
          value-key="id"
          label-key="semester_name"
          :items="filterSemesters"
          :loading="fetching.semesters"
          :disabled="fetching.semesters"
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
          @click="() => $emit('edit:subject', row.original)"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MSemesters from '@/mixins/maintenances/semesters'

import { SAdminSubjects } from '@/services/admin'

export default {
  name: 'AdminSubjectTable',

  emits: [
    'edit:subject',
    'delete:subject'
  ],

  mixins: [
    TableUtils,
    MSemesters
  ],

  data () {
    return {
      tableSubjects: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          semester: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'subject_code', meta: { label: 'Subject Code' }, enableSorting: true },
          { id: 'subject_name', meta: { label: 'Subject Name' }, enableSorting: true },
          { id: 'semester.semester_name', meta: { label: 'Semester' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterSemesters () {
      return [
        { id: 'All', semester_name: 'All' }
      ].concat(this.options.semesters)
    }
  },

  mounted () {
    this.getSemesters(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableSubjects.loading = true
      return SAdminSubjects.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        semester: filters.semester
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
        this.tableSubjects.loading = false
      })
    },

    clearFilters() {
      this.tableSubjects.filters = {
        search: '',
        semester: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableSubjects
    }
  }
}
</script>
