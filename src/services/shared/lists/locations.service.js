import axios from 'axios'

export default {
  async getAreas (params = {}) {
    return axios.get('shared/lists/locations/areas', { params })
  },

  async getClusters (params = {}) {
    return axios.get('shared/lists/locations/clusters', { params })
  },

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
