import axios from 'axios'

export default {
  async getRegions (params = {}) {
    return axios.get('shared/lists/locations/regions', { params })
  },

  async getProvinces (params = {}) {
    return axios.get('shared/lists/locations/provinces', { params })
  },

  async getMunicipalities (params = {}) {
    return axios.get('shared/lists/locations/municipalities', { params })
  },

  async getBarangays (params = {}) {
    return axios.get('shared/lists/locations/barangays', { params })
  }
}
