<template>
  <UModal
    v-model:open="modalRegion"
    title="Region"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formRegion"
        :state="formRegion"
        :schema="validationRegion"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Region Code"
              name="region_code"
              required
            >
              <UInput
                v-model="formRegion.region_code"
                placeholder="enter region code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Region Name"
              name="region_name"
              required
            >
              <UInput
                v-model="formRegion.region_name"
                placeholder="enter region name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formRegion.active"
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
          @click.prevent="validateRegion"
        >
          {{ state.editing ? 'Update' : 'Create' }} Region
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

import { SAdminRegions } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminRegionCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalRegion: false,
      validationRegion: yup.object().shape({
        id: yup.string().nullable(),
        region_code: yup.string().required().label('region code'),
        region_name: yup.string().required().label('region name')
      }),
      formRegion: {
        id: '',
        region_code: '',
        region_name: '',
        active: true
      }
    }
  },

  methods: {

    createRegion() {
      this.state.editing = false

      this.formRegion = {
        id: '',
        region_code: '',
        region_name: '',
        active: true
      }

      this.modalRegion = true
    },

    editRegion(region) {
      this.state.editing = true

      this.formRegion = {
        id: region.id,
        region_code: region.region_code,
        region_name: region.region_name,
        active: Number(region.active) === 1
      }

      this.modalRegion = true
    },

    async validateRegion() {
      this.$refs.formRegion.validate({ silent: true }).then(
        async validRegion => {
          if (!validRegion) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminRegions.put : SAdminRegions.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Region?`,
            preConfirm: async () => {
              return createOrUpdate(this.formRegion).then(
                ({ data: { message, region }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', region)
                    } else {
                      this.$emit('update:rows', region)
                    }
                  })

                  this.modalRegion = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formRegion.setErrors(validationError)
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
