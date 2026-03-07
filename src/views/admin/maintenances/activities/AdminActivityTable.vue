<template>
  <VTable
    ref="tableActivities"
    :provider="tableProvider"
    :loading="tableActivities.loading"
    :columns="tableActivities.columns"
    :sorting="tableActivities.sorting"
    :filters="tableActivities.filters"
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
          @click="() => $emit('edit:activity', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SAdminActivities } from '@/services/admin'

export default {
  name: 'AdminActivityTable',

  emits: [
    'edit:activity',
    'delete:activity'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableActivities: {
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
          { id: 'activity_type', meta: { label: 'Type' } },
          { id: 'activity_code', meta: { label: 'Activity Code' } },
          { id: 'activity_name', meta: { label: 'Activity Name' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableActivities.loading = true
      return SAdminActivities.get({
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
        this.tableActivities.loading = false
      })
    },

    clearFilters() {
      this.tableActivities.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableActivities
    }
  }
}
</script>
