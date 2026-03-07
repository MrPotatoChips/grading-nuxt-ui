<template>
  <UModal
    v-model:open="modalFarm"
    title="Farm"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formFarm"
        :state="formFarm"
        :schema="validationFarm"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Farm Name"
              name="farm_name"
              class="col-span-1"
              required
            >
              <UInput
                v-model="formFarm.farm_name"
                placeholder="enter farm name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Land Size"
              name="land_size"
              class="col-span-1"
              hint="( In Hectares )"
              required
            >
              <UInput
                v-model="formFarm.land_size"
                placeholder="enter land size"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Province"
              name="province_id"
              class="col-span-1"
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
                :ui="{ content: 'md:min-w-fit wrap-break-word' }"
                @update:search-term="searchProvinces"
              />
            </UFormField>

            <UFormField
              label="Municipality"
              name="municipality_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.municipality"
                placeholder="select municipality"
                class="w-full"
                value-key="id"
                label-key="municipality_name"
                :items="options.municipalities"
                :loading="fetching.municipalities"
                :disabled="fetching.municipalities || fetching.provinces"
                :ui="{ content: 'md:min-w-fit wrap-break-word' }"
                @update:search-term="searchMunicipalities"
              />
            </UFormField>

            <UFormField
              label="Barangay"
              name="barangay_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.barangay"
                placeholder="select barangay"
                class="w-full"
                value-key="id"
                label-key="barangay_name"
                :items="options.barangays"
                :loading="fetching.barangays"
                :disabled="fetching.barangays || fetching.municipalities || fetching.provinces"
                :ui="{ content: 'md:min-w-fit wrap-break-word' }"
                @update:search-term="searchBarangays"
              />
            </UFormField>

            <USwitch
              v-model="formFarm.active"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Same as Grower Address?"
              size="md"
            />

            <UFormField
              label="Description"
              name="description"
              class="col-span-1"
            >
              <UTextarea
                v-model="formFarm.description"
                placeholder="enter description"
                class="w-full"
                autoresize
                :rows="6"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formFarm.active"
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
          @click.prevent="validateFarm"
        >
          {{ state.editing ? 'Update' : 'Create' }} Farm
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

import MFarms from '@/mixins/accounts/roles'

import { SDGAgentGrowerFarms } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'

export default {
  name: 'DGAFarmCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MFarms
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalFarm: false,
      validationFarm: yup.object().shape({
        id: yup.string().nullable(),
        farm_code: yup.string().required().label('farm code'),
        farm_name: yup.string().required().label('farm name')
      }),
      formFarm: {
        id: '',
        farm_name: '',
        land_size: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        remarks: '',
        active: true
      }
    }
  },

  methods: {

    createFarm() {
      this.state.editing = false

      this.formFarm = {
        id: '',
        farm_code: '',
        farm_name: '',
        active: true
      }

      this.modalFarm = true
    },

    editFarm(farm) {
      this.state.editing = true

      this.formFarm = {
        id: farm.id,
        farm_code: farm.farm_code,
        farm_name: farm.farm_name,
        active: Number(farm.active) === 1
      }

      this.modalFarm = true
    },

    async validateFarm() {
      this.$refs.formFarm.validate({ silent: true }).then(
        async validFarm => {
          if (!validFarm) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentGrowerFarms.put : SDGAgentGrowerFarms.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Farm?`,
            preConfirm: async () => {
              return createOrUpdate(this.formFarm).then(
                ({ data: { message, farm }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', farm)
                    } else {
                      this.$emit('update:rows', farm)
                    }
                  })

                  this.modalFarm = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formFarm.setErrors(validationError)
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
