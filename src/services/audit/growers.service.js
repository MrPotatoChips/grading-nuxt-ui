import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('audit/growers', { params })
  },

  async show (id) {
    return axios.get(`audit/growers/${id}`)
  },

  async getHistory (id, params = {}) {
    return axios.get(`audit/growers/${id}/history`, { params })
  }
}
