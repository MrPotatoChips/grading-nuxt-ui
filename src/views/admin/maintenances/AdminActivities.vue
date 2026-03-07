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
            @click.prevent="() => $refs.activityCrud.createActivity()"
          >
            Create Activity
          </UButton>
        </div>
      </div>
    </section>

    <AdminActivityTable
      ref="activityTable"
      @edit:activity="activity => $refs.activityCrud.editActivity(activity)"
      @delete:activity="activity => $refs.activityCrud.deleteActivity(activity)"
    />

    <AdminActivityCrud
      ref="activityCrud"
      @update:rows="() => $refs.activityTable.tableApi().refresh()"
      @update:row="activity => $refs.activityTable.tableApi().updateRow(activity)"
    />
  </UContainer>
</template>
<script>
import AdminActivityTable from '@/views/admin/maintenances/activities/AdminActivityTable.vue'
import AdminActivityCrud from '@/views/admin/maintenances/activities/AdminActivityCrud.vue'

export default {
  name: 'AdminActivities',

  components: {
    AdminActivityTable,
    AdminActivityCrud
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
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Activities',
          class: 'text-xs',
          to: '/admin/maintenances/activities'
        }
      ]
    }
  }
}
</script>
