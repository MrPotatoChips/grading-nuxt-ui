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
            @click.prevent="() => $refs.yearLevelCrud.createYearLevel()"
          >
            Create Year Level
          </UButton>
        </div>
      </div>
    </section>

    <AdminYearLevelTable
      ref="yearLevelTable"
      @edit:year-level="yearLevel => $refs.yearLevelCrud.editYearLevel(yearLevel)"
      @delete:year-level="yearLevel => $refs.yearLevelCrud.deleteYearLevel(yearLevel)"
    />

    <AdminYearLevelCrud
      ref="yearLevelCrud"
      @update:rows="() => $refs.yearLevelTable.tableApi().refresh()"
      @update:row="yearLevel => $refs.yearLevelTable.tableApi().updateRow(yearLevel)"
    />
  </UContainer>
</template>
<script>
import AdminYearLevelTable from '@/views/admin/maintenances/year-levels/AdminYearLevelTable.vue'
import AdminYearLevelCrud from '@/views/admin/maintenances/year-levels/AdminYearLevelCrud.vue'

export default {
  name: 'AdminYearLevels',

  components: {
    AdminYearLevelTable,
    AdminYearLevelCrud
  }
}
</script>
