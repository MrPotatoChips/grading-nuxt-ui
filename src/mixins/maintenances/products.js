import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        products: false
      },
      options: {
        products: []
      },
      selected: {
        product: ''
      },
      editable: {
        product: ''
      }
    }
  },

  methods: {

    async getProducts ({ options, fetching, selected }, search = '') {
      fetching.products = true
      selected.product = ''

      const filters = {
        search: search
      }

      return await SSharedList.getProducts(filters).then(
        ({ data }) => {
          options.products = data
        }
      ).catch(() => {
        options.products = []
      }).finally(() => {
        fetching.products = false
      })
    },

    async searchProducts (search) {
      this.searchProductsProvider(this, search)
    },

    searchProductsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.products, {
          keys: ['product_name']
        })

        if (filteredOptions.length < 1) {
          fetching.products = true
          selected.product = ''

          const filters = {
            search: search
          }

          SSharedList.getProducts(filters).then(
            ({ data }) => {
              options.products = data
            }
          ).catch(() => {
            options.products = []
          }).finally(() => {
            fetching.products = false
          })
        }
      }, 500
    )
  }
}
