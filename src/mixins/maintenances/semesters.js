import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        semesters: false
      },
      options: {
        semesters: []
      },
      selected: {
        semester: '',
        year: ''
      },
      editable: {
        semester: ''
      }
    }
  },

  watch: {
    'selected.year' (year) {
      if (year) {
        this.getSemesters(this).finally(() => {
          if (this.editable.semester) {
            this.selected.semester = this.editable.semester

            this.editable.semester = ''
          }
        })
      } else {
        this.selected.semester = ''
        this.options.semesters = []
      }
    }
  },

  methods: {

    async getSemesters ({ options, fetching, selected }, search = '') {
      fetching.semesters = true
      selected.semester = ''

      const filters = {
        search,
        year_id: selected?.year || ''
      }

      return SSharedList.getSemesters(filters).then(
        ({ data }) => {
          options.semesters = data
        }
      ).catch(() => {
        options.semesters = []
      }).finally(() => {
        fetching.semesters = false
      })
    },

    async searchSemesters (search) {
      this.searchSemestersProvider(this, search)
    },

    searchSemestersProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.semesters, {
          keys: ['semester_name']
        })

        if (filteredOptions.length < 1) {
          fetching.semesters = true
          selected.semester = ''

          const filters = {
            search,
            year_id: selected?.year || ''
          }

          SSharedList.getSemesters(filters).then(
            ({ data }) => {
              options.semesters = data
            }
          ).catch(() => {
            options.semesters = []
          }).finally(() => {
            fetching.semesters = false
          })
        }
      }, 500
    )
  }
}
