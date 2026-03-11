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
            @click.prevent="() => $refs.subjectCrud.createSubject()"
          >
            Create Subject
          </UButton>
        </div>
      </div>
    </section>

    <AdminSubjectTable
      ref="subjectTable"
      @edit:subject="subject => $refs.subjectCrud.editSubject(subject)"
      @delete:subject="subject => $refs.subjectCrud.deleteSubject(subject)"
    />

    <AdminSubjectCrud
      ref="subjectCrud"
      @update:rows="() => $refs.subjectTable.tableApi().refresh()"
      @update:row="subject => $refs.subjectTable.tableApi().updateRow(subject)"
    />
  </UContainer>
</template>
<script>
import AdminSubjectTable from '@/views/admin/maintenances/subjects/AdminSubjectTable.vue'
import AdminSubjectCrud from '@/views/admin/maintenances/subjects/AdminSubjectCrud.vue'

export default {
  name: 'AdminSubjects',

  components: {
    AdminSubjectTable,
    AdminSubjectCrud
  }
}
</script>
