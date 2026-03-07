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
            @click.prevent="() => $refs.sectionCrud.createSection()"
          >
            Create Section
          </UButton>
        </div>
      </div>
    </section>

    <AdminSectionTable
      ref="sectionTable"
      @edit:section="section => $refs.sectionCrud.editSection(section)"
      @delete:section="section => $refs.sectionCrud.deleteSection(section)"
    />

    <AdminSectionCrud
      ref="sectionCrud"
      @update:rows="() => $refs.sectionTable.tableApi().refresh()"
      @update:row="section => $refs.sectionTable.tableApi().updateRow(section)"
    />
  </UContainer>
</template>
<script>
import AdminSectionTable from '@/views/admin/maintenances/sections/AdminSectionTable.vue'
import AdminSectionCrud from '@/views/admin/maintenances/sections/AdminSectionCrud.vue'

export default {
  name: 'AdminSections',

  components: {
    AdminSectionTable,
    AdminSectionCrud
  }
}
</script>
