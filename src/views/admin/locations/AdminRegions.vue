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
            @click.prevent="() => $refs.regionCrud.createRegion()"
          >
            Create Region
          </UButton>
        </div>
      </div>
    </section>

    <AdminRegionTable
      ref="regionTable"
      @edit:region="region => $refs.regionCrud.editRegion(region)"
      @delete:region="region => $refs.regionCrud.deleteRegion(region)"
    />

    <AdminRegionCrud
      ref="regionCrud"
      @update:rows="() => $refs.regionTable.tableApi().refresh()"
      @update:row="region => $refs.regionTable.tableApi().updateRow(region)"
    />
  </UContainer>
</template>
<script>
import AdminRegionTable from '@/views/admin/locations/regions/AdminRegionTable.vue'
import AdminRegionCrud from '@/views/admin/locations/regions/AdminRegionCrud.vue'

export default {
  name: 'AdminRegions',

  components: {
    AdminRegionTable,
    AdminRegionCrud
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
          label: 'Regions',
          class: 'text-xs',
          to: '/admin/locations/regions'
        }
      ]
    }
  }
}
</script>
