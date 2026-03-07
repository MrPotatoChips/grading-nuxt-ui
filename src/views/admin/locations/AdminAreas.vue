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
            @click.prevent="() => $refs.areaCrud.createArea()"
          >
            Create Area
          </UButton>
        </div>
      </div>
    </section>

    <AdminAreaTable
      ref="areaTable"
      @edit:area="area => $refs.areaCrud.editArea(area)"
      @delete:area="area => $refs.areaCrud.deleteArea(area)"
    />

    <AdminAreaCrud
      ref="areaCrud"
      @update:rows="() => $refs.areaTable.tableApi().refresh()"
      @update:row="area => $refs.areaTable.tableApi().updateRow(area)"
    />
  </UContainer>
</template>
<script>
import AdminAreaTable from '@/views/admin/locations/areas/AdminAreaTable.vue'
import AdminAreaCrud from '@/views/admin/locations/areas/AdminAreaCrud.vue'

export default {
  name: 'AdminAreas',

  components: {
    AdminAreaTable,
    AdminAreaCrud
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
          label: 'Areas',
          class: 'text-xs',
          to: '/admin/locations/areas'
        }
      ]
    }
  }
}
</script>
