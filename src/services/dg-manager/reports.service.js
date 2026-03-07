import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dg-manager/reports', { params })
  },

  async generate (params = {}) {
    return axios.post('dg-manager/reports/generate', params)
  },

  async download (id) {
    return axios.get(`dg-manager/reports/${id}/download`, { responseType: 'blob' })
  }
}
