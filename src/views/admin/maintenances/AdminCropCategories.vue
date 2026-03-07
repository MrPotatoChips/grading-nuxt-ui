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
            @click.prevent="() => $refs.cropCategoryCrud.createCropCategory()"
          >
            Create Crop Category
          </UButton>
        </div>
      </div>
    </section>

    <AdminCropCategoryTable
      ref="cropCategoryTable"
      @edit:crop-category="cropCategory => $refs.cropCategoryCrud.editCropCategory(cropCategory)"
      @delete:crop-category="cropCategory => $refs.cropCategoryCrud.deleteCropCategory(cropCategory)"
    />

    <AdminCropCategoryCrud
      ref="cropCategoryCrud"
      @update:rows="() => $refs.cropCategoryTable.tableApi().refresh()"
      @update:row="cropCategory => $refs.cropCategoryTable.tableApi().updateRow(cropCategory)"
    />
  </UContainer>
</template>
<script>
import AdminCropCategoryTable from '@/views/admin/maintenances/crop-categories/AdminCropCategoryTable.vue'
import AdminCropCategoryCrud from '@/views/admin/maintenances/crop-categories/AdminCropCategoryCrud.vue'

export default {
  name: 'AdminCropCategories',

  components: {
    AdminCropCategoryTable,
    AdminCropCategoryCrud
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
          label: 'Crop Categories',
          class: 'text-xs',
          to: '/admin/maintenances/crop-categories'
        }
      ]
    }
  }
}
</script>
