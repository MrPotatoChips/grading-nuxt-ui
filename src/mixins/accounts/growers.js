import { fuseFilter } from '@/composables/fuse'
import { SSharedList } from '@/services/shared'
import QUERY, { first } from 'lodash'


export default {
  data () {
    return {
      fetching: {
        growers: false
      },
      options: {
        growers: []
      },
      selected: {
        grower: ''
      },
      editable: {
        grower: ''
      }
    }
  },

  methods: {

    async getGrowers ({ options, fetching, selected }, search = '') {
      fetching.growers = true
      selected.grower = ''

      const filters = {
        search: search
      }

      return await SSharedList.getGrowers(filters).then(
        ({ data }) => {
          options.growers = data.map(
            grower => {
              const growerName = `${grower.first_name} ${grower.last_name}`
              const photo = first(grower?.photos || [])

              return  Object.assign(grower, {
                grower_name: growerName,
                avatar: {
                  src: photo ? `${import.meta.env.VITE_API_BASE_URL}/${photo.attachment_path}/${photo.file_name}` : '',
                  alt: growerName
                }
              })
            }
          )
        }
      ).catch(() => {
        options.growers = []
      }).finally(() => {
        fetching.growers = false
      })
    },

    async searchGrowers (search) {
      this.searchGrowersProvider(this, search)
    },

    searchGrowersProvider: QUERY.debounce(
      ({ options, fetching, selected }, search) => {
        const filteredOptions = fuseFilter(search, options.growers, {
          keys: ['grower_name']
        })

        if (filteredOptions.length < 1) {
          fetching.growers = true
          selected.grower = ''

          const filters = {
            search: search
          }

          SSharedList.getGrowers(filters).then(
            ({ data }) => {
              options.growers = data.map(
                grower => {
                  const growerName = `${grower.first_name} ${grower.last_name}`
                  const photo = first(grower?.photos || [])

                  return  Object.assign(grower, {
                    grower_name: growerName,
                    avatar: {
                      src: photo ? `${import.meta.env.VITE_API_BASE_URL}/${photo.attachment_path}/${photo.file_name}` : '',
                      alt: growerName
                    }
                  })
                }
              )
            }
          ).catch(() => {
            options.growers = []
          }).finally(() => {
            fetching.growers = false
          })
        }
      }, 500
    )
  }
}
