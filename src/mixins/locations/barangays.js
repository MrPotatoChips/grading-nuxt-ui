import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        barangays: false
      },
      options: {
        barangays: []
      },
      selected: {
        barangay: ''
      },
      editable: {
        barangay: ''
      }
    }
  },

  watch: {
    'selected.municipality' (municipality) {
      if (municipality) {
        this.getBarangays(this).finally(() => {
          if (this.editable.barangay) {
            this.selected.barangay = this.editable.barangay

            this.editable.barangay = ''
          }
        })
      } else {
        this.selected.barangay = ''
        this.options.barangays = []
      }
    }
  },

  methods: {

    async getBarangays ({ options, fetching, selected }, search = '') {
      fetching.barangays = true
      selected.barangay = ''

      const filters = {
        search: search,
        municipality_id: selected?.municipality || ''
      }

      return await SSharedList.getBarangays(filters).then(
        ({ data }) => {
          options.barangays = data
        }
      ).catch(() => {
        options.barangays = []
      }).finally(() => {
        fetching.barangays = false
      })
    },

    async searchBarangays (search) {
      this.searchBarangaysProvider(this, search)
    },

    searchBarangaysProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.barangays, {
          keys: ['barangay_name']
        })

        if (filteredOptions.length < 1) {
          fetching.barangays = true
          selected.barangay = ''

          const filters = {
            search: search,
            municipality_id: selected?.municipality || ''
          }

          SSharedList.getBarangays(filters).then(
            ({ data }) => {
              options.barangays = data
            }
          ).catch(() => {
            options.barangays = []
          }).finally(() => {
            fetching.barangays = false
          })
        }
      }, 500
    )
  }
}
