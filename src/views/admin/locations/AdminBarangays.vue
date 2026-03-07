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
            @click.prevent="() => $refs.barangayCrud.createBarangay()"
          >
            Create Barangay
          </UButton>
        </div>
      </div>
    </section>

    <AdminBarangayTable
      ref="barangayTable"
      @edit:barangay="barangay => $refs.barangayCrud.editBarangay(barangay)"
      @delete:barangay="barangay => $refs.barangayCrud.deleteBarangay(barangay)"
    />

    <AdminBarangayCrud
      ref="barangayCrud"
      @update:rows="() => $refs.barangayTable.tableApi().refresh()"
      @update:row="barangay => $refs.barangayTable.tableApi().updateRow(barangay)"
    />
  </UContainer>
</template>
<script>
import AdminBarangayTable from '@/views/admin/locations/barangays/AdminBarangayTable.vue'
import AdminBarangayCrud from '@/views/admin/locations/barangays/AdminBarangayCrud.vue'

export default {
  name: 'AdminBarangays',

  components: {
    AdminBarangayTable,
    AdminBarangayCrud
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
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Barangays',
          class: 'text-xs',
          to: '/admin/locations/barangays'
        }
      ]
    }
  }
}
</script>
