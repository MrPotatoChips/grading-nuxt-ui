<template>
  <UModal
    v-model:open="modalYearLevel"
    title="Year Level"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formYearLevel"
        :state="formYearLevel"
        :schema="validationYearLevel"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Year Level"
              name="year_name"
              required
            >
              <UInput
                v-model="formYearLevel.year_name"
                placeholder="enter year level"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Course"
              name="course_id"
              required
            >
              <USelectMenu
                v-model="selected.course"
                placeholder="select course"
                class="w-full"
                value-key="id"
                label-key="course_name"
                :items="options.courses"
                :loading="fetching.courses"
                :disabled="fetching.courses"
                @update:search-term="searchCourses"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formYearLevel.active"
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
          @click.prevent="validateYearLevel"
        >
          {{ state.editing ? 'Update' : 'Create' }} Year Level
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

import MCourses from '@/mixins/maintenances/courses'

import { SAdminYearLevels } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminYearLevelCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MCourses
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalYearLevel: false,
      validationYearLevel: yup.object().shape({
        id: yup.string().nullable(),
        course_id: yup.string().required().label('course'),
        year_name: yup.string().required().label('year level')
      }),
      formYearLevel: {
        id: '',
        course_id: '',
        year_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.course' (course) {
      this.formYearLevel.course_id = course
    }
  },

  methods: {

    createYearLevel() {
      this.state.editing = false

      this.formYearLevel = {
        id: '',
        course_id: '',
        year_name: '',
        active: true
      }

      this.selected.course = ''

      this.getCourses(this)

      this.modalYearLevel = true
    },

    editYearLevel(yearLevel) {
      this.state.editing = true

      this.formYearLevel = {
        id: yearLevel.id,
        course_id: '',
        year_name: yearLevel.year_name,
        active: Number(yearLevel.active) === 1
      }

      this.getCourses(this).finally(() => {
        this.selected.course = yearLevel.course_id
      })

      this.modalYearLevel = true
    },

    async validateYearLevel() {
      this.$refs.formYearLevel.validate({ silent: true }).then(
        async validYearLevel => {
          if (!validYearLevel) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminYearLevels.put : SAdminYearLevels.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Year Level?`,
            preConfirm: async () => {
              return createOrUpdate(this.formYearLevel).then(
                ({ data: { message, year_level: yearLevel }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', yearLevel)
                    } else {
                      this.$emit('update:rows', yearLevel)
                    }
                  })

                  this.modalYearLevel = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formYearLevel.setErrors(validationError)
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
