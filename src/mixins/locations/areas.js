import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        areas: false
      },
      options: {
        areas: []
      },
      selected: {
        area: ''
      },
      editable: {
        area: ''
      }
    }
  },

  methods: {

    async getAreas ({ options, fetching, selected }, search = '') {
      fetching.areas = true
      selected.area = ''

      const filters = {
        search: search
      }

      return await SSharedList.getAreas(filters).then(
        ({ data }) => {
          options.areas = data
        }
      ).catch(() => {
        options.areas = []
      }).finally(() => {
        fetching.areas = false
      })
    },

    async searchAreas (search) {
      this.searchAreasProvider(this, search)
    },

    searchAreasProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.areas, {
          keys: ['area_name']
        })

        if (filteredOptions.length < 1) {
          fetching.areas = true
          selected.area = ''

          const filters = {
            search: search
          }

          SSharedList.getAreas(filters).then(
            ({ data }) => {
              options.areas = data
            }
          ).catch(() => {
            options.areas = []
          }).finally(() => {
            fetching.areas = false
          })
        }
      }, 500
    )
  }
}
