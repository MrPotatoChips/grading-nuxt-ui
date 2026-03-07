<template>
  <UModal
    v-model:open="modalCourse"
    title="Course"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCourse"
        :state="formCourse"
        :schema="validationCourse"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Course Code"
              name="course_code"
              required
            >
              <UInput
                v-model="formCourse.course_code"
                placeholder="enter course code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Course Name"
              name="course_name"
              required
            >
              <UInput
                v-model="formCourse.course_name"
                placeholder="enter course name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="College"
              name="college_id"
              required
            >
              <USelectMenu
                v-model="selected.college"
                placeholder="select college"
                class="w-full"
                value-key="id"
                label-key="college_name"
                :items="options.colleges"
                :loading="fetching.colleges"
                :disabled="fetching.colleges"
                @update:search-term="searchColleges"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCourse.active"
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
          @click.prevent="validateCourse"
        >
          {{ state.editing ? 'Update' : 'Create' }} Course
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

import MColleges from '@/mixins/maintenances/colleges'

import { SAdminCourses } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminCourseCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MColleges
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalCourse: false,
      validationCourse: yup.object().shape({
        id: yup.string().nullable(),
        college_id: yup.string().required().label('college'),
        course_code: yup.string().required().label('course code'),
        course_name: yup.string().required().label('course name')
      }),
      formCourse: {
        id: '',
        college_id: '',
        course_code: '',
        course_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.college' (college) {
      this.formCourse.college_id = college
    }
  },

  methods: {

    createCourse() {
      this.state.editing = false

      this.formCourse = {
        id: '',
        college_id: '',
        course_code: '',
        course_name: '',
        active: true
      }

      this.selected.college = ''

      this.getColleges(this)

      this.modalCourse = true
    },

    editCourse(course) {
      this.state.editing = true

      this.formCourse = {
        id: course.id,
        college_id: '',
        course_code: course.course_code,
        course_name: course.course_name,
        active: Number(course.active) === 1
      }

      this.getColleges(this).finally(() => {
        this.selected.college = course.college_id
      })

      this.modalCourse = true
    },

    async validateCourse() {
      this.$refs.formCourse.validate({ silent: true }).then(
        async validCourse => {
          if (!validCourse) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminCourses.put : SAdminCourses.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Course?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCourse).then(
                ({ data: { message, course }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', course)
                    } else {
                      this.$emit('update:rows', course)
                    }
                  })

                  this.modalCourse = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCourse.setErrors(validationError)
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
