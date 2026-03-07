import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'


export default {
  data () {
    return {
      fetching: {
        growerFarms: false
      },
      options: {
        growerFarms: []
      },
      selected: {
        growerFarm: ''
      },
      editable: {
        growerFarm: ''
      }
    }
  },

  methods: {

    async getGrowerFarms ({ options, fetching, selected }, search = '') {
      fetching.growerFarms = true
      selected.growerFarm = ''

      const filters = {
        search: search
      }

      return await SSharedList.getGrowerFarms(filters).then(
        ({ data }) => {
          options.growerFarms = data
        }
      ).catch(() => {
        options.growerFarms = []
      }).finally(() => {
        fetching.growerFarms = false
      })
    },

    async searchGrowerFarms (search) {
      this.searchGrowerFarmsProvider(this, search)
    },

    searchGrowerFarmsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.growerFarms, {
          keys: ['farm_name']
        })

        if (filteredOptions.length < 1) {
          fetching.growerFarms = true
          selected.growerFarm = ''

          const filters = {
            search: search
          }

          SSharedList.getGrowerFarms(filters).then(
            ({ data }) => {
              options.growerFarms = data
            }
          ).catch(() => {
            options.growerFarms = []
          }).finally(() => {
            fetching.growerFarms = false
          })
        }
      }, 500
    )
  }
}
