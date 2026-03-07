<template>
  <UModal
    v-model:open="modalDocument"
    title="Document"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formDocument"
        :state="formDocument"
        :schema="validationDocument"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Document Code"
              name="grower_document_code"
              required
            >
              <UInput
                v-model="formDocument.grower_document_code"
                placeholder="enter grower document code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Document Name"
              name="grower_document_name"
              required
            >
              <UInput
                v-model="formDocument.grower_document_name"
                placeholder="enter grower document name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formDocument.active"
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
          @click.prevent="validateDocument"
        >
          {{ state.editing ? 'Update' : 'Create' }} Document
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

import MDocuments from '@/mixins/accounts/roles'

import { SDGAgentGrowerDocuments } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'

export default {
  name: 'DGADocumentCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MDocuments
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalDocument: false,
      validationDocument: yup.object().shape({
        id: yup.string().nullable(),
        grower_document_code: yup.string().required().label('grower document code'),
        grower_document_name: yup.string().required().label('grower document name')
      }),
      formDocument: {
        id: '',
        grower_document_code: '',
        grower_document_name: '',
        active: true
      }
    }
  },

  methods: {

    createDocument() {
      this.state.editing = false

      this.formDocument = {
        id: '',
        grower_document_code: '',
        grower_document_name: '',
        active: true
      }

      this.modalDocument = true
    },

    editDocument(growerDocument) {
      this.state.editing = true

      this.formDocument = {
        id: growerDocument.id,
        grower_document_code: growerDocument.grower_document_code,
        grower_document_name: growerDocument.grower_document_name,
        active: Number(growerDocument.active) === 1
      }

      this.modalDocument = true
    },

    async validateDocument() {
      this.$refs.formDocument.validate({ silent: true }).then(
        async validDocument => {
          if (!validDocument) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentGrowerDocuments.put : SDGAgentGrowerDocuments.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Document?`,
            preConfirm: async () => {
              return createOrUpdate(this.formDocument).then(
                ({ data: { message, grower_document }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', grower_document)
                    } else {
                      this.$emit('update:rows', grower_document)
                    }
                  })

                  this.modalDocument = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formDocument.setErrors(validationError)
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
