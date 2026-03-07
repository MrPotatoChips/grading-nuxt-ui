<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.clusterCrud.createCluster()"
          >
            Create Cluster
          </UButton>
        </div>
      </div>
    </section>

    <AdminClusterTable
      ref="clusterTable"
      @edit:cluster="cluster => $refs.clusterCrud.editCluster(cluster)"
      @delete:cluster="cluster => $refs.clusterCrud.deleteCluster(cluster)"
    />

    <AdminClusterCrud
      ref="clusterCrud"
      @update:rows="() => $refs.clusterTable.tableApi().refresh()"
      @update:row="cluster => $refs.clusterTable.tableApi().updateRow(cluster)"
    />
  </UContainer>
</template>
<script>
import AdminClusterTable from '@/views/admin/locations/clusters/AdminClusterTable.vue'
import AdminClusterCrud from '@/views/admin/locations/clusters/AdminClusterCrud.vue'

export default {
  name: 'AdminClusters',

  components: {
    AdminClusterTable,
    AdminClusterCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'Admin',
          class: 'text-xs',
          to: '/admin/dashboard'
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Clusters',
          class: 'text-xs',
          to: '/admin/locations/clusters'
        }
      ]
    }
  }
}
</script>
