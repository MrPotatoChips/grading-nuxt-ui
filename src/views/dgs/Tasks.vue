<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-8">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.taskCrud.createTask()"
          >
            Create Task
          </UButton>
        </div>
      </div>
    </section>

    <DGSTaskTable
      ref="taskTable"
      @edit:task="task => $refs.taskCrud.editTask(task)"
      @delete:task="task => $refs.taskCrud.deleteTask(task)"
    />

    <DGSTaskCrud
      ref="taskCrud"
      @update:rows="() => $refs.taskTable.tableApi().refresh()"
      @update:row="task => $refs.taskTable.tableApi().updateRow(task)"
    />
  </UContainer>
</template>
<script>
import DGSTaskTable from '@/views/dgs/tasks/DGSTaskTable.vue'
import DGSTaskCrud from '@/views/dgs/tasks/DGSTaskCrud.vue'

export default {
  name: 'DGSTasks',

  components: {
    DGSTaskTable,
    DGSTaskCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'DG Supervisor',
          class: 'text-xs',
          to: '/dgs/dashboard'
        },
        {
          label: 'Tasks',
          class: 'text-xs',
          to: '/dgs/tasks'
        }
      ]
    }
  }
}
</script>
