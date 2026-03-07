<template>
  <UContainer class="py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">DG Supervisor Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Monitor and manage your agents and their activities
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CrmsCard
        title="Agents"
        sub-title="Active agents"
        :count="12"
        variant="primary"
        icon="i-lucide-users"
      />
      <CrmsCard
        title="Growers"
        sub-title="Total growers"
        :count="450"
        variant="success"
        icon="i-lucide-user-check"
      />
      <CrmsCard
        title="Tasks"
        sub-title="Pending"
        :count="67"
        variant="warning"
        icon="i-lucide-check-square"
      />
      <CrmsCard
        title="Reports"
        sub-title="This month"
        :count="34"
        variant="info"
        icon="i-lucide-file-bar-chart"
      />
    </div>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'

export default {
  name: 'DGSupervisorDashboard',
  components: { CrmsCard }
}
</script>
