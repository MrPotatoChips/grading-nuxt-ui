import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        subjects: false
      },
      options: {
        subjects: []
      },
      selected: {
        subject: '',
        semester: ''
      },
      editable: {
        subject: ''
      }
    }
  },

  watch: {
    'selected.semester' (semester) {
      if (semester) {
        this.getSubjects(this).finally(() => {
          if (this.editable.subject) {
            this.selected.subject = this.editable.subject

            this.editable.subject = ''
          }
        })
      } else {
        this.selected.subject = ''
        this.options.subjects = []
      }
    }
  },

  methods: {

    async getSubjects ({ options, fetching, selected }, search = '') {
      fetching.subjects = true
      selected.subject = ''

      const filters = {
        search,
        semester_id: selected?.semester || ''
      }

      return SSharedList.getSubjects(filters).then(
        ({ data }) => {
          options.subjects = data
        }
      ).catch(() => {
        options.subjects = []
      }).finally(() => {
        fetching.subjects = false
      })
    },

    async searchSubjects (search) {
      this.searchSubjectsProvider(this, search)
    },

    searchSubjectsProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.subjects, {
          keys: ['subject_name']
        })

        if (filteredOptions.length < 1) {
          fetching.subjects = true
          selected.subject = ''

          const filters = {
            search,
            semester_id: selected?.semester || ''
          }

          SSharedList.getSubjects(filters).then(
            ({ data }) => {
              options.subjects = data
            }
          ).catch(() => {
            options.subjects = []
          }).finally(() => {
            fetching.subjects = false
          })
        }
      }, 500
    )
  }
}
