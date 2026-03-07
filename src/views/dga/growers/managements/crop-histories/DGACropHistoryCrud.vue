<template>
  <UModal
    v-model:open="modalCropHistory"
    title="Crop History"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCropHistory"
        :state="formCropHistory"
        :schema="validationCropHistory"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Crop History Code"
              name="crop_history_code"
              required
            >
              <UInput
                v-model="formCropHistory.crop_history_code"
                placeholder="enter crop history code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Crop History Name"
              name="crop_history_name"
              required
            >
              <UInput
                v-model="formCropHistory.crop_history_name"
                placeholder="enter crop history name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCropHistory.active"
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
          @click.prevent="validateCropHistory"
        >
          {{ state.editing ? 'Update' : 'Create' }} Crop History
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

import MCropHistories from '@/mixins/accounts/roles'

import { SDGAgentGrowerCropHistories } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'

export default {
  name: 'DGACropHistoryCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MCropHistories
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalCropHistory: false,
      validationCropHistory: yup.object().shape({
        id: yup.string().nullable(),
        crop_history_code: yup.string().required().label('crop_history code'),
        crop_history_name: yup.string().required().label('crop_history name')
      }),
      formCropHistory: {
        id: '',
        grower_code: '',
        grower_name: '',
        active: true
      }
    }
  },

  methods: {

    createCropHistory() {
      this.state.editing = false

      this.formCropHistory = {
        id: '',
        crop_history_code: '',
        crop_history_name: '',
        active: true
      }

      this.modalCropHistory = true
    },

    editCropHistory(cropHistory) {
      this.state.editing = true

      this.formCropHistory = {
        id: cropHistory.id,
        crop_history_code: cropHistory.crop_history_code,
        crop_history_name: cropHistory.crop_history_name,
        active: Number(cropHistory.active) === 1
      }

      this.modalCropHistory = true
    },

    async validateCropHistory() {
      this.$refs.formCropHistory.validate({ silent: true }).then(
        async validCropHistory => {
          if (!validCropHistory) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentGrowerCropHistories.put : SDGAgentGrowerCropHistories.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} CropHistory?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCropHistory).then(
                ({ data: { message, crop_history }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', crop_history)
                    } else {
                      this.$emit('update:rows', crop_history)
                    }
                  })

                  this.modalCropHistory = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCropHistory.setErrors(validationError)
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
