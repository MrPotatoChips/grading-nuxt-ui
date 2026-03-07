<template>
  <UContainer class="py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Marketing Officer Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Manage and review grower program applications
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <CrmsCard
        title="Pending"
        sub-title="Programs awaiting review"
        :count="23"
        variant="warning"
        icon="i-lucide-clock"
      />
      <CrmsCard
        title="Approved"
        sub-title="This month"
        :count="156"
        variant="success"
        icon="i-lucide-check-circle"
      />
      <CrmsCard
        title="Total"
        sub-title="All programs"
        :count="789"
        variant="primary"
        icon="i-lucide-file-text"
      />
    </div>

    <CrmsSimpleCard
      title="Quick Actions"
      icon="i-lucide-zap"
      icon-color="primary"
    >
      <div class="space-y-2">
        <UButton
          block
          variant="outline"
          icon="i-lucide-file-search"
        >
          Review Pending Programs
        </UButton>
        <UButton
          block
          variant="outline"
          icon="i-lucide-history"
        >
          View Program History
        </UButton>
      </div>
    </CrmsSimpleCard>
  </UContainer>
</template>

<script>
import CrmsCard from '@/components/crms/CrmsCard.vue'
import CrmsSimpleCard from '@/components/crms/CrmsSimpleCard.vue'

export default {
  name: 'MarketingOfficerDashboard',
  components: { CrmsCard, CrmsSimpleCard }
}
</script>
