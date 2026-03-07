import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        activities: false
      },
      options: {
        activities: []
      },
      selected: {
        activity: ''
      },
      editable: {
        activity: ''
      }
    }
  },

  methods: {

    async getActivities ({ options, fetching, selected }, search = '') {
      fetching.activities = true
      selected.activity = ''

      const filters = {
        search: search
      }

      return await SSharedList.getActivities(filters).then(
        ({ data }) => {
          options.activities = data
        }
      ).catch(() => {
        options.activities = []
      }).finally(() => {
        fetching.activities = false
      })
    },

    async searchActivities (search) {
      this.searchActivitiesProvider(this, search)
    },

    searchActivitiesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.activities, {
          keys: ['activity_name']
        })

        if (filteredOptions.length < 1) {
          fetching.activities = true
          selected.activity = ''

          const filters = {
            search: search
          }

          SSharedList.getActivities(filters).then(
            ({ data }) => {
              options.activities = data
            }
          ).catch(() => {
            options.activities = []
          }).finally(() => {
            fetching.activities = false
          })
        }
      }, 500
    )
  }
}
