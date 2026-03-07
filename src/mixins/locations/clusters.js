import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        clusters: false
      },
      options: {
        clusters: []
      },
      selected: {
        cluster: ''
      },
      editable: {
        cluster: ''
      }
    }
  },

  watch: {
    'selected.area' (area) {
      if (area) {
        this.getClusters(this).finally(() => {
          if (this.editable.cluster) {
            this.selected.cluster = this.editable.cluster

            this.editable.cluster = ''
          }
        })
      } else {
        this.selected.cluster = ''
        this.options.clusters = []
      }
    }
  },

  methods: {

    async getClusters ({ options, fetching, selected }, search = '') {
      fetching.clusters = true
      selected.cluster = ''

      const filters = {
        search: search,
        area_id: selected?.area || ''
      }

      return await SSharedList.getClusters(filters).then(
        ({ data }) => {
          options.clusters = data
        }
      ).catch(() => {
        options.clusters = []
      }).finally(() => {
        fetching.clusters = false
      })
    },

    async searchClusters (search) {
      this.searchClustersProvider(this, search)
    },

    searchClustersProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.clusters, {
          keys: ['cluster_name']
        })

        if (filteredOptions.length < 1) {
          fetching.clusters = true
          selected.cluster = ''

          const filters = {
            search: search,
            area_id: selected?.area || ''
          }

          SSharedList.getClusters(filters).then(
            ({ data }) => {
              options.clusters = data
            }
          ).catch(() => {
            options.clusters = []
          }).finally(() => {
            fetching.clusters = false
          })
        }
      }, 500
    )
  }
}
