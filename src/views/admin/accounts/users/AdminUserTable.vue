<template>
  <VTable
    ref="tableUsers"
    :provider="tableProvider"
    :loading="tableUsers.loading"
    :columns="tableUsers.columns"
    :sorting="tableUsers.sorting"
    :filters="tableUsers.filters"
    @clear:filters="clearFilters"
  >
    <template #filters>
      <UFormField
        label="Roles"
      >
        <USelect
          v-model="tableUsers.filters.role"
          class="w-full"
          value-key="id"
          label-key="name"
          placeholder="filter here"
          :items="options.roles"
          :loading="fetching.roles"
          :disabled="fetching.roles"
          :ui="{ content: 'md:min-w-fit wrap-break-word' }"
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
          @click="() => $emit('edit:user', row.original) "
        />
      </div>
    </template>
    <template #avatar-cell="{ row: { original } }">
      <img
        class="h-8 w-8 rounded-full object-cover"
        :src="original.avatar || `https://ui-avatars.com/api/?name=${original.first_name}+${original.first_name}&background=random`"
        :alt="`${original.first_name} ${original.first_name}`"
      />
    </template>
  </VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'
import MRoles from '@/mixins/accounts/roles'

import { SAdminUsers } from '@/services/admin'

export default {
  name: 'AdminUserTable',

  emits: [
    'edit:user',
    'delete:user'
  ],

  mixins: [
    TableUtils,
    MRoles
  ],

  data () {
    return {
      tableUsers: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          role: ''
        },
        columns: [
          { id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
          { id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
          { id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
          { id: 'avatar', meta: { label: 'Avatar' } },
          { id: 'name', meta: { label: 'Name' }, enableSorting: true, cell: ({ row: { original } }) => `${original.first_name} ${original.last_name}` },
          { id: 'email', meta: { label: 'Email' } },
          { id: 'role.role_name',  meta: { label: 'Role' }, enableSorting: true }
        ].map(this.transformColumns)
      }
    }
  },

  mounted () {
    this.getRoles(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableUsers.loading = true
      return SAdminUsers.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        status: filters.status,
        role_id: filters.role
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
        this.tableUsers.loading = false
      })
    },

    clearFilters() {
      this.tableUsers.filters = {
        search: '',
        role: ''
      }
    },

    tableApi () {
      return this.$refs.tableUsers
    }
  }
}
</script>
