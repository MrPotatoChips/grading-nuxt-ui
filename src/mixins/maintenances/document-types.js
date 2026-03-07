import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        documentTypes: false
      },
      options: {
        documentTypes: []
      },
      selected: {
        documentType: ''
      },
      editable: {
        documentType: ''
      }
    }
  },

  methods: {

    async getDocumentTypes ({ options, fetching, selected }, search = '') {
      fetching.documentTypes = true
      selected.documentType = ''

      const filters = {
        search: search
      }

      return await SSharedList.getDocumentTypes(filters).then(
        ({ data }) => {
          options.documentTypes = data
        }
      ).catch(() => {
        options.documentTypes = []
      }).finally(() => {
        fetching.documentTypes = false
      })
    },

    async searchDocumentTypes (search) {
      this.searchDocumentTypesProvider(this, search)
    },

    searchDocumentTypesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.documentTypes, {
          keys: ['document_type_name']
        })

        if (filteredOptions.length < 1) {
          fetching.documentTypes = true
          selected.documentType = ''

          const filters = {
            search: search
          }

          SSharedList.getDocumentTypes(filters).then(
            ({ data }) => {
              options.documentTypes = data
            }
          ).catch(() => {
            options.documentTypes = []
          }).finally(() => {
            fetching.documentTypes = false
          })
        }
      }, 500
    )
  }
}
