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
            @click.prevent="() => $refs.provinceCrud.createProvince()"
          >
            Create Province
          </UButton>
        </div>
      </div>
    </section>

    <AdminProvinceTable
      ref="provinceTable"
      @edit:province="province => $refs.provinceCrud.editProvince(province)"
      @delete:province="province => $refs.provinceCrud.deleteProvince(province)"
    />

    <AdminProvinceCrud
      ref="provinceCrud"
      @update:rows="() => $refs.provinceTable.tableApi().refresh()"
      @update:row="province => $refs.provinceTable.tableApi().updateRow(province)"
    />
  </UContainer>
</template>
<script>
import AdminProvinceTable from '@/views/admin/locations/provinces/AdminProvinceTable.vue'
import AdminProvinceCrud from '@/views/admin/locations/provinces/AdminProvinceCrud.vue'

export default {
  name: 'AdminProvinces',

  components: {
    AdminProvinceTable,
    AdminProvinceCrud
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
          label: 'Provinces',
          class: 'text-xs',
          to: '/admin/locations/provinces'
        }
      ]
    }
  }
}
</script>
