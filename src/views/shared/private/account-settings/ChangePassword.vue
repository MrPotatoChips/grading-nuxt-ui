<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <!-- Breadcrumb -->
    <section class="mb-8">
      <div class="flex md:flex-row justify-between gap-4">
        <div class="flex gap-2">
        </div>
      </div>
    </section>

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
            label="New Password"
            name="new_password"
            :required="!state.editing"
          >
            <UInput
              v-model="formUser.new_password"
              type="password"
              placeholder="enter new password"
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
        </div>

        <UButton
          color="primary"
          @click.prevent="validateUser"
        >
          {{ state.editing ? 'Update' : 'Create' }} User
        </UButton>

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

  </UContainer>
</template>
<script>
import { overlays } from '@/composables/overlays'
import { SSharedAuth } from '@/services/shared'
import { isEmpty } from 'lodash'
import * as yup from 'yup'

export default {
  name: 'SharedChangePassword',

  data () {
    return {
      breadcrumbs: [
        {
          label: 'Account Settings',
          class: 'text-xs',
          to: '/account-settings'
        },
        {
          label: 'Change Password',
          class: 'text-xs',
          to: '/account-settings/change-password'
        }
      ],
      state: {
        editing: false,
      },
      modalUser: false,
      validationUser: yup.object().shape({
        id: yup.string().nullable(),
        password: yup.string().min(8).required().label('password'),
        new_password: yup.string().not([yup.ref('password')], 'password and new password must not match').label('new password'),
        password_confirmation: yup.string().when('id', {
          is: value => isEmpty(value),
          then: () => yup.string().min(8).equals([yup.ref('new_password')], 'password confirmation not matched').required().label('password confirmation'),
          otherwise: () => yup.string().min(8).nullable()
        }).label('password confirmation'),
      }),
      formUser: {
        id: '',
        password: '',
        new_password: '',
        password_confirmation: '',
        active: true
      }
    }
  },

  methods: {


    async validateUser() {
      this.$refs.formUser.validate({ silent: true }).then(
        async validUser => {
          if (!validUser) {
            return overlays.invalid()
          }

          const createOrUpdate = SSharedAuth.changePassword

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
    }
  }
}
</script>
