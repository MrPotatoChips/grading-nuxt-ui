<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex flex-col md:flex-row justify-between gap-4">
        <div class="flex gap-2 md:order-1 order-2">
          <UButton
            size="sm"
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.userCrud.createUser()"
          >
            Create User
          </UButton>
        </div>
      </div>
    </section>

    <AdminUserTable
      ref="userTable"
      @edit:user="user => $refs.userCrud.editUser(user)"
      @delete:user="user => $refs.userCrud.deleteUser(user)"
    />

    <AdminUserCrud
      ref="userCrud"
      @update:rows="() => $refs.userTable.tableApi().refresh()"
      @update:row="user => $refs.userTable.tableApi().updateRow(user)"
    />
  </UContainer>
</template>
<script>
import AdminUserTable from '@/views/admin/accounts/users/AdminUserTable.vue'
import AdminUserCrud from '@/views/admin/accounts/users/AdminUserCrud.vue'

export default {
  name: 'AdminUsers',

  components: {
    AdminUserTable,
    AdminUserCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: {
            name: 'admin.dashboard'
          }
        },
        {
          label: 'Accounts',
          class: 'text-xs'
        },
        {
          label: 'Users',
          class: 'text-xs'
        }
      ]
    }
  }
}
</script>
