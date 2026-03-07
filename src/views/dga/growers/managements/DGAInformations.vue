<template>
    <UForm
      ref="formGrower"
      :state="formGrower"
      :schema="validationGrower"
      @submit.prevent
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UFormField
            label="First Name"
            name="first_name"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.first_name"
              placeholder="enter first name"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Middle Name"
            name="middle_name"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.middle_name"
              placeholder="enter middle name"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Last Name"
            name="last_name"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.last_name"
              placeholder="enter last name"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Suffix Name"
            name="suffix_name"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.suffix_name"
              placeholder="enter suffix name (e.g., Jr., Sr.)"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Mobile Number"
            name="mobile_number"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.mobile_number"
              placeholder="enter mobile number"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            class="col-span-4 md:col-span-2"
          >
            <UInput
              v-model="formGrower.email"
              type="email"
              placeholder="enter email"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Gender"
            name="gender"
            class="col-span-4 md:col-span-1"
          >
            <USelectMenu
              v-model="formGrower.gender"
              placeholder="select gender"
              class="w-full"
              :items="['Male', 'Female']"
            />
          </UFormField>

          <UFormField
            label="Birth Date"
            name="birth_date"
            class="col-span-2 md:col-span-1"
          >
            <UInputDate
              ref="fBirthDate"
              v-model="selected.birthDate"
              class="w-full"
            >
              <template #trailing>
                <UModal
                  title="Birth Date"
                  description="Choose the birth date"
                >
                  <UButton
                    color="neutral"
                    variant="link"
                    icon="i-lucide-calendar"
                    aria-label="Select a date"
                    class="p-0"
                  />

                  <template #body="{ close }">
                    <UCalendar
                      v-model="selected.birthDate"
                      size="xl"
                      @update:model-value="close"
                    />
                  </template>
                </UModal>
              </template>
            </UInputDate>
          </UFormField>

          <UFormField
            label="Age"
            name="age"
            class="col-span-4 md:col-span-1"
          >
            <UInput
              v-model="formGrower.age"
              type="number"
              placeholder="0"
              class="w-full"
              disabled
            />
          </UFormField>

          <div class="col-span-4" />

          <UFormField
            label="Province"
            name="province_id"
            class="col-span-4 md:col-span-1"
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
            class="col-span-4 md:col-span-1"
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
            class="col-span-4 md:col-span-1"
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

          <UFormField
            label="Landmark / Street / Zone"
            name="address"
            class="col-span-2"
          >
            <UTextarea
              v-model="formGrower.address"
              placeholder="enter landmark / street / zone"
              class="w-full"
              autoresize
              :rows="6"
            />
          </UFormField>

          <UFormField
            label="Other Informations"
            name="remarks"
            class="col-span-2"
          >
            <UTextarea
              v-model="formGrower.remarks"
              placeholder="enter other informations"
              class="w-full"
              autoresize
              :rows="6"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <USwitch
            v-model="formGrower.is_blo"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Is BLO?"
            size="md"
          />

          <USwitch
            v-model="formGrower.is_aljay"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Is Aljay?"
            size="md"
          />

          <USwitch
            v-model="formGrower.is_financier"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Is Financier?"
            size="md"
          />

          <USwitch
            v-model="formGrower.is_mango_contractor"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Is Mango Contractor?"
            size="md"
          />

          <USwitch
            v-model="formGrower.is_trader"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Is Trader?"
            size="md"
          />

          <USwitch
            v-if="state.editing"
            v-model="formGrower.active"
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            label="Active?"
            size="md"
          />
        </div>

        <div>
          <UButton
            @click.prevent="validateGrower"
          >
            Save Information
          </UButton>
        </div>
      </div>
    </UForm>
</template>
<script>
import * as yup from 'yup'

import MUsers from '@/mixins/accounts/users'
import MRegions from '@/mixins/locations/regions'
import MProvinces from '@/mixins/locations/provinces'
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'
import MAreas from '@/mixins/locations/areas'
import MClusters from '@/mixins/locations/clusters'

import { SAdminGrowers } from '@/services/admin'
import { overlays } from '@/composables/overlays'

import { getLocalTimeZone, today } from '@internationalized/date'

