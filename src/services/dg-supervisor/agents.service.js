import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dg-supervisor/agents', { params })
  },

  async show (id) {
    return axios.get(`dg-supervisor/agents/${id}`)
  },

  async getPerformance (id, params = {}) {
    return axios.get(`dg-supervisor/agents/${id}/performance`, { params })
  }
}
