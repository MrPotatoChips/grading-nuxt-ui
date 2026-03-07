<template>
  <UModal
    v-model:open="modalArea"
    title="Area"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formGrower"
        :state="formGrower"
        :schema="validationGrower"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Area Code"
              name="area_code"
              required
            >
              <UInput
                v-model="formGrower.area_code"
                placeholder="enter area code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Area Name"
              name="area_name"
              required
            >
              <UInput
                v-model="formGrower.area_name"
                placeholder="enter area name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formGrower.active"
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
          @click.prevent="validateArea"
        >
          {{ state.editing ? 'Update' : 'Create' }} Area
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

import MAreas from '@/mixins/accounts/roles'

import { SDGAgentGrowers } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'

export default {
  name: 'DGAGrowerCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MAreas
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalArea: false,
      validationGrower: yup.object().shape({
        id: yup.string().nullable(),
        area_code: yup.string().required().label('area code'),
        area_name: yup.string().required().label('area name')
      }),
      formGrower: {
        id: '',
        grower_code: '',
        grower_name: '',
        active: true
      }
    }
  },

  methods: {

    createArea() {
      this.state.editing = false

      this.formGrower = {
        id: '',
        area_code: '',
        area_name: '',
        active: true
      }

      this.modalArea = true
    },

    editArea(area) {
      this.state.editing = true

      this.formGrower = {
        id: area.id,
        area_code: area.area_code,
        area_name: area.area_name,
        active: Number(area.active) === 1
      }

      this.modalArea = true
    },

    async validateArea() {
      this.$refs.formGrower.validate({ silent: true }).then(
        async validArea => {
          if (!validArea) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentGrowers.put : SDGAgentGrowers.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Area?`,
            preConfirm: async () => {
              return createOrUpdate(this.formGrower).then(
                ({ data: { message, area }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', area)
                    } else {
                      this.$emit('update:rows', area)
                    }
                  })

                  this.modalArea = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formGrower.setErrors(validationError)
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
