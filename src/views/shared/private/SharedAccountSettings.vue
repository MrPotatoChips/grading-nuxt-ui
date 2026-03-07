<template>
  <UContainer>
    <UTabs color="neutral" variant="link" :content="false" :items="items" class="w-full" />
  </UContainer>
</template>
<script>
export default {
  name: 'VSharedPrivateAccountSettingsBase',
  data () {
    return {
      items: [
        {
          label: 'Account'
        },
        {
          label: 'Password'
        }
      ]
    }
  }
}
</script>
