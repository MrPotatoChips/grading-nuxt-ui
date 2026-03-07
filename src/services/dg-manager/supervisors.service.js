import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dg-manager/supervisors', { params })
  },

  async show (id) {
    return axios.get(`dg-manager/supervisors/${id}`)
  },

  async getPerformance (id, params = {}) {
    return axios.get(`dg-manager/supervisors/${id}/performance`, { params })
  }
}
