<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.roleCrud.createRole()"
          >
            Create Role
          </UButton>
        </div>
      </div>
    </section>

    <AdminRoleTable
      ref="roleTable"
      @edit:role="role => $refs.roleCrud.editRole(role)"
      @delete:role="role => $refs.roleCrud.deleteRole(role)"
    />

    <AdminRoleCrud
      ref="roleCrud"
      @update:rows="() => $refs.roleTable.tableApi().refresh()"
      @update:row="role => $refs.roleTable.updateRole(role)"
    />
  </UContainer>
</template>
<script>
import AdminRoleTable from '@/views/admin/accounts/roles/AdminRoleTable.vue'
import AdminRoleCrud from '@/views/admin/accounts/roles/AdminRoleCrud.vue'

export default {
  name: 'AdminRoles',

  components: {
    AdminRoleTable,
    AdminRoleCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: '/admin/dashboard'
        },
        {
          label: 'Accounts',
          class: 'text-xs'
        },
        {
          label: 'Roles',
          class: 'text-xs',
          to: '/admin/accounts/roles'
        }
      ]
    }
  }
}
</script>
