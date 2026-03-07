<template>
  <UModal
    v-model:open="modalActivity"
    title="Activity"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formActivity"
        :state="formActivity"
        :schema="validationActivity"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Activity Type"
              name="activity_type"
              required
            >
              <USelect
                v-model="formActivity.activity_type"
                :items="activityTypes"
                placeholder="select activity type"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Activity Code"
              name="activity_code"
              required
            >
              <UInput
                v-model="formActivity.activity_code"
                placeholder="enter activity code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Activity Name"
              name="activity_name"
              required
            >
              <UInput
                v-model="formActivity.activity_name"
                placeholder="enter activity name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Grower Per Event"
              name="grower_per_event"
            >
              <UInput
                v-model="formActivity.grower_per_event"
                type="number"
                placeholder="enter grower per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Landholding Per Grower"
              name="landholding_per_grower"
            >
              <UInput
                v-model="formActivity.landholding_per_grower"
                type="number"
                step="0.01"
                placeholder="enter landholding per grower"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Target Hectare"
              name="target_hectare"
            >
              <UInput
                v-model="formActivity.target_hectare"
                type="number"
                step="0.01"
                placeholder="enter target hectare"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Budget Per Event"
              name="budget_per_event"
            >
              <UInput
                v-model="formActivity.budget_per_event"
                type="number"
                step="0.01"
                placeholder="enter budget per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Sales Per Event"
              name="sales_per_event"
            >
              <UInput
                v-model="formActivity.sales_per_event"
                type="number"
                step="0.01"
                placeholder="enter sales per event"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formActivity.active"
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
          @click.prevent="validateActivity"
        >
          {{ state.editing ? 'Update' : 'Create' }} Activity
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

import MActivities from '@/mixins/maintenances/activities'

import { SAdminActivities } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminActivityCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MActivities
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalActivity: false,
      activityTypes: ['Interaction', 'Event', 'Others'],
      validationActivity: yup.object().shape({
        id: yup.string().nullable(),
        activity_type: yup.string().required().oneOf(['Interaction', 'Event', 'Others']).label('activity type'),
        activity_code: yup.string().required().max(30).label('activity code'),
        activity_name: yup.string().required().max(100).label('activity name'),
        grower_per_event: yup.number().nullable().min(0).label('grower per event'),
        landholding_per_grower: yup.number().nullable().min(0).label('landholding per grower'),
        target_hectare: yup.number().nullable().min(0).label('target hectare'),
        budget_per_event: yup.number().nullable().min(0).label('budget per event'),
        sales_per_event: yup.number().nullable().min(0).label('sales per event')
      }),
      formActivity: {
        id: '',
        activity_type: '',
        activity_code: '',
        activity_name: '',
        grower_per_event: null,
        landholding_per_grower: null,
        target_hectare: null,
        budget_per_event: null,
        sales_per_event: null,
        active: true
      }
    }
  },

  methods: {

    createActivity() {
      this.state.editing = false

      this.formActivity = {
        id: '',
        activity_type: '',
        activity_code: '',
        activity_name: '',
        grower_per_event: null,
        landholding_per_grower: null,
        target_hectare: null,
        budget_per_event: null,
        sales_per_event: null,
        active: true
      }

      this.modalActivity = true
    },

    editActivity(activity) {
      this.state.editing = true

      this.formActivity = {
        id: activity.id,
        activity_type: activity.activity_type,
        activity_code: activity.activity_code,
        activity_name: activity.activity_name,
        grower_per_event: activity.grower_per_event,
        landholding_per_grower: activity.landholding_per_grower,
        target_hectare: activity.target_hectare,
        budget_per_event: activity.budget_per_event,
        sales_per_event: activity.sales_per_event,
        active: Number(activity.active) === 1
      }

      this.modalActivity = true
    },

    async validateActivity() {
      this.$refs.formActivity.validate({ silent: true }).then(
        async validActivity => {
          if (!validActivity) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminActivities.put : SAdminActivities.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Activity?`,
            preConfirm: async () => {
              return createOrUpdate(this.formActivity).then(
                ({ data: { message, activity }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', activity)
                    } else {
                      this.$emit('update:rows', activity)
                    }
                  })

                  this.modalActivity = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formActivity.setErrors(validationError)
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
