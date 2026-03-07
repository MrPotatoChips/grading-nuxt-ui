<template>
  <UModal
    v-model:open="modalCropCategory"
    title="Crop Category"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCropCategory"
        :state="formCropCategory"
        :schema="validationCropCategory"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Category Code"
              name="category_code"
              required
            >
              <UInput
                v-model="formCropCategory.category_code"
                placeholder="enter category code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Category Name"
              name="category_name"
              required
            >
              <UInput
                v-model="formCropCategory.category_name"
                placeholder="enter category name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCropCategory.active"
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
          @click.prevent="validateCropCategory"
        >
          {{ state.editing ? 'Update' : 'Create' }} Crop Category
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

import MCropCategories from '@/mixins/maintenances/crop-categories'

import { SAdminCropCategories } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminCropCategoryCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MCropCategories
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalCropCategory: false,
      validationCropCategory: yup.object().shape({
        id: yup.string().nullable(),
        category_code: yup.string().required().max(30).label('category code'),
        category_name: yup.string().required().max(100).label('category name')
      }),
      formCropCategory: {
        id: '',
        category_code: '',
        category_name: '',
        active: true
      }
    }
  },

  methods: {

    createCropCategory() {
      this.state.editing = false

      this.formCropCategory = {
        id: '',
        category_code: '',
        category_name: '',
        active: true
      }

      this.modalCropCategory = true
    },

    editCropCategory(cropCategory) {
      this.state.editing = true

      this.formCropCategory = {
        id: cropCategory.id,
        category_code: cropCategory.category_code,
        category_name: cropCategory.category_name,
        active: Number(cropCategory.active) === 1
      }

      this.modalCropCategory = true
    },

    async validateCropCategory() {
      this.$refs.formCropCategory.validate({ silent: true }).then(
        async validCropCategory => {
          if (!validCropCategory) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminCropCategories.put : SAdminCropCategories.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Crop Category?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCropCategory).then(
                ({ data: { message, cropCategory }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', cropCategory)
                    } else {
                      this.$emit('update:rows', cropCategory)
                    }
                  })

                  this.modalCropCategory = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCropCategory.setErrors(validationError)
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
