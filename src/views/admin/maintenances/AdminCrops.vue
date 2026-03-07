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
            @click.prevent="() => $refs.cropCrud.createCrop()"
          >
            Create Crop
          </UButton>
        </div>
      </div>
    </section>

    <AdminCropTable
      ref="cropTable"
      @edit:crop="crop => $refs.cropCrud.editCrop(crop)"
      @delete:crop="crop => $refs.cropCrud.deleteCrop(crop)"
    />

    <AdminCropCrud
      ref="cropCrud"
      @update:rows="() => $refs.cropTable.tableApi().refresh()"
      @update:row="crop => $refs.cropTable.tableApi().updateRow(crop)"
    />
  </UContainer>
</template>
<script>
import AdminCropTable from '@/views/admin/maintenances/crops/AdminCropTable.vue'
import AdminCropCrud from '@/views/admin/maintenances/crops/AdminCropCrud.vue'

export default {
  name: 'AdminCrops',

  components: {
    AdminCropTable,
    AdminCropCrud
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
          label: 'Crops',
          class: 'text-xs',
          to: '/admin/maintenances/crops'
        }
      ]
    }
  }
}
</script>
