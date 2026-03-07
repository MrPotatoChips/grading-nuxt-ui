import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/grower-crop-histories', { params })
  },

  async show (id) {
    return axios.get(`dga/grower-crop-histories/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/grower-crop-histories', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/grower-crop-histories/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/grower-crop-histories/${data.id}`, { data })
  }
}