export default {
  name: 'AdminGrowerCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MUsers,
    MRegions,
    MProvinces,
    MMunicipalities,
    MBarangays,
    MAreas,
    MClusters
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      selectedVerifier: '',
      modalGrower: false,
      validationGrower: yup.object().shape({
        id: yup.string().nullable(),
        user_id: yup.string().nullable().label('user'),
        verifier_id: yup.string().nullable().label('verifier'),
        status: yup.string().required().oneOf(['New', 'Verified']).label('status'),
        first_name: yup.string().required().max(50).label('first name'),
        middle_name: yup.string().nullable().max(50).label('middle name'),
        last_name: yup.string().required().max(50).label('last name'),
        suffix_name: yup.string().nullable().max(10).label('suffix name'),
        email: yup.string().email().nullable().max(100).label('email'),
        mobile_number: yup.string().nullable().max(11).label('mobile number'),
        birth_date: yup.string().required().label('birth date'),
        gender: yup.string().oneOf(['Male', 'Female']).label('gender'),
        address: yup.string().nullable().max(255).label('address'),
        region_id: yup.string().nullable().label('region'),
        province_id: yup.string().required().label('province'),
        municipality_id: yup.string().required().label('municipality'),
        barangay_id: yup.string().required().label('barangay'),
        area_id: yup.string().nullable().label('area'),
        cluster_id: yup.string().nullable().label('cluster'),
        is_blo: yup.boolean().required().label('is blo'),
        is_aljay: yup.boolean().required().label('is aljay'),
        is_financier: yup.boolean().required().label('is financier'),
        is_mango_contractor: yup.boolean().required().label('is mango contractor'),
        is_trader: yup.boolean().required().label('is trader'),
        remarks: yup.string().nullable().label('remarks')
      }),
      selected: {
        eventDate: ''
      },
      formGrower: {
        id: '',
        user_id: '',
        verifier_id: '',
        status: 'New',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix_name: '',
        email: '',
        mobile_number: '',
        birth_date: '',
        age: '',
        gender: '',
        address: '',
        region_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        area_id: '',
        cluster_id: '',
        is_blo: false,
        is_aljay: false,
        is_financier: false,
        is_mango_contractor: false,
        is_trader: false,
        remarks: '',
        active: true
      }
    }
  },

  watch: {
    'selected.user' (user) {
      this.formGrower.user_id = user?.id || user || ''
    },

    selectedVerifier (verifier) {
      this.formGrower.verifier_id = verifier || ''
    },

    'selected.birthDate'(birthDate) {
      this.formGrower.birth_date = birthDate?.toString() || ''
    },

    'selected.province' (province) {
      this.formGrower.province_id = province || ''
    },

    'selected.municipality' (municipality) {
      this.formGrower.municipality_id = municipality || ''
    },

    'selected.barangay' (barangay) {
      this.formGrower.barangay_id = barangay || ''
    },

    'selected.area' (area) {
      this.formGrower.area_id = area || ''
    },

    'selected.cluster' (cluster) {
      this.formGrower.cluster_id = cluster || ''
    }
  },

  mounted() {
    this.getProvinces(this)
  },

  methods: {

    createGrower() {
      this.state.editing = false

      this.selectedVerifier = ''

      this.selected.eventDate = today(getLocalTimeZone())

      this.formGrower = {
        id: '',
        user_id: '',
        verifier_id: '',
        status: 'New',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix_name: '',
        email: '',
        mobile_number: '',
        birth_date: '',
        gender: '',
        address: '',
        region_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        area_id: '',
        cluster_id: '',
        is_blo: false,
        is_aljay: false,
        is_financier: false,
        is_mango_contractor: false,
        is_trader: false,
        remarks: '',
        active: true
      }

      this.getUsers(this)
      this.getRegions(this)
      this.getAreas(this)

      this.modalGrower = true
    },

    editGrower(grower) {
      this.state.editing = true

      this.formGrower = {
        id: grower.id,
        user_id: grower.user_id || '',
        verifier_id: grower.verifier_id || '',
        status: grower.status || 'New',
        first_name: grower.first_name || '',
        middle_name: grower.middle_name || '',
        last_name: grower.last_name || '',
        suffix_name: grower.suffix_name || '',
        email: grower.email || '',
        mobile_number: grower.mobile_number || '',
        birth_date: grower.birth_date || '',
        gender: grower.gender || '',
        address: grower.address || '',
        region_id: grower.region_id || '',
        province_id: grower.province_id || '',
        municipality_id: grower.municipality_id || '',
        barangay_id: grower.barangay_id || '',
        area_id: grower.area_id || '',
        cluster_id: grower.cluster_id || '',
        is_blo: Number(grower.is_blo) === 1,
        is_aljay: Number(grower.is_aljay) === 1,
        is_financier: Number(grower.is_financier) === 1,
        is_mango_contractor: Number(grower.is_mango_contractor) === 1,
        is_trader: Number(grower.is_trader) === 1,
        remarks: grower.remarks || '',
        active: Number(grower.active) === 1
      }

      this.editable.region = grower.region_id
      this.editable.province = grower.province_id
      this.editable.municipality = grower.municipality_id
      this.editable.barangay = grower.barangay_id
      this.editable.area = grower.area_id
      this.editable.cluster = grower.cluster_id

      this.getUsers(this).finally(() => {
        this.selected.user = grower.user_id
        this.selectedVerifier = grower.verifier_id
      })

      this.getRegions(this).finally(() => {
        this.selected.region = grower.region_id
      })

      this.getAreas(this).finally(() => {
        this.selected.area = grower.area_id
      })

      this.modalGrower = true
    },

    async validateGrower() {
      this.$refs.formGrower.validate({ silent: true }).then(
        async validGrower => {
          if (!validGrower) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminGrowers.put : SAdminGrowers.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Grower?`,
            preConfirm: async () => {
              return createOrUpdate(this.formGrower).then(
                ({ data: { message, grower }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', grower)
                    } else {
                      this.$emit('update:rows', grower)
                    }
                  })

                  this.modalGrower = false
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
