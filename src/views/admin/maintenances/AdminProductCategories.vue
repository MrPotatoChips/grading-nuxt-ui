<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.productCategoryCrud.createProductCategory()"
          >
            Create Product Category
          </UButton>
        </div>
      </div>
    </section>

    <AdminProductCategoryTable
      ref="productCategoryTable"
      @edit:productCategory="productCategory => $refs.productCategoryCrud.editProductCategory(productCategory)"
      @delete:productCategory="productCategory => $refs.productCategoryCrud.deleteProductCategory(productCategory)"
    />

    <AdminProductCategoryCrud
      ref="productCategoryCrud"
      @update:rows="() => $refs.productCategoryTable.tableApi().refresh()"
      @update:row="productCategory => $refs.productCategoryTable.tableApi().updateRow(productCategory)"
    />
  </UContainer>
</template>
<script>
import AdminProductCategoryTable from '@/views/admin/maintenances/product-categories/AdminProductCategoryTable.vue'
import AdminProductCategoryCrud from '@/views/admin/maintenances/product-categories/AdminProductCategoryCrud.vue'

export default {
  name: 'AdminProductCategories',

  components: {
    AdminProductCategoryTable,
    AdminProductCategoryCrud
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
          label: 'Product Categories',
          class: 'text-xs',
          to: '/admin/maintenances/product-categories'
        }
      ]
    }
  }
}
</script>
