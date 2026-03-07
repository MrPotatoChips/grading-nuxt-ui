<template>
  <section class="mb-6">
    <UCard>
      <div class="flex flex-wrap gap-4">
        <USelect
          v-model="tableRoles.filters.status"
          :items="options.statuses"
          placeholder="filter here"
          class="w-40"
        />
        <USelect
          v-model="tableRoles.filters.role"
          value-key="id"
          label-key="name"
          :items="filterRoles"
          :loading="fetching.roles"
          :disabled="fetching.roles"
          placeholder="filter here"
          class="w-40"
        />
        <UButton
          variant="ghost"
          color="error"
          icon="i-lucide-filter-x"
          @click="clearFilters"
        >
          Clear Filters
        </UButton>
      </div>
    </UCard>
  </section>

  <VTable
    ref="tableRoles"
    :provider="tableProvider"
    :loading="tableRoles.loading"
    :columns="tableRoles.columns"
    :sorting="tableRoles.sorting"
    :filters="tableRoles.filters"
  />
</template>
<script>
import { h } from 'vue'

import LazyBadge from '@nuxt/ui/components/Badge.vue'
import LazyCheckbox from '@nuxt/ui/components/Checkbox.vue'
import LazyDropdownMenu from '@nuxt/ui/components/DropdownMenu.vue'
import LazyButton from '@nuxt/ui/components/Button.vue'

import TableUtils from '@/components/table/mixins/utils'
import MRoles from '@/mixins/accounts/roles'

import { SAdminRoles } from '@/services/admin'

export default {
  name: 'AdminRoleTable',

  emits: [
    'edit:role',
    'delete:role'
  ],

  mixins: [
    TableUtils,
    MRoles
  ],

  data () {
    return {
      options: {
        statuses: [
          { label: 'All', value: 'All' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Suspended', value: 'suspended' }
        ]
      },
      tableRoles: {
        loading: false,
        sorting: {
          id: 'id',
          desc: false
        },
        filters: {
          search: '',
          status: 'All',
          role: 'All'
        },
        columns: [
          {
            meta: {
              label: 'Select'
            },
            id: 'select',
            accessorKey: 'select',
            enableSorting: false,
            header: this.getTableHeaderSelect,
            cell: ({ row }) => {
              return h(LazyCheckbox, {
                modelValue: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: () => {
                  row.toggleSelected()
                  this.updateSelectedRoles()
                },
                'aria-label': 'Select Row'
              })
            }
          },
          {
            id: 'id',
            accessorKey: 'id',
            meta: {
              label: 'ID'
            },
            enableSorting: true,
            header: header => this.getTableHeaderSettings(header, 'ID')
          },
          {
            id: 'avatar',
            accessorKey: 'avatar',
            meta: {
              label: 'Avatar'
            },
            enableSorting: false,
            header: header => this.getTableHeaderSettings(header, 'Avatar'),
            cell: ({ row }) => {
              const role = row.original
              return h('img', {
                class: 'h-8 w-8 rounded-full object-cover',
                src: role.avatar || `https://ui-avatars.com/api/?name=${role.first_name}+${role.first_name}&background=random`,
                alt: `${role.first_name} ${role.first_name}`
              })
            }
          },
          {
            id: 'name',
            accessorKey: 'name',
            meta: {
              label: 'Name'
            },
            enableSorting: true,
            header: header => this.getTableHeaderSettings(header, 'Name'),
            cell: ({ row }) => {
              const role = row.original
              return h('div', { class: 'flex flex-col' }, [
                h('span', { class: 'font-medium text-gray-900 dark:text-white' }, `${role.first_name} ${role.first_name}`),
                h('span', { class: 'text-sm text-gray-500 dark:text-gray-400' }, role.email)
              ])
            }
          },
          {
            id: 'role',
            accessorKey: 'role',
            meta: {
              label: 'Role'
            },
            enableSorting: true,
            header: header => this.getTableHeaderSettings(header, 'Role'),
            cell: ({ row }) => {
              const roleColors = {
                admin: 'red',
                manager: 'blue',
                role: 'green',
                guest: 'gray'
              }
              const color = roleColors[row.getValue('role')] || 'gray'
              return h('div', { class: 'flex justify-center' }, [
                h(LazyBadge, {
                  color,
                  class: 'capitalize',
                  variant: 'subtle'
                }, () => row.getValue('role')?.name)
              ])
            }
          },
          {
            id: 'status',
            accessorKey: 'status',
            meta: {
              label: 'Status'
            },
            enableSorting: true,
            header: header => this.getTableHeaderSettings(header, 'Status'),
            cell: ({ row }) => {
              const statusColors = {
                active: 'green',
                inactive: 'gray',
                suspended: 'red'
              }
              const color = statusColors[row.getValue('status')] || 'gray'
              return h('div', { class: 'flex justify-center' }, [
                h(LazyBadge, {
                  color,
                  class: 'capitalize w-[75px] flex justify-center',
                  variant: 'subtle'
                }, () => row.getValue('status'))
              ])
            }
          },
          {
            id: 'lastLogin',
            accessorKey: 'lastLogin',
            meta: {
              label: 'Last Login'
            },
            enableSorting: true,
            header: header => this.getTableHeaderSettings(header, 'Last Login'),
            cell: ({ row }) => {
              const lastLogin = row.getValue('lastLogin')
              return h('span', { class: 'text-sm text-gray-600 dark:text-gray-400' },
                lastLogin ? new Date(lastLogin).toLocaleDateString() : 'Never')
            }
          },
          {
            id: 'actions',
            accessorKey: 'actions',
            meta: {
              label: 'Actions'
            },
            enableSorting: false,
            header: header => this.getTableHeaderSettings(header, 'Actions'),
            cell: ({ row }) => {
              return h('div', { class: 'flex justify-center' }, [
                h(LazyDropdownMenu, {
                  items: this.getRoleActions(row.original)
                }, () => [
                  h(LazyButton, {
                    color: 'gray',
                    variant: 'ghost',
                    icon: 'i-lucide-more-horizontal',
                    size: 'sm'
                  })
                ])
              ])
            }
          }
        ]
      }
    }
  },

  computed: {
    filterRoles () {
      return [
        { id: 'All', name: 'All' }
      ].concat(this.options.roles)
    }
  },

  mounted () {
    this.getRoles(this)
  },

  methods: {
    async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
      this.tableRoles.loading = true
      return SAdminRoles.get({
        sort,
        sort_desc: sortDesc,
        per_page: perPage,
        page: currentPage,
        search: filters.search,
        status: filters.status,
        role: filters.role
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
        this.tableRoles.loading = false
      })
    },

    clearFilters() {
      this.tableRoles.filters = {
        search: '',
        status: 'All',
        role: 'All'
      }
    },

    getRoleActions(role) {
      return [
        {
          label: 'Edit',
          icon: 'i-lucide-edit',
          onSelect: () => this.$emit('edit:role', role)
        },
        // {
        //   label: role.status === 'active' ? 'Deactivate' : 'Activate',
        //   icon: role.status === 'active' ? 'i-lucide-role-x' : 'i-lucide-role-check',
        //   onSelect: () => this.toggleRoleStatus(role)
        // },
        {
          label: 'Delete',
          icon: 'i-lucide-trash-2',
          onSelect: () => this.$emit('delete:role', role)
        }
      ]
    },

    tableApi () {
      return this.$refs.tableRoles
    }
  }
}
</script>
