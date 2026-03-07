import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        courses: false
      },
      options: {
        courses: []
      },
      selected: {
        course: '',
        college: ''
      },
      editable: {
        course: ''
      }
    }
  },

  watch: {
    'selected.college' (college) {
      if (college) {
        this.getCourses(this).finally(() => {
          if (this.editable.course) {
            this.selected.course = this.editable.course

            this.editable.course = ''
          }
        })
      } else {
        this.selected.course = ''
        this.options.courses = []
      }
    }
  },

  methods: {

    async getCourses ({ options, fetching, selected }, search = '') {
      fetching.courses = true
      selected.course = ''

      const filters = {
        search,
        college_id: selected?.college || ''
      }

      return SSharedList.getCourses(filters).then(
        ({ data }) => {
          options.courses = data
        }
      ).catch(() => {
        options.courses = []
      }).finally(() => {
        fetching.courses = false
      })
    },

    async searchCourses (search) {
      this.searchCoursesProvider(this, search)
    },

    searchCoursesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.courses, {
          keys: ['course_name']
        })

        if (filteredOptions.length < 1) {
          fetching.courses = true
          selected.course = ''

          const filters = {
            search,
            college_id: selected?.college || ''
          }

          SSharedList.getCourses(filters).then(
            ({ data }) => {
              options.courses = data
            }
          ).catch(() => {
            options.courses = []
          }).finally(() => {
            fetching.courses = false
          })
        }
      }, 500
    )
  }
}
