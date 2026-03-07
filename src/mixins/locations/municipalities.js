import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        municipalities: false
      },
      options: {
        municipalities: []
      },
      selected: {
        municipality: ''
      },
      editable: {
        municipality: ''
      }
    }
  },

  watch: {
    'selected.province' (province) {
      if (province) {
        this.getMunicipalities(this).finally(() => {
          if (this.editable.municipality) {
            this.selected.municipality = this.editable.municipality

            this.editable.municipality = ''
          }
        })
      } else {
        this.selected.municipality = ''
        this.options.municipalities = []
      }
    }
  },

  methods: {

    async getMunicipalities ({ options, fetching, selected }, search = '') {
      fetching.municipalities = true
      selected.municipality = ''

      const filters = {
        search: search,
        province_id: selected?.province || ''
      }

      return await SSharedList.getMunicipalities(filters).then(
        ({ data }) => {
          options.municipalities = data
        }
      ).catch(() => {
        options.municipalities = []
      }).finally(() => {
        fetching.municipalities = false
      })
    },

    async searchMunicipalities (search) {
      this.searchMunicipalitiesProvider(this, search)
    },

    searchMunicipalitiesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.municipalities, {
          keys: ['municipality_name']
        })

        if (filteredOptions.length < 1) {
          fetching.municipalities = true
          selected.municipality = ''

          const filters = {
            search: search,
            province_id: selected?.province || ''
          }

          SSharedList.getMunicipalities(filters).then(
            ({ data }) => {
              options.municipalities = data
            }
          ).catch(() => {
            options.municipalities = []
          }).finally(() => {
            fetching.municipalities = false
          })
        }
      }, 500
    )
  }
}
