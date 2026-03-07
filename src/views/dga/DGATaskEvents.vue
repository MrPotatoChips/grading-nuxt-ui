<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            :disabled="fetching"
            @click.prevent="() => $refs.taskEventCrud.createTaskEvent(task)"
          >
            Record Event
          </UButton>
        </div>
      </div>
    </section>

    <DGATaskEventGrid
      ref="taskEventGrid"
      @edit:taskEvent="taskEvent => $refs.taskEventCrud.editTaskEvent(taskEvent)"
      @delete:taskEvent="taskEvent => $refs.taskEventCrud.deleteTaskEvent(taskEvent)"
    />

    <DGATaskEventCrud
      ref="taskEventCrud"
      @update:rows="() => $refs.taskEventGrid.tableApi().refresh()"
      @update:row="taskEvent => $refs.taskEventGrid.tableApi().updateRow(taskEvent)"
    />
  </UContainer>
</template>
<script>
import DGATaskEventGrid from '@/views/dga/task-events/DGATaskEventGrid.vue'
import DGATaskEventCrud from '@/views/dga/task-events/DGATaskEventCrud.vue'

import { SDGAgentTasks } from '@/services/dg-agent'

export default {
  name: 'DGATaskEvents',

  components: {
    DGATaskEventGrid,
    DGATaskEventCrud
  },

  data () {
    return {
      fetching: false,
      task: {
        id: '',
        activity_id: '',
        activity_name: '',
        crop_id: '',
        crop_name: ''
      }
    }
  },

  mounted () {
    this.getTask()
  },

  methods: {
    async getTask () {
      this.fetching = true
      return SDGAgentTasks.show(this.$route.params.task).then(
        ({ data: { task } }) => {
          this.task = {
            id: task.id,
            activity_id: task.activity_id,
            activity_name: task.activity?.activity_name,
            crop_id: task.crop_id,
            crop_name: task.crop?.crop_name
          }
        }
      ).finally(() => {
        this.fetching = false
      })
    }
  }
}
</script>
