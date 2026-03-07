<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.collegeCrud.createCollege()"
          >
            Create College
          </UButton>
        </div>
      </div>
    </section>

    <AdminCollegeTable
      ref="collegeTable"
      @edit:college="college => $refs.collegeCrud.editCollege(college)"
      @delete:college="college => $refs.collegeCrud.deleteCollege(college)"
    />

    <AdminCollegeCrud
      ref="collegeCrud"
      @update:rows="() => $refs.collegeTable.tableApi().refresh()"
      @update:row="college => $refs.collegeTable.tableApi().updateRow(college)"
    />
  </UContainer>
</template>
<script>
import AdminCollegeTable from '@/views/admin/maintenances/colleges/AdminCollegeTable.vue'
import AdminCollegeCrud from '@/views/admin/maintenances/colleges/AdminCollegeCrud.vue'

export default {
  name: 'AdminColleges',

  components: {
    AdminCollegeTable,
    AdminCollegeCrud
  }
}
</script>
