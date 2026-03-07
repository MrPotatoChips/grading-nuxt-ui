<template>
  <UModal
    v-model:open="modalUser"
    title="Create User"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden',
      content: 'md:max-w-4xl'
    }"
  >
    <template #body>
      <UForm
        ref="formUser"
        :state="formUser"
        :schema="validationUser"
        @submit.prevent
      >
        <div class="space-y-4">
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <UFormField
              label="First Name"
              name="first_name"
              class="col-span-1"
              required
            >
              <UInput
                v-model="formUser.first_name"
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
                v-model="formUser.middle_name"
                placeholder="enter middle name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Last Name"
              name="last_name"
              class="col-span-1"
              required
            >
              <UInput
                v-model="formUser.last_name"
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
                v-model="formUser.suffix_name"
                placeholder="enter suffix name"
                class="w-full"
              />
            </UFormField>

            <div
              class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <UFormField
                label="Mobile Number"
                name="mobile_number"
              >
                <UInput
                  v-model="formUser.mobile_number"
                  placeholder="enter mobile number"
                  class="w-full"
                  maxlength="11"
                />
              </UFormField>

              <UFormField
                label="Email"
                name="email"
                class="md:col-span-2"
                required
              >
                <UInput
                  v-model="formUser.email"
                  type="email"
                  placeholder="enter email"
                  class="w-full"
                  autocomplete="off"
                />
              </UFormField>

              <UFormField
                label="Notification Email"
                name="notification_email"
                class="md:col-span-2 md:col-start-2"
              >
                <UInput
                  v-model="formUser.notification_email"
                  type="email"
                  placeholder="enter notification email"
                  class="w-full"
                  autocomplete="off"
                />
              </UFormField>
            </div>

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
                :disabled="fetching.municipalities"
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
                :disabled="fetching.barangays"
                @update:search-term="searchBarangays"
              />
            </UFormField>

            <UFormField
              label="Username"
              name="username"
              required
            >
              <UInput
                v-model="formUser.username"
                placeholder="enter username"
                class="w-full"
                autocomplete="off"
              />
            </UFormField>

            <UFormField
              label="Password"
              name="password"
              :required="!state.editing"
            >
              <UInput
                v-model="formUser.password"
                type="password"
                placeholder="enter password"
                class="w-full"
                autocomplete="off"
              />
            </UFormField>

            <UFormField
              label="Password Confirmation"
              name="password_confirmation"
              :required="!state.editing"
            >
              <UInput
                v-model="formUser.password_confirmation"
                type="password"
                placeholder="enter password confirmation"
                class="w-full"
                autocomplete="off"
              />
            </UFormField>

            <UFormField
              label="Role"
              name="role_id"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="selected.role"
                placeholder="select role"
                class="w-full"
                value-key="id"
                label-key="role_name"
                :items="options.roles"
                :loading="fetching.roles"
                :disabled="fetching.roles"
                @update:search-term="searchRoles"
              />
            </UFormField>

            <UFormField
              label="College"
              name="college_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.college"
                placeholder="select college"
                class="w-full"
                value-key="id"
                label-key="college_name"
                :items="options.colleges"
                :loading="fetching.colleges"
                :disabled="fetching.colleges"
                @update:search-term="searchColleges"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formUser.active"
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
          @click.prevent="validateUser"
        >
          {{ state.editing ? 'Update' : 'Create' }} User
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
import { isEmpty } from 'lodash'
import * as yup from 'yup'

import MProvinces from '@/mixins/locations/provinces'
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'

import MRoles from '@/mixins/accounts/roles'
import MColleges from '@/mixins/maintenances/colleges'

import { SAdminUsers } from '@/services/admin'
import { overlays } from '@/composables/overlays'


