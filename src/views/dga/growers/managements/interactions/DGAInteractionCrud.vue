<template>
  <UModal
    v-model:open="modalInteraction"
    title="Interaction"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formInteraction"
        :state="formInteraction"
        :schema="validationInteraction"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">

            <UFormField
              label="Interaction Date"
              name="interaction_date"
              class="col-span-1"
            >
              <UInputDate
                ref="fInteractionDate"
                v-model="selected.interactionDate"
                class="w-full"
              >
                <template #trailing>
                  <UModal
                    title="Interaction Date"
                    description="Choose the interaction date"
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
                        v-model="selected.interactionDate"
                        size="xl"
                        @update:model-value="close"
                      />
                    </template>
                  </UModal>
                </template>
              </UInputDate>
            </UFormField>

            <UFormField
              label="Activity"
              name="activity_id"
              class="col-span-1"
            >
              <USelectMenu
                v-model="formInteraction.activity_id"
                placeholder="select activity"
                class="w-full"
                value-key="id"
                label-key="activity_name"
                :items="options.activities"
                :loading="fetching.activities"
                :disabled="fetching.activities"
                :ui="{ content: 'md:min-w-fit wrap-break-word' }"
                @update:search-term="searchActivities"
              />
            </UFormField>

            <UFormField
              label="Description"
              name="description"
              class="col-span-1"
            >
              <UTextarea
                v-model="formInteraction.description"
                placeholder="enter description"
                class="w-full"
                autoresize
                :rows="6"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formInteraction.active"
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
          @click.prevent="validateInteraction"
        >
          {{ state.editing ? 'Update' : 'Create' }} Interaction
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

import { SDGAgentGrowerInteractions } from '@/services/dg-agent'
import { overlays } from '@/composables/overlays'
import { CalendarDate } from '@internationalized/date'
import moment from 'moment'

export default {
  name: 'DGAInteractionCrud',

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
      modalInteraction: false,
      validationInteraction: yup.object().shape({
        id: yup.string().nullable(),
        interaction_date: yup.string().required().label('interaction date'),
        activity_id: yup.string().required().label('activity'),
        description: yup.string().required().max(500).label('description'),
        active: yup.boolean().required().label('active'),
        attachments: yup.array().of(
          yup.object().shape({
            id: yup.string().nullable(),
            file_name: yup.string().required().label('file name'),
            file_url: yup.string().required().label('file url')
          })
        ).label('attachments')
      }),
      selected: {
        interactionDate: ''
      },
      formInteraction: {
        id: '',
        interaction_date: '',
        activity_id: '',
        description: '',
        attachments: [],
        active: true
      }
    }
  },

  methods: {

    createInteraction () {
      this.state.editing = false

      this.formInteraction = {
        id: '',
        interaction_date: '',
        activity_id: '',
        description: '',
        attachments: [],
        active: true
      }

      const currentDate = moment()

      this.selected.interactionDate = new CalendarDate(
        currentDate.year(),
        currentDate.month() + 1,
        currentDate.date()
      )

      this.getActivities(this)

      this.modalInteraction = true
    },

    editInteraction (interaction) {
      this.state.editing = true

      this.formInteraction = {
        id: interaction.id,
        interaction_date: '',
        activity_id: '',
        description: interaction.description,
        attachments: interaction?.attachments || [],
        active: interaction.active
      }

      const currentDate = moment(interaction.interaction_date)

      this.selected.interactionDate = new CalendarDate(
        currentDate.year(),
        currentDate.month() + 1,
        currentDate.date()
      )

      this.getActivities(this).finally(() => {
        this.formInteraction.activity_id = interaction?.activity_id || ''
      })

      this.modalInteraction = true
    },

    async validateInteraction() {
      this.$refs.formInteraction.validate({ silent: true }).then(
        async validInteraction => {
          if (!validInteraction) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SDGAgentGrowerInteractions.put : SDGAgentGrowerInteractions.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Interaction?`,
            preConfirm: async () => {
              return createOrUpdate(this.formInteraction).then(
                ({ data: { message, interaction }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', interaction)
                    } else {
                      this.$emit('update:rows', interaction)
                    }
                  })

                  this.modalInteraction = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formInteraction.setErrors(validationError)
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
