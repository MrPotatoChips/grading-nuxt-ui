<template>
  <UModal
    v-model:open="modalProvince"
    title="Province"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formProvince"
        :state="formProvince"
        :schema="validationProvince"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">

            <UFormField
              label="Province Name"
              name="province_name"
              required
            >
              <UInput
                v-model="formProvince.province_name"
                placeholder="enter province name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Region"
              name="region_id"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="selected.region"
                placeholder="select region"
                class="w-full"
                value-key="id"
                label-key="region_name"
                :items="options.regions"
                :loading="fetching.regions"
                :disabled="fetching.regions"
                @update:search-term="searchRegions"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formProvince.active"
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
          @click.prevent="validateProvince"
        >
          {{ state.editing ? 'Update' : 'Create' }} Province
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

import MRegions from '@/mixins/locations/regions'

import { SAdminProvinces } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminProvinceCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MRegions
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalProvince: false,
      validationProvince: yup.object().shape({
        id: yup.string().nullable(),
        region_id: yup.string().required().label('region'),
        province_name: yup.string().required().label('province name')
      }),
      formProvince: {
        id: '',
        region_id: '',
        province_code: '',
        province_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.region' (region) {
      this.formProvince.region_id = region
    }
  },

  methods: {

    createProvince() {
      this.state.editing = false

      this.formProvince = {
        id: '',
        region_id: '',
        province_name: '',
        active: true
      }

      this.getRegions(this)

      this.modalProvince = true
    },

    editProvince(province) {
      this.state.editing = true

      this.formProvince = {
        id: province.id,
        region_id: '',
        province_name: province.province_name,
        active: Number(province.active) === 1
      }

      this.getRegions(this).finally(() => {
        this.selected.region = province.region_id
      })

      this.modalProvince = true
    },

    async validateProvince() {
      this.$refs.formProvince.validate({ silent: true }).then(
        async validProvince => {
          if (!validProvince) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminProvinces.put : SAdminProvinces.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Province?`,
            preConfirm: async () => {
              return createOrUpdate(this.formProvince).then(
                ({ data: { message, province }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', province)
                    } else {
                      this.$emit('update:rows', province)
                    }
                  })

                  this.modalProvince = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formProvince.setErrors(validationError)
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
