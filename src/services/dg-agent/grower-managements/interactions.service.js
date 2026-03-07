import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/grower-interactions', { params })
  },

  async show (id) {
    return axios.get(`dga/grower-interactions/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/grower-interactions', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/grower-interactions/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/grower-interactions/${data.id}`, { data })
  }
}
