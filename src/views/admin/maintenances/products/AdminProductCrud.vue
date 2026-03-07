<template>
  <UModal
    v-model:open="modalProduct"
    title="Product"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formProduct"
        :state="formProduct"
        :schema="validationProduct"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Product Category"
              name="category_id"
              required
            >
              <USelectMenu
                v-model="selected.productCategory"
                placeholder="select product category"
                class="w-full"
                value-key="id"
                label-key="category_name"
                :items="options.productCategories"
                :loading="fetching.productCategories"
                :disabled="fetching.productCategories"
                @update:search-term="searchProductCategories"
              />
            </UFormField>

            <UFormField
              label="Product Code"
              name="product_code"
              required
            >
              <UInput
                v-model="formProduct.product_code"
                placeholder="enter product code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Product Name"
              name="product_name"
              required
            >
              <UInput
                v-model="formProduct.product_name"
                placeholder="enter product name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Reference"
              name="reference"
            >
              <UInput
                v-model.number="formProduct.reference"
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
                v-model="formProduct.valid"
                :items="validOptions"
                placeholder="Select validity"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formProduct.active"
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
          @click.prevent="validateProduct"
        >
          {{ state.editing ? 'Update' : 'Create' }} Product
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

import MProductCategories from '@/mixins/maintenances/product-categories'

import { SAdminProducts } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminProductCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MProductCategories
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalProduct: false,
      validOptions: ['Y', 'N'],
      validationProduct: yup.object().shape({
        id: yup.string().nullable(),
        category_id: yup.number().required().label('product category'),
        product_code: yup.string().required().label('product code'),
        product_name: yup.string().required().label('product name'),
        reference: yup.number().nullable().label('reference'),
        valid: yup.string().required().oneOf(['Y', 'N']).label('valid'),
        active: yup.boolean()
      }),
      formProduct: {
        id: '',
        category_id: '',
        product_code: '',
        product_name: '',
        reference: null,
        valid: 'Y',
        active: true
      }
    }
  },

  watch: {
    'selected.productCategory' (category) {
      this.formProduct.category_id = category
    }
  },

  methods: {

    createProduct() {
      this.state.editing = false

      this.formProduct = {
        id: '',
        category_id: '',
        product_code: '',
        product_name: '',
        reference: null,
        valid: 'Y',
        active: true
      }

      this.getProductCategories(this)

      this.modalProduct = true
    },

    editProduct(product) {
      this.state.editing = true

      this.formProduct = {
        id: product.id,
        category_id: '',
        product_code: product.product_code,
        product_name: product.product_name,
        reference: product.reference,
        valid: product.valid,
        active: Number(product.active) === 1
      }

      this.getProductCategories(this).finally(() => {
        this.selected.productCategory = product.category_id
      })

      this.modalProduct = true
    },

    async validateProduct() {
      this.$refs.formProduct.validate({ silent: true }).then(
        async validProduct => {
          if (!validProduct) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminProducts.put : SAdminProducts.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Product?`,
            preConfirm: async () => {
              return createOrUpdate(this.formProduct).then(
                ({ data: { message, product }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', product)
                    } else {
                      this.$emit('update:rows', product)
                    }
                  })

                  this.modalProduct = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formProduct.setErrors(validationError)
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
