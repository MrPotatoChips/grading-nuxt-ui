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
            @click.prevent="() => $refs.growerDocumentCrud.createDocument()"
          >
            Create Document
          </UButton>
        </div>
      </div>
    </section>

    <DGADocumentTable
      ref="growerDocumentTable"
      @edit:growerDocument="growerDocument => $refs.growerDocumentCrud.editDocument(growerDocument)"
      @delete:growerDocument="growerDocument => $refs.growerDocumentCrud.deleteDocument(growerDocument)"
    />

    <DGADocumentCrud
      ref="growerDocumentCrud"
      @update:rows="() => $refs.growerDocumentTable.tableApi().refresh()"
      @update:row="growerDocument => $refs.growerDocumentTable.tableApi().updateRow(growerDocument)"
    />
  </UContainer>
</template>
<script>
import DGADocumentTable from '@/views/dga/growers/managements/documents/DGADocumentTable.vue'
import DGADocumentCrud from '@/views/dga/growers/managements/documents/DGADocumentCrud.vue'

export default {
  name: 'DGADocuments',

  components: {
    DGADocumentTable,
    DGADocumentCrud
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
          label: 'Documents',
          class: 'text-xs',
          to: '/dga/documents'
        }
      ]
    }
  }
}
</script>
