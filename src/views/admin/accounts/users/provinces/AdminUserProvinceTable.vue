<template>
  <UFormField
    label="Search"
  >
    <UInput
      class="w-full"
      placeholder="search here"
    />
  </UFormField>
  <UTable
    class="mt-4"
    :data="[
      {
        action: 'Add Province',
        province: 'Province 1',
        region: 'Region 1'
      },
      {
        action: 'Add Province',
        province: 'Province 2',
        region: 'Region 2'
      }
    ]"
  />
</template>
<script>
export default {
  name: 'AdminUserProvinceTable'
}
</script>
