import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        colleges: false
      },
      options: {
        colleges: []
      },
      selected: {
        college: ''
      },
      editable: {
        college: ''
      }
    }
  },

  methods: {

    async getColleges ({ options, fetching, selected }, search = '') {
      fetching.colleges = true
      selected.college = ''

      const filters = {
        search,
        province_id: selected?.province || '',
        municipality_id: selected?.municipality || '',
        barangay_id: selected?.barangay || ''
      }

      return SSharedList.getColleges(filters).then(
        ({ data }) => {
          options.colleges = data
        }
      ).catch(() => {
        options.colleges = []
      }).finally(() => {
        fetching.colleges = false
      })
    },

    async searchColleges (search) {
      this.searchCollegesProvider(this, search)
    },

    searchCollegesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.colleges, {
          keys: ['college_name']
        })

        if (filteredOptions.length < 1) {
          fetching.colleges = true
          selected.college = ''

          const filters = {
            search,
            province_id: selected?.province || '',
            municipality_id: selected?.municipality || '',
            barangay_id: selected?.barangay || ''
          }

          SSharedList.getColleges(filters).then(
            ({ data }) => {
              options.colleges = data
            }
          ).catch(() => {
            options.colleges = []
          }).finally(() => {
            fetching.colleges = false
          })
        }
      }, 500
    )
  }
}
