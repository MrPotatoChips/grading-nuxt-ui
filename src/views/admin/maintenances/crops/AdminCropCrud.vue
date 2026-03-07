<template>
  <UModal
    v-model:open="modalCrop"
    title="Crop"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCrop"
        :state="formCrop"
        :schema="validationCrop"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Crop Code"
              name="crop_code"
              required
            >
              <UInput
                v-model="formCrop.crop_code"
                placeholder="enter crop code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Crop Name"
              name="crop_name"
              required
            >
              <UInput
                v-model="formCrop.crop_name"
                placeholder="enter crop name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Crop Category"
              name="crop_category_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="selected.cropCategory"
                placeholder="select crop category"
                class="w-full"
                value-key="id"
                label-key="category_name"
                :items="options.cropCategories"
                :loading="fetching.cropCategories"
                :disabled="fetching.cropCategories"
                @update:search-term="searchCropCategories"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCrop.active"
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
          @click.prevent="validateCrop"
        >
          {{ state.editing ? 'Update' : 'Create' }} Crop
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

import { SAdminCrops } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminCropCrud',

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
      modalCrop: false,
      validationCrop: yup.object().shape({
        id: yup.string().nullable(),
        crop_code: yup.string().required().max(30).label('crop code'),
        crop_name: yup.string().required().max(100).label('crop name'),
        crop_category_id: yup.string().nullable().label('crop category')
      }),
      formCrop: {
        id: '',
        crop_category_id: '',
        crop_code: '',
        crop_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.cropCategory' (category) {
      this.formCrop.crop_category_id = category
    }
  },

  methods: {

    createCrop() {
      this.state.editing = false

      this.formCrop = {
        id: '',
        crop_category_id: '',
        crop_code: '',
        crop_name: '',
        active: true
      }

      this.getCropCategories(this)

      this.modalCrop = true
    },

    editCrop(crop) {
      this.state.editing = true

      this.formCrop = {
        id: crop.id,
        crop_category_id: '',
        crop_code: crop.crop_code,
        crop_name: crop.crop_name,
        active: Number(crop.active) === 1
      }

      this.getCropCategories(this).finally(() => {
        this.selected.cropCategory = crop.crop_category_id
      })

      this.modalCrop = true
    },

    async validateCrop() {
      this.$refs.formCrop.validate({ silent: true }).then(
        async validCrop => {
          if (!validCrop) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminCrops.put : SAdminCrops.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Crop?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCrop).then(
                ({ data: { message, crop }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', crop)
                    } else {
                      this.$emit('update:rows', crop)
                    }
                  })

                  this.modalCrop = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCrop.setErrors(validationError)
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
