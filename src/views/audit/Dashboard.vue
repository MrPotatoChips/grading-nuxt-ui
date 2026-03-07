<template>x
  <UContainer class="py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Audit Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Monitor and audit all system activities
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <CrmsCard
        title="Total Audits"
        sub-title="This month"
        :count="234"
        variant="primary"
        icon="i-lucide-shield-check"
      />
      <CrmsCard
        title="Pending"
        sub-title="Awaiting review"
        :count="12"
        variant="warning"
        icon="i-lucide-clock"
      />
      <CrmsCard
        title="Completed"
        sub-title="This month"
        :count="222"
        variant="success"
        icon="i-lucide-check-circle"
      />
      <CrmsCard
        title="Reports"
        sub-title="Generated"
        :count="45"
        variant="info"
        icon="i-lucide-file-bar-chart"
      />
    </div>

    <CrmsSimpleCard
      title="Audit Overview"
      icon="i-lucide-shield"
      icon-color="primary"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Review grower management activities, events, and generate comprehensive audit reports.
      </p>
    </CrmsSimpleCard>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'

export default {
  name: 'AuditDashboard',
  components: { CrmsCard, CrmsSimpleCard }
}
</script>
