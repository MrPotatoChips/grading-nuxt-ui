<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
        </div>
      </div>
    </section>

    <DGATaskGrid
      ref="taskGrid"
      @edit:task="task => $refs.taskCrud.createTaskEvent(task)"
      @delete:task="task => $refs.taskCrud.deleteTask(task)"
    />

    <DGATaskEventCrud
      ref="taskCrud"
      @update:rows="() => $refs.taskGrid.tableApi().refresh()"
      @update:row="task => $refs.taskGrid.tableApi().updateRow(task)"
    />
  </UContainer>
</template>
<script>
import DGATaskGrid from '@/views/dga/tasks/DGATaskGrid.vue'
import DGATaskEventCrud from '@/views/dga/tasks/DGATaskEventCrud.vue'

export default {
  name: 'DGATasks',

  components: {
    DGATaskGrid,
    DGATaskEventCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'DG Agent',
          class: 'text-xs',
          to: '/dga/dashboard'
        },
        {
          label: 'Tasks',
          class: 'text-xs',
          to: '/dga/tasks'
        }
      ]
    }
  }
}
</script>
