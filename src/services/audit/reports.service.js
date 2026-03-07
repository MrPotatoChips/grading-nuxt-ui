import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('audit/reports', { params })
  },

  async generate (params = {}) {
    return axios.post('audit/reports/generate', params)
  },

  async download (id) {
    return axios.get(`audit/reports/${id}/download`, { responseType: 'blob' })
  }
}
