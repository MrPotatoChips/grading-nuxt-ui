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
            @click.prevent="() => $refs.courseCrud.createCourse()"
          >
            Create Course
          </UButton>
        </div>
      </div>
    </section>

    <AdminCourseTable
      ref="courseTable"
      @edit:course="course => $refs.courseCrud.editCourse(course)"
      @delete:course="course => $refs.courseCrud.deleteCourse(course)"
    />

    <AdminCourseCrud
      ref="courseCrud"
      @update:rows="() => $refs.courseTable.tableApi().refresh()"
      @update:row="course => $refs.courseTable.tableApi().updateRow(course)"
    />
  </UContainer>
</template>
<script>
import AdminCourseTable from '@/views/admin/maintenances/courses/AdminCourseTable.vue'
import AdminCourseCrud from '@/views/admin/maintenances/courses/AdminCourseCrud.vue'

export default {
  name: 'AdminCourses',

  components: {
    AdminCourseTable,
    AdminCourseCrud
  }
}
</script>
