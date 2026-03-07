<template>
  <UContainer class="py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">DG Manager Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Oversee all supervisors and their operations
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <CrmsCard
        title="Supervisors"
        sub-title="Active supervisors"
        :count="8"
        variant="primary"
        icon="i-lucide-users"
      />
      <CrmsCard
        title="Agents"
        sub-title="Total agents"
        :count="56"
        variant="success"
        icon="i-lucide-user-check"
      />
      <CrmsCard
        title="Growers"
        sub-title="Registered"
        :count="1250"
        variant="info"
        icon="i-lucide-users"
      />
      <CrmsCard
        title="Reports"
        sub-title="This month"
        :count="145"
        variant="warning"
        icon="i-lucide-file-bar-chart"
      />
    </div>

    <CrmsSimpleCard
      title="Overview"
      icon="i-lucide-bar-chart"
      icon-color="primary"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Monitor operations across all regions and get insights into performance metrics.
      </p>
    </CrmsSimpleCard>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'

export default {
  name: 'DGManagerDashboard',
  components: { CrmsCard, CrmsSimpleCard }
}
</script>
