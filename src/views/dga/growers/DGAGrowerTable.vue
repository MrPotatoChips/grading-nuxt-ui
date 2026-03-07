<template>
  <VTable
    ref="tableGrowers"
    :provider="tableProvider"
    :loading="tableGrowers.loading"
    :columns="tableGrowers.columns"
    :sorting="tableGrowers.sorting"
    :filters="tableGrowers.filters"
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
    <template #status-cell="{ row }">
      <div class="text-center">
        <UBadge
          variant="soft"
          :color="row.original.status === 'New' ? 'primary' : 'secondary'"
        >
          {{ row.original.status }}
        </UBadge>
      </div>
    </template>
    <template #actions-cell="{ row }">
      <div class="flex justify-center">
        <UButton
          size="sm"
          label="Manage"
          color="primary"
          :to="{
            name: 'dga.grower-managements',
            params: {
              grower: row.original.id
            }
          }"
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import { SDGAgentGrowers } from '@/services/dg-agent'

export default {
  name: 'DGAGrowerTable',

  emits: [
    'edit:grower',
    'delete:grower'
  ],

  mixins: [
    TableUtils
  ],

  data () {
    return {
      tableGrowers: {
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
          { id: 'first_name', meta: { label: 'Grower Name' }, cell: ({ row: { original } }) => `${original.first_name} ${original.last_name}`, enableSorting: true },
          { id: 'province.province_name', meta: { label: 'Province' } },
          { id: 'municipality.municipality_name', meta: { label: 'Municipality' } },
          { id: 'status', meta: { class: { th: 'text-center' } } }
        ].map(this.transformColumns)
      }
    }
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableGrowers.loading = true
      return SDGAgentGrowers.get({
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
        this.tableGrowers.loading = false
      })
    },

    clearFilters() {
      this.tableGrowers.filters = {
        search: ''
      }
    },

    tableApi () {
      return this.$refs.tableGrowers
    }
  }
}
</script>
