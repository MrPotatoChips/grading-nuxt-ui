<template>
  <UModal
    v-model:open="modalUser"
    title="Create User"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden',
      content: 'md:max-w-4xl',
      body: 'pt-2 sm:py-2 overflow-hidden',
      header: 'hidden'
    }"
  >
    <template #body>
      <UTabs
        size="sm"
        variant="link"
        :unmount-on-hide="false"
        :items="[
          {
            label: 'Details',
            description: 'ABC',
            slot: 'details',
            icon: 'i-lucide-file-text',
            ui: this.vTabDetails()
          },
          {
            label: 'Provinces',
            description: 'ABC',
            slot: 'provinces',
            icon: 'i-lucide-map-pin'
          }
        ]"
        :ui="{
          content: 'h-[calc(100vh-140px)] md:h-[calc(100vh-200px)] overflow-y-auto'
        }"
      >
        <template #details>
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

                <div />

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
                    label-key="name"
                    :items="options.roles"
                    :loading="fetching.roles"
                    :disabled="fetching.roles"
                    @update:search-term="searchRoles"
                  />
                </UFormField>

                <UFormField
                  label="Area"
                  name="area_id"
                  class="col-span-1"
                  required
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
                    :disabled="fetching.clusters"
                    @update:search-term="searchClusters"
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
        <template #provinces>
          <AdminUserProvinces />
        </template>
      </UTabs>
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

import MRoles from '@/mixins/accounts/roles'
import MAreas from '@/mixins/locations/areas'
import MClusters from '@/mixins/locations/clusters'

import { SAdminUsers } from '@/services/admin'
import { overlays } from '@/composables/overlays'

import AdminUserProvinces from './AdminUserProvinces.vue'

export default {
  name: 'AdminUserCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  components: {
    AdminUserProvinces
  },

  mixins: [
    MRoles,
    MAreas,
    MClusters
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalUser: false,
      validationUser: yup.object().shape({
        id: yup.string().nullable(),
        first_name: yup.string().required().label('first name'),
        last_name: yup.string().required().label('last name'),
        mobile_number: yup.string().max(11).nullable().label('mobile number'),
        email: yup.string().email().required().label('email'),
        notification_email: yup.string().email().nullable().label('notification email'),
        username: yup.string().required().label('username'),
        password: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () =>  yup.string().min(8).required(),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password'),
        password_confirmation: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () => yup.string().min(8).equals([yup.ref('password')], 'password confirmation not matched').required().label('password confirmation'),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password confirmation'),
        provinces: yup.array().of(yup.string()).nullable().label('provinces'),
        role_id: yup.string().required().label('role'),
        area_id: yup.string().required().label('area'),
        cluster_id: yup.string().notRequired().label('cluster')
      }),
      formUser: {
        id: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        notification_email: '',
        username: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        area_id: '',
        cluster_id: '',
        active: true
      }
    }
  },

  watch: {
    'selected.role' (role) {
      this.formUser.role_id = role
    },

    'selected.area' (area) {
      this.formUser.area_id = area
    }
  },

  methods: {

    vTabDetails () {
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
        last_name: '',
        mobile_number: '',
        email: '',
        username: '',
        password: '',
        role_id: '',
        area_id: '',
        cluster_id: '',
        active: true
      }

      this.getRoles(this).then(() => {
        this.getAreas(this)
      })

      this.modalUser = true
    },

    editUser(user) {
      this.state.editing = true

      this.editable.cluster = user.cluster_id

      this.formUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        mobile_number: user.mobile_number,
        email: user.email,
        username: user.username,
        password: user.password,
        role_id: '',
        area_id: '',
        cluster_id: '',
        active: Number(user.active) === 1
      }

      this.getRoles(this).finally(() => {
        this.selected.role = user.role_id

        this.getAreas(this).finally(() => {
          this.selected.area = user.area_id
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
