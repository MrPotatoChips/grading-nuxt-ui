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
            @click.prevent="() => $refs.municipalityCrud.createMunicipality()"
          >
            Create Municipality
          </UButton>
        </div>
      </div>
    </section>

    <AdminMunicipalityTable
      ref="municipalityTable"
      @edit:municipality="municipality => $refs.municipalityCrud.editMunicipality(municipality)"
      @delete:municipality="municipality => $refs.municipalityCrud.deleteMunicipality(municipality)"
    />

    <AdminMunicipalityCrud
      ref="municipalityCrud"
      @update:rows="() => $refs.municipalityTable.tableApi().refresh()"
      @update:row="municipality => $refs.municipalityTable.tableApi().updateRow(municipality)"
    />
  </UContainer>
</template>
<script>
import AdminMunicipalityTable from '@/views/admin/locations/municipalities/AdminMunicipalityTable.vue'
import AdminMunicipalityCrud from '@/views/admin/locations/municipalities/AdminMunicipalityCrud.vue'

export default {
  name: 'AdminMunicipalities',

  components: {
    AdminMunicipalityTable,
    AdminMunicipalityCrud
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
          label: 'Municipalities',
          class: 'text-xs',
          to: '/admin/locations/municipalities'
        }
      ]
    }
  }
}
</script>
