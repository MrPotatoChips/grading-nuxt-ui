<template>
  <UContainer class="sm:px-0 lg:px-0 px-0">
    <section class="grid grid-cols-5 gap-6">
      <UCard class="col-span-5">
        <div v-if="fetching.grower" class="flex items-center gap-3">
          <USkeleton class="h-10 w-10 rounded-full" />

          <div class="grid gap-2">
            <USkeleton class="h-4 w-62.5" />
            <USkeleton class="h-4 w-50" />
          </div>
        </div>
        <UUser
          v-else
          description="Software Engineer"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe',
          }"
          chip
          size="xl"
        >
          <template #name>
            {{ grower.first_name }} {{ grower.last_name }}
          </template>
          <template #description>
            {{ grower.mobile_number }}
          </template>
        </UUser>
      </UCard>

      <UCard
        class="col-span-5 md:col-span-4"
        :ui="{
          header: 'p-0',
          // body: 'h-[calc(100vh-355px)]'
        }"
      >
        <template #header>
          <UScrollArea orientation="horizontal">
            <UNavigationMenu :items="routes" highlight class="flex-1" />
          </UScrollArea>
        </template>

        <RouterView />
      </UCard>

      <div class="col-span-5 md:col-span-1">
        <div class="flex flex-col gap-6">
          <UCard
            :ui="{
              body: 'sm:py-4 flex justify-center items-center',
            }"
          >
            <div class="text-[10px] font-medium">Suggested Growers By Municipality</div>
          </UCard>

          <UScrollArea class="h-[calc(100vh-355px)]">
            <div class="flex flex-col gap-6 py-2 px-1">
              <UCard v-for="card in Array.from({ length: 10 }).map((_, key) => key)" :key="card">
                <UUser
                  name="John Doe"
                  description="Software Engineer"
                  :avatar="{
                    src: 'https://i.pravatar.cc/150?u=john-doe',
                  }"
                  chip
                  size="md"
                />
              </UCard>
            </div>
          </UScrollArea>
        </div>
      </div>
    </section>
  </UContainer>
</template>
<script>
import { SDGAgentGrowers } from '@/services/dg-agent'

export default {
  name: 'DGAManagementsWrapper',

  data() {
    return {
      fetching: {
        grower: false,
      },
      grower: {
        first_name: '',
        last_name: '',
      },
      routes: [
        {
          label: 'Info',
          icon: 'i-lucide-file-text',
          to: {
            name: 'dga.grower-managements.informations',
          },
        },
        {
          label: 'Interactions',
          icon: 'i-lucide-footprints',
          to: {
            name: 'dga.grower-managements.interactions',
          },
        },
        {
          label: 'Farms',
          icon: 'i-lucide-land-plot',
          to: {
            name: 'dga.grower-managements.farms',
          },
        },
        {
          label: 'Crop Histories',
          icon: 'i-lucide-wheat',
          to: {
            name: 'dga.grower-managements.crop-histories',
          },
        },
        {
          label: 'Documents',
          icon: 'i-lucide-file-badge',
          to: {
            name: 'dga.grower-managements.documents',
          },
        },
      ],
    }
  },

  beforeRouteEnter(_to, _from, navigate) {
    navigate(context => {
      context.getGrower()
    })
  },

  methods: {
    async getGrower() {
      this.fetching.grower = true
      return SDGAgentGrowers.show(this.$route.params.grower)
        .then(({ data: { grower } }) => {
          this.grower = Object.assign(this.grower, {
            first_name: grower.first_name,
            last_name: grower.last_name,
            mobile_number: grower.mobile_number,
            email: grower.email,
          })
        })
        .finally(() => {
          this.fetching.grower = false
        })
    },
  },
}
</script>
