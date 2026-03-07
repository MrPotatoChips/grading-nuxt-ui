<template>
  <UModal
    v-model:open="modalCollege"
    title="College"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCollege"
        :state="formCollege"
        :schema="validationCollege"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="College Code"
              name="college_code"
              required
            >
              <UInput
                v-model="formCollege.college_code"
                placeholder="enter college code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="College Name"
              name="college_name"
              required
            >
              <UInput
                v-model="formCollege.college_name"
                placeholder="enter college name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Province"
              name="province_id"
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

            <UFormField
              label="Municipality"
              name="municipality_id"
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

            <UFormField
              label="Barangay"
              name="barangay_id"
              required
            >
              <USelectMenu
                v-model="selected.barangay"
                placeholder="select barangay"
                class="w-full"
                value-key="id"
                label-key="barangay_name"
                :items="options.barangays"
                :loading="fetching.barangays"
                :disabled="fetching.barangays"
                @update:search-term="searchBarangays"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCollege.active"
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
          @click.prevent="validateCollege"
        >
          {{ state.editing ? 'Update' : 'Create' }} College
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
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'

import { SAdminColleges } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminCollegeCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MProvinces,
    MMunicipalities,
    MBarangays
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalCollege: false,
      validationCollege: yup.object().shape({
        id: yup.string().nullable(),
        college_code: yup.string().required().label('college code'),
        college_name: yup.string().required().label('college name'),
        province_id: yup.string().required().label('province'),
        municipality_id: yup.string().required().label('municipality'),
        barangay_id: yup.string().required().label('barangay')
      }),
      formCollege: {
        id: '',
        college_code: '',
        college_name: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: true
      }
    }
  },

  watch: {
    'selected.province' (province) {
      this.formCollege.province_id = province
    },

    'selected.municipality' (municipality) {
      this.formCollege.municipality_id = municipality
    },

    'selected.barangay' (barangay) {
      this.formCollege.barangay_id = barangay
    }
  },

  methods: {

    createCollege() {
      this.state.editing = false

      this.formCollege = {
        id: '',
        college_code: '',
        college_name: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: true
      }

      this.selected.province = ''
      this.selected.municipality = ''
      this.selected.barangay = ''

      this.getProvinces(this)

      this.modalCollege = true
    },

    editCollege(college) {
      this.state.editing = true

      this.formCollege = {
        id: college.id,
        college_code: college.college_code,
        college_name: college.college_name,
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: Number(college.active) === 1
      }

      this.editable.municipality = college.municipality_id
      this.editable.barangay = college.barangay_id

      this.getProvinces(this).finally(() => {
        this.selected.province = college.province_id
      })

      this.modalCollege = true
    },

    async validateCollege() {
      this.$refs.formCollege.validate({ silent: true }).then(
        async validCollege => {
          if (!validCollege) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminColleges.put : SAdminColleges.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} College?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCollege).then(
                ({ data: { message, college }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', college)
                    } else {
                      this.$emit('update:rows', college)
                    }
                  })

                  this.modalCollege = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCollege.setErrors(validationError)
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
