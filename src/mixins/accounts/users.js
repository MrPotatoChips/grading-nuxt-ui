import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        users: false
      },
      options: {
        users: []
      },
      selected: {
        user: ''
      },
      editable: {
        user: ''
      }
    }
  },

  methods: {

    async getUsers ({ options, fetching, selected }, search = '') {
      fetching.users = true
      selected.user = ''

      const filters = {
        search: search
      }

      return await SSharedList.getUsers(filters).then(
        ({ data }) => {
          options.users = data.map(
            user => Object.assign(user, {
              user_name: `${user.first_name} ${user.last_name}`
            })
          )
        }
      ).catch(() => {
        options.users = []
      }).finally(() => {
        fetching.users = false
      })
    },

    async searchUsers (search) {
      this.searchUsersProvider(this, search)
    },

    searchUsersProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.users, {
          keys: ['user_name', 'first_name', 'last_name']
        })

        if (filteredOptions.length < 1) {
          fetching.users = true
          selected.user = ''

          const filters = {
            search: search
          }

          SSharedList.getUsers(filters).then(
            ({ data }) => {
              options.users = data.map(
                user => Object.assign(user, {
                  user_name: `${user.first_name} ${user.last_name}`
                })
              )
            }
          ).catch(() => {
            options.users = []
          }).finally(() => {
            fetching.users = false
          })
        }
      }, 500
    )
  }
}
