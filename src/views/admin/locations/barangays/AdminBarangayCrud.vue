<template>
  <UModal
    v-model:open="modalBarangay"
    title="Barangay"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formBarangay"
        :state="formBarangay"
        :schema="validationBarangay"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">

            <UFormField
              label="Barangay Name"
              name="barangay_name"
              required
            >
              <UInput
                v-model="formBarangay.barangay_name"
                placeholder="enter barangay name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Municipality"
              name="municipality_id"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="selected.municipality"
                placeholder="select municipality"
                class="w-full"
                value-key="id"
                label-key="municipality_name"
                :items="options.municipalities"
                :loading="fetching.municipalities"
                :disabled="fetching.municipalities"
                @update:search-term="searchMunicipalities"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formBarangay.active"
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
          @click.prevent="validateBarangay"
        >
          {{ state.editing ? 'Update' : 'Create' }} Barangay
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

import MMunicipalities from '@/mixins/locations/municipalities'

import { SAdminBarangays } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminBarangayCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MMunicipalities
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalBarangay: false,
      validationBarangay: yup.object().shape({
        id: yup.string().nullable(),
        municipality_id: yup.string().required().label('municipality'),
        barangay_name: yup.string().required().label('barangay name')
      }),
      formBarangay: {
        id: '',
        municipality_id: '',
        barangay_code: '',
        barangay_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.municipality' (municipality) {
      this.formBarangay.municipality_id = municipality
    }
  },

  methods: {

    createBarangay() {
      this.state.editing = false

      this.formBarangay = {
        id: '',
        municipality_id: '',
        barangay_name: '',
        active: true
      }

      this.getMunicipalities(this)

      this.modalBarangay = true
    },

    editBarangay(barangay) {
      this.state.editing = true

      this.formBarangay = {
        id: barangay.id,
        municipality_id: '',
        barangay_name: barangay.barangay_name,
        active: Number(barangay.active) === 1
      }

      this.getMunicipalities(this).finally(() => {
        this.selected.municipality = barangay.municipality_id
      })

      this.modalBarangay = true
    },

    async validateBarangay() {
      this.$refs.formBarangay.validate({ silent: true }).then(
        async validBarangay => {
          if (!validBarangay) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminBarangays.put : SAdminBarangays.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Barangay?`,
            preConfirm: async () => {
              return createOrUpdate(this.formBarangay).then(
                ({ data: { message, barangay }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', barangay)
                    } else {
                      this.$emit('update:rows', barangay)
                    }
                  })

                  this.modalBarangay = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formBarangay.setErrors(validationError)
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
