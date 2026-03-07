<template>
  <UModal
    v-model:open="modalSubject"
    title="Subject"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formSubject"
        :state="formSubject"
        :schema="validationSubject"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Subject Code"
              name="subject_code"
              required
            >
              <UInput
                v-model="formSubject.subject_code"
                placeholder="enter subject code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Subject Name"
              name="subject_name"
              required
            >
              <UInput
                v-model="formSubject.subject_name"
                placeholder="enter subject name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Semester"
              name="semester_id"
              required
            >
              <USelectMenu
                v-model="selected.semester"
                placeholder="select semester"
                class="w-full"
                value-key="id"
                label-key="semester_name"
                :items="options.semesters"
                :loading="fetching.semesters"
                :disabled="fetching.semesters"
                @update:search-term="searchSemesters"
              />
            </UFormField>

            <UFormField
              label="Subject Description"
              name="subject_description"
            >
              <UTextarea
                v-model="formSubject.subject_description"
                placeholder="enter subject description"
                class="w-full"
                :rows="4"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formSubject.active"
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
          @click.prevent="validateSubject"
        >
          {{ state.editing ? 'Update' : 'Create' }} Subject
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

import MSemesters from '@/mixins/maintenances/semesters'

import { SAdminSubjects } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminSubjectCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MSemesters
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalSubject: false,
      validationSubject: yup.object().shape({
        id: yup.string().nullable(),
        semester_id: yup.string().required().label('semester'),
        subject_code: yup.string().required().label('subject code'),
        subject_name: yup.string().required().label('subject name'),
        subject_description: yup.string().nullable()
      }),
      formSubject: {
        id: '',
        semester_id: '',
        subject_code: '',
        subject_name: '',
        subject_description: '',
        active: true
      }
    }
  },

  watch: {
    'selected.semester' (semester) {
      this.formSubject.semester_id = semester
    }
  },

  methods: {

    createSubject() {
      this.state.editing = false

      this.formSubject = {
        id: '',
        semester_id: '',
        subject_code: '',
        subject_name: '',
        subject_description: '',
        active: true
      }

      this.selected.semester = ''

      this.getSemesters(this)

      this.modalSubject = true
    },

    editSubject(subject) {
      this.state.editing = true

      this.formSubject = {
        id: subject.id,
        semester_id: '',
        subject_code: subject.subject_code,
        subject_name: subject.subject_name,
        subject_description: subject.subject_description || '',
        active: Number(subject.active) === 1
      }

      this.getSemesters(this).finally(() => {
        this.selected.semester = subject.semester_id
      })

      this.modalSubject = true
    },

    async validateSubject() {
      this.$refs.formSubject.validate({ silent: true }).then(
        async validSubject => {
          if (!validSubject) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminSubjects.put : SAdminSubjects.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Subject?`,
            preConfirm: async () => {
              return createOrUpdate(this.formSubject).then(
                ({ data: { message, subject }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', subject)
                    } else {
                      this.$emit('update:rows', subject)
                    }
                  })

                  this.modalSubject = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formSubject.setErrors(validationError)
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
