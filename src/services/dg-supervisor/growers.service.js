import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dg-supervisor/growers', { params })
  },

  async show (id) {
    return axios.get(`dg-supervisor/growers/${id}`)
  }
}
