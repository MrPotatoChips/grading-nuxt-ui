<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.productGroupCrud.createProductGroup()"
          >
            Create Product Group
          </UButton>
        </div>
      </div>
    </section>

    <AdminProductGroupTable
      ref="productGroupTable"
      @edit:productGroup="productGroup => $refs.productGroupCrud.editProductGroup(productGroup)"
      @delete:productGroup="productGroup => $refs.productGroupCrud.deleteProductGroup(productGroup)"
    />

    <AdminProductGroupCrud
      ref="productGroupCrud"
      @update:rows="() => $refs.productGroupTable.tableApi().refresh()"
      @update:row="productGroup => $refs.productGroupTable.tableApi().updateRow(productGroup)"
    />
  </UContainer>
</template>
<script>
import AdminProductGroupTable from '@/views/admin/maintenances/product-groups/AdminProductGroupTable.vue'
import AdminProductGroupCrud from '@/views/admin/maintenances/product-groups/AdminProductGroupCrud.vue'

export default {
  name: 'AdminProductGroups',

  components: {
    AdminProductGroupTable,
    AdminProductGroupCrud
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
          label: 'Product Groups',
          class: 'text-xs',
          to: '/admin/maintenances/product-groups'
        }
      ]
    }
  }
}
</script>
