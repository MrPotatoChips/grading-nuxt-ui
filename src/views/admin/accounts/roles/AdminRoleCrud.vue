<template>
  <UModal
    v-model:open="modalRole"
    title="Role"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
  >
    <template #body>
      <UForm
        ref="formRole"
        :state="formRole"
        :schema="validationRole"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField
              label="First Name"
              name="first_name"
              required
            >
              <UInput
                v-model="formRole.first_name"
                placeholder="enter first name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Last Name"
              name="last_name"
              required
            >
              <UInput
                v-model="formRole.last_name"
                placeholder="enter last name"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            label="Mobile Number"
            name="mobile_number"
          >
            <UInput
              v-model="formRole.mobile_number"
              placeholder="enter mobile number"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            required
          >
            <UInput
              v-model="formRole.email"
              type="email"
              placeholder="enter email address"
              class="w-full"
              autocomplete="off"
            />
          </UFormField>

          <UFormField
            label="Rolename"
            name="username.9"
            required
          >
            <UInput
              v-model="formRole.username"
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
              v-model="formRole.password"
              type="password"
              placeholder="enter password"
              class="w-full"
              autocomplete="off"
            />
          </UFormField>

          <UFormField
            label="Role"
            name="role_id"
            required
          >
            <USelectMenu
              v-model="formRole.role_id"
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

          <USwitch
            v-if="state.editing"
            v-model="formRole.active"
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
          @click.prevent="validateRole"
        >
          {{ state.editing ? 'Update' : 'Create' }} Role
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

import { SAdminRoles } from '@/services/admin'

export default {
  name: 'AdminRoleCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MRoles
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalRole: false,
      validationRole: yup.object().shape({
        id: yup.string().nullable(),
        first_name: yup.string().required().label('first name'),
        last_name: yup.string().required().label('last name'),
        mobile_number: yup.string().max(11).nullable().label('mobile number'),
        email: yup.string().email().required().label('email'),
        username: yup.string().required().label('username'),
        password: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () =>  yup.string().min(8).required(),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password'),
        role_id: yup.string().required().label('role')
      }),
      formRole: {
        id: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        username: '',
        password: '',
        role_id: '',
        active: true
      }
    }
  },

  methods: {

    createRole() {
      this.state.editing = false

      this.formRole = {
        id: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        username: '',
        password: '',
        role_id: '',
        active: true
      }

      this.getRoles(this)

      this.modalRole = true
    },

    editRole(user) {
      this.state.editing = true

      this.formRole = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        mobile_number: user.mobile_number,
        email: user.email,
        username: user.username,
        password: user.password,
        role_id: '',
        active: Number(user.active) === 1
      }

      this.getRoles(this).finally(() => {
        this.formRole.role_id = user.role_id
      })

      this.modalRole = true
    },

    async validateRole() {
      this.$refs.formRole.validate({ silent: true }).then(
        async validRole => {
          if (validRole) {
            const createOrUpdate = this.state.editing ? SAdminRoles.put : SAdminRoles.post

            return createOrUpdate(this.formRole).then(
              () => {
                if (this.state.editing) {
                  this.$emit('update:row', this.formRole)
                } else {
                  this.$emit('update:rows', this.formRole)
                }

                this.modalRole = false
              }
            ).catch(
              ({ message }) => {
                if (message && message.errors) {
                  const validationError = Object.keys(message.errors).map(name => ({
                    name,
                    message: message.errors[name][0]
                  }))

                  this.$refs.formRole.setErrors(validationError)
                }
              }
            ).finally(() => {

            })
          }
        }
      )
    },

    async deleteRole(user) {
      if (confirm(`Are you sure you want to delete user ${user.first_name} ${user.first_name}?`)) {
        return SAdminRoles.delete({ id: user.id }).then(
          () => {
            this.$emit('update:rows', this.formRole)
            // Show success notification
          }
        ).catch(() => {
          // Handle error
        })
      }
    }
  }
}
</script>
