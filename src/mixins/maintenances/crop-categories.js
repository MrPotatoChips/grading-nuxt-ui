import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        cropCategories: false
      },
      options: {
        cropCategories: []
      },
      selected: {
        cropCategory: ''
      },
      editable: {
        cropCategory: ''
      }
    }
  },

  methods: {

    async getCropCategories ({ options, fetching, selected }, search = '') {
      fetching.cropCategories = true
      selected.cropCategory = ''

      const filters = {
        search: search
      }

      return await SSharedList.getCropCategories(filters).then(
        ({ data }) => {
          options.cropCategories = data
        }
      ).catch(() => {
        options.cropCategories = []
      }).finally(() => {
        fetching.cropCategories = false
      })
    },

    async searchCropCategories (search) {
      this.searchCropCategoriesProvider(this, search)
    },

    searchCropCategoriesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.cropCategories, {
          keys: ['crop_category_name']
        })

        if (filteredOptions.length < 1) {
          fetching.cropCategories = true
          selected.cropCategory = ''

          const filters = {
            search: search
          }

          SSharedList.getCropCategories(filters).then(
            ({ data }) => {
              options.cropCategories = data
            }
          ).catch(() => {
            options.cropCategories = []
          }).finally(() => {
            fetching.cropCategories = false
          })
        }
      }, 500
    )
  }
}
