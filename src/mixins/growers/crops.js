import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'


export default {
  data () {
    return {
      fetching: {
        growerCrops: false
      },
      options: {
        growerCrops: []
      },
      selected: {
        growerCrop: ''
      },
      editable: {
        growerCrop: ''
      }
    }
  },

  methods: {

    async getGrowerCrops ({ options, fetching, selected }, search = '') {
      fetching.growerCrops = true
      selected.growerCrop = ''

      const filters = {
        search: search
      }

      return await SSharedList.getGrowerCrops(filters).then(
        ({ data }) => {
          options.growerCrops = data
        }
      ).catch(() => {
        options.growerCrops = []
      }).finally(() => {
        fetching.growerCrops = false
      })
    },

    async searchGrowerCrops (search) {
      this.searchGrowerCropsProvider(this, search)
    },

    searchGrowerCropsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.growerCrops, {
          keys: ['crop_name']
        })

        if (filteredOptions.length < 1) {
          fetching.growerCrops = true
          selected.growerCrop = ''

          const filters = {
            search: search
          }

          SSharedList.getGrowerCrops(filters).then(
            ({ data }) => {
              options.growerCrops = data
            }
          ).catch(() => {
            options.growerCrops = []
          }).finally(() => {
            fetching.growerCrops = false
          })
        }
      }, 500
    )
  }
}
