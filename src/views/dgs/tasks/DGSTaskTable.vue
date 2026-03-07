<template>
  <VTable
    ref="tableTasks"
    :provider="tableProvider"
    :loading="tableTasks.loading"
    :columns="tableTasks.columns"
    :sorting="tableTasks.sorting"
    :filters="tableTasks.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField label="User">
        <USelect
          v-model="tableTasks.filters.agent"
          value-key="id"
          label-key="agent_name"
          :items="filterDGAgents"
          :loading="fetching.dgAgents"
          :disabled="fetching.dgAgents"
          :ui="{ content: 'md:min-w-fit wrap-break-word' }"
          placeholder="filter by user"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Activity">
        <USelect
          v-model="tableTasks.filters.activity"
          value-key="id"
          label-key="activity_name"
          :items="filterActivities"
          :loading="fetching.activities"
          :disabled="fetching.activities"
          :ui="{ content: 'md:min-w-fit wrap-break-word' }"
          placeholder="filter by activity"
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
          @click="() => $emit('edit:task', row.original) "
        />
      </div>
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import DGAgents from '@/mixins/accounts/dg-agents'
import MActivities from '@/mixins/maintenances/activities'

import { SDGSupervisorTasks } from '@/services/dg-supervisor'

export default {
  name: 'DGSTaskTable',

  emits: [
    'edit:task',
    'delete:task'
  ],

  mixins: [
    TableUtils,
    DGAgents,
    MActivities
  ],

  data () {
    return {
      tableTasks: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          agent: 'All',
          activity: 'All'
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'schedule', meta: { label: 'Schedule' }, enableSorting: true },
          { id: 'assigned.first_name', meta: { label: 'Agent' }, enableSorting: true },
          { id: 'activity.activity_name', meta: { label: 'Activity' }, enableSorting: true },
          { id: 'crop.crop_name', meta: { label: 'Crop' }, enableSorting: true },
          { id: 'event_plan', meta: { label: 'Event Plan' }, enableSorting: true },
          { id: 'total_grower_plan', meta: { label: 'Total Grower Plan' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  computed: {
    filterDGAgents () {
      return [
        { id: 'All', agent_name: 'All' }
      ].concat(this.options.dgAgents)
    },
    filterActivities () {
      return [
        { id: 'All', activity_name: 'All' }
      ].concat(this.options.activities)
    }
  },

  mounted () {
    this.getDGAgents(this)
    this.getActivities(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableTasks.loading = true
      return SDGSupervisorTasks.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        user_id: filters.user,
        activity_id: filters.activity
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
        this.tableTasks.loading = false
      })
    },

    clearFilters() {
      this.tableTasks.filters = {
        search: '',
        user: 'All',
        activity: 'All'
      }
    },

    tableApi () {
      return this.$refs.tableTasks
    }
  }
}
</script>
