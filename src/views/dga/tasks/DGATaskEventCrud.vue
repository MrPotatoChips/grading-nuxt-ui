<template>
  <UModal
    v-model:open="modalTaskEvent"
    title="Task Event"
    description="Manage Task Event Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden',
      content: 'md:max-w-4xl'
    }"
  >
    <template #body>
      <UForm
        ref="formTaskEvent"
        :state="formTaskEvent"
        :schema="validationTaskEvent"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">

            <UFormField
              label="Activity"
              name="activity_id"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.activity_name"
                placeholder="no activity selected"
                class="w-full"
                disabled
              />
            </UFormField>

            <UFormField
              label="Crop"
              name="crop_id"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.crop_name"
                placeholder="no crop selected"
                class="w-full"
                disabled
              />
            </UFormField>

            <UFormField
              label="Event Date"
              name="event_date"
              class="col-span-2 md:col-span-1"
            >
              <UInputDate
                ref="fEventDate"
                v-model="selected.eventDate"
                class="w-full"
              >
                <template #trailing>
                  <UModal
                    title="Event Date"
                    description="Choose the event date"
                  >
                    <UButton
                      color="neutral"
                      variant="link"
                      icon="i-lucide-calendar"
                      aria-label="Select a date"
                      class="p-0"
                    />

                    <template #body="{ close }">
                      <UCalendar
                        v-model="selected.eventDate"
                        size="xl"
                        @update:model-value="close"
                      />
                    </template>
                  </UModal>
                </template>
              </UInputDate>
            </UFormField>

            <UFormField
              label="Grower"
              name="grower_id"
              class="col-span-2 md:col-span-1"
            >
              <USelectMenu
                v-model="selected.grower"
                placeholder="select grower"
                class="w-full"
                label-key="grower_name"
                :avatar="selected.grower?.avatar"
                :items="options.growers"
                :loading="fetching.growers"
                :disabled="fetching.growers"
                @update:search-term="searchGrowers"
              />
            </UFormField>

            <UFormField
              label="Province"
              name="province_id"
              class="col-span-2 md:col-span-1"
            >
              <USelectMenu
                v-model="selected.province"
                placeholder="select province"
                class="w-full"
                value-key="id"
                label-key="province_name"
                :items="options.provinces"
                :loading="fetching.provinces"
                :disabled="fetching.provinces"
                @update:search-term="searchProvinces"
              />
            </UFormField>

            <UFormField
              label="Municipality"
              name="municipality_id"
              class="col-span-2 md:col-span-1"
            >
              <USelectMenu
                v-model="selected.municipality"
                placeholder="select municipality"
                class="w-full"
                value-key="id"
                label-key="municipality_name"
                :items="options.municipalities"
                :loading="fetching.municipalities"
                :disabled="fetching.municipalities"
                @update:search-term="searchMunicipalities"
              />
            </UFormField>

            <UFormField
              label="Barangay"
              name="barangay_id"
              class="col-span-2 md:col-span-1"
            >
              <USelectMenu
                v-model="selected.barangay"
                placeholder="select barangay"
                class="w-full"
                value-key="id"
                label-key="barangay_name"
                :items="options.barangays"
                :loading="fetching.barangays"
                :disabled="fetching.barangays"
                @update:search-term="searchBarangays"
              />
            </UFormField>

            <UFormField
              label="Actual Hectares"
              name="actual_hectares"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.actual_hectares"
                type="number"
                step="0.01"
                placeholder="enter actual hectares"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="No. of Actual Attendees"
              name="grower_attended"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.grower_attended"
                type="number"
                placeholder="enter grower attended"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Actual Costs"
              name="actual_costs"
              class="col-span-2 md:col-span-1"
              hint="( Event Expenses )"
            >
              <UInput
                v-model="formTaskEvent.actual_costs"
                type="number"
                step="0.01"
                placeholder="enter actual costs"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="No. of Buyers"
              name="grower_bought"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.grower_bought"
                type="number"
                placeholder="enter grower bought"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Actual Sales"
              name="actual_sales"
              class="col-span-2 md:col-span-1"
              hint="( Sold to Buyers )"
            >
              <UInput
                v-model="formTaskEvent.actual_sales"
                type="number"
                step="0.01"
                placeholder="enter actual sales"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="No. of Sales Orders"
              name="grower_bookings"
              class="col-span-2 md:col-span-1"
              hint="( Bookings )"
            >
              <UInput
                v-model="formTaskEvent.grower_bookings"
                type="number"
                placeholder="enter grower bookings"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Booking Sales"
              name="booking_sales"
              class="col-span-2 md:col-span-1"
              hint="( Sales Orders )"
            >
              <UInput
                v-model="formTaskEvent.booking_sales"
                type="number"
                step="0.01"
                placeholder="enter booking sales"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Conversion Rate"
              name="conversion_rate"
              class="col-span-2 md:col-span-1"
            >
              <UInput
                v-model="formTaskEvent.conversion_rate"
                type="number"
                placeholder="no conversion rate"
                class="w-full"
                disabled
              />
            </UFormField>

            <UFormField
              label="Remarks"
              name="remarks"
              class="col-span-2"
            >
              <UTextarea
                v-model="formTaskEvent.remarks"
                placeholder="enter remarks"
                class="w-full"
                :rows="5"
                autoresize
              />
            </UFormField>
          </div>
        </div>
      </UForm>
    </template>
    <template #footer="{ close }">
      <div class="w-full flex justify-end gap-2">
        <UButton
          color="primary"
          @click.prevent="validateTaskEvent"
        >
          {{ state.editing ? 'Update' : 'Record' }} Event
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

