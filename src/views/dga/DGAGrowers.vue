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
            @click.prevent="() => $refs.growerCrud.createGrower()"
          >
            Create Grower
          </UButton>
        </div>
      </div>
    </section>

    <DGAGrowerTable
      ref="growerTable"
      @edit:grower="grower => $refs.growerCrud.editGrower(grower)"
      @delete:grower="grower => $refs.growerCrud.deleteGrower(grower)"
    />

    <DGAGrowerCrud
      ref="growerCrud"
      @update:rows="() => $refs.growerTable.tableApi().refresh()"
      @update:row="grower => $refs.growerTable.tableApi().updateRow(grower)"
    />
  </UContainer>
</template>
<script>
import DGAGrowerTable from '@/views/dga/growers/DGAGrowerTable.vue'
import DGAGrowerCrud from '@/views/dga/growers/DGAGrowerCrud.vue'

export default {
  name: 'DGAGrowers',

  components: {
    DGAGrowerTable,
    DGAGrowerCrud
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
          label: 'Growers',
          class: 'text-xs',
          to: '/dga/growers'
        }
      ]
    }
  }
}
</script>
