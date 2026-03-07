<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.growerCrud.createGrower()"
          >
            Create Grower
          </UButton>
        </div>
      </div>
    </section>

    <AdminGrowerTable
      ref="growerTable"
      @edit:grower="grower => $refs.growerCrud.editGrower(grower)"
      @delete:grower="grower => $refs.growerCrud.deleteGrower(grower)"
    />

    <AdminGrowerCrud
      ref="growerCrud"
      @update:rows="() => $refs.growerTable.tableApi().refresh()"
      @update:row="grower => $refs.growerTable.tableApi().updateRow(grower)"
    />
  </UContainer>
</template>
<script>
import AdminGrowerTable from '@/views/admin/accounts/growers/AdminGrowerTable.vue'
import AdminGrowerCrud from '@/views/admin/accounts/growers/AdminGrowerCrud.vue'

export default {
  name: 'AdminGrowers',

  components: {
    AdminGrowerTable,
    AdminGrowerCrud
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
          label: 'Growers',
          class: 'text-xs',
          to: '/admin/accounts/growers'
        }
      ]
    }
  }
}
</script>
