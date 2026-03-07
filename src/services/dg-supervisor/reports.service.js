import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dg-supervisor/reports', { params })
  },

  async generate (params = {}) {
    return axios.post('dg-supervisor/reports/generate', params)
  },

  async download (id) {
    return axios.get(`dg-supervisor/reports/${id}/download`, { responseType: 'blob' })
  }
}
