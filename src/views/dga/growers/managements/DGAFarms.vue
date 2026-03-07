<template>
  <UContainer
    class="sm:px-0 lg:px-0 px-0"
  >
    <!-- Breadcrumb -->
    <section class="mb-4">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.farmCrud.createFarm()"
          >
            Create Farm
          </UButton>
        </div>
      </div>
    </section>

    <DGAFarmTable
      ref="farmTable"
      @edit:farm="farm => $refs.farmCrud.editFarm(farm)"
      @delete:farm="farm => $refs.farmCrud.deleteFarm(farm)"
    />

    <DGAFarmCrud
      ref="farmCrud"
      @update:rows="() => $refs.farmTable.tableApi().refresh()"
      @update:row="farm => $refs.farmTable.tableApi().updateRow(farm)"
    />
  </UContainer>
</template>
<script>
import DGAFarmTable from '@/views/dga/growers/managements/farms/DGAFarmTable.vue'
import DGAFarmCrud from '@/views/dga/growers/managements/farms/DGAFarmCrud.vue'

export default {
  name: 'DGAFarms',

  components: {
    DGAFarmTable,
    DGAFarmCrud
  },

  data () {
    return {
      breadcrumbs: [
        {
          label: 'DGA',
          class: 'text-xs',
          to: '/dga/dashboard'
        },
        {
          label: 'Locations',
          class: 'text-xs'
        },
        {
          label: 'Farms',
          class: 'text-xs',
          to: '/dga/farms'
        }
      ]
    }
  }
}
</script>