import MCrops from '@/mixins/maintenances/crops'
import MGrowers from '@/mixins/accounts/growers'
import MActivities from '@/mixins/maintenances/activities'

import MProvinces from '@/mixins/locations/provinces'
import MMunicipalities from '@/mixins/locations/municipalities'
import MBarangays from '@/mixins/locations/barangays'

import { SDGAgentTaskEvents } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'
import { getLocalTimeZone, today } from '@internationalized/date'

export default {
  name: 'DGATaskEventCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MCrops,
    MGrowers,
    MActivities,
    MProvinces,
    MMunicipalities,
    MBarangays
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalTaskEvent: false,
      validationTaskEvent: yup.object().shape({
        id: yup.string().nullable(),
        task_id: yup.string().nullable().label('task'),
        event_date: yup.date().typeError('${path} must be a ${type}').nullable().label('event date'),
        crop_id: yup.string().nullable().label('crop'),
        grower_id: yup.string().nullable().label('grower'),
        activity_id: yup.string().nullable().label('activity'),
        region_id: yup.string().nullable().label('region'),
        province_id: yup.string().nullable().label('province'),
        municipality_id: yup.string().nullable().label('municipality'),
        barangay_id: yup.string().nullable().label('barangay'),
        grower_attended: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('no. of actual attendees'),
        grower_bought: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('no. of buyers'),
        grower_bookings: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('no. of sales orders'),
        booking_sales: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('booking sales'),
        conversion_rate: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('conversion rate'),
        actual_hectares: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('actual hectares'),
        actual_costs: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('actual costs'),
        actual_sales: yup.number().typeError('${path} must be a ${type}').nullable().min(0).label('actual sales'),
        remarks: yup.string().nullable().label('remarks'),
        attachment_path: yup.string().nullable().label('attachment path'),
        active: yup.boolean().required().label('active')
      }),
      selected: {
        eventDate: ''
      },
      formTaskEvent: {
        id: '',
        task_id: '',
        event_date: '',
        activity_id: '',
        activity_name: '',
        crop_id: '',
        crop_name: '',
        grower_id: '',
        grower_name: '',
        region_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        grower_attended: '',
        grower_bought: '',
        grower_bookings: '',
        booking_sales: '',
        conversion_rate: '',
        actual_hectares: '',
        actual_costs: '',
        actual_sales: '',
        remarks: '',
        attachment_path: '',
        active: true
      }
    }
  },

  watch: {
    'selected.grower'(grower) {
      this.formTaskEvent.grower_id = grower?.id || ''
    },

    'selected.province'(province) {
      this.formTaskEvent.province_id = province || ''
    },

    'selected.municipality'(municipality) {
      this.formTaskEvent.municipality_id = municipality || ''
    },

    'selected.barangay'(barangay) {
      this.formTaskEvent.barangay_id = barangay || ''
    },

    'selected.eventDate'(eventDate) {
      this.formTaskEvent.event_date = eventDate?.toString() || ''
    },

    'formTaskEvent.grower_attended'(growerAttended) {
      const attended = parseInt(growerAttended) || 0
      const bought = parseInt(this.formTaskEvent.grower_bought) || 0

      this.formTaskEvent.conversion_rate = attended > 0 ? ((bought / attended) * 100).toFixed(2) : '0.00'
    },

    'formTaskEvent.grower_bought'(growerBought) {
      const attended = parseInt(this.formTaskEvent.grower_attended) || 0
      const bought = parseInt(growerBought) || 0

      this.formTaskEvent.conversion_rate = attended > 0 ? ((bought / attended) * 100).toFixed(2) : '0.00'
    }
  },

  methods: {

    createTaskEvent(taskEvent) {
      this.state.editing = false

      this.selected.eventDate = today(getLocalTimeZone())

      this.formTaskEvent = {
        id: '',
        task_id: taskEvent.id,
        event_date: '',
        crop_id: taskEvent.crop.id,
        crop_name: taskEvent.crop.crop_name,
        grower_id: '',
        grower_name: '',
        activity_id: taskEvent.activity.id,
        activity_name: taskEvent.activity.activity_name,
        region_id: '',
        province_id: '',
        municipality_id: '',
        barangay_id: '',
        grower_attended: '',
        grower_bought: '',
        grower_bookings: '',
        booking_sales: '',
        conversion_rate: '',
        actual_hectares: '',
        actual_costs: '',
        actual_sales: '',
        remarks: '',
        attachment_path: '',
        active: true
      }

      this.getCrops(this)
      this.getGrowers(this)
      this.getActivities(this)
      this.getProvinces(this)

      this.modalTaskEvent = true
    },

    async validateTaskEvent() {
      this.$refs.formTaskEvent.validate({ silent: true }).then(
        async validTaskEvent => {
          if (!validTaskEvent) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentTaskEvents.put : SDGAgentTaskEvents.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Record',
            body: `${this.state.editing ? 'Update' : 'Record'} Event?`,
            preConfirm: async () => {
              return createOrUpdate(this.formTaskEvent).then(
                ({ data: { message, taskEvent }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', taskEvent)
                    } else {
                      this.$emit('update:rows', taskEvent)
                    }
                  })

                  this.modalTaskEvent = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formTaskEvent.setErrors(validationError)
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