export default {
  name: 'AdminUserCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MProvinces,
    MMunicipalities,
    MBarangays,
    MRoles,
    MColleges
  ],

  data() {
    return {
      state: {
        editing: false,
      },
      filterable: {
        college: false
      },
      modalUser: false,
      validationUser: yup.object().shape({
        id: yup.string().nullable(),
        first_name: yup.string().required().label('first name'),
        middle_name: yup.string().nullable().label('middle name'),
        last_name: yup.string().required().label('last name'),
        suffix_name: yup.string().nullable().label('suffix name'),
        mobile_number: yup.string().max(11).nullable().label('mobile number'),
        email: yup.string().email().required().label('email'),
        notification_email: yup.string().email().nullable().label('notification email'),
        username: yup.string().required().label('username'),
        password: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () => yup.string().min(8).required(),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password'),
        password_confirmation: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () => yup.string().min(8).equals([yup.ref('password')], 'password confirmation not matched').required().label('password confirmation'),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password confirmation'),
        provinces: yup.array().of(yup.string()).nullable().label('provinces'),
        role_id: yup.string().required().label('role'),
        college_id: yup.string().nullable().label('college')
      }),
      formUser: {
        id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix_name: '',
        mobile_number: '',
        email: '',
        notification_email: '',
        username: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        college_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: true
      }
    }
  },

  watch: {
    'selected.role'(role) {
      this.formUser.role_id = role
    },

    'selected.college'(college) {
      this.formUser.college_id = college
    },

    'selected.province'(province) {
      this.formUser.province_id = province
    },

    'selected.municipality'(municipality) {
      this.formUser.municipality_id = municipality
    },

    'selected.barangay'(barangay) {
      this.formUser.barangay_id = barangay
    }
  },

  methods: {

    vTabDetails() {
      if (this.$refs.formUser) {
        if (this.$refs.formUser.errors.length > 0) {
          return {
            leadingIcon: 'animate__animated animate__infinite animate__tada',
            trigger: 'data-[state=active]:text-error-600 data-[state=inactive]:text-error-600 hover:data-[state=inactive]:not-disabled:text-error-600'
          }
        }
      }

      return {}
    },

    createUser() {
      this.state.editing = false

      this.formUser = {
        id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix_name: '',
        mobile_number: '',
        email: '',
        notification_email: '',
        username: '',
        password: '',
        role_id: '',
        college_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: true
      }

      this.getProvinces(this).finally(() => {
        this.getRoles(this)
        this.getColleges(this)
      })

      this.modalUser = true
    },

    editUser(user) {
      this.state.editing = true

      this.editable.municipality = user.municipality_id
      this.editable.barangay = user.barangay_id

      this.formUser = {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        suffix_name: user.suffix_name,
        mobile_number: user.mobile_number,
        email: user.email,
        notification_email: user.notification_email,
        username: user.username,
        password: user.password,
        role_id: '',
        college_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        active: Number(user.active) === 1
      }

      this.getProvinces(this).finally(() => {
        this.selected.province = user.province_id

        this.getRoles(this).finally(() => {
          this.selected.role = user.role_id
        })

        this.getColleges(this).finally(() => {
          this.selected.college = user.college_id
        })
      })

      this.modalUser = true
    },

    async validateUser() {
      this.$refs.formUser.validate({ silent: true }).then(
        async validUser => {
          if (!validUser) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminUsers.put : SAdminUsers.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} User?`,
            preConfirm: async () => {
              return createOrUpdate(this.formUser).then(
                ({ data: { message, user } }) => {
                  if (this.state.editing) {
                    this.$emit('update:row', user)
                  } else {
                    this.$emit('update:rows', user)
                  }

                  overlays.success({ body: message })

                  this.modalUser = false

                  return message
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formUser.setErrors(validationError)
                  }
                }
              ).finally(() => {

              })
            }
          })
        }
      )
    },

    async deleteUser(user) {
      overlays.confirm({
        confirmButtonText: 'Delete',
        body: `Delete User ${user.first_name} ${user.last_name}?`,
        preConfirm: async () => {
          return SAdminUsers.delete({ id: user.id }).then(
            () => {
              this.$emit('update:rows', this.formUser)
              // Show success notification
            }
          ).catch(() => {
            // Handle error
          })
        }
      })
    }
  }
}
</script>
