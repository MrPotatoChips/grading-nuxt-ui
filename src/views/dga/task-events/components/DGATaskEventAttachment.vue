<template>
  <UForm
    ref="formTaskEvent"
    :state="formTaskEvent"
    :schema="validationTaskEvent"
    @submit.prevent
  >
    <UFileUpload
      layout="list"
      multiple
      label="Drop your images here"
      description="SVG, PNG, JPG or GIF (max. 2MB)"
      class="w-96"
      :ui="{
        base: 'min-h-48'
      }"
    />
  </UForm>
</template>
<script>
import * as yup from 'yup'

export default {
  name: 'DGATaskEventAttachment',

  data () {
    return {
      validationTaskEvent: yup.object().shape({
        attachments: yup.array().of(
          yup.object().shape({
            fileName: yup.string().required(),
            fileSize: yup.number().required(),
            fileType: yup.string().required()
          })
        )
      }),
      formTaskEvent: {
        attachments: []
      }
    }
  }
}
</script>
