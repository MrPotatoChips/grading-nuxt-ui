import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/grower-farms', { params })
  },

  async show (id) {
    return axios.get(`dga/grower-farms/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/grower-farms', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/grower-farms/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/grower-farms/${data.id}`, { data })
  }
}
