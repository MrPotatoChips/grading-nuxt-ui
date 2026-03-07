<template>
  <UModal
    v-model:open="modalGrower"
    title="Grower"
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField
              label="User"
              name="user_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.user"
                placeholder="select user"
                class="w-full"
                value-key="id"
                label-key="user_name"
                :items="options.users"
                :loading="fetching.users"
                :disabled="fetching.users"
                @update:search-term="searchUsers"
              />
            </UFormField>

            <UFormField
              label="Verifier"
              name="verifier_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selectedVerifier"
                placeholder="select verifier"
                class="w-full"
                value-key="id"
                label-key="user_name"
                :items="options.users"
                :loading="fetching.users"
                :disabled="fetching.users"
                @update:search-term="searchUsers"
              />
            </UFormField>

            <UFormField
              label="Status"
              name="status"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="formGrower.status"
                placeholder="select status"
                class="w-full"
                :items="['New', 'Verified']"
              />
            </UFormField>

            <UFormField
              label="First Name"
              name="first_name"
              class="col-span-1"
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
              class="col-span-1"
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
              class="col-span-1"
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
              class="col-span-1"
            >
              <UInput
                v-model="formGrower.suffix_name"
                placeholder="enter suffix name (e.g., Jr., Sr.)"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Email"
              name="email"
              class="col-span-1"
            >
              <UInput
                v-model="formGrower.email"
                type="email"
                placeholder="enter email"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Mobile Number"
              name="mobile_number"
              class="col-span-1"
            >
              <UInput
                v-model="formGrower.mobile_number"
                placeholder="enter mobile number"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Birth Date"
              name="birth_date"
              class="col-span-1"
            >
              <UInput
                v-model="formGrower.birth_date"
                type="date"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Gender"
              name="gender"
              class="col-span-1"
            >
              <USelectMenu
                v-model="formGrower.gender"
                placeholder="select gender"
                class="w-full"
                :items="['Male', 'Female', 'Other']"
              />
            </UFormField>

            <UFormField
              label="Address"
              name="address"
              class="col-span-2"
            >
              <UInput
                v-model="formGrower.address"
                placeholder="enter address"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Region"
              name="region_id"
              class="col-span-1"
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
                :disabled="fetching.provinces || !selected.region"
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
                :disabled="fetching.municipalities || !selected.province"
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
                :disabled="fetching.barangays || !selected.municipality"
                @update:search-term="searchBarangays"
              />
            </UFormField>

            <UFormField
              label="Area"
              name="area_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.area"
                placeholder="select area"
                class="w-full"
                value-key="id"
                label-key="area_name"
                :items="options.areas"
                :loading="fetching.areas"
                :disabled="fetching.areas"
                @update:search-term="searchAreas"
              />
            </UFormField>

            <UFormField
              label="Cluster"
              name="cluster_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.cluster"
                placeholder="select cluster"
                class="w-full"
                value-key="id"
                label-key="cluster_name"
                :items="options.clusters"
                :loading="fetching.clusters"
                :disabled="fetching.clusters || !selected.area"
                @update:search-term="searchClusters"
              />
            </UFormField>

            <UFormField
              label="Remarks"
              name="remarks"
              class="col-span-2"
            >
              <UTextarea
                v-model="formGrower.remarks"
                placeholder="enter remarks"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <USwitch
              v-model="formGrower.is_blo"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Is BLO?"
              size="sm"
            />

            <USwitch
              v-model="formGrower.is_aljay"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Is Aljay?"
              size="sm"
            />

            <USwitch
              v-model="formGrower.is_financier"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Is Financier?"
              size="sm"
            />

            <USwitch
              v-model="formGrower.is_mango_contractor"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Is Mango Contractor?"
              size="sm"
            />

            <USwitch
              v-model="formGrower.is_trader"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Is Trader?"
              size="sm"
            />

            <USwitch
              v-if="state.editing"
              v-model="formGrower.active"
              unchecked-icon="i-lucide-x"
              checked-icon="i-lucide-check"
              label="Active?"
              size="sm"
            />
          </div>
        </div>
      </UForm>
    </template>
    <template #footer="{ close }">
      <div class="w-full flex justify-end gap-2">
        <UButton
          color="primary"
          @click.prevent="validateGrower"
        >
          {{ state.editing ? 'Update' : 'Create' }} Grower
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

import MUsers from '@/mixins/accounts/users'
import MRegions from '@/mixins/locations/regions'
import MProvinces from '@/mixins/locations/provinces'
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'
import MAreas from '@/mixins/locations/areas'
import MClusters from '@/mixins/locations/clusters'

import { SAdminGrowers } from '@/services/admin'
import { overlays } from '@/composables/overlays'

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
        first_name: yup.string().nullable().max(50).label('first name'),
        middle_name: yup.string().nullable().max(50).label('middle name'),
        last_name: yup.string().nullable().max(50).label('last name'),
        suffix_name: yup.string().nullable().max(10).label('suffix name'),
        email: yup.string().email().nullable().max(100).label('email'),
        mobile_number: yup.string().nullable().max(11).label('mobile number'),
        birth_date: yup.string().nullable().label('birth date'),
        gender: yup.string().nullable().oneOf(['Male', 'Female', 'Other']).label('gender'),
        address: yup.string().nullable().max(255).label('address'),
        region_id: yup.string().nullable().label('region'),
        province_id: yup.string().nullable().label('province'),
        municipality_id: yup.string().nullable().label('municipality'),
        barangay_id: yup.string().nullable().label('barangay'),
        area_id: yup.string().nullable().label('area'),
        cluster_id: yup.string().nullable().label('cluster'),
        is_blo: yup.boolean().required().label('is blo'),
        is_aljay: yup.boolean().required().label('is aljay'),
        is_financier: yup.boolean().required().label('is financier'),
        is_mango_contractor: yup.boolean().required().label('is mango contractor'),
        is_trader: yup.boolean().required().label('is trader'),
        remarks: yup.string().nullable().label('remarks')
      }),
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
      this.formGrower.verifier_id = verifier?.id || verifier || ''
    },

    'selected.region' (region) {
      this.formGrower.region_id = region?.id || region || ''
    },

    'selected.province' (province) {
      this.formGrower.province_id = province?.id || province || ''
    },

    'selected.municipality' (municipality) {
      this.formGrower.municipality_id = municipality?.id || municipality || ''
    },

    'selected.barangay' (barangay) {
      this.formGrower.barangay_id = barangay?.id || barangay || ''
    },

    'selected.area' (area) {
      this.formGrower.area_id = area?.id || area || ''
    },

    'selected.cluster' (cluster) {
      this.formGrower.cluster_id = cluster?.id || cluster || ''
    }
  },

  methods: {

    createGrower() {
      this.state.editing = false

      this.selectedVerifier = ''

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
