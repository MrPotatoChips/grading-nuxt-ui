<template>
  <div
    class="flex gap-2"
  >
    <UFormField
      label="Province"
      name="province_id"
      class="grow"
      required
    >
      <USelectMenu
        v-model="formProvince.id"
        placeholder="select province"
        class="w-full"
        value-key="id"
        label-key="name"
        :items="options.provinces"
        :loading="fetching.provinces"
        :disabled="fetching.provinces"
        @update:search-term="searchProvinces"
      />
    </UFormField>
    <UButton
      class="self-end"
    >
      Add Province
    </UButton>
  </div>
</template>
<script>
import MProvinces from '@/mixins/locations/provinces'

export default {
  name: 'AdminUserProvinceCrud',

  mixins: [
    MProvinces
  ],

  data () {
    return {
      formProvince: {
        id: ''
      }
    }
  }
}
</script>
