import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        tasks: false
      },
      options: {
        tasks: []
      },
      selected: {
        task: ''
      },
      editable: {
        task: ''
      }
    }
  },

  methods: {

    async getTasks ({ options, fetching, selected }, search = '') {
      fetching.tasks = true
      selected.task = ''

      const filters = {
        search: search
      }

      return await SSharedList.getTasks(filters).then(
        ({ data }) => {
          options.tasks = data
        }
      ).catch(() => {
        options.tasks = []
      }).finally(() => {
        fetching.tasks = false
      })
    },

    async searchTasks (search) {
      this.searchTasksProvider(this, search)
    },

    searchTasksProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.tasks, {
          keys: ['task_name']
        })

        if (filteredOptions.length < 1) {
          fetching.tasks = true
          selected.task = ''

          const filters = {
            search: search
          }

          SSharedList.getTasks(filters).then(
            ({ data }) => {
              options.tasks = data
            }
          ).catch(() => {
            options.tasks = []
          }).finally(() => {
            fetching.tasks = false
          })
        }
      }, 500
    )
  }
}
