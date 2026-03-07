<template>
  <UModal
    v-model:open="modalSemester"
    title="Semester"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formSemester"
        :state="formSemester"
        :schema="validationSemester"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Semester Code"
              name="semester_code"
              required
            >
              <UInput
                v-model="formSemester.semester_code"
                placeholder="enter semester code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Semester Name"
              name="semester_name"
              required
            >
              <UInput
                v-model="formSemester.semester_name"
                placeholder="enter semester name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Year Level"
              name="year_id"
              required
            >
              <USelectMenu
                v-model="selected.year"
                placeholder="select year level"
                class="w-full"
                value-key="id"
                label-key="year_name"
                :items="options.yearLevels"
                :loading="fetching.yearLevels"
                :disabled="fetching.yearLevels"
                @update:search-term="searchYearLevels"
              />
            </UFormField>

            <UFormField
              label="Semester Start"
              name="semester_start"
            >
              <UInput
                v-model="formSemester.semester_start"
                type="date"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Semester End"
              name="semester_end"
            >
              <UInput
                v-model="formSemester.semester_end"
                type="date"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formSemester.active"
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
          @click.prevent="validateSemester"
        >
          {{ state.editing ? 'Update' : 'Create' }} Semester
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

import MYearLevels from '@/mixins/maintenances/year-levels'

import { SAdminSemesters } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminSemesterCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MYearLevels
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalSemester: false,
      validationSemester: yup.object().shape({
        id: yup.string().nullable(),
        year_id: yup.string().required().label('year level'),
        semester_code: yup.string().required().label('semester code'),
        semester_name: yup.string().required().label('semester name'),
        semester_start: yup.string().nullable(),
        semester_end: yup.string().nullable()
      }),
      formSemester: {
        id: '',
        year_id: '',
        semester_code: '',
        semester_name: '',
        semester_start: '',
        semester_end: '',
        active: true
      }
    }
  },

  watch: {
    'selected.year' (year) {
      this.formSemester.year_id = year
    }
  },

  methods: {

    createSemester() {
      this.state.editing = false

      this.formSemester = {
        id: '',
        year_id: '',
        semester_code: '',
        semester_name: '',
        semester_start: '',
        semester_end: '',
        active: true
      }

      this.selected.year = ''

      this.getYearLevels(this)

      this.modalSemester = true
    },

    editSemester(semester) {
      this.state.editing = true

      this.formSemester = {
        id: semester.id,
        year_id: '',
        semester_code: semester.semester_code,
        semester_name: semester.semester_name,
        semester_start: semester.semester_start || '',
        semester_end: semester.semester_end || '',
        active: Number(semester.active) === 1
      }

      this.getYearLevels(this).finally(() => {
        this.selected.year = semester.year_id
      })

      this.modalSemester = true
    },

    async validateSemester() {
      this.$refs.formSemester.validate({ silent: true }).then(
        async validSemester => {
          if (!validSemester) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminSemesters.put : SAdminSemesters.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Semester?`,
            preConfirm: async () => {
              return createOrUpdate(this.formSemester).then(
                ({ data: { message, semester }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', semester)
                    } else {
                      this.$emit('update:rows', semester)
                    }
                  })

                  this.modalSemester = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formSemester.setErrors(validationError)
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
