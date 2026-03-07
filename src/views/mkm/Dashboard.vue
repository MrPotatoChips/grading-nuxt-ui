<template>
  <UContainer class="py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Marketing Manager Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Overview of all marketing activities and growers
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <CrmsCard
        title="Growers"
        sub-title="Total registered"
        :count="1450"
        variant="primary"
        icon="i-lucide-users"
      />
      <CrmsCard
        title="Programs"
        sub-title="Active programs"
        :count="45"
        variant="success"
        icon="i-lucide-file-text"
      />
      <CrmsCard
        title="Performance"
        sub-title="This quarter"
        :count="89"
        variant="info"
        icon="i-lucide-trending-up"
      />
    </div>

    <CrmsSimpleCard
      title="Marketing Overview"
      icon="i-lucide-bar-chart"
      icon-color="success"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Track marketing performance and grower engagement metrics.
      </p>
    </CrmsSimpleCard>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'

export default {
  name: 'MarketingManagerDashboard',
  components: { CrmsCard, CrmsSimpleCard }
}
</script>
