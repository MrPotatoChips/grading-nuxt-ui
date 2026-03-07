<template>
  <UModal
    v-model:open="modalProductGroup"
    title="Product Group"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formProductGroup"
        :state="formProductGroup"
        :schema="validationProductGroup"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Group Code"
              name="group_code"
              required
            >
              <UInput
                v-model="formProductGroup.group_code"
                placeholder="enter group code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Group Name"
              name="group_name"
              required
            >
              <UInput
                v-model="formProductGroup.group_name"
                placeholder="enter group name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formProductGroup.active"
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
          @click.prevent="validateProductGroup"
        >
          {{ state.editing ? 'Update' : 'Create' }} Product Group
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

import { SAdminProductGroups } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminProductGroupCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalProductGroup: false,
      validationProductGroup: yup.object().shape({
        id: yup.string().nullable(),
        group_code: yup.string().required().label('product group code'),
        group_name: yup.string().required().label('product group name')
      }),
      formProductGroup: {
        id: '',
        group_code: '',
        group_name: '',
        active: true
      }
    }
  },

  methods: {

    createProductGroup() {
      this.state.editing = false

      this.formProductGroup = {
        id: '',
        group_code: '',
        group_name: '',
        active: true
      }

      this.modalProductGroup = true
    },

    editProductGroup(productGroup) {
      this.state.editing = true

      this.formProductGroup = {
        id: productGroup.id,
        group_code: productGroup.group_code,
        group_name: productGroup.group_name,
        active: Number(productGroup.active) === 1
      }

      this.modalProductGroup = true
    },

    async validateProductGroup() {
      this.$refs.formProductGroup.validate({ silent: true }).then(
        async validProductGroup => {
          if (!validProductGroup) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminProductGroups.put : SAdminProductGroups.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Product Group?`,
            preConfirm: async () => {
              return createOrUpdate(this.formProductGroup).then(
                ({ data: { message, product_group }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', product_group)
                    } else {
                      this.$emit('update:rows', product_group)
                    }
                  })

                  this.modalProductGroup = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formProductGroup.setErrors(validationError)
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
