import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        productGroups: false
      },
      options: {
        productGroups: []
      },
      selected: {
        productGroup: ''
      },
      editable: {
        productGroup: ''
      }
    }
  },

  methods: {

    async getProductGroups ({ options, fetching, selected }, search = '') {
      fetching.productGroups = true
      selected.productGroup = ''

      const filters = {
        search: search
      }

      return await SSharedList.getProductGroups(filters).then(
        ({ data }) => {
          options.productGroups = data
        }
      ).catch(() => {
        options.productGroups = []
      }).finally(() => {
        fetching.productGroups = false
      })
    },

    async searchProductGroups (search) {
      this.searchProductGroupsProvider(this, search)
    },

    searchProductGroupsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.productGroups, {
          keys: ['group_name']
        })

        if (filteredOptions.length < 1) {
          fetching.productGroups = true
          selected.productGroup = ''

          const filters = {
            search: search
          }

          SSharedList.getProductGroups(filters).then(
            ({ data }) => {
              options.productGroups = data
            }
          ).catch(() => {
            options.productGroups = []
          }).finally(() => {
            fetching.productGroups = false
          })
        }
      }, 500
    )
  }
}
