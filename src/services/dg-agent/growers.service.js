import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/growers', { params })
  },

  async show (id) {
    return axios.get(`dga/growers/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/growers', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/growers/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/growers/${data.id}`, { data })
  }
}
