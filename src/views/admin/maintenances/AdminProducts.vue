<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.productCrud.createProduct()"
          >
            Create Product
          </UButton>
        </div>
      </div>
    </section>

    <AdminProductTable
      ref="productTable"
      @edit:product="product => $refs.productCrud.editProduct(product)"
      @delete:product="product => $refs.productCrud.deleteProduct(product)"
    />

    <AdminProductCrud
      ref="productCrud"
      @update:rows="() => $refs.productTable.tableApi().refresh()"
      @update:row="product => $refs.productTable.tableApi().updateRow(product)"
    />
  </UContainer>
</template>
<script>
import AdminProductTable from '@/views/admin/maintenances/products/AdminProductTable.vue'
import AdminProductCrud from '@/views/admin/maintenances/products/AdminProductCrud.vue'

export default {
  name: 'AdminProducts',

  components: {
    AdminProductTable,
    AdminProductCrud
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
          label: 'Products',
          class: 'text-xs',
          to: '/admin/maintenances/products'
        }
      ]
    }
  }
}
</script>
