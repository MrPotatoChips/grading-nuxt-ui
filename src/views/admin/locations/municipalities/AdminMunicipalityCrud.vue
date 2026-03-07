<template>
  <UModal
    v-model:open="modalMunicipality"
    title="Municipality"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formMunicipality"
        :state="formMunicipality"
        :schema="validationMunicipality"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">

            <UFormField
              label="Municipality Name"
              name="municipality_name"
              required
            >
              <UInput
                v-model="formMunicipality.municipality_name"
                placeholder="enter municipality name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Province"
              name="province_id"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="selected.province"
                placeholder="select province"
                class="w-full"
                value-key="id"
                label-key="province_name"
                :items="options.provinces"
                :loading="fetching.provinces"
                :disabled="fetching.provinces"
                @update:search-term="searchProvinces"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formMunicipality.active"
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
          @click.prevent="validateMunicipality"
        >
          {{ state.editing ? 'Update' : 'Create' }} Municipality
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

import MProvinces from '@/mixins/locations/provinces'

import { SAdminMunicipalities } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminMunicipalityCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MProvinces
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalMunicipality: false,
      validationMunicipality: yup.object().shape({
        id: yup.string().nullable(),
        province_id: yup.string().required().label('province'),
        municipality_name: yup.string().required().label('municipality name')
      }),
      formMunicipality: {
        id: '',
        province_id: '',
        municipality_code: '',
        municipality_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.province' (province) {
      this.formMunicipality.province_id = province
    }
  },

  methods: {

    createMunicipality() {
      this.state.editing = false

      this.formMunicipality = {
        id: '',
        province_id: '',
        municipality_name: '',
        active: true
      }

      this.getProvinces(this)

      this.modalMunicipality = true
    },

    editMunicipality(municipality) {
      this.state.editing = true

      this.formMunicipality = {
        id: municipality.id,
        province_id: '',
        municipality_name: municipality.municipality_name,
        active: Number(municipality.active) === 1
      }

      this.getProvinces(this).finally(() => {
        this.selected.province = municipality.province_id
      })

      this.modalMunicipality = true
    },

    async validateMunicipality() {
      this.$refs.formMunicipality.validate({ silent: true }).then(
        async validMunicipality => {
          if (!validMunicipality) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminMunicipalities.put : SAdminMunicipalities.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Municipality?`,
            preConfirm: async () => {
              return createOrUpdate(this.formMunicipality).then(
                ({ data: { message, municipality }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', municipality)
                    } else {
                      this.$emit('update:rows', municipality)
                    }
                  })

                  this.modalMunicipality = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formMunicipality.setErrors(validationError)
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
