import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY from 'lodash'

export default {
  data () {
    return {
      fetching: {
        provinces: false
      },
      options: {
        provinces: []
      },
      selected: {
        province: ''
      },
      editable: {
        province: ''
      }
    }
  },

  watch: {
    'selected.region' (region) {
      if (region) {
        this.getProvinces(this).finally(() => {
          if (this.editable.province) {
            this.selected.province = this.editable.province

            this.editable.province = ''
          }
        })
      } else {
        this.selected.province = ''
        this.options.provinces = []
      }
    }
  },

  methods: {

    async getProvinces ({ options, fetching, selected }, search = '') {
      fetching.provinces = true
      selected.province = ''

      const filters = {
        search: search,
        region_id: selected?.region || ''
      }

      return await SSharedList.getProvinces(filters).then(
        ({ data }) => {
          options.provinces = data
        }
      ).catch(() => {
        options.provinces = []
      }).finally(() => {
        fetching.provinces = false
      })
    },

    async searchProvinces (search) {
      this.searchProvincesProvider(this, search)
    },

    searchProvincesProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.provinces, {
          keys: ['province_name']
        })

        if (filteredOptions.length < 1) {
          fetching.provinces = true
          selected.province = ''

          const filters = {
            search: search,
            region_id: selected?.region || ''
          }

          SSharedList.getProvinces(filters).then(
            ({ data }) => {
              options.provinces = data
            }
          ).catch(() => {
            options.provinces = []
          }).finally(() => {
            fetching.provinces = false
          })
        }
      }, 500
    )
  }
}
