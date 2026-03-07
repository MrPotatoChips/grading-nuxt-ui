<template>
  <UModal
    v-model:open="modalProductCategory"
    title="Category"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formProductCategory"
        :state="formProductCategory"
        :schema="validationProductCategory"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Product Group"
              name="group_id"
              required
            >
              <USelectMenu
                v-model="selected.productGroup"
                placeholder="select product group"
                class="w-full"
                value-key="id"
                label-key="group_name"
                :items="options.productGroups"
                :loading="fetching.productGroups"
                :disabled="fetching.productGroups"
                @update:search-term="searchProductGroups"
              />
            </UFormField>

            <UFormField
              label="Category Code"
              name="category_code"
              required
            >
              <UInput
                v-model="formProductCategory.category_code"
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
                v-model="formProductCategory.category_name"
                placeholder="enter category name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Reference"
              name="reference"
            >
              <UInput
                v-model.number="formProductCategory.reference"
                type="number"
                placeholder="enter reference"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Valid"
              name="valid"
              required
            >
              <USelect
                v-model="formProductCategory.valid"
                :items="validOptions"
                placeholder="Select validity"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formProductCategory.active"
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
          @click.prevent="validateProductCategory"
        >
          {{ state.editing ? 'Update' : 'Create' }} Category
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

import MProductGroups from '@/mixins/maintenances/product-groups'

import { SAdminProductCategories } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminProductCategoryCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MProductGroups
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalProductCategory: false,
      validOptions: ['Y', 'N'],
      validationProductCategory: yup.object().shape({
        id: yup.string().nullable(),
        group_id: yup.number().required().label('product group'),
        category_code: yup.string().required().label('product category code'),
        category_name: yup.string().required().label('product category name'),
        reference: yup.number().nullable().label('reference'),
        valid: yup.string().required().oneOf(['Y', 'N']).label('valid'),
        active: yup.boolean()
      }),
      formProductCategory: {
        id: '',
        group_id: '',
        category_code: '',
        category_name: '',
        reference: null,
        valid: 'Y',
        active: true
      }
    }
  },

  watch: {
    'selected.productGroup' (group) {
      this.formProductCategory.group_id = group
    }
  },

  methods: {

    createProductCategory() {
      this.state.editing = false

      this.formProductCategory = {
        id: '',
        group_id: '',
        category_code: '',
        category_name: '',
        reference: null,
        valid: 'Y',
        active: true
      }

      this.getProductGroups(this)

      this.modalProductCategory = true
    },

    editProductCategory(productCategory) {
      this.state.editing = true

      this.formProductCategory = {
        id: productCategory.id,
        group_id: '',
        category_code: productCategory.category_code,
        category_name: productCategory.category_name,
        reference: productCategory.reference,
        valid: productCategory.valid,
        active: Number(productCategory.active) === 1
      }

      this.getProductGroups(this).finally(() => {
        this.selected.productGroup = productCategory.group_id
      })

      this.modalProductCategory = true
    },

    async validateProductCategory() {
      this.$refs.formProductCategory.validate({ silent: true }).then(
        async validProductCategory => {
          if (!validProductCategory) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminProductCategories.put : SAdminProductCategories.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Category?`,
            preConfirm: async () => {
              return createOrUpdate(this.formProductCategory).then(
                ({ data: { message, product_category }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', product_category)
                    } else {
                      this.$emit('update:rows', product_category)
                    }
                  })

                  this.modalProductCategory = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formProductCategory.setErrors(validationError)
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
