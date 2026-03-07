<template>
  <UModal
    v-model:open="modalTask"
    title="Task"
    description="Manage Task Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden',
      content: 'md:max-w-4xl'
    }"
  >
    <template #body>
      <UForm
        ref="formTask"
        :state="formTask"
        :schema="validationTask"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <UFormField
              label="Agent"
              name="assignee_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="formTask.assignee_id"
                placeholder="select agent"
                class="w-full"
                value-key="id"
                label-key="agent_name"
                :items="options.dgAgents"
                :loading="fetching.dgAgents"
                :disabled="fetching.dgAgents"
                @update:search-term="searchDGAgents"
              />
            </UFormField>

            <UFormField
              label="Schedule"
              name="schedule"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.schedule"
                type="month"
                placeholder="enter schedule (e.g., Mon-Fri)"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Activity"
              name="activity_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="formTask.activity_id"
                placeholder="select activity"
                class="w-full"
                value-key="id"
                label-key="activity_name"
                :items="options.activities"
                :loading="fetching.activities"
                :disabled="fetching.activities"
                @update:search-term="searchActivities"
              />
            </UFormField>

            <UFormField
              label="Crop"
              name="crop_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="formTask.crop_id"
                placeholder="select crop"
                class="w-full"
                value-key="id"
                label-key="crop_name"
                :items="options.crops"
                :loading="fetching.crops"
                :disabled="fetching.crops"
                @update:search-term="searchCrops"
              />
            </UFormField>

            <UFormField
              label="Event Plan"
              name="event_plan"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.event_plan"
                type="number"
                placeholder="enter event plan"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Grower Per Event"
              name="grower_per_event"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.grower_per_event"
                type="number"
                placeholder="enter grower per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Total Grower Plan"
              name="total_grower_plan"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.total_grower_plan"
                type="number"
                placeholder="enter total grower plan"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Hectare Per Event"
              name="hectare_per_event"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.hectare_per_event"
                type="number"
                step="0.01"
                placeholder="enter hectare per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Total Hectare Plan"
              name="total_hectare_plan"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.total_hectare_plan"
                type="number"
                step="0.01"
                placeholder="enter total hectare plan"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Sales Per Event"
              name="sales_per_event"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.sales_per_event"
                type="number"
                step="0.01"
                placeholder="enter sales per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Total Sales Plan"
              name="total_sales_plan"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.total_sales_plan"
                type="number"
                step="0.01"
                placeholder="enter total sales plan"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Budget Per Event"
              name="budget_per_event"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.budget_per_event"
                type="number"
                step="0.01"
                placeholder="enter budget per event"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Total Budget Plan"
              name="total_budget_plan"
              class="col-span-1"
            >
              <UInput
                v-model="formTask.total_budget_plan"
                type="number"
                step="0.01"
                placeholder="enter total budget plan"
                class="w-full"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formTask.active"
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
          @click.prevent="validateTask"
        >
          {{ state.editing ? 'Update' : 'Create' }} Task
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

import MDGAgents from '@/mixins/accounts/dg-agents'
import MActivities from '@/mixins/maintenances/activities'
import MCrops from '@/mixins/maintenances/crops'

import { SDGSupervisorTasks } from '@/services/dg-supervisor'
import { overlays } from '@/composables/overlays'

export default {
  name: 'DGSTaskCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MDGAgents,
    MActivities,
    MCrops
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalTask: false,
      validationTask: yup.object().shape({
        id: yup.string().nullable(),
        assignee_id: yup.string().nullable().label('assignee'),
        schedule: yup.string().nullable().max(7).label('schedule'),
        activity_id: yup.string().nullable().label('activity'),
        crop_id: yup.string().nullable().label('crop'),
        event_plan: yup.number().toNumber().nullable().min(0).label('event plan'),
        grower_per_event: yup.number().toNumber().nullable().min(0).label('grower per event'),
        total_grower_plan: yup.number().toNumber().nullable().min(0).label('total grower plan'),
        hectare_per_event: yup.number().toNumber().nullable().min(0).label('hectare per event'),
        total_hectare_plan: yup.number().toNumber().nullable().min(0).label('total hectare plan'),
        sales_per_event: yup.number().toNumber().nullable().min(0).label('sales per event'),
        total_sales_plan: yup.number().toNumber().nullable().min(0).label('total sales plan'),
        budget_per_event: yup.number().toNumber().nullable().min(0).label('budget per event'),
        total_budget_plan: yup.number().toNumber().nullable().min(0).label('total budget plan'),
        active: yup.boolean().required().label('active')
      }),
      formTask: {
        id: '',
        assignee_id: '',
        schedule: '',
        activity_id: '',
        crop_id: '',
        event_plan: '',
        grower_per_event: '',
        total_grower_plan: '',
        hectare_per_event: '',
        total_hectare_plan: '',
        sales_per_event: '',
        total_sales_plan: '',
        budget_per_event: '',
        total_budget_plan: '',
        active: true
      }
    }
  },

  methods: {

    createTask() {
      this.state.editing = false

      this.formTask = {
        id: '',
        assignee_id: '',
        schedule: '',
        activity_id: '',
        crop_id: '',
        event_plan: '',
        grower_per_event: '',
        total_grower_plan: '',
        hectare_per_event: '',
        total_hectare_plan: '',
        sales_per_event: '',
        total_sales_plan: '',
        budget_per_event: '',
        total_budget_plan: '',
        active: true
      }

      this.getDGAgents(this)
      this.getActivities(this)
      this.getCrops(this)

      this.modalTask = true
    },

    editTask(task) {
      this.state.editing = true

      this.formTask = {
        id: task.id,
        assignee_id: '',
        schedule: task.schedule || '',
        activity_id: '',
        crop_id: '',
        event_plan: task.event_plan || '',
        grower_per_event: task.grower_per_event || '',
        total_grower_plan: task.total_grower_plan || '',
        hectare_per_event: task.hectare_per_event || '',
        total_hectare_plan: task.total_hectare_plan || '',
        sales_per_event: task.sales_per_event || '',
        total_sales_plan: task.total_sales_plan || '',
        budget_per_event: task.budget_per_event || '',
        total_budget_plan: task.total_budget_plan || '',
        active: Number(task.active) === 1
      }

      Promise.allSettled([
        this.getDGAgents(this),
        this.getActivities(this),
        this.getCrops(this)
      ]).finally(() => {
        this.formTask.assignee_id = task.assignee_id || ''
        this.formTask.activity_id = task.activity_id || ''
        this.formTask.crop_id = task.crop_id || ''
      })

      this.modalTask = true
    },

    async validateTask() {
      this.$refs.formTask.validate({ silent: true }).then(
        async validTask => {
          if (!validTask) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGSupervisorTasks.put : SDGSupervisorTasks.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Task?`,
            preConfirm: async () => {
              return createOrUpdate(this.formTask).then(
                ({ data: { message, task }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', task)
                    } else {
                      this.$emit('update:rows', task)
                    }
                  })

                  this.modalTask = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formTask.setErrors(validationError)
                  }
                }
              )
            }
          })
        }
      )
    }
  }
}
</script>
