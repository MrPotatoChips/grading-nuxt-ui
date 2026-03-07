import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('marketing-manager/growers', { params })
  },

  async show (id) {
    return axios.get(`marketing-manager/growers/${id}`)
  },

  async getMetrics (params = {}) {
    return axios.get('marketing-manager/growers/metrics', { params })
  }
}
