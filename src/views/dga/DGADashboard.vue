<template>
  <UContainer class="py-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold">DG Agent Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Welcome back! Here's an overview of your activities.
      </p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <CrmsCard
        title="Growers"
        :count="stats.growers"
        variant="primary"
        icon="i-lucide-users"
        :loading="loading"
      />
      <CrmsCard
        title="Tasks"
        :count="stats.tasks"
        variant="warning"
        icon="i-lucide-check-square"
        :loading="loading"
      />
      <CrmsCard
        title="Programs"
        :count="stats.programs"
        variant="success"
        icon="i-lucide-file-text"
        :loading="loading"
      />
      <CrmsCard
        title="Events"
        :count="stats.events"
        variant="info"
        icon="i-lucide-calendar"
        :loading="loading"
      />
    </div>

    <!-- Recent Activities -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CrmsSimpleCard
        title="Recent Tasks"
        icon="i-lucide-check-square"
        icon-color="primary"
      >
        <div v-if="loading" class="space-y-2">
          <USkeleton class="h-12" />
          <USkeleton class="h-12" />
          <USkeleton class="h-12" />
        </div>
        <div v-else-if="recentTasks.length === 0" class="text-center py-8">
          <p class="text-gray-500">No recent tasks</p>
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="task in recentTasks"
            :key="task.id"
            class="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">{{ task.name }}</p>
                <p class="text-sm text-gray-500">{{ task.grower }}</p>
              </div>
              <UBadge
                :label="task.status"
                :color="getTaskStatusColor(task.status)"
                size="xs"
              />
            </div>
          </div>
        </div>
      </CrmsSimpleCard>

      <CrmsSimpleCard
        title="Recent Activities"
        icon="i-lucide-activity"
        icon-color="success"
      >
        <div v-if="loading" class="space-y-2">
          <USkeleton class="h-12" />
          <USkeleton class="h-12" />
          <USkeleton class="h-12" />
        </div>
        <CrmsTimeline
          v-else
          :items="recentActivities"
        />
      </CrmsSimpleCard>
    </div>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'
import CrmsTimeline from '@/components/crms/CrmsTimeline.vue'

export default {
  name: 'DGAgentDashboard',

  components: {
    CrmsCard,
    CrmsSimpleCard,
    CrmsTimeline
  },

  data () {
    return {
      loading: false,
      stats: {
        growers: 0,
        tasks: 0,
        programs: 0,
        events: 0
      },
      recentTasks: [],
      recentActivities: []
    }
  },

  mounted () {
    this.loadDashboardData()
  },

  methods: {
    async loadDashboardData () {
      this.loading = true

      // TODO: Replace with actual API calls
      // Simulating API call
      setTimeout(() => {
        this.stats = {
          growers: 145,
          tasks: 23,
          programs: 8,
          events: 42
        }

        this.recentTasks = [
          {
            id: 1,
            name: 'Field Visit - Juan Dela Cruz',
            grower: 'Juan Dela Cruz',
            status: 'pending'
          },
          {
            id: 2,
            name: 'Document Verification',
            grower: 'Maria Santos',
            status: 'completed'
          },
          {
            id: 3,
            name: 'Program Registration',
            grower: 'Pedro Garcia',
            status: 'inProgress'
          }
        ]

        this.recentActivities = [
          {
            title: 'Task Completed',
            description: 'Field visit for Juan Dela Cruz completed',
            user: 'You',
            date: new Date(),
            status: 'completed'
          },
          {
            title: 'New Grower Registered',
            description: 'Maria Santos registered successfully',
            user: 'You',
            date: new Date(Date.now() - 86400000),
            status: 'approved'
          }
        ]

        this.loading = false
      }, 1000)
    },

    getTaskStatusColor (status) {
      const colorMap = {
        pending: 'warning',
        completed: 'success',
        inProgress: 'primary',
        cancelled: 'error'
      }
      return colorMap[status] || 'neutral'
    }
  }
}
</script>
