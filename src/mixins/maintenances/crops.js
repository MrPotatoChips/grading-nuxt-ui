import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        crops: false
      },
      options: {
        crops: []
      },
      selected: {
        crop: ''
      },
      editable: {
        crop: ''
      }
    }
  },

  methods: {

    async getCrops ({ options, fetching, selected }, search = '') {
      fetching.crops = true
      selected.crop = ''

      const filters = {
        search: search
      }

      return await SSharedList.getCrops(filters).then(
        ({ data }) => {
          options.crops = data
        }
      ).catch(() => {
        options.crops = []
      }).finally(() => {
        fetching.crops = false
      })
    },

    async searchCrops (search) {
      this.searchCropsProvider(this, search)
    },

    searchCropsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.crops, {
          keys: ['crop_name']
        })

        if (filteredOptions.length < 1) {
          fetching.crops = true
          selected.crop = ''

          const filters = {
            search: search
          }

          SSharedList.getCrops(filters).then(
            ({ data }) => {
              options.crops = data
            }
          ).catch(() => {
            options.crops = []
          }).finally(() => {
            fetching.crops = false
          })
        }
      }, 500
    )
  }
}
