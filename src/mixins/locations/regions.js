import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        regions: false
      },
      options: {
        regions: []
      },
      selected: {
        region: ''
      },
      editable: {
        region: ''
      }
    }
  },

  methods: {

    async getRegions ({ options, fetching, selected }, search = '') {
      fetching.regions = true
      selected.region = ''

      const filters = {
        search: search
      }

      return await SSharedList.getRegions(filters).then(
        ({ data }) => {
          options.regions = data
        }
      ).catch(() => {
        options.regions = []
      }).finally(() => {
        fetching.regions = false
      })
    },

    async searchRegions (search) {
      this.searchRegionsProvider(this, search)
    },

    searchRegionsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.regions, {
          keys: ['region_name']
        })

        if (filteredOptions.length < 1) {
          fetching.regions = true
          selected.region = ''

          const filters = {
            search: search
          }

          SSharedList.getRegions(filters).then(
            ({ data }) => {
              options.regions = data
            }
          ).catch(() => {
            options.regions = []
          }).finally(() => {
            fetching.regions = false
          })
        }
      }, 500
    )
  }
}
