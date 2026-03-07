import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'


export default {
  data () {
    return {
      fetching: {
        dgAgents: false
      },
      options: {
        dgAgents: []
      },
      selected: {
        dgAgent: ''
      },
      editable: {
        dgAgent: ''
      }
    }
  },

  methods: {

    async getDGAgents ({ options, fetching, selected }, search = '') {
      fetching.dgAgents = true
      selected.dgAgent = ''

      const filters = {
        search: search
      }

      return await SSharedList.getDGAgents(filters).then(
        ({ data }) => {
          options.dgAgents = data.map(
            dgAgent => Object.assign(dgAgent, {
              agent_name: `${dgAgent.first_name} ${dgAgent.last_name}`
            })
          )
        }
      ).catch(() => {
        options.dgAgents = []
      }).finally(() => {
        fetching.dgAgents = false
      })
    },

    async searchDGAgents (search) {
      this.searchDGAgentsProvider(this, search)
    },

    searchDGAgentsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.dgAgents, {
          keys: ['agent_name']
        })

        if (filteredOptions.length < 1) {
          fetching.dgAgents = true
          selected.dgAgent = ''

          const filters = {
            search: search
          }

          SSharedList.getDGAgents(filters).then(
            ({ data }) => {
              options.dgAgents = data.map(
              dgAgent => Object.assign(dgAgent, {
                agent_name: `${dgAgent.first_name} ${dgAgent.last_name}`
              })
            )
            }
          ).catch(() => {
            options.dgAgents = []
          }).finally(() => {
            fetching.dgAgents = false
          })
        }
      }, 500
    )
  }
}
