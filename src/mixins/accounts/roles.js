import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'


export default {
  data () {
    return {
      fetching: {
        roles: false
      },
      options: {
        roles: []
      },
      selected: {
        role: ''
      },
      editable: {
        role: ''
      }
    }
  },

  methods: {

    async getRoles ({ options, fetching, selected }, search = '') {
      fetching.roles = true
      selected.role = ''

      const filters = {
        search: search
      }

      return await SSharedList.getRoles(filters).then(
        ({ data }) => {
          options.roles = data
        }
      ).catch(() => {
        options.roles = []
      }).finally(() => {
        fetching.roles = false
      })
    },

    async searchRoles (search) {
      this.searchRolesProvider(this, search)
    },

    searchRolesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.roles, {
          keys: ['role_name']
        })

        if (filteredOptions.length < 1) {
          fetching.roles = true
          selected.role = ''

          const filters = {
            search: search
          }

          SSharedList.getRoles(filters).then(
            ({ data }) => {
              options.roles = data
            }
          ).catch(() => {
            options.roles = []
          }).finally(() => {
            fetching.roles = false
          })
        }
      }, 500
    )
  }
}
