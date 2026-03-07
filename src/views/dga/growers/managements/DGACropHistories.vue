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
            @click.prevent="() => $refs.cropHistoryCrud.createCropHistory()"
          >
            Create Crop History
          </UButton>
        </div>
      </div>
    </section>

    <DGACropHistoryTable
      ref="cropHistoryTable"
      @edit:cropHistory="cropHistory => $refs.cropHistoryCrud.editCropHistory(cropHistory)"
      @delete:cropHistory="cropHistory => $refs.cropHistoryCrud.deleteCropHistory(cropHistory)"
    />

    <DGACropHistoryCrud
      ref="cropHistoryCrud"
      @update:rows="() => $refs.cropHistoryTable.tableApi().refresh()"
      @update:row="cropHistory => $refs.cropHistoryTable.tableApi().updateRow(cropHistory)"
    />
  </UContainer>
</template>
<script>
import DGACropHistoryTable from '@/views/dga/growers/managements/crop-histories/DGACropHistoryTable.vue'
import DGACropHistoryCrud from '@/views/dga/growers/managements/crop-histories/DGACropHistoryCrud.vue'

export default {
  name: 'DGACropHistories',

  components: {
    DGACropHistoryTable,
    DGACropHistoryCrud
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
          label: 'CropHistories',
          class: 'text-xs',
          to: '/dga/cropHistorys'
        }
      ]
    }
  }
}
</script>
