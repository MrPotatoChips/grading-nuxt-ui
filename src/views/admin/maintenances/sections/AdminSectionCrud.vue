<template>
  <UModal
    v-model:open="modalSection"
    title="Section"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formSection"
        :state="formSection"
        :schema="validationSection"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Section Code"
              name="section_code"
              required
            >
              <UInput
                v-model="formSection.section_code"
                placeholder="enter section code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Section Name"
              name="section_name"
              required
            >
              <UInput
                v-model="formSection.section_name"
                placeholder="enter section name"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formSection.active"
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
          @click.prevent="validateSection"
        >
          {{ state.editing ? 'Update' : 'Create' }} Section
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

import { SAdminSections } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminSectionCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalSection: false,
      validationSection: yup.object().shape({
        id: yup.string().nullable(),
        section_code: yup.string().required().label('section code'),
        section_name: yup.string().required().label('section name')
      }),
      formSection: {
        id: '',
        section_code: '',
        section_name: '',
        active: true
      }
    }
  },

  methods: {

    createSection() {
      this.state.editing = false

      this.formSection = {
        id: '',
        section_code: '',
        section_name: '',
        active: true
      }

      this.modalSection = true
    },

    editSection(section) {
      this.state.editing = true

      this.formSection = {
        id: section.id,
        section_code: section.section_code,
        section_name: section.section_name,
        active: Number(section.active) === 1
      }

      this.modalSection = true
    },

    async validateSection() {
      this.$refs.formSection.validate({ silent: true }).then(
        async validSection => {
          if (!validSection) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminSections.put : SAdminSections.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Section?`,
            preConfirm: async () => {
              return createOrUpdate(this.formSection).then(
                ({ data: { message, section }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', section)
                    } else {
                      this.$emit('update:rows', section)
                    }
                  })

                  this.modalSection = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formSection.setErrors(validationError)
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
