<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-6">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click.prevent="() => $refs.documentTypeCrud.createDocumentType()"
          >
            Create Document Type
          </UButton>
        </div>
      </div>
    </section>

    <AdminDocumentTypeTable
      ref="documentTypeTable"
      @edit:documentType="documentType => $refs.documentTypeCrud.editDocumentType(documentType)"
      @delete:documentType="documentType => $refs.documentTypeCrud.deleteDocumentType(documentType)"
    />

    <AdminDocumentTypeCrud
      ref="documentTypeCrud"
      @update:rows="() => $refs.documentTypeTable.tableApi().refresh()"
      @update:row="documentType => $refs.documentTypeTable.tableApi().updateRow(documentType)"
    />
  </UContainer>
</template>
<script>
import AdminDocumentTypeTable from '@/views/admin/maintenances/document-types/AdminDocumentTypeTable.vue'
import AdminDocumentTypeCrud from '@/views/admin/maintenances/document-types/AdminDocumentTypeCrud.vue'

export default {
  name: 'AdminDocumentTypes',

  components: {
    AdminDocumentTypeTable,
    AdminDocumentTypeCrud
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
          label: 'Maintenances',
          class: 'text-xs'
        },
        {
          label: 'Document Types',
          class: 'text-xs',
          to: '/admin/maintenances/document-types'
        }
      ]
    }
  }
}
</script>
