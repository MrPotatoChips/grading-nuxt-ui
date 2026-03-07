<template>
  <UModal
    v-model:open="modalDocumentType"
    title="Document Type"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formDocumentType"
        :state="formDocumentType"
        :schema="validationDocumentType"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Type Code"
              name="document_type_code"
              required
            >
              <UInput
                v-model="formDocumentType.document_type_code"
                placeholder="enter document type code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Type Name"
              name="document_type_name"
              required
            >
              <UInput
                v-model="formDocumentType.document_type_name"
                placeholder="enter document type name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Type Category"
              name="document_type_category"
              required
            >
              <USelect
                v-model="formDocumentType.document_type_category"
                :items="options.categories"
                placeholder="Select category"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formDocumentType.active"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            default-value
            label="Active?"
            size="sm"
          />
        </div>
      </UForm>
    </template>
    <template #footer="{ close }">
      <div class="w-full flex justify-end gap-2">
        <UButton
          color="primary"
          @click.prevent="validateDocumentType"
        >
          {{ state.editing ? 'Update' : 'Create' }} Document Type
        </UButton>
        <UButton
          label="Discard"
          color="neutral"
          variant="outline"
          @click.prevent="close"
        />
      </div>
    </template>
  </UModal>
</template>
<script>
import * as yup from 'yup'

import { SAdminDocumentTypes } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminDocumentTypeCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalDocumentType: false,
      options: {
        categories: ['Grower', 'Event', 'Others']
      },
      validationDocumentType: yup.object().shape({
        id: yup.string().nullable(),
        document_type_code: yup.string().required().label('document type code'),
        document_type_name: yup.string().required().label('document type name'),
        document_type_category: yup.string().required().oneOf(['Grower', 'Event', 'Others']).label('document type category')
      }),
      formDocumentType: {
        id: '',
        document_type_code: '',
        document_type_name: '',
        document_type_category: '',
        active: true
      }
    }
  },

  methods: {

    createDocumentType() {
      this.state.editing = false

      this.formDocumentType = {
        id: '',
        document_type_code: '',
        document_type_name: '',
        document_type_category: '',
        active: true
      }

      this.modalDocumentType = true
    },

    editDocumentType(documentType) {
      this.state.editing = true

      this.formDocumentType = {
        id: documentType.id,
        document_type_code: documentType.document_type_code,
        document_type_name: documentType.document_type_name,
        document_type_category: documentType.document_type_category,
        active: Number(documentType.active) === 1
      }

      this.modalDocumentType = true
    },

    async validateDocumentType() {
      this.$refs.formDocumentType.validate({ silent: true }).then(
        async validDocumentType => {
          if (!validDocumentType) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminDocumentTypes.put : SAdminDocumentTypes.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Document Type?`,
            preConfirm: async () => {
              return createOrUpdate(this.formDocumentType).then(
                ({ data: { message, documentType }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', documentType)
                    } else {
                      this.$emit('update:rows', documentType)
                    }
                  })

                  this.modalDocumentType = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formDocumentType.setErrors(validationError)
                  }
                }
              ).finally(() => {

              })
            }
          })
        }
      )
    }
  }
}
</script>
