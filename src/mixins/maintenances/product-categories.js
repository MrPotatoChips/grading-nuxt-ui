import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        productCategories: false
      },
      options: {
        productCategories: []
      },
      selected: {
        productCategory: ''
      },
      editable: {
        productCategory: ''
      }
    }
  },

  methods: {

    async getProductCategories ({ options, fetching, selected }, search = '') {
      fetching.productCategories = true
      selected.productCategory = ''

      const filters = {
        search: search
      }

      return await SSharedList.getProductCategories(filters).then(
        ({ data }) => {
          options.productCategories = data
        }
      ).catch(() => {
        options.productCategories = []
      }).finally(() => {
        fetching.productCategories = false
      })
    },

    async searchProductCategories (search) {
      this.searchProductCategoriesProvider(this, search)
    },

    searchProductCategoriesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.productCategories, {
          keys: ['product_category_name']
        })

        if (filteredOptions.length < 1) {
          fetching.productCategories = true
          selected.productCategory = ''

          const filters = {
            search: search
          }

          SSharedList.getProductCategories(filters).then(
            ({ data }) => {
              options.productCategories = data
            }
          ).catch(() => {
            options.productCategories = []
          }).finally(() => {
            fetching.productCategories = false
          })
        }
      }, 500
    )
  }
}
