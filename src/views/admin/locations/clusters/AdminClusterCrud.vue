<template>
  <UModal
    v-model:open="modalCluster"
    title="Cluster"
    description="Manage Information"
    :fullscreen="$breakPoints.isSmallerOrEqual('sm')"
    :ui="{
      description: 'hidden'
    }"
  >
    <template #body>
      <UForm
        ref="formCluster"
        :state="formCluster"
        :schema="validationCluster"
        @submit.prevent
      >
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField
              label="Cluster Code"
              name="cluster_code"
              required
            >
              <UInput
                v-model="formCluster.cluster_code"
                placeholder="enter cluster code"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Cluster Name"
              name="cluster_name"
              required
            >
              <UInput
                v-model="formCluster.cluster_name"
                placeholder="enter cluster name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Area"
              name="area_id"
              class="col-span-1"
              required
            >
              <USelectMenu
                v-model="selected.area"
                placeholder="select area"
                class="w-full"
                value-key="id"
                label-key="area_name"
                :items="options.areas"
                :loading="fetching.areas"
                :disabled="fetching.areas"
                @update:search-term="searchAreas"
              />
            </UFormField>
          </div>

          <USwitch
            v-if="state.editing"
            v-model="formCluster.active"
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
          @click.prevent="validateCluster"
        >
          {{ state.editing ? 'Update' : 'Create' }} Cluster
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

import MAreas from '@/mixins/locations/areas'

import { SAdminClusters } from '@/services/admin'
import { overlays } from '@/composables/overlays'

export default {
  name: 'AdminClusterCrud',

  emits: [
    'update:rows',
    'update:row'
  ],

  mixins: [
    MAreas
  ],

  data () {
    return {
      state: {
        editing: false,
      },
      modalCluster: false,
      validationCluster: yup.object().shape({
        id: yup.string().nullable(),
        area_id: yup.string().required().label('area'),
        cluster_code: yup.string().required().label('cluster code'),
        cluster_name: yup.string().required().label('cluster name')
      }),
      formCluster: {
        id: '',
        area_id: '',
        cluster_code: '',
        cluster_name: '',
        active: true
      }
    }
  },

  watch: {
    'selected.area' (area) {
      this.formCluster.area_id = area
    }
  },

  methods: {

    createCluster() {
      this.state.editing = false

      this.formCluster = {
        id: '',
        area_id: '',
        cluster_code: '',
        cluster_name: '',
        active: true
      }

      this.getAreas(this)

      this.modalCluster = true
    },

    editCluster(cluster) {
      this.state.editing = true

      this.formCluster = {
        id: cluster.id,
        area_id: '',
        cluster_code: cluster.cluster_code,
        cluster_name: cluster.cluster_name,
        active: Number(cluster.active) === 1
      }

      this.getAreas(this).finally(() => {
        this.selected.area = cluster.area_id
      })

      this.modalCluster = true
    },

    async validateCluster() {
      this.$refs.formCluster.validate({ silent: true }).then(
        async validCluster => {
          if (!validCluster) {
            return overlays.invalid()
          }

          const createOrUpdate = this.state.editing ? SAdminClusters.put : SAdminClusters.post

          overlays.confirm({
            confirmButtonText: this.state.editing ? 'Update' : 'Create',
            body: `${this.state.editing ? 'Update' : 'Create'} Cluster?`,
            preConfirm: async () => {
              return createOrUpdate(this.formCluster).then(
                ({ data: { message, cluster }}) => {
                  overlays.success({ body: message }).then(() => {
                    if (this.state.editing) {
                      this.$emit('update:row', cluster)
                    } else {
                      this.$emit('update:rows', cluster)
                    }
                  })

                  this.modalCluster = false
                }
              ).catch(
                ({ message }) => {
                  if (message && message.errors) {
                    const validationError = Object.keys(message.errors).map(name => ({
                      name,
                      message: message.errors[name][0]
                    }))

                    this.$refs.formCluster.setErrors(validationError)
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
