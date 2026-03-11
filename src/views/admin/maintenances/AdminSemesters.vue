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
            @click.prevent="() => $refs.semesterCrud.createSemester()"
          >
            Create Semester
          </UButton>
        </div>
      </div>
    </section>

    <AdminSemesterTable
      ref="semesterTable"
      @edit:semester="semester => $refs.semesterCrud.editSemester(semester)"
      @delete:semester="semester => $refs.semesterCrud.deleteSemester(semester)"
    />

    <AdminSemesterCrud
      ref="semesterCrud"
      @update:rows="() => $refs.semesterTable.tableApi().refresh()"
      @update:row="semester => $refs.semesterTable.tableApi().updateRow(semester)"
    />
  </UContainer>
</template>
<script>
import AdminSemesterTable from '@/views/admin/maintenances/semesters/AdminSemesterTable.vue'
import AdminSemesterCrud from '@/views/admin/maintenances/semesters/AdminSemesterCrud.vue'

export default {
  name: 'AdminSemesters',

  components: {
    AdminSemesterTable,
    AdminSemesterCrud
  }
}
</script>
