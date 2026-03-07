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
            @click.prevent="() => $refs.interactionCrud.createInteraction()"
          >
            Create Interaction
          </UButton>
        </div>
      </div>
    </section>

    <DGAInteractionTable
      ref="interactionTable"
      @edit:interaction="interaction => $refs.interactionCrud.editInteraction(interaction)"
      @delete:interaction="interaction => $refs.interactionCrud.deleteInteraction(interaction)"
    />

    <DGAInteractionCrud
      ref="interactionCrud"
      @update:rows="() => $refs.interactionTable.tableApi().refresh()"
      @update:row="interaction => $refs.interactionTable.tableApi().updateRow(interaction)"
    />
  </UContainer>
</template>
<script>
import DGAInteractionTable from '@/views/dga/growers/managements/interactions/DGAInteractionTable.vue'
import DGAInteractionCrud from '@/views/dga/growers/managements/interactions/DGAInteractionCrud.vue'

export default {
  name: 'DGAInteractions',

  components: {
    DGAInteractionTable,
    DGAInteractionCrud
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
          label: 'Interactions',
          class: 'text-xs',
          to: '/dga/interactions'
        }
      ]
    }
  }
}
</script>
