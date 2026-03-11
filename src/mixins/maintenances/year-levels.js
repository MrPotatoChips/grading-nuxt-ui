import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        yearLevels: false
      },
      options: {
        yearLevels: []
      },
      selected: {
        yearLevel: '',
        course: ''
      },
      editable: {
        yearLevel: ''
      }
    }
  },

  watch: {
    'selected.course' (course) {
      if (course) {
        this.getYearLevels(this).finally(() => {
          if (this.editable.yearLevel) {
            this.selected.yearLevel = this.editable.yearLevel

            this.editable.yearLevel = ''
          }
        })
      } else {
        this.selected.yearLevel = ''
        this.options.yearLevels = []
      }
    }
  },

  methods: {

    async getYearLevels ({ options, fetching, selected }, search = '') {
      fetching.yearLevels = true
      selected.yearLevel = ''

      const filters = {
        search,
        course_id: selected?.course || ''
      }

      return SSharedList.getYearLevels(filters).then(
        ({ data }) => {
          options.yearLevels = data
        }
      ).catch(() => {
        options.yearLevels = []
      }).finally(() => {
        fetching.yearLevels = false
      })
    },

    async searchYearLevels (search) {
      this.searchYearLevelsProvider(this, search)
    },

    searchYearLevelsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.yearLevels, {
          keys: ['year_name']
        })

        if (filteredOptions.length < 1) {
          fetching.yearLevels = true
          selected.yearLevel = ''

          const filters = {
            search,
            course_id: selected?.course || ''
          }

          SSharedList.getYearLevels(filters).then(
            ({ data }) => {
              options.yearLevels = data
            }
          ).catch(() => {
            options.yearLevels = []
          }).finally(() => {
            fetching.yearLevels = false
          })
        }
      }, 500
    )
  }
}
