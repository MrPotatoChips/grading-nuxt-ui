<template>
  <div class="grid grid-cols-1 gap-4">
    <AdminUserProvinceCrud />
    <AdminUserProvinceTable />
  </div>
</template>
<script>
import AdminUserProvinceCrud from './provinces/AdminUserProvinceCrud.vue'
import AdminUserProvinceTable from './provinces/AdminUserProvinceTable.vue'

export default {
  name: 'AdminUserProvinces',

  components: {
    AdminUserProvinceCrud,
    AdminUserProvinceTable
  }
}
</script>
