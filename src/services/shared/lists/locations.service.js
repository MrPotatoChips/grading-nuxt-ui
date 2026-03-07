import axios from 'axios'

export default {
  async getAreas (params = {}) {
    return axios.get('shared/list/areas', { params })
  },

  async getClusters (params = {}) {
    return axios.get('shared/list/clusters', { params })
  },

  async getRegions (params = {}) {
    return axios.get('shared/list/regions', { params })
  },

  async getProvinces (params = {}) {
    return axios.get('shared/list/provinces', { params })
  },

  async getMunicipalities (params = {}) {
    return axios.get('shared/list/municipalities', { params })
  },

  async getBarangays (params = {}) {
    return axios.get('shared/list/barangays', { params })
  }
}
